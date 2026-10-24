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
- Served from the `/parcel_static` static path and added to the Lovelace resources collection at startup (like ha-zoraxy), URL versioned with the file's md5. Falls back to `add_extra_js_url` when resources are in YAML mode.
- Reads `sensor.*` with `deliveries` and `config_entry_id` attributes; adds via `parcel.add_delivery`, carriers via websocket `parcel/carriers`.

## Release
HACS downloads the repository itself (no `zip_release`). Before tagging `vX.Y.Z`, bump the version in manifest.json and `PARCEL_CARD_VERSION` in the card (the card URL is versioned with the file's md5, not with the version). Pushing to main publishes release `vX.Y.Z` (tag, generated notes, `parcel.zip`) when that tag doesn't exist yet; the workflow fails if the two versions differ. Tags can't be pushed from Claude sessions, hence this flow. Release notes come from the version's CHANGELOG.md section; rerun them on an existing release with the "Update release notes" workflow (input `tag`).

## Tests
`pip install -r requirements_test.txt && pytest`
