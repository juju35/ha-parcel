"""The deliveries calendar: one event per active delivery with an expected date."""

from datetime import date, datetime, timedelta

import pytest
from freezegun.api import FrozenDateTimeFactory
from homeassistant.const import CONF_API_KEY
from homeassistant.core import HomeAssistant
from homeassistant.setup import async_setup_component
from homeassistant.util import dt as dt_util
from pytest_homeassistant_custom_component.common import MockConfigEntry

from custom_components.parcel.calendar import delivery_event
from custom_components.parcel.const import API_CARRIERS, API_DELIVERIES, DOMAIN

CARRIERS = {"colissimo": "Colissimo", "ups": "UPS", "dhl": "DHL", "dpd": "DPD"}
DELIVERIES = {
    "success": True,
    "deliveries": [
        # All-day: a date without time.
        {"carrier_code": "colissimo", "description": "Casque", "status_code": 2, "tracking_number": "6A1",
         "date_expected": "2026-11-10 00:00:00"},
        # Timed window from the timestamps.
        {"carrier_code": "dhl", "description": "Lampe", "status_code": 4, "tracking_number": "JD2",
         "timestamp_expected": 1794304800, "timestamp_expected_end": 1794312000},
        # Delivered: no event.
        {"carrier_code": "ups", "description": "Livres", "status_code": 0, "tracking_number": "1Z3",
         "date_expected": "2026-11-09 00:00:00"},
        # No expected date: no event.
        {"carrier_code": "dpd", "description": "Chargeur", "status_code": 8, "tracking_number": "DP4"},
    ],
}  # fmt: skip


@pytest.fixture
def entry(hass: HomeAssistant) -> MockConfigEntry:
    entry = MockConfigEntry(domain=DOMAIN, data={CONF_API_KEY: "secret"}, unique_id="x")
    entry.add_to_hass(hass)
    return entry


async def _setup(hass, aioclient_mock, entry):
    aioclient_mock.get(API_DELIVERIES, json=DELIVERIES)
    aioclient_mock.get(API_CARRIERS, json=CARRIERS)
    assert await async_setup_component(hass, "http", {})
    assert await hass.config_entries.async_setup(entry.entry_id)
    await hass.async_block_till_done()


async def _events(hass, start, end):
    response = await hass.services.async_call(
        "calendar",
        "get_events",
        {"entity_id": "calendar.parcel_deliveries", "start_date_time": start, "end_date_time": end},
        blocking=True,
        return_response=True,
    )
    return {e["summary"]: e for e in response["calendar.parcel_deliveries"]["events"]}


async def test_calendar_events(hass, aioclient_mock, entry, freezer: FrozenDateTimeFactory):
    await hass.config.async_set_time_zone("Europe/Paris")
    freezer.move_to("2026-11-08 12:00:00+01:00")
    await _setup(hass, aioclient_mock, entry)

    state = hass.states.get("calendar.parcel_deliveries")
    assert state is not None
    # The next one: the all-day delivery of the 10th (it starts at midnight, before the timed one at 11:00).
    assert state.attributes["message"] == "Casque"
    assert state.attributes["all_day"] is True
    assert state.state == "off"

    events = await _events(hass, "2026-11-01T00:00:00+00:00", "2026-11-30T00:00:00+00:00")
    assert set(events) == {"Casque", "Lampe"}
    assert (events["Casque"]["start"], events["Casque"]["end"]) == ("2026-11-10", "2026-11-11")
    assert events["Casque"]["description"] == "Colissimo"
    assert dt_util.parse_datetime(events["Lampe"]["start"]) == dt_util.utc_from_timestamp(1794304800)
    assert dt_util.parse_datetime(events["Lampe"]["end"]) == dt_util.utc_from_timestamp(1794312000)
    # No tracking number in the calendar.
    assert all("6A1" not in str(e) and "JD2" not in str(e) for e in events.values())

    # Outside the requested range: nothing.
    assert await _events(hass, "2026-12-01T00:00:00+00:00", "2026-12-31T00:00:00+00:00") == {}


async def test_calendar_event_is_on_during_the_day(hass, aioclient_mock, entry, freezer: FrozenDateTimeFactory):
    await hass.config.async_set_time_zone("Europe/Paris")
    freezer.move_to("2026-11-10 09:00:00+01:00")
    await _setup(hass, aioclient_mock, entry)
    state = hass.states.get("calendar.parcel_deliveries")
    assert state.state == "on"
    assert state.attributes["message"] == "Casque"


async def test_delivery_event_variants(hass):
    await hass.config.async_set_time_zone("Europe/Paris")
    tz = dt_util.get_default_time_zone()
    # A timed date without timestamp is in Home Assistant's time zone, one hour long without an end.
    event = delivery_event({"description": "A", "status_code": 2, "date_expected": "2026-11-10 14:30:00"}, {})
    assert event.start == datetime(2026, 11, 10, 14, 30, tzinfo=tz)
    assert event.end == event.start + timedelta(hours=1)
    # A window over several days: all-day, the end date exclusive.
    event = delivery_event(
        {
            "description": "B",
            "status_code": 2,
            "date_expected": "2026-11-10",
            "date_expected_end": "2026-11-12 00:00:00",
        },
        {},
    )
    assert (event.start, event.end) == (date(2026, 11, 10), date(2026, 11, 13))
    # No description: the carrier name; unparsable date: no event.
    event = delivery_event({"carrier_code": "ups", "status_code": 2, "date_expected": "2026-11-10"}, {"ups": "UPS"})
    assert event.summary == "UPS"
    assert delivery_event({"status_code": 2, "date_expected": "soon"}, {}) is None
    # The same uid as the events' tracking_id, never the tracking number.
    event = delivery_event({"tracking_number": "6A1", "status_code": 2, "date_expected": "2026-11-10"}, {})
    assert "6A1" not in event.uid and len(event.uid) == 12
