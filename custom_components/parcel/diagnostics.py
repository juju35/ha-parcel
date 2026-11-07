"""Diagnostics for Parcel: the config entry and the last deliveries, without anything personal."""

from __future__ import annotations

from typing import Any

from homeassistant.components.diagnostics import async_redact_data
from homeassistant.const import CONF_API_KEY, CONF_EMAIL
from homeassistant.core import HomeAssistant

from .coordinator import ParcelConfigEntry

# The API key, the tracking numbers, and what can hold an address or an email: event locations, the
# carrier's extra information (often the pickup point address), the add form's postcode and email.
TO_REDACT = {
    CONF_API_KEY,
    CONF_EMAIL,
    "unique_id",
    "tracking_number",
    "postcode",
    "address",
    "location",
    "additional",
    "extra_information",
}


async def async_get_config_entry_diagnostics(hass: HomeAssistant, entry: ParcelConfigEntry) -> dict[str, Any]:
    coordinator = entry.runtime_data
    return {
        "entry": async_redact_data(
            {"data": dict(entry.data), "options": dict(entry.options), "unique_id": entry.unique_id}, TO_REDACT
        ),
        "coordinator": {
            "filter_mode": coordinator.filter_mode,
            "update_interval": str(coordinator.update_interval),
            "last_update_success": coordinator.last_update_success,
            "carriers": len(coordinator.carriers),
            "deliveries": async_redact_data(coordinator.data or [], TO_REDACT),
        },
    }
