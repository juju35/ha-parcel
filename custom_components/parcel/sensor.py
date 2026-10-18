"""Sensor exposing the Parcel deliveries."""

from __future__ import annotations

from typing import Any

from homeassistant.components.sensor import SensorEntity, SensorStateClass
from homeassistant.core import HomeAssistant
from homeassistant.helpers.device_registry import DeviceEntryType, DeviceInfo
from homeassistant.helpers.entity_platform import AddEntitiesCallback
from homeassistant.helpers.update_coordinator import CoordinatorEntity

from .const import DOMAIN, STATUS_COMPLETED, STATUS_KEYS
from .coordinator import ParcelConfigEntry, ParcelCoordinator


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


class ParcelDeliveriesSensor(CoordinatorEntity[ParcelCoordinator], SensorEntity):
    """Number of deliveries not yet delivered, with every delivery in the attributes."""

    _attr_has_entity_name = True
    _attr_translation_key = "deliveries"
    _attr_state_class = SensorStateClass.MEASUREMENT
    # The list changes on every poll and can be large: keep it out of the recorder.
    _unrecorded_attributes = frozenset({"deliveries"})

    def __init__(self, coordinator: ParcelCoordinator) -> None:
        super().__init__(coordinator)
        entry = coordinator.config_entry
        self._attr_unique_id = f"{entry.entry_id}_deliveries"
        self._attr_device_info = DeviceInfo(
            identifiers={(DOMAIN, entry.entry_id)},
            name="Parcel",
            manufacturer="Parcel",
            entry_type=DeviceEntryType.SERVICE,
            configuration_url="https://web.parcelapp.net",
        )

    @property
    def native_value(self) -> int:
        return sum(1 for d in self.coordinator.data or [] if d.get("status_code") != STATUS_COMPLETED)

    @property
    def extra_state_attributes(self) -> dict[str, Any]:
        carriers = self.coordinator.carriers
        return {
            "config_entry_id": self.coordinator.config_entry.entry_id,
            "filter_mode": self.coordinator.filter_mode,
            "deliveries": [_format_delivery(d, carriers) for d in self.coordinator.data or []],
        }
