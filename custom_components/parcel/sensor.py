"""Sensor exposing the Parcel deliveries."""

from __future__ import annotations

from typing import Any

from homeassistant.components.sensor import SensorEntity, SensorStateClass
from homeassistant.core import HomeAssistant
from homeassistant.helpers.entity_platform import AddEntitiesCallback

from .const import STATUS_COMPLETED, STATUS_KEYS
from .coordinator import ParcelConfigEntry, ParcelCoordinator
from .entity import ParcelEntity


async def async_setup_entry(
    hass: HomeAssistant, entry: ParcelConfigEntry, async_add_entities: AddEntitiesCallback
) -> None:
    async_add_entities([ParcelDeliveriesSensor(entry.runtime_data)])


def _format_delivery(delivery: dict[str, Any], carriers: dict[str, str]) -> dict[str, Any]:
    code = delivery.get("carrier_code") or ""
    status = delivery.get("status_code")
    events = delivery.get("events") or []
    return {
        "tracking_number": delivery.get("tracking_number"),
        "description": delivery.get("description"),
        "carrier_code": code,
        "carrier_name": carriers.get(code, code),
        "status_code": status,
        "status": STATUS_KEYS.get(status, "unknown"),
        "date_expected": delivery.get("date_expected"),
        "date_expected_end": delivery.get("date_expected_end"),
        "timestamp_expected": delivery.get("timestamp_expected"),
        "timestamp_expected_end": delivery.get("timestamp_expected_end"),
        "extra_information": delivery.get("extra_information"),
        "events": [e for e in events if isinstance(e, dict)],
    }


class ParcelDeliveriesSensor(ParcelEntity, SensorEntity):
    """Number of deliveries not yet delivered, with every delivery in the attributes."""

    _attr_state_class = SensorStateClass.MEASUREMENT
    # The list changes on every poll and can be large: keep it out of the recorder.
    _unrecorded_attributes = frozenset({"deliveries"})

    def __init__(self, coordinator: ParcelCoordinator) -> None:
        super().__init__(coordinator, "deliveries")

    @property
    def native_value(self) -> int:
        return sum(1 for d in self.coordinator.data or [] if d.get("status_code") != STATUS_COMPLETED)

    @property
    def extra_state_attributes(self) -> dict[str, Any]:
        carriers = self.coordinator.carriers
        return {
            "config_entry_id": self.coordinator.config_entry.entry_id,
            "filter_mode": self.coordinator.filter_mode,
            # True while the last update failed and the deliveries are the ones of the update before.
            "stale": self.coordinator.last_error is not None,
            "last_error": str(self.coordinator.last_error) if self.coordinator.last_error else None,
            "deliveries": [_format_delivery(d, carriers) for d in self.coordinator.data or []],
        }
