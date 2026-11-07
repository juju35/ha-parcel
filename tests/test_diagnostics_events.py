"""Diagnostics redaction and the status transition events."""

import copy
import json

import pytest
from homeassistant.const import CONF_API_KEY
from homeassistant.core import HomeAssistant
from homeassistant.setup import async_setup_component
from pytest_homeassistant_custom_component.common import MockConfigEntry, async_capture_events
from pytest_homeassistant_custom_component.components.diagnostics import get_diagnostics_for_config_entry

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


async def test_diagnostics_redacts_secrets_and_personal_data(hass, aioclient_mock, entry, hass_client):
    await _setup(hass, aioclient_mock, entry, _deliveries())
    diag = await get_diagnostics_for_config_entry(hass, hass_client, entry)

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
