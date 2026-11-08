"""Data update coordinator for Parcel."""

from __future__ import annotations

import hashlib
import logging
from datetime import datetime, timedelta
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
    EVENT_DELIVERED,
    EVENT_OUT_FOR_DELIVERY,
    FILTER_ACTIVE,
    MIN_SCAN_INTERVAL,
    STATUS_COMPLETED,
    STATUS_OUT_FOR_DELIVERY,
)

TRANSITION_EVENTS = {STATUS_OUT_FOR_DELIVERY: EVENT_OUT_FOR_DELIVERY, STATUS_COMPLETED: EVENT_DELIVERED}

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
        self._carriers_updated: datetime | None = None
        # Last known deliveries by key; None until the first successful update, so nothing fires at startup.
        self._known: dict[str, dict[str, Any]] | None = None
        # Active filter: undelivered deliveries missing from the last successful update, delivered if still missing
        # at the next one; and whether the last reply was an empty list.
        self._missing: dict[str, dict[str, Any]] = {}
        self._empty_reply = False
        # Set while Parcel fails (rate limit, timeout, server error) and the last deliveries are kept: the sensor shows
        # it in its `stale` / `last_error` attributes and the refresh service reports it.
        self.last_error: ParcelError | None = None

    async def _async_update_data(self) -> list[dict[str, Any]]:
        try:
            deliveries = await self.api.get_deliveries(self.filter_mode)
        except ParcelAuthError as err:
            raise ConfigEntryAuthFailed(str(err)) from err
        except ParcelError as err:
            if self.data is None:
                if isinstance(err, ParcelRateLimitError):
                    raise UpdateFailed(f"Parcel rate limit reached, will retry later: {err}") from err
                raise UpdateFailed(str(err)) from err
            # A transient failure (rate limit, timeout, 5xx) only delays the next update: keep showing the last
            # deliveries instead of going unavailable.
            _LOGGER.warning("Parcel update failed, keeping the last deliveries until the next update: %s", err)
            self.last_error = err
            return self.data

        self.last_error = None

        await self.async_ensure_carriers()
        self._fire_transitions(deliveries)
        return deliveries

    def _fire_transitions(self, deliveries: list[dict[str, Any]]) -> None:
        """Fire parcel_out_for_delivery / parcel_delivered for deliveries whose status just changed to it.

        With the `active` filter, Parcel drops a delivery from the list once delivered: a delivery that was
        active and is gone from two successful updates in a row fires parcel_delivered.
        """
        current = {_delivery_key(d): d for d in deliveries}
        previous = self._known
        if previous and not current and self.filter_mode == FILTER_ACTIVE and not self._empty_reply:
            # An empty list right after a non-empty one is more likely a glitch of the API than every parcel
            # delivered at once: ignore it (statuses and pending disappearances kept). A second empty reply counts.
            self._empty_reply = True
            return
        self._empty_reply = not current
        self._known = current
        if previous is None:
            return
        for key, delivery in current.items():
            status = delivery.get("status_code")
            # A delivery seen for the first time is not a transition: it may have been delivered long ago.
            if key not in previous or previous[key].get("status_code") == status or status not in TRANSITION_EVENTS:
                continue
            self._fire(TRANSITION_EVENTS[status], delivery)
        if self.filter_mode != FILTER_ACTIVE:
            return
        # Missing once: pending. Still missing at the next successful update: delivered. Back in the list: forgotten.
        for delivery in (d for key, d in self._missing.items() if key not in current):
            self._fire(EVENT_DELIVERED, delivery)
        self._missing = {
            key: delivery
            for key, delivery in previous.items()
            if key not in current and delivery.get("status_code") != STATUS_COMPLETED
        }

    def _fire(self, event: str, delivery: dict[str, Any]) -> None:
        code = delivery.get("carrier_code") or ""
        self.hass.bus.async_fire(
            event,
            {
                "config_entry_id": self.config_entry.entry_id,
                "carrier_code": code,
                "carrier": self.carriers.get(code, code),
                "name": delivery.get("description"),
                # A stable id for automations, not the tracking number: events end up in the recorder and logbook.
                "tracking_id": tracking_id(delivery),
            },
        )

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


def _delivery_key(delivery: dict[str, Any]) -> str:
    return f"{delivery.get('carrier_code') or ''}:{delivery.get('tracking_number') or ''}"


def tracking_id(delivery: dict[str, Any]) -> str:
    """Stable short id of a delivery (carrier and tracking number hashed), safe to store in the recorder."""
    return hashlib.sha256(_delivery_key(delivery).encode()).hexdigest()[:12]
