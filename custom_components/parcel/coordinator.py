"""Data update coordinator for Parcel."""

from __future__ import annotations

from datetime import timedelta
import logging
from typing import Any

from homeassistant.config_entries import ConfigEntry
from homeassistant.core import HomeAssistant
from homeassistant.exceptions import ConfigEntryAuthFailed
from homeassistant.helpers.storage import Store
from homeassistant.helpers.update_coordinator import DataUpdateCoordinator, UpdateFailed
from homeassistant.util import dt as dt_util

from .api import ParcelApi, ParcelAuthError, ParcelError, ParcelRateLimitError
from .const import (
    CARRIERS_REFRESH,
    CONF_FILTER_MODE,
    CONF_SCAN_INTERVAL,
    DEFAULT_FILTER_MODE,
    DEFAULT_SCAN_INTERVAL,
    DOMAIN,
    MIN_SCAN_INTERVAL,
)

_LOGGER = logging.getLogger(__name__)

type ParcelConfigEntry = ConfigEntry[ParcelCoordinator]


def delivery_key(delivery: dict[str, Any]) -> str:
    """Identify a delivery: the same tracking number can exist at two carriers."""
    return f"{delivery.get('carrier_code') or ''}:{delivery.get('tracking_number') or ''}"


class ParcelCoordinator(DataUpdateCoordinator[list[dict[str, Any]]]):
    """Poll the Parcel deliveries endpoint."""

    config_entry: ParcelConfigEntry

    def __init__(self, hass: HomeAssistant, entry: ParcelConfigEntry, api: ParcelApi) -> None:
        minutes = max(
            MIN_SCAN_INTERVAL, int(entry.options.get(CONF_SCAN_INTERVAL, DEFAULT_SCAN_INTERVAL))
        )
        super().__init__(
            hass,
            _LOGGER,
            config_entry=entry,
            name=DOMAIN,
            update_interval=timedelta(minutes=minutes),
        )
        self.api = api
        self.filter_mode: str = entry.options.get(CONF_FILTER_MODE, DEFAULT_FILTER_MODE)
        self.carriers: dict[str, str] = {}
        self._carriers_updated = None
        # The Parcel API cannot delete deliveries: hidden ones are only filtered out in Home Assistant.
        self.hidden: set[str] = set()
        self._store: Store[list[str]] = Store(hass, 1, f"{DOMAIN}.{entry.entry_id}.hidden")

    async def async_load_hidden(self) -> None:
        self.hidden = set(await self._store.async_load() or [])

    async def async_hide(self, keys: set[str]) -> None:
        self.hidden |= keys
        await self._store.async_save(sorted(self.hidden))
        self.async_update_listeners()

    async def async_unhide_all(self) -> None:
        self.hidden = set()
        await self._store.async_save([])
        self.async_update_listeners()

    def visible(self) -> list[dict[str, Any]]:
        return [d for d in self.data or [] if delivery_key(d) not in self.hidden]

    async def _async_update_data(self) -> list[dict[str, Any]]:
        try:
            deliveries = await self.api.get_deliveries(self.filter_mode)
        except ParcelAuthError as err:
            raise ConfigEntryAuthFailed(str(err)) from err
        except ParcelRateLimitError as err:
            raise UpdateFailed(f"Parcel rate limit reached, will retry later: {err}") from err
        except ParcelError as err:
            raise UpdateFailed(str(err)) from err

        await self.async_ensure_carriers()
        # Forget hidden deliveries Parcel no longer returns, so the list does not grow forever.
        present = {delivery_key(d) for d in deliveries}
        if self.hidden - present:
            self.hidden &= present
            self._store.async_delay_save(lambda: sorted(self.hidden), 1)
        return deliveries

    async def async_ensure_carriers(self) -> dict[str, str]:
        """Load the carriers list at most once a day; keep the old one on failure."""
        now = dt_util.utcnow()
        if self.carriers and self._carriers_updated and now - self._carriers_updated < CARRIERS_REFRESH:
            return self.carriers
        try:
            self.carriers = await self.api.get_carriers()
            self._carriers_updated = now
        except ParcelError as err:
            _LOGGER.warning("Could not load Parcel carriers: %s", err)
        return self.carriers
