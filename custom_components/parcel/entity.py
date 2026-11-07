"""Base entity of the Parcel integration: one service device per account."""

from __future__ import annotations

from homeassistant.helpers.device_registry import DeviceEntryType, DeviceInfo
from homeassistant.helpers.update_coordinator import CoordinatorEntity

from .const import DOMAIN
from .coordinator import ParcelCoordinator


class ParcelEntity(CoordinatorEntity[ParcelCoordinator]):
    """An entity of a Parcel account, attached to its device."""

    _attr_has_entity_name = True

    def __init__(self, coordinator: ParcelCoordinator, key: str) -> None:
        super().__init__(coordinator)
        entry = coordinator.config_entry
        self._attr_translation_key = key
        self._attr_unique_id = f"{entry.entry_id}_{key}"
        self._attr_device_info = DeviceInfo(
            identifiers={(DOMAIN, entry.entry_id)},
            name="Parcel",
            manufacturer="Parcel",
            entry_type=DeviceEntryType.SERVICE,
            configuration_url="https://web.parcelapp.net",
        )
