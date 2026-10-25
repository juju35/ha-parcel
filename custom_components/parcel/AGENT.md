# Parcel Integration — Agent Context

## Purpose
Home Assistant custom integration for [Parcel](https://parcelapp.net): lists the deliveries tracked in Parcel and adds new ones.
Ships its own Lovelace card (`frontend/parcel-card.js`), served by the integration itself.

## Architecture

```
custom_components/parcel/
├── __init__.py        # Setup, card registration, services, websocket parcel/carriers
├── api.py             # aiohttp client for api.parcel.app/external
├── coordinator.py     # DataUpdateCoordinator (deliveries + daily carriers list)
├── sensor.py          # One sensor: count of undelivered parcels, deliveries in attributes
├── config_flow.py     # API key, reauth, options (filter_mode, scan_interval)
├── const.py           # Constants, status codes
├── icons.json / services.yaml / translations/{en,fr}.json
└── frontend/parcel-card.js   # Vanilla JS card, no dependencies
```

## Parcel API
- Header `api-key`, key generated at web.parcelapp.net (Premium only).
- `GET /external/deliveries/?filter_mode=active|recent`: 20 requests/hour, cached server side. Scan interval is never below 5 min.
- `POST /external/add-delivery/` JSON `{tracking_number, carrier_code, description, language, send_push_confirmation, postcode?, email?}`: 20 requests/day, failures included.
- `GET /external/supported_carriers.json`: `{code: name}`, no key needed, refreshed once a day.
- Status codes: 0 delivered, 1 frozen, 2 in transit, 3 awaiting pickup, 4 out for delivery, 5 not found, 6 failed attempt, 7 exception, 8 info received.

## Card
- Served from the `/parcel_static` static path and added to the Lovelace resources collection at startup (like ha-zoraxy), URL versioned with the file's md5. Falls back to `add_extra_js_url` when resources are in YAML mode. `_lovelace_resources()` reads `hass.data["lovelace"]` as a dict (before 2025.2) or a dataclass (`mode`, then `resource_mode` from 2026.2).
- Reads `sensor.*` with `deliveries` and `config_entry_id` attributes; adds via `parcel.add_delivery`, carriers via websocket `parcel/carriers`.

## Release
HACS downloads the repository itself (no `zip_release`). Before tagging `vX.Y.Z`, bump the version in manifest.json and `PARCEL_CARD_VERSION` in the card (the card URL is versioned with the file's md5, not with the version). Pushing to main publishes release `vX.Y.Z` (tag, generated notes, `parcel.zip`) when that tag doesn't exist yet; the workflow fails if the two versions differ. Tags can't be pushed from Claude sessions, hence this flow. Release notes come from the version's CHANGELOG.md section; rerun them on an existing release with the "Update release notes" workflow (input `tag`).

## Config entry
- Reauth updates the key and lets the update listener reload the entry; it schedules the reload itself only when that listener won't run (entry not loaded, or nothing changed), so one reauth costs one API call. A key already used by another entry (same `unique_id`) is refused before any API call.
- Minimum Home Assistant 2024.12.0 (`OptionsFlow.config_entry`); CI also runs the tests on it (`pytest-min-ha`).

## Tests
`pip install -r requirements_test.txt && pytest`; card: `node --test test/*.test.mjs` (the card file is evaluated in a `vm` context with stubs). Job `tests` runs on Python 3.14, i.e. the latest Home Assistant (2026.3+ needs Python 3.14; 3.13 would silently resolve to 2026.2) and prints its version as an annotation; job `pytest-min-ha` runs the suite on HA 2024.12.0. An autouse fixture (`tests/conftest.py`, `no_deprecated_calls`) fails any test during which Home Assistant reports a deprecated call naming `parcel`, and CI turns those reports into annotations. The http fixture patch only applies where `start_http_server_and_save_config` still exists (gone in 2026.10).
