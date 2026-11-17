# ha-parcel

[![Marketplace](https://img.shields.io/badge/Marketplace-Custom-41BDF5.svg)](https://www.home-assistant.io/integrations/marketplace/)
[![HACS Validation](https://github.com/juju35/ha-parcel/actions/workflows/hacs.yml/badge.svg)](https://github.com/juju35/ha-parcel/actions/workflows/hacs.yml)
[![Validate](https://github.com/juju35/ha-parcel/actions/workflows/validate.yml/badge.svg)](https://github.com/juju35/ha-parcel/actions/workflows/validate.yml)
[![Lint](https://github.com/juju35/ha-parcel/actions/workflows/lint.yml/badge.svg)](https://github.com/juju35/ha-parcel/actions/workflows/lint.yml)
[![Release](https://img.shields.io/github/v/release/juju35/ha-parcel)](https://github.com/juju35/ha-parcel/releases/latest)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://github.com/juju35/ha-parcel/blob/main/LICENSE)
[![Buy Me a Coffee](https://img.shields.io/badge/Buy%20Me%20a%20Coffee-FFDD00?logo=buymeacoffee&logoColor=black)](https://buymeacoffee.com/julienstep9)

<p align="center"><img src="https://raw.githubusercontent.com/juju35/ha-parcel/main/custom_components/parcel/brand/icon.png" alt="Parcel" width="120"></p>

Home Assistant integration for [Parcel](https://parcelapp.net): see the deliveries tracked in Parcel and add new ones, with a Lovelace card included.

[![Open your Home Assistant instance and open a repository inside the Marketplace.](https://my.home-assistant.io/badges/hacs_repository.svg)](https://my.home-assistant.io/redirect/marketplace_repository/?owner=juju35&repository=ha-parcel&category=integration)

<img src="https://raw.githubusercontent.com/juju35/ha-parcel/main/screenshots/card.png" alt="parcel-card" width="380">

## Features

- **Deliveries** sensor: number of active deliveries, with every delivery (status, carrier, events, expected date) as attributes
- **Deliveries** calendar: one event per active delivery on its expected date
- `parcel.add_delivery` action to add a delivery from an automation, a script or the card
- `parcel.refresh` action to force an update
- `custom:parcel-card` card, **shipped with the integration** and loaded automatically: an animated street as header, the deliveries as tiles in **Active / Delivered** tabs, events on click, add form with carrier search
- The illustration follows the most pressing parcel: the van brings it to the door, drives by while it is in transit, leaves a notice on the door after a failed attempt; the parcel waits in the parcel shop to be picked up, or lies on the doorstep once delivered
- `illustration_background: false` keeps the houses and the van without the sky and the road, on the card's own background
- **Night mode** of the illustration: stars, moon, lit windows and the van's headlight; it comes with the dark theme of Home Assistant and after sunset (`sun.sun`), or is forced with `illustration_theme`
- Tiles with a tinted round icon and its state badge, the state line in the state's color, the expected date and the carrier as pills; the parcel out for delivery has a van running along its way, a failed attempt shakes, a delivered parcel gets its check mark drawn
- `custom:parcel-mini-card` compact card: the featured parcel on an illustrated banner (a problem first, then the parcel at the door, the one to pick up, the rest), with a button to open the full card
- `parcel_out_for_delivery` and `parcel_delivered` events when a delivery changes status, for automations
- **Notifications** to the notify actions of your choice when a delivery is out for delivery or delivered, with no automation to write
- Diagnostics download with the API key, tracking numbers, addresses and emails redacted
- API key entered in the UI, never in YAML
- English, French, German, Spanish, Serbian (Cyrillic and Latin), Italian, Dutch, Portuguese, Polish, Romanian, Danish, Swedish, Bulgarian, Russian, Ukrainian, Hungarian, Slovak, Czech, Slovenian, Latvian and Greek

## Prerequisites

- Home Assistant 2024.12 or later
- A **Parcel Premium** subscription (the API is reserved to it)
- An API key, generated on [web.parcelapp.net](https://web.parcelapp.net)

## Installation

### Via the Marketplace (recommended)

Click the button below to add the repository directly:

[![Add to the Marketplace](https://my.home-assistant.io/badges/hacs_repository.svg)](https://my.home-assistant.io/redirect/marketplace_repository/?owner=juju35&repository=ha-parcel&category=integration)

Then click **Install** and restart Home Assistant.

Or manually:

1. Open **Settings → Marketplace → Add from link** (top right; this needs a GitHub account connected)
2. Add `https://github.com/juju35/ha-parcel` — Type: **Integration**
3. Open **Parcel** and click **Install**
4. Restart Home Assistant

The card is **part of the integration**: at startup it is added to the dashboard resources (`/parcel_static/parcel-card.js`, module). After an install or an update, restart Home Assistant and refresh the browser (clear the companion app cache if needed).

If your dashboards are in YAML mode, the card is loaded on every page without going through the resources.

### Manual

Copy `custom_components/parcel/` to `/config/custom_components/parcel/`, then restart Home Assistant.

## Configuration

### Integration

[![Add integration](https://my.home-assistant.io/badges/config_flow_start.svg)](https://my.home-assistant.io/redirect/config_flow_start/?domain=parcel)

**Settings → Devices & services → Add integration → Parcel**, then paste your API key.

Options (**Configure** button):

| Option | Default | Description |
|---|---|---|
| Deliveries to show | Recent | `recent`: active and recently delivered. `active`: active only |
| Update interval | 10 min | Minimum 5 min: Parcel limits the API to 20 requests per hour |
| Notify actions | none | The notify actions (`notify.mobile_app_phone`…) told when a delivery is *Out for delivery* or *Delivered*: its name and carrier, in Home Assistant's language, tagged with the delivery so the second replaces the first on a phone. The same transitions as the events |

### Card

Add the **Parcel** card from the card picker: every option is set in the visual editor. In YAML:

```yaml
type: custom:parcel-card
```

| Option | Default | Description |
|---|---|---|
| `entity` | detected | Parcel sensor to show (useful with several accounts) |
| `title` | `Deliveries` | Card title |
| `show_title` | `true` | Show the title in the header (e.g. `false` under a section heading of your own) |
| `show_delivered` | `true` | Show delivered parcels, in a **Delivered** tab next to the **Active** one |
| `show_add` | `true` | Show the add button |
| `show_refresh` | `true` | Show the refresh button (counts towards the 20 requests per hour) |
| `max_events` | `5` | Number of events shown when a delivery is expanded |
| `illustration` | `true` | The animated street as header; `false` for a classic header with the round icon |
| `illustration_background` | `true` | The sky and the road behind the street; `false` keeps only the houses and the van, on the card's own background |
| `illustration_theme` | `auto` | `auto` (night with the dark theme of Home Assistant, or when `sun.sun` is below the horizon), `day` or `night` |
| `language` | Auto | Force language: `en`, `fr`, `de`, `es`, `sr`, `sr-Latn`, `it`, `nl`, `pt`, `pl`, `ro`, `da`, `sv`, `bg`, `ru`, `uk`, `hu`, `sk`, `cs`, `sl`, `lv` or `el` (auto-detects from HA settings) |

Click a delivery to see its events, and the tracking number to copy it.

### Mini card

A compact card for dashboards: a lower illustrated banner with the featured parcel — a failed attempt or an exception first, then the parcel out for delivery, the one awaiting pickup, the ones in transit — its state pill, its carrier and when it arrives, and a badge on its icon counting the other parcels on the way. The street plays the featured parcel's scene. The button at the top right opens the full card in place; a click outside the card folds it back.

```yaml
type: custom:parcel-mini-card
```

It takes the same options as `custom:parcel-card` (set in the same visual editor); `show_delivered`, `show_add`, `show_refresh` and `max_events` apply to the full view, `illustration`, `illustration_background` and `illustration_theme` to both.

<img src="https://raw.githubusercontent.com/juju35/ha-parcel/main/screenshots/mini-card.png" alt="parcel-mini-card" width="300">

### Adding a delivery from an automation

```yaml
action: parcel.add_delivery
data:
  tracking_number: "6A12345678901"
  carrier_code: colissimo
  description: Headphones
  send_push_confirmation: true
```

Carrier codes are listed in [supported_carriers.json](https://api.parcel.app/external/supported_carriers.json). Use `pholder` for a delivery without tracking.

> Parcel limits additions to **20 per day**, failures included. A new delivery shows up after Parcel's next update.

`parcel.add_delivery` is reserved to administrators (the card hides its add button from other users); `parcel.refresh` is open to every user. Service errors are translated in the Home Assistant language.

### Events

The integration fires an event on the Home Assistant event bus when a delivery changes status between two updates:

| Event | When |
|---|---|
| `parcel_out_for_delivery` | A delivery is now out for delivery |
| `parcel_delivered` | A delivery is now delivered |

Event data: `config_entry_id`, `carrier_code`, `carrier` (carrier name), `name` (the delivery description) and `tracking_id`, a stable short hash of the carrier and tracking number (the same for both events of a delivery). The tracking number itself is left out, since events are stored in the recorder and the logbook.

Nothing fires at startup, after a reload or for a delivery seen for the first time. With the **Active** filter, Parcel drops delivered parcels from the list instead of changing their status: there, `parcel_delivered` fires when a delivery that was not yet delivered is missing from two successful updates in a row (a delivery deleted in the Parcel app fires it too). An empty list right after a non-empty one is ignored as a likely API glitch, so when every parcel leaves the list at once the event comes one update later.

```yaml
triggers:
  - trigger: event
    event_type: parcel_delivered
actions:
  - action: notify.mobile_app_phone
    data:
      title: Parcel delivered
      message: "{{ trigger.event.data.name }} ({{ trigger.event.data.carrier }}) has been delivered."
```

### Calendar

Each account also gets a calendar, `calendar.parcel_deliveries`, with one event per delivery not yet delivered that has an expected date: an all-day event when Parcel gives only a day (over several days for a delivery window), a timed event otherwise (one hour long when Parcel gives no end). The event title is the delivery description, its description the carrier name; the tracking number is left out. Show it in the calendar dashboard or a calendar card, or trigger automations on it:

```yaml
triggers:
  - trigger: calendar
    event: start
    entity_id: calendar.parcel_deliveries
actions:
  - action: notify.mobile_app_phone
    data:
      message: "{{ trigger.calendar_event.summary }} is expected today."
```

### Diagnostics

**Settings → Devices & services → Parcel → ⋮ → Download diagnostics** gives the entry options and the last deliveries, for bug reports. The API key, tracking numbers, event locations, extra carrier information (often a pickup address), postcodes and emails are redacted.

## Screenshots

The card, with one delivery expanded to its events: the van has brought the parcel out for delivery to the door.

| Light | Dark |
|---|---|
| <img src="https://raw.githubusercontent.com/juju35/ha-parcel/main/screenshots/card.png" alt="card" width="400"> | <img src="https://raw.githubusercontent.com/juju35/ha-parcel/main/screenshots/card-dark.png" alt="card, dark theme" width="400"> |

Night illustration (`illustration_theme: night`, or automatic after sunset):

| Light | Dark |
|---|---|
| <img src="https://raw.githubusercontent.com/juju35/ha-parcel/main/screenshots/card-night.png" alt="night illustration" width="400"> | <img src="https://raw.githubusercontent.com/juju35/ha-parcel/main/screenshots/card-night-dark.png" alt="night illustration, dark theme" width="400"> |

Without the sky and the road (`illustration_background: false`): the houses and the van on the card's own background.

| Light | Dark |
|---|---|
| <img src="https://raw.githubusercontent.com/juju35/ha-parcel/main/screenshots/card-bare.png" alt="illustration without background" width="400"> | <img src="https://raw.githubusercontent.com/juju35/ha-parcel/main/screenshots/card-bare-dark.png" alt="illustration without background, dark theme" width="400"> |
| <img src="https://raw.githubusercontent.com/juju35/ha-parcel/main/screenshots/mini-card-bare.png" alt="mini card without background" width="300"> | <img src="https://raw.githubusercontent.com/juju35/ha-parcel/main/screenshots/mini-card-bare-dark.png" alt="mini card without background, dark theme" width="300"> |

Classic header (`illustration: false`):

| Light | Dark |
|---|---|
| <img src="https://raw.githubusercontent.com/juju35/ha-parcel/main/screenshots/card-classic.png" alt="classic header" width="400"> | <img src="https://raw.githubusercontent.com/juju35/ha-parcel/main/screenshots/card-classic-dark.png" alt="classic header, dark theme" width="400"> |

The mini card, compact, and with nothing on the way:

| Light | Dark |
|---|---|
| <img src="https://raw.githubusercontent.com/juju35/ha-parcel/main/screenshots/mini-card.png" alt="mini card" width="300"> | <img src="https://raw.githubusercontent.com/juju35/ha-parcel/main/screenshots/mini-card-dark.png" alt="mini card, dark theme" width="300"> |
| <img src="https://raw.githubusercontent.com/juju35/ha-parcel/main/screenshots/mini-card-night.png" alt="mini card at night" width="300"> | <img src="https://raw.githubusercontent.com/juju35/ha-parcel/main/screenshots/mini-card-night-dark.png" alt="mini card at night, dark theme" width="300"> |
| <img src="https://raw.githubusercontent.com/juju35/ha-parcel/main/screenshots/mini-card-idle.png" alt="mini card, nothing on the way" width="300"> | <img src="https://raw.githubusercontent.com/juju35/ha-parcel/main/screenshots/mini-card-idle-dark.png" alt="mini card, nothing on the way, dark theme" width="300"> |

The mini card expanded by its detail button: the full card.

| Light | Dark |
|---|---|
| <img src="https://raw.githubusercontent.com/juju35/ha-parcel/main/screenshots/mini-card-zoom.png" alt="mini card expanded" width="400"> | <img src="https://raw.githubusercontent.com/juju35/ha-parcel/main/screenshots/mini-card-zoom-dark.png" alt="mini card expanded, dark theme" width="400"> |

### Animations

Every scene of the illustration loops in 8 s, following the featured parcel. Out for delivery: the van stops at the house, the door opens and the parcel lands on the doorstep, then the van leaves.

| Light | Dark |
|---|---|
| <img src="https://raw.githubusercontent.com/juju35/ha-parcel/main/screenshots/scene-drop.gif" alt="out for delivery" width="300"> | <img src="https://raw.githubusercontent.com/juju35/ha-parcel/main/screenshots/scene-drop-dark.gif" alt="out for delivery, dark theme" width="300"> |

In transit: the van drives by.

| Light | Dark |
|---|---|
| <img src="https://raw.githubusercontent.com/juju35/ha-parcel/main/screenshots/scene-transit.gif" alt="in transit" width="300"> | <img src="https://raw.githubusercontent.com/juju35/ha-parcel/main/screenshots/scene-transit-dark.gif" alt="in transit, dark theme" width="300"> |

Awaiting pickup: the parcel shop opens on the street, the parcel blinking in its window.

| Light | Dark |
|---|---|
| <img src="https://raw.githubusercontent.com/juju35/ha-parcel/main/screenshots/scene-pickup.gif" alt="awaiting pickup" width="300"> | <img src="https://raw.githubusercontent.com/juju35/ha-parcel/main/screenshots/scene-pickup-dark.gif" alt="awaiting pickup, dark theme" width="300"> |

Failed attempt or exception: the van leaves without the parcel and a red notice swings on the door.

| Light | Dark |
|---|---|
| <img src="https://raw.githubusercontent.com/juju35/ha-parcel/main/screenshots/scene-failed.gif" alt="failed attempt" width="300"> | <img src="https://raw.githubusercontent.com/juju35/ha-parcel/main/screenshots/scene-failed-dark.gif" alt="failed attempt, dark theme" width="300"> |

Delivered: the parcel waits on the doorstep, a green check popping above it.

| Light | Dark |
|---|---|
| <img src="https://raw.githubusercontent.com/juju35/ha-parcel/main/screenshots/scene-delivered.gif" alt="delivered" width="300"> | <img src="https://raw.githubusercontent.com/juju35/ha-parcel/main/screenshots/scene-delivered-dark.gif" alt="delivered, dark theme" width="300"> |

Without background: the same scenes, on the card.

| Light | Dark |
|---|---|
| <img src="https://raw.githubusercontent.com/juju35/ha-parcel/main/screenshots/scene-bare.gif" alt="scene without background" width="300"> | <img src="https://raw.githubusercontent.com/juju35/ha-parcel/main/screenshots/scene-bare-dark.gif" alt="scene without background, dark theme" width="300"> |

At night: stars twinkling, lit windows, the van's headlight on.

| Light | Dark |
|---|---|
| <img src="https://raw.githubusercontent.com/juju35/ha-parcel/main/screenshots/scene-night.gif" alt="night" width="300"> | <img src="https://raw.githubusercontent.com/juju35/ha-parcel/main/screenshots/scene-night-dark.gif" alt="night, dark theme" width="300"> |

The tiles: the parcel out for delivery pulses and a van runs along its way, a failed attempt shakes its state.

| Light | Dark |
|---|---|
| <img src="https://raw.githubusercontent.com/juju35/ha-parcel/main/screenshots/tiles.gif" alt="tiles" width="400"> | <img src="https://raw.githubusercontent.com/juju35/ha-parcel/main/screenshots/tiles-dark.gif" alt="tiles, dark theme" width="400"> |

The Delivered tab: the check mark is drawn in the round icon.

| Light | Dark |
|---|---|
| <img src="https://raw.githubusercontent.com/juju35/ha-parcel/main/screenshots/tiles-delivered.gif" alt="delivered tab" width="400"> | <img src="https://raw.githubusercontent.com/juju35/ha-parcel/main/screenshots/tiles-delivered-dark.gif" alt="delivered tab, dark theme" width="400"> |

While parcels refresh, the refresh button spins until the update finishes.

| Light | Dark |
|---|---|
| <img src="https://raw.githubusercontent.com/juju35/ha-parcel/main/screenshots/refreshing.gif" alt="refresh animation" width="400"> | <img src="https://raw.githubusercontent.com/juju35/ha-parcel/main/screenshots/refreshing-dark.gif" alt="refresh animation, dark theme" width="400"> |

## How it works

The integration polls the Parcel API at the update interval and exposes the deliveries on one sensor and one calendar per account. When an update fails (hourly request limit reached, timeout, Parcel server error), the sensor keeps the last deliveries until the next update and flags them with its `stale` (`true`) and `last_error` attributes; only a refused API key makes it unavailable. The card reads that sensor, sorts active deliveries first by expected date, and colors each status from the Home Assistant theme:

| Code | Status | Color |
|---|---|---|
| 0 | Delivered | `--success-color` |
| 1 | No updates | disabled |
| 2 | In transit | `--info-color` |
| 3 | Awaiting pickup | `--warning-color` |
| 4 | Out for delivery | `--primary-color` |
| 5 | Not found | disabled |
| 6 | Failed attempt | `--error-color` |
| 7 | Exception | `--error-color` |
| 8 | Info received | secondary text |

## Development

```bash
pip install -r requirements_test.txt && pytest
pip install playwright==1.64.1 && playwright install chromium
python scripts/screenshots.py   # renders the card and mini card stills and one GIF per animation, light and dark (needs ffmpeg), into screenshots/
```

Python tests live in `tests/` (pytest); the card's JavaScript tests live in `test/` (`node --test test/*.test.mjs`).

### Releasing

1. Bump the version in `custom_components/parcel/manifest.json` and `PARCEL_CARD_VERSION` in the card
2. Add a `## <version>` section at the top of [CHANGELOG.md](https://github.com/juju35/ha-parcel/blob/main/CHANGELOG.md)
3. Push to `main`: the **Release** workflow creates the tag and the GitHub release with the changelog section as notes

## Translations

The integration and the card follow the language of Home Assistant (the card's `language` option can force another one). Currently supported:

| Language | Code |
|---|---|
| English | `en` |
| Français | `fr` |
| Deutsch | `de` |
| Español | `es` |
| Српски | `sr` |
| Srpski (latinica) | `sr-Latn` |
| Italiano | `it` |
| Nederlands | `nl` |
| Português (Portugal) | `pt` |
| Polski | `pl` |
| Română | `ro` |
| Dansk | `da` |
| Svenska | `sv` |
| Български | `bg` |
| Русский | `ru` |
| Українська | `uk` |
| Magyar | `hu` |
| Slovenčina | `sk` |
| Čeština | `cs` |
| Slovenščina | `sl` |
| Latviešu | `lv` |
| Ελληνικά | `el` |

Brazilian Portuguese (`pt-BR`): pt-BR uses the European Portuguese texts, in the integration and the card.

Contributions for additional languages are welcome!

## License

[MIT](https://github.com/juju35/ha-parcel/blob/main/LICENSE)

## Support

If you find this project useful, you can support its development:

<a href="https://buymeacoffee.com/julienstep9"><img src="https://cdn.buymeacoffee.com/buttons/v2/default-yellow.png" alt="Buy Me a Coffee" height="50"></a>
