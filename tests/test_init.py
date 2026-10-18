"""Tests for the Parcel integration."""

from unittest.mock import patch

import pytest
from pytest_homeassistant_custom_component.common import MockConfigEntry

from homeassistant.config_entries import ConfigEntryState
from homeassistant.const import CONF_API_KEY
from homeassistant.core import HomeAssistant
from homeassistant.data_entry_flow import FlowResultType
from homeassistant.exceptions import HomeAssistantError
from homeassistant.setup import async_setup_component

from custom_components.parcel.const import (
    API_ADD_DELIVERY,
    API_CARRIERS,
    API_DELIVERIES,
    DOMAIN,
)

DELIVERIES = {
    "success": True,
    "deliveries": [
        {
            "carrier_code": "colissimo",
            "description": "Casque",
            "status_code": 2,
            "tracking_number": "6A123",
            "date_expected": "2026-10-20 00:00:00",
            "events": [{"event": "En cours d'acheminement", "date": "18/10 08:12", "location": "Rennes"}],
        },
        {
            "carrier_code": "ups",
            "description": "Livres",
            "status_code": 0,
            "tracking_number": "1Z999",
            "events": [],
        },
    ],
}
CARRIERS = {"colissimo": "Colissimo", "ups": "UPS"}


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


async def test_sensor(hass, aioclient_mock, entry):
    await _setup(hass, aioclient_mock, entry)
    assert entry.state is ConfigEntryState.LOADED
    state = hass.states.get("sensor.parcel_deliveries")
    assert state is not None
    assert state.state == "1"
    first = state.attributes["deliveries"][0]
    assert first["carrier_name"] == "Colissimo"
    assert first["status"] == "in_transit"
    assert state.attributes["config_entry_id"] == entry.entry_id
    # The API key goes in the header, never in the URL.
    _, url, _, headers = aioclient_mock.mock_calls[0]
    assert headers["api-key"] == "secret"
    assert "secret" not in str(url)


async def test_add_delivery(hass, aioclient_mock, entry):
    await _setup(hass, aioclient_mock, entry)
    aioclient_mock.post(API_ADD_DELIVERY, json={"success": True})
    await hass.services.async_call(
        DOMAIN,
        "add_delivery",
        {"tracking_number": " ABC ", "carrier_code": "ups", "description": "Test"},
        blocking=True,
    )
    call = [c for c in aioclient_mock.mock_calls if str(c[1]) == API_ADD_DELIVERY][0]
    assert call[2] == {
        "tracking_number": "ABC",
        "carrier_code": "ups",
        "description": "Test",
        "language": "en",
        "send_push_confirmation": False,
    }


async def test_add_delivery_error(hass, aioclient_mock, entry):
    await _setup(hass, aioclient_mock, entry)
    aioclient_mock.post(
        API_ADD_DELIVERY, json={"success": False, "error_message": "Invalid tracking number"}
    )
    with pytest.raises(HomeAssistantError, match="Invalid tracking number"):
        await hass.services.async_call(
            DOMAIN,
            "add_delivery",
            {"tracking_number": "x", "carrier_code": "ups", "description": "Test"},
            blocking=True,
        )


async def test_ws_carriers(hass, aioclient_mock, entry, hass_ws_client):
    await _setup(hass, aioclient_mock, entry)
    client = await hass_ws_client(hass)
    await client.send_json({"id": 1, "type": "parcel/carriers"})
    msg = await client.receive_json()
    assert msg["success"]
    assert msg["result"]["carriers"] == CARRIERS


async def test_card_served(hass, aioclient_mock, entry, hass_client):
    await _setup(hass, aioclient_mock, entry)
    client = await hass_client()
    resp = await client.get("/parcel_static/parcel-card.js")
    assert resp.status == 200
    assert "customElements.define('parcel-card'" in await resp.text()


async def test_auth_failure_starts_reauth(hass, aioclient_mock, entry):
    aioclient_mock.get(API_DELIVERIES, status=401, json={"success": False})
    assert await async_setup_component(hass, "http", {})
    await hass.config_entries.async_setup(entry.entry_id)
    await hass.async_block_till_done()
    assert entry.state is ConfigEntryState.SETUP_ERROR
    assert any(f["context"]["source"] == "reauth" for f in hass.config_entries.flow.async_progress())


async def test_config_flow(hass, aioclient_mock):
    aioclient_mock.get(API_DELIVERIES, json=DELIVERIES)
    aioclient_mock.get(API_CARRIERS, json=CARRIERS)
    result = await hass.config_entries.flow.async_init(DOMAIN, context={"source": "user"})
    assert result["type"] is FlowResultType.FORM
    with patch("custom_components.parcel.async_setup_entry", return_value=True):
        result = await hass.config_entries.flow.async_configure(
            result["flow_id"], {CONF_API_KEY: " my-key "}
        )
    assert result["type"] is FlowResultType.CREATE_ENTRY
    assert result["data"] == {CONF_API_KEY: "my-key"}
    assert result["result"].unique_id != "my-key"


async def test_config_flow_invalid_key(hass, aioclient_mock):
    aioclient_mock.get(API_DELIVERIES, json={"success": False, "error_message": "Invalid API key"})
    result = await hass.config_entries.flow.async_init(DOMAIN, context={"source": "user"})
    result = await hass.config_entries.flow.async_configure(result["flow_id"], {CONF_API_KEY: "bad"})
    assert result["type"] is FlowResultType.FORM
    assert result["errors"] == {"base": "invalid_auth"}


async def test_options_flow(hass, aioclient_mock, entry):
    await _setup(hass, aioclient_mock, entry)
    result = await hass.config_entries.options.async_init(entry.entry_id)
    result = await hass.config_entries.options.async_configure(
        result["flow_id"], {"filter_mode": "active", "scan_interval": 15}
    )
    assert result["type"] is FlowResultType.CREATE_ENTRY
    await hass.async_block_till_done()
    assert entry.runtime_data.filter_mode == "active"
    assert entry.runtime_data.update_interval.total_seconds() == 900


async def test_card_added_to_resources(hass, aioclient_mock, entry, stub_frontend):
    assert await async_setup_component(hass, "lovelace", {})
    await _setup(hass, aioclient_mock, entry)
    await hass.async_block_till_done()
    resources = hass.data["lovelace"].resources
    urls = [item["url"] for item in resources.async_items()]
    assert len(urls) == 1
    assert urls[0].startswith("/parcel_static/parcel-card.js?v=")
    assert resources.async_items()[0]["type"] == "module"
    stub_frontend.assert_not_called()


async def test_card_resource_updated_not_duplicated(hass, aioclient_mock, entry):
    assert await async_setup_component(hass, "lovelace", {})
    resources = hass.data["lovelace"].resources
    await resources.async_load()
    resources.loaded = True
    await resources.async_create_item({"res_type": "module", "url": "/parcel_static/parcel-card.js?v=old"})
    await _setup(hass, aioclient_mock, entry)
    await hass.async_block_till_done()
    urls = [item["url"] for item in resources.async_items()]
    assert len(urls) == 1
    assert not urls[0].endswith("v=old")
