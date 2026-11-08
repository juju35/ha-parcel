"""Diagnostics redaction and the status transition events."""

import copy
import json

import pytest
from homeassistant.const import CONF_API_KEY
from homeassistant.core import HomeAssistant
from homeassistant.setup import async_setup_component
from pytest_homeassistant_custom_component.common import MockConfigEntry, async_capture_events

from custom_components.parcel.const import API_CARRIERS, API_DELIVERIES, DOMAIN

CARRIERS = {"colissimo": "Colissimo", "ups": "UPS", "dhl": "DHL"}


def _deliveries(colissimo=2, ups=2):
    return {
        "success": True,
        "deliveries": [
            {
                "carrier_code": "colissimo",
                "description": "Casque",
                "status_code": colissimo,
                "tracking_number": "6A12345678901",
                "extra_information": "Relais Pickup, 12 rue de la Paix, 35000 Rennes",
                "events": [
                    {
                        "event": "En cours d'acheminement",
                        "date": "18/10 08:12",
                        "location": "12 rue de la Paix, Rennes",
                        "additional": "Contact: me@example.org",
                    }
                ],
            },
            {"carrier_code": "ups", "description": "Livres", "status_code": ups, "tracking_number": "1Z999AA1"},
        ],
    }


@pytest.fixture
def entry(hass: HomeAssistant) -> MockConfigEntry:
    entry = MockConfigEntry(
        domain=DOMAIN, data={CONF_API_KEY: "secret-key"}, options={"filter_mode": "recent"}, unique_id="abc123"
    )
    entry.add_to_hass(hass)
    return entry


async def _setup(hass, aioclient_mock, entry, deliveries):
    aioclient_mock.get(API_DELIVERIES, json=deliveries)
    aioclient_mock.get(API_CARRIERS, json=CARRIERS)
    assert await async_setup_component(hass, "http", {})
    assert await hass.config_entries.async_setup(entry.entry_id)
    await hass.async_block_till_done()


async def _update(hass, aioclient_mock, entry, deliveries):
    aioclient_mock.clear_requests()
    aioclient_mock.get(API_DELIVERIES, json=deliveries)
    aioclient_mock.get(API_CARRIERS, json=CARRIERS)
    await entry.runtime_data.async_refresh()
    await hass.async_block_till_done()


async def _diagnostics(hass, hass_client, entry):
    # The pytest-homeassistant-custom-component diagnostics helper is missing from the version pinned to the
    # minimum Home Assistant (2024.12): ask the diagnostics API directly, as that helper does.
    assert await async_setup_component(hass, "diagnostics", {})
    await hass.async_block_till_done()
    client = await hass_client()
    response = await client.get(f"/api/diagnostics/config_entry/{entry.entry_id}")
    assert response.status == 200
    return (await response.json())["data"]


async def test_diagnostics_redacts_secrets_and_personal_data(hass, aioclient_mock, entry, hass_client):
    await _setup(hass, aioclient_mock, entry, _deliveries())
    diag = await _diagnostics(hass, hass_client, entry)

    text = json.dumps(diag)
    for secret in ("secret-key", "abc123", "6A12345678901", "1Z999AA1", "rue de la Paix", "me@example.org"):
        assert secret not in text, secret
    assert diag["entry"]["data"][CONF_API_KEY] == "**REDACTED**"
    assert diag["entry"]["options"] == {"filter_mode": "recent"}
    first = diag["coordinator"]["deliveries"][0]
    assert first["tracking_number"] == "**REDACTED**"
    assert first["extra_information"] == "**REDACTED**"
    assert first["events"][0]["location"] == "**REDACTED**"
    # What helps debugging stays: statuses, carriers, event texts.
    assert first["status_code"] == 2
    assert first["carrier_code"] == "colissimo"
    assert first["events"][0]["event"] == "En cours d'acheminement"
    assert diag["coordinator"]["carriers"] == 3
    assert diag["coordinator"]["last_update_success"] is True


async def test_status_transitions_fire_events(hass, aioclient_mock, entry):
    out = async_capture_events(hass, "parcel_out_for_delivery")
    delivered = async_capture_events(hass, "parcel_delivered")
    await _setup(hass, aioclient_mock, entry, _deliveries(colissimo=4, ups=0))
    # Startup is no transition, even for deliveries already out for delivery or delivered.
    assert not out and not delivered

    await _update(hass, aioclient_mock, entry, _deliveries(colissimo=4, ups=0))
    assert not out and not delivered

    await _update(hass, aioclient_mock, entry, _deliveries(colissimo=0, ups=0))
    assert not out
    assert len(delivered) == 1
    data = delivered[0].data
    assert data["config_entry_id"] == entry.entry_id
    assert data["carrier_code"] == "colissimo"
    assert data["carrier"] == "Colissimo"
    assert data["name"] == "Casque"
    # A stable id, never the tracking number itself.
    assert len(data["tracking_id"]) == 12
    assert "6A12345678901" not in json.dumps(data)


async def test_out_for_delivery_event_and_stable_tracking_id(hass, aioclient_mock, entry):
    out = async_capture_events(hass, "parcel_out_for_delivery")
    delivered = async_capture_events(hass, "parcel_delivered")
    await _setup(hass, aioclient_mock, entry, _deliveries(colissimo=2))
    await _update(hass, aioclient_mock, entry, _deliveries(colissimo=4))
    await _update(hass, aioclient_mock, entry, _deliveries(colissimo=0))
    assert [e.data["name"] for e in out] == ["Casque"]
    assert [e.data["name"] for e in delivered] == ["Casque"]
    assert out[0].data["tracking_id"] == delivered[0].data["tracking_id"]


async def test_no_event_for_a_new_delivery_or_after_a_failed_update(hass, aioclient_mock, entry):
    out = async_capture_events(hass, "parcel_out_for_delivery")
    delivered = async_capture_events(hass, "parcel_delivered")
    await _setup(hass, aioclient_mock, entry, _deliveries(colissimo=2))

    # A delivery seen for the first time, already out for delivery: not a transition.
    added = copy.deepcopy(_deliveries(colissimo=2))
    added["deliveries"].append(
        {"carrier_code": "dhl", "description": "Lampe", "status_code": 4, "tracking_number": "J1"}
    )
    await _update(hass, aioclient_mock, entry, added)
    assert not out

    # A failed update keeps the last known statuses: the next success still sees the transition, once.
    aioclient_mock.clear_requests()
    aioclient_mock.get(API_DELIVERIES, status=429, json={"success": False})
    await entry.runtime_data.async_refresh()
    await hass.async_block_till_done()
    delivered_dhl = copy.deepcopy(added)
    delivered_dhl["deliveries"][2]["status_code"] = 0
    await _update(hass, aioclient_mock, entry, delivered_dhl)
    await _update(hass, aioclient_mock, entry, delivered_dhl)
    assert [e.data["carrier"] for e in delivered] == ["DHL"]


async def test_active_filter_fires_delivered_when_a_delivery_leaves_the_list(hass, aioclient_mock):
    """With the active filter, Parcel drops delivered parcels: an active one missing from two successful updates
    in a row fires parcel_delivered."""
    entry = MockConfigEntry(
        domain=DOMAIN, data={CONF_API_KEY: "key"}, options={"filter_mode": "active"}, unique_id="active"
    )
    entry.add_to_hass(hass)
    delivered = async_capture_events(hass, "parcel_delivered")
    await _setup(hass, aioclient_mock, entry, _deliveries(colissimo=4, ups=2))
    assert not delivered

    only_ups = copy.deepcopy(_deliveries(colissimo=4, ups=2))
    only_ups["deliveries"] = only_ups["deliveries"][1:]
    # Missing once: not yet (a partial reply would otherwise fire a false "delivered").
    await _update(hass, aioclient_mock, entry, only_ups)
    assert not delivered
    # A failed update in between changes nothing; missing again at the next successful one: delivered.
    aioclient_mock.clear_requests()
    aioclient_mock.get(API_DELIVERIES, status=502, text="Bad gateway")
    await entry.runtime_data.async_refresh()
    await hass.async_block_till_done()
    assert not delivered
    await _update(hass, aioclient_mock, entry, only_ups)
    assert [e.data["name"] for e in delivered] == ["Casque"]
    assert delivered[0].data["carrier"] == "Colissimo"
    assert delivered[0].data["config_entry_id"] == entry.entry_id
    assert "6A12345678901" not in json.dumps(delivered[0].data)
    # Once only.
    await _update(hass, aioclient_mock, entry, only_ups)
    assert len(delivered) == 1

    # A delivery already delivered (event fired then) that leaves the list fires nothing more.
    ups_delivered = copy.deepcopy(only_ups)
    ups_delivered["deliveries"][0]["status_code"] = 0
    await _update(hass, aioclient_mock, entry, ups_delivered)
    assert [e.data["name"] for e in delivered] == ["Casque", "Livres"]
    await _update(hass, aioclient_mock, entry, {"success": True, "deliveries": []})
    await _update(hass, aioclient_mock, entry, {"success": True, "deliveries": []})
    await _update(hass, aioclient_mock, entry, {"success": True, "deliveries": []})
    assert len(delivered) == 2


async def test_active_filter_partial_or_empty_reply_fires_nothing(hass, aioclient_mock):
    """A delivery missing from a single reply, or a lone empty reply, is no delivery."""
    entry = MockConfigEntry(
        domain=DOMAIN, data={CONF_API_KEY: "key"}, options={"filter_mode": "active"}, unique_id="active"
    )
    entry.add_to_hass(hass)
    delivered = async_capture_events(hass, "parcel_delivered")
    both = _deliveries(colissimo=2, ups=2)
    await _setup(hass, aioclient_mock, entry, both)

    partial = copy.deepcopy(both)
    partial["deliveries"] = partial["deliveries"][:1]
    await _update(hass, aioclient_mock, entry, partial)
    await _update(hass, aioclient_mock, entry, both)
    empty = {"success": True, "deliveries": []}
    await _update(hass, aioclient_mock, entry, empty)
    await _update(hass, aioclient_mock, entry, both)
    await _update(hass, aioclient_mock, entry, empty)
    await _update(hass, aioclient_mock, entry, both)
    assert not delivered

    # Every parcel really delivered: the list stays empty, and the deliveries fire once that is confirmed.
    for _ in range(3):
        await _update(hass, aioclient_mock, entry, empty)
    assert sorted(e.data["name"] for e in delivered) == ["Casque", "Livres"]
    await _update(hass, aioclient_mock, entry, empty)
    assert len(delivered) == 2


async def test_recent_filter_ignores_a_delivery_leaving_the_list(hass, aioclient_mock, entry):
    """With the recent filter a delivery that leaves the list is old or removed, not newly delivered."""
    delivered = async_capture_events(hass, "parcel_delivered")
    await _setup(hass, aioclient_mock, entry, _deliveries(colissimo=2, ups=2))
    await _update(hass, aioclient_mock, entry, {"success": True, "deliveries": []})
    assert not delivered
