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
- Registered with `add_extra_js_url` from the `/parcel_static` static path: no file copied into `/config/www`, no Lovelace resource to add.
- Reads `sensor.*` with `deliveries` and `config_entry_id` attributes; adds via `parcel.add_delivery`, carriers via websocket `parcel/carriers`.

## Release
Publishing a GitHub release `vX.Y.Z` stamps the version in manifest.json, const.py and the card, then attaches `parcel.zip` (HACS `zip_release`).

## Tests
`pip install -r requirements_test.txt && pytest`
