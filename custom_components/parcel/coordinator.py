"""Data update coordinator for Parcel."""

from __future__ import annotations

import logging
from datetime import timedelta
from typing import Any

from homeassistant.config_entries import ConfigEntry
from homeassistant.core import HomeAssistant
from homeassistant.exceptions import ConfigEntryAuthFailed
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


class ParcelCoordinator(DataUpdateCoordinator[list[dict[str, Any]]]):
    """Poll the Parcel deliveries endpoint."""

    config_entry: ParcelConfigEntry

    def __init__(self, hass: HomeAssistant, entry: ParcelConfigEntry, api: ParcelApi) -> None:
        minutes = max(MIN_SCAN_INTERVAL, int(entry.options.get(CONF_SCAN_INTERVAL, DEFAULT_SCAN_INTERVAL)))
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
