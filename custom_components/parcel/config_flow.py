"""Config flow for Parcel."""

from __future__ import annotations

import hashlib
from collections.abc import Mapping
from typing import Any

import voluptuous as vol
from homeassistant.config_entries import ConfigEntry, ConfigEntryState, ConfigFlow, ConfigFlowResult, OptionsFlow
from homeassistant.const import CONF_API_KEY
from homeassistant.core import callback
from homeassistant.helpers.aiohttp_client import async_get_clientsession
from homeassistant.helpers.selector import (
    NumberSelector,
    NumberSelectorConfig,
    NumberSelectorMode,
    SelectSelector,
    SelectSelectorConfig,
    SelectSelectorMode,
    TextSelector,
    TextSelectorConfig,
    TextSelectorType,
)

from .api import ParcelApi, ParcelAuthError, ParcelError
from .const import (
    CONF_FILTER_MODE,
    CONF_SCAN_INTERVAL,
    DEFAULT_FILTER_MODE,
    DEFAULT_SCAN_INTERVAL,
    DOMAIN,
    FILTER_ACTIVE,
    FILTER_RECENT,
    MIN_SCAN_INTERVAL,
)

API_KEY_SCHEMA = vol.Schema(
    {vol.Required(CONF_API_KEY): TextSelector(TextSelectorConfig(type=TextSelectorType.PASSWORD))}
)


def _unique_id(api_key: str) -> str:
    # Never store the key itself as the unique id: it shows up in diagnostics and logs.
    return hashlib.sha256(api_key.encode()).hexdigest()[:16]


class ParcelConfigFlow(ConfigFlow, domain=DOMAIN):
    """Handle a config flow for Parcel."""

    VERSION = 1

    async def _validate(self, api_key: str) -> str | None:
        api = ParcelApi(async_get_clientsession(self.hass), api_key)
        try:
            await api.get_deliveries(FILTER_ACTIVE)
        except ParcelAuthError:
            return "invalid_auth"
        except ParcelError:
            return "cannot_connect"
        return None

    async def async_step_user(self, user_input: dict[str, Any] | None = None) -> ConfigFlowResult:
        errors: dict[str, str] = {}
        if user_input is not None:
            api_key = user_input[CONF_API_KEY].strip()
            await self.async_set_unique_id(_unique_id(api_key))
            self._abort_if_unique_id_configured()
            if (error := await self._validate(api_key)) is None:
                return self.async_create_entry(title="Parcel", data={CONF_API_KEY: api_key})
            errors["base"] = error

        return self.async_show_form(step_id="user", data_schema=API_KEY_SCHEMA, errors=errors)

    async def async_step_reauth(self, entry_data: Mapping[str, Any]) -> ConfigFlowResult:
        return await self.async_step_reauth_confirm()

    async def async_step_reauth_confirm(self, user_input: dict[str, Any] | None = None) -> ConfigFlowResult:
        errors: dict[str, str] = {}
        if user_input is not None:
            api_key = user_input[CONF_API_KEY].strip()
            entry = self._get_reauth_entry()
            # Another entry with this key would poll the same account and share its 20 calls per hour.
            other = self.hass.config_entries.async_entry_for_domain_unique_id(DOMAIN, _unique_id(api_key))
            if other is not None and other.entry_id != entry.entry_id:
                errors["base"] = "already_configured"
            elif (error := await self._validate(api_key)) is None:
                # A changed loaded entry is reloaded by its update listener; async_update_reload_and_abort
                # would reload it a second time (each reload costs a call of the 20 per hour).
                # Reload here only when that listener does not run.
                loaded = entry.state is ConfigEntryState.LOADED
                changed = self.hass.config_entries.async_update_entry(
                    entry, unique_id=_unique_id(api_key), data={CONF_API_KEY: api_key}
                )
                if not (loaded and changed):
                    self.hass.config_entries.async_schedule_reload(entry.entry_id)
                return self.async_abort(reason="reauth_successful")
            else:
                errors["base"] = error

        return self.async_show_form(step_id="reauth_confirm", data_schema=API_KEY_SCHEMA, errors=errors)

    @staticmethod
    @callback
    def async_get_options_flow(config_entry: ConfigEntry) -> OptionsFlow:
        return ParcelOptionsFlow()


class ParcelOptionsFlow(OptionsFlow):
    """Polling interval and which deliveries to fetch."""

    async def async_step_init(self, user_input: dict[str, Any] | None = None) -> ConfigFlowResult:
        if user_input is not None:
            user_input[CONF_SCAN_INTERVAL] = int(user_input[CONF_SCAN_INTERVAL])
            return self.async_create_entry(data=user_input)

        options = self.config_entry.options
        schema = vol.Schema(
            {
                vol.Required(
                    CONF_FILTER_MODE, default=options.get(CONF_FILTER_MODE, DEFAULT_FILTER_MODE)
                ): SelectSelector(
                    SelectSelectorConfig(
                        options=[FILTER_RECENT, FILTER_ACTIVE],
                        mode=SelectSelectorMode.LIST,
                        translation_key=CONF_FILTER_MODE,
                    )
                ),
                vol.Required(
                    CONF_SCAN_INTERVAL,
                    default=options.get(CONF_SCAN_INTERVAL, DEFAULT_SCAN_INTERVAL),
                ): NumberSelector(
                    NumberSelectorConfig(
                        min=MIN_SCAN_INTERVAL,
                        max=180,
                        step=1,
                        unit_of_measurement="min",
                        mode=NumberSelectorMode.BOX,
                    )
                ),
            }
        )
        return self.async_show_form(step_id="init", data_schema=schema)
