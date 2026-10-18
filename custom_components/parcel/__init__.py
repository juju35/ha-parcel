"""The Parcel integration: track and add deliveries from the Parcel app."""

from __future__ import annotations

from pathlib import Path
from typing import Any

import voluptuous as vol

from homeassistant.components import websocket_api
from homeassistant.components.frontend import add_extra_js_url
from homeassistant.components.http import StaticPathConfig
from homeassistant.config_entries import ConfigEntryState
from homeassistant.const import CONF_API_KEY, Platform
from homeassistant.core import HomeAssistant, ServiceCall
from homeassistant.exceptions import HomeAssistantError, ServiceValidationError
from homeassistant.helpers import config_validation as cv
from homeassistant.helpers.aiohttp_client import async_get_clientsession
from homeassistant.helpers.typing import ConfigType

from .api import ParcelApi, ParcelError
from .const import (
    ATTR_CARRIER_CODE,
    ATTR_CONFIG_ENTRY_ID,
    ATTR_DESCRIPTION,
    ATTR_EMAIL,
    ATTR_LANGUAGE,
    ATTR_POSTCODE,
    ATTR_SEND_PUSH_CONFIRMATION,
    ATTR_TRACKING_NUMBER,
    CARD_FILENAME,
    DOMAIN,
    FRONTEND_URL,
    SERVICE_ADD_DELIVERY,
    SERVICE_REFRESH,
    VERSION,
)
from .coordinator import ParcelConfigEntry, ParcelCoordinator

PLATFORMS = [Platform.SENSOR]
CONFIG_SCHEMA = cv.config_entry_only_config_schema(DOMAIN)

ADD_DELIVERY_SCHEMA = vol.Schema(
    {
        vol.Optional(ATTR_CONFIG_ENTRY_ID): cv.string,
        vol.Required(ATTR_TRACKING_NUMBER): vol.All(cv.string, vol.Strip, vol.Length(min=1)),
        vol.Required(ATTR_CARRIER_CODE): vol.All(cv.string, vol.Strip, vol.Length(min=1)),
        vol.Required(ATTR_DESCRIPTION): vol.All(cv.string, vol.Strip, vol.Length(min=1)),
        vol.Optional(ATTR_LANGUAGE): vol.All(cv.string, vol.Length(min=2, max=2)),
        vol.Optional(ATTR_SEND_PUSH_CONFIRMATION, default=False): cv.boolean,
        vol.Optional(ATTR_POSTCODE): cv.string,
        vol.Optional(ATTR_EMAIL): cv.string,
    }
)
REFRESH_SCHEMA = vol.Schema({vol.Optional(ATTR_CONFIG_ENTRY_ID): cv.string})


async def async_setup(hass: HomeAssistant, config: ConfigType) -> bool:
    """Serve the Lovelace card and register services once."""
    await hass.http.async_register_static_paths(
        [StaticPathConfig(FRONTEND_URL, str(Path(__file__).parent / "frontend"), True)]
    )
    # The version query string makes browsers fetch the new card after an update.
    add_extra_js_url(hass, f"{FRONTEND_URL}/{CARD_FILENAME}?v={VERSION}")

    websocket_api.async_register_command(hass, ws_carriers)

    async def add_delivery(call: ServiceCall) -> None:
        coordinator = _get_coordinator(hass, call.data.get(ATTR_CONFIG_ENTRY_ID))
        payload: dict[str, Any] = {
            "tracking_number": call.data[ATTR_TRACKING_NUMBER],
            "carrier_code": call.data[ATTR_CARRIER_CODE],
            "description": call.data[ATTR_DESCRIPTION],
            "language": call.data.get(ATTR_LANGUAGE) or (hass.config.language or "en")[:2],
            "send_push_confirmation": call.data[ATTR_SEND_PUSH_CONFIRMATION],
        }
        for key in (ATTR_POSTCODE, ATTR_EMAIL):
            if call.data.get(key):
                payload[key] = call.data[key]
        try:
            await coordinator.api.add_delivery(payload)
        except ParcelError as err:
            raise HomeAssistantError(f"Parcel: {err}") from err
        await coordinator.async_request_refresh()

    async def refresh(call: ServiceCall) -> None:
        await _get_coordinator(hass, call.data.get(ATTR_CONFIG_ENTRY_ID)).async_request_refresh()

    hass.services.async_register(DOMAIN, SERVICE_ADD_DELIVERY, add_delivery, ADD_DELIVERY_SCHEMA)
    hass.services.async_register(DOMAIN, SERVICE_REFRESH, refresh, REFRESH_SCHEMA)
    return True


async def async_setup_entry(hass: HomeAssistant, entry: ParcelConfigEntry) -> bool:
    api = ParcelApi(async_get_clientsession(hass), entry.data[CONF_API_KEY])
    coordinator = ParcelCoordinator(hass, entry, api)
    await coordinator.async_config_entry_first_refresh()
    entry.runtime_data = coordinator
    await hass.config_entries.async_forward_entry_setups(entry, PLATFORMS)
    entry.async_on_unload(entry.add_update_listener(_async_reload))
    return True


async def async_unload_entry(hass: HomeAssistant, entry: ParcelConfigEntry) -> bool:
    return await hass.config_entries.async_unload_platforms(entry, PLATFORMS)


async def _async_reload(hass: HomeAssistant, entry: ParcelConfigEntry) -> None:
    await hass.config_entries.async_reload(entry.entry_id)


def _loaded_entries(hass: HomeAssistant) -> list[ParcelConfigEntry]:
    return [
        e
        for e in hass.config_entries.async_entries(DOMAIN)
        if e.state is ConfigEntryState.LOADED
    ]


def _get_coordinator(hass: HomeAssistant, entry_id: str | None) -> ParcelCoordinator:
    entries = _loaded_entries(hass)
    if entry_id:
        entries = [e for e in entries if e.entry_id == entry_id]
    if not entries:
        raise ServiceValidationError("No Parcel account is loaded")
    if len(entries) > 1:
        raise ServiceValidationError(
            "Several Parcel accounts are configured: set config_entry_id"
        )
    return entries[0].runtime_data


@websocket_api.websocket_command(
    {vol.Required("type"): "parcel/carriers", vol.Optional("config_entry_id"): str}
)
@websocket_api.async_response
async def ws_carriers(
    hass: HomeAssistant, connection: websocket_api.ActiveConnection, msg: dict[str, Any]
) -> None:
    """Return the carriers Parcel supports, for the card's add form."""
    carriers: dict[str, str] = {}
    for entry in _loaded_entries(hass):
        if msg.get("config_entry_id") in (None, entry.entry_id):
            carriers.update(await entry.runtime_data.async_ensure_carriers())
    connection.send_result(msg["id"], {"carriers": carriers})

