"""Calendar of the expected deliveries: one event per delivery not yet delivered."""

from __future__ import annotations

from datetime import date, datetime, time, timedelta
from typing import Any

from homeassistant.components.calendar import CalendarEntity, CalendarEvent
from homeassistant.core import HomeAssistant
from homeassistant.helpers.entity_platform import AddEntitiesCallback
from homeassistant.util import dt as dt_util

from .const import STATUS_COMPLETED
from .coordinator import ParcelConfigEntry, ParcelCoordinator, tracking_id
from .entity import ParcelEntity

# A delivery expected at a time with no end gets a one-hour event.
TIMED_EVENT_LENGTH = timedelta(hours=1)


async def async_setup_entry(
    hass: HomeAssistant, entry: ParcelConfigEntry, async_add_entities: AddEntitiesCallback
) -> None:
    async_add_entities([ParcelCalendar(entry.runtime_data)])


def _expected(timestamp: Any, raw: Any) -> datetime | date | None:
    """When a delivery is expected: a datetime from the timestamp or a timed date, a date for a day without time."""
    if timestamp not in (None, ""):
        try:
            return dt_util.utc_from_timestamp(float(timestamp))
        except (TypeError, ValueError, OverflowError, OSError):
            pass
    text = str(raw or "").strip()
    if not text:
        return None
    parsed = dt_util.parse_datetime(text)
    if parsed is None:
        return dt_util.parse_date(text)
    if parsed.tzinfo is None:
        # Parcel gives "2026-10-20 00:00:00" for a day without time: an all-day event.
        if parsed.time() == time.min:
            return parsed.date()
        return parsed.replace(tzinfo=dt_util.get_default_time_zone())
    return parsed


def _local_date(value: datetime | date) -> date:
    return dt_util.as_local(value).date() if isinstance(value, datetime) else value


def delivery_event(delivery: dict[str, Any], carriers: dict[str, str]) -> CalendarEvent | None:
    """The calendar event of a delivery not yet delivered, or None without an expected date."""
    if delivery.get("status_code") == STATUS_COMPLETED:
        return None
    start = _expected(delivery.get("timestamp_expected"), delivery.get("date_expected"))
    if start is None:
        return None
    end = _expected(delivery.get("timestamp_expected_end"), delivery.get("date_expected_end"))
    if isinstance(start, datetime):
        if not isinstance(end, datetime) or end <= start:
            end = start + TIMED_EVENT_LENGTH
    else:
        # All-day: the end date is exclusive, so a window ending on the 22nd ends on the 23rd.
        last = _local_date(end) if end is not None else start
        end = max(last, start) + timedelta(days=1)
    code = delivery.get("carrier_code") or ""
    carrier = carriers.get(code, code)
    return CalendarEvent(
        start=start,
        end=end,
        summary=delivery.get("description") or carrier or "Parcel",
        description=carrier or None,
        # Not the tracking number: calendar events can be shared and logged.
        uid=tracking_id(delivery),
    )


class ParcelCalendar(ParcelEntity, CalendarEntity):
    """Expected deliveries: all-day when Parcel gives no time."""

    def __init__(self, coordinator: ParcelCoordinator) -> None:
        super().__init__(coordinator, "deliveries")

    def _events(self) -> list[CalendarEvent]:
        carriers = self.coordinator.carriers
        events = [e for d in self.coordinator.data or [] if (e := delivery_event(d, carriers))]
        return sorted(events, key=lambda e: e.start_datetime_local)

    @property
    def event(self) -> CalendarEvent | None:
        """The current or next expected delivery."""
        now = dt_util.now()
        return next((e for e in self._events() if e.end_datetime_local > now), None)

    async def async_get_events(
        self, hass: HomeAssistant, start_date: datetime, end_date: datetime
    ) -> list[CalendarEvent]:
        return [e for e in self._events() if e.start_datetime_local < end_date and e.end_datetime_local > start_date]
