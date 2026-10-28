"""Tests for the Parcel integration."""

from types import SimpleNamespace
from unittest.mock import patch

import pytest
import voluptuous as vol
from homeassistant.config_entries import ConfigEntryState
from homeassistant.const import CONF_API_KEY
from homeassistant.core import HomeAssistant
from homeassistant.data_entry_flow import FlowResultType
from homeassistant.exceptions import HomeAssistantError
from homeassistant.setup import async_setup_component
from pytest_homeassistant_custom_component.common import MockConfigEntry

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


def _resources(hass):
    """The Lovelace resources collection: hass.data["lovelace"] is a dict before 2025.2, a dataclass after."""
    lovelace = hass.data["lovelace"]
    return lovelace["resources"] if isinstance(lovelace, dict) else lovelace.resources


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
    call = next(c for c in aioclient_mock.mock_calls if str(c[1]) == API_ADD_DELIVERY)
    assert call[2] == {
        "tracking_number": "ABC",
        "carrier_code": "ups",
        "description": "Test",
        "language": "en",
        "send_push_confirmation": False,
    }


async def test_add_delivery_error(hass, aioclient_mock, entry):
    await _setup(hass, aioclient_mock, entry)
    aioclient_mock.post(API_ADD_DELIVERY, json={"success": False, "error_message": "Invalid tracking number"})
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
        result = await hass.config_entries.flow.async_configure(result["flow_id"], {CONF_API_KEY: " my-key "})
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
    resources = _resources(hass)
    urls = [item["url"] for item in resources.async_items()]
    assert len(urls) == 1
    assert urls[0].startswith("/parcel_static/parcel-card.js?v=")
    assert resources.async_items()[0]["type"] == "module"
    stub_frontend.assert_not_called()


async def test_card_resource_updated_not_duplicated(hass, aioclient_mock, entry):
    assert await async_setup_component(hass, "lovelace", {})
    resources = _resources(hass)
    await resources.async_load()
    resources.loaded = True
    await resources.async_create_item({"res_type": "module", "url": "/parcel_static/parcel-card.js?v=old"})
    await _setup(hass, aioclient_mock, entry)
    await hass.async_block_till_done()
    urls = [item["url"] for item in resources.async_items()]
    assert len(urls) == 1
    assert not urls[0].endswith("v=old")


async def test_carriers_as_objects(hass, aioclient_mock, entry):
    aioclient_mock.get(API_DELIVERIES, json=DELIVERIES)
    aioclient_mock.get(API_CARRIERS, json={"amzfr": {"name": "Amazon France"}, "colissimo": {"name": "Colissimo"}})
    assert await async_setup_component(hass, "http", {})
    assert await hass.config_entries.async_setup(entry.entry_id)
    await hass.async_block_till_done()
    assert entry.runtime_data.carriers == {"amzfr": "Amazon France", "colissimo": "Colissimo"}


async def test_carriers_timeout_keeps_update(hass, aioclient_mock, entry):
    """A timeout on the carriers list (TimeoutError, not a ClientError) no longer fails the update."""
    aioclient_mock.get(API_DELIVERIES, json=DELIVERIES)
    aioclient_mock.get(API_CARRIERS, exc=TimeoutError())
    assert await async_setup_component(hass, "http", {})
    assert await hass.config_entries.async_setup(entry.entry_id)
    await hass.async_block_till_done()
    assert entry.state is ConfigEntryState.LOADED
    assert hass.states.get("sensor.parcel_deliveries").state == "1"


async def test_add_delivery_timeout(hass, aioclient_mock, entry):
    await _setup(hass, aioclient_mock, entry)
    aioclient_mock.post(API_ADD_DELIVERY, exc=TimeoutError())
    with pytest.raises(HomeAssistantError, match="Timeout"):
        await hass.services.async_call(
            DOMAIN,
            "add_delivery",
            {"tracking_number": "x", "carrier_code": "ups", "description": "Test"},
            blocking=True,
        )


async def test_config_flow_timeout(hass, aioclient_mock):
    aioclient_mock.get(API_DELIVERIES, exc=TimeoutError())
    result = await hass.config_entries.flow.async_init(DOMAIN, context={"source": "user"})
    result = await hass.config_entries.flow.async_configure(result["flow_id"], {CONF_API_KEY: "key"})
    assert result["type"] is FlowResultType.FORM
    assert result["errors"] == {"base": "cannot_connect"}


async def test_add_delivery_rejects_invalid_email(hass, aioclient_mock, entry):
    """A malformed email fails in Home Assistant, without spending one of the 20 daily additions."""
    await _setup(hass, aioclient_mock, entry)
    aioclient_mock.post(API_ADD_DELIVERY, json={"success": True})
    with pytest.raises(vol.Invalid):
        await hass.services.async_call(
            DOMAIN,
            "add_delivery",
            {"tracking_number": "x", "carrier_code": "ups", "description": "Test", "email": "not-an-email"},
            blocking=True,
        )
    assert not [c for c in aioclient_mock.mock_calls if str(c[1]) == API_ADD_DELIVERY]

    await hass.services.async_call(
        DOMAIN,
        "add_delivery",
        {"tracking_number": "x", "carrier_code": "ups", "description": "Test", "email": " me@example.org "},
        blocking=True,
    )
    call = next(c for c in aioclient_mock.mock_calls if str(c[1]) == API_ADD_DELIVERY)
    assert call[2]["email"] == "me@example.org"


async def test_rate_limit_fails_update(hass, aioclient_mock, entry):
    """HTTP 429 makes the update fail (entities unavailable) without asking for a new key."""
    await _setup(hass, aioclient_mock, entry)
    coordinator = entry.runtime_data
    aioclient_mock.clear_requests()
    aioclient_mock.get(API_DELIVERIES, status=429, json={"success": False})
    await coordinator.async_refresh()
    await hass.async_block_till_done()
    assert not coordinator.last_update_success
    assert "rate limit" in str(coordinator.last_exception)
    assert hass.states.get("sensor.parcel_deliveries").state == "unavailable"
    assert not any(f["context"]["source"] == "reauth" for f in hass.config_entries.flow.async_progress())


async def test_refresh_service(hass, aioclient_mock, entry):
    """The service fetches immediately (no debounce): the call returns after the update."""
    await _setup(hass, aioclient_mock, entry)
    before = len([c for c in aioclient_mock.mock_calls if str(c[1]).startswith(API_DELIVERIES)])
    await hass.services.async_call(DOMAIN, "refresh", {"config_entry_id": entry.entry_id}, blocking=True)
    after = len([c for c in aioclient_mock.mock_calls if str(c[1]).startswith(API_DELIVERIES)])
    assert after == before + 1


async def test_reauth_confirm(hass, aioclient_mock, entry):
    """A refused key is shown as invalid_auth; a valid one updates the entry and reloads it."""
    await _setup(hass, aioclient_mock, entry)
    result = await entry.start_reauth_flow(hass)
    assert result["step_id"] == "reauth_confirm"

    aioclient_mock.clear_requests()
    aioclient_mock.get(API_DELIVERIES, status=401, json={"success": False})
    result = await hass.config_entries.flow.async_configure(result["flow_id"], {CONF_API_KEY: "bad"})
    assert result["type"] is FlowResultType.FORM
    assert result["errors"] == {"base": "invalid_auth"}

    aioclient_mock.clear_requests()
    aioclient_mock.get(API_DELIVERIES, json=DELIVERIES)
    aioclient_mock.get(API_CARRIERS, json=CARRIERS)
    result = await hass.config_entries.flow.async_configure(result["flow_id"], {CONF_API_KEY: " new-key "})
    await hass.async_block_till_done()
    assert result["type"] is FlowResultType.ABORT
    assert result["reason"] == "reauth_successful"
    assert entry.data == {CONF_API_KEY: "new-key"}
    assert entry.state is ConfigEntryState.LOADED


async def test_reauth_reloads_once(hass, aioclient_mock, entry):
    """A reauth reloads the entry once (the update listener): each reload costs a call of the 20 per hour."""
    from custom_components import parcel

    await _setup(hass, aioclient_mock, entry)
    result = await entry.start_reauth_flow(hass)
    with patch("custom_components.parcel.async_setup_entry", wraps=parcel.async_setup_entry) as setup_entry:
        result = await hass.config_entries.flow.async_configure(result["flow_id"], {CONF_API_KEY: "new-key"})
        await hass.async_block_till_done()
    assert result["reason"] == "reauth_successful"
    assert setup_entry.call_count == 1
    assert entry.state is ConfigEntryState.LOADED


async def test_reauth_after_failed_setup_reloads(hass, aioclient_mock, entry):
    """When the setup failed on the key, there is no update listener: the reauth reloads the entry itself."""
    aioclient_mock.get(API_DELIVERIES, status=401, json={"success": False})
    assert await async_setup_component(hass, "http", {})
    await hass.config_entries.async_setup(entry.entry_id)
    await hass.async_block_till_done()
    assert entry.state is ConfigEntryState.SETUP_ERROR
    flow = next(f for f in hass.config_entries.flow.async_progress() if f["context"]["source"] == "reauth")
    aioclient_mock.clear_requests()
    aioclient_mock.get(API_DELIVERIES, json=DELIVERIES)
    aioclient_mock.get(API_CARRIERS, json=CARRIERS)
    result = await hass.config_entries.flow.async_configure(flow["flow_id"], {CONF_API_KEY: "new-key"})
    await hass.async_block_till_done()
    assert result["reason"] == "reauth_successful"
    assert entry.state is ConfigEntryState.LOADED


async def test_reauth_with_same_key_reloads(hass, aioclient_mock, entry):
    """An unchanged key does not fire the update listener: the reauth still reloads the entry once."""
    await _setup(hass, aioclient_mock, entry)
    result = await entry.start_reauth_flow(hass)
    with patch("custom_components.parcel.async_setup_entry", return_value=True) as setup_entry:
        result = await hass.config_entries.flow.async_configure(result["flow_id"], {CONF_API_KEY: "secret"})
        await hass.async_block_till_done()
    assert result["reason"] == "reauth_successful"
    assert setup_entry.call_count == 1


async def test_reauth_with_key_of_another_entry_is_refused(hass, aioclient_mock, entry):
    """A key already used by another entry is refused: two entries would poll the same account (20 calls per hour)."""
    from custom_components.parcel.config_flow import _unique_id

    other = MockConfigEntry(domain=DOMAIN, data={CONF_API_KEY: "other"}, unique_id=_unique_id("other"))
    other.add_to_hass(hass)
    await _setup(hass, aioclient_mock, entry)
    result = await entry.start_reauth_flow(hass)
    aioclient_mock.clear_requests()
    result = await hass.config_entries.flow.async_configure(result["flow_id"], {CONF_API_KEY: " other "})
    assert result["type"] is FlowResultType.FORM
    assert result["errors"] == {"base": "already_configured"}
    assert aioclient_mock.call_count == 0
    assert entry.data == {CONF_API_KEY: "secret"} and entry.unique_id == "x"

    aioclient_mock.get(API_DELIVERIES, json=DELIVERIES)
    aioclient_mock.get(API_CARRIERS, json=CARRIERS)
    result = await hass.config_entries.flow.async_configure(result["flow_id"], {CONF_API_KEY: "new-key"})
    await hass.async_block_till_done()
    assert result["reason"] == "reauth_successful"
    assert entry.unique_id == _unique_id("new-key")


@pytest.mark.parametrize(
    ("key", "container"),
    [("mode", dict), ("resource_mode", dict), ("mode", SimpleNamespace), ("resource_mode", SimpleNamespace)],
)
async def test_card_resource_with_lovelace_data_variants(hass, aioclient_mock, entry, stub_frontend, key, container):
    """hass.data["lovelace"]: a dict before 2025.2, then a dataclass with `mode`, renamed `resource_mode` in 2026.2."""
    assert await async_setup_component(hass, "lovelace", {})
    resources = _resources(hass)
    hass.data["lovelace"] = container(**{key: "storage", "resources": resources, "dashboards": {}})
    await _setup(hass, aioclient_mock, entry)
    await hass.async_block_till_done()
    urls = [item["url"] for item in resources.async_items()]
    assert len(urls) == 1 and urls[0].startswith("/parcel_static/parcel-card.js?v=")
    stub_frontend.assert_not_called()


async def test_card_resource_yaml_mode_uses_extra_js(hass, aioclient_mock, entry, stub_frontend):
    """Resources in YAML mode can't be edited: the card is loaded on every page instead."""
    from homeassistant.components.lovelace.resources import ResourceYAMLCollection

    assert await async_setup_component(hass, "lovelace", {})
    hass.data["lovelace"] = {"mode": "yaml", "resources": ResourceYAMLCollection([]), "dashboards": {}}
    await _setup(hass, aioclient_mock, entry)
    await hass.async_block_till_done()
    stub_frontend.assert_called_once()
