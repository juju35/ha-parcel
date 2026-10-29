# Changelog

## 0.10.1

### Fixes
- Card: with several Parcel accounts, the Refresh button, the add form and its carrier list now target the card's own account even while its sensor is unavailable after a failed update, instead of failing with "Several Parcel accounts are configured".

## 0.10.0

### Changes
- Card: new `language` option (also in the visual editor) to force English, French, German or Spanish instead of the Home Assistant language.
- Card: the active delivery count is now a status pill on the right of the header instead of a subtitle under the title.

### Fixes
- `parcel.refresh` now fails when the update fails (rate limit, timeout, refused key), so the card shows the error under its title instead of silently succeeding.
- Card: when the Parcel sensor is unavailable after a failed update, the card says so instead of showing "unavailable active" and "No deliveries to show", and it still finds the sensor without `entity` set.
- Card: editing the card in the visual editor no longer shows "Parcel sensor not found" until the next state update.
- German: clearer "Kürzlich" filter option, shorter "Fehlversuch" status chip and a more natural daily limit wording.

### Maintenance
- Screenshots workflow: fork-safe checkout, Playwright pinned to 1.64.1, retried Chromium download and explicit failure after three apt attempts.
- Branch cleanup workflow: skipped for closed fork pull requests.
- Screenshots workflow: after pushing a screenshot commit, it re-runs the Lint, Validate and HACS checks on it through `workflow_dispatch` (a push made with `GITHUB_TOKEN` starts no `pull_request` run).

## 0.9.0

### Changes
- German and Spanish translations of the integration (config flow, options, sensor, actions) and of the card.

## 0.8.0

### Changes
- Card: a failed refresh is shown as an error line under the title until the next refresh, instead of a button tooltip that any update wiped.
- Card: a click outside the card also closes the add form, like the expanded deliveries.
- `parcel.refresh` returns once the deliveries are actually fetched, so the card's spinner turns until the update finishes.

### Fixes
- Card: deliveries without an exact expected time are sorted by their expected date again on Safari and the iOS/macOS apps (the date was not parsed there).
- Card: the size reported to the dashboard no longer counts delivered parcels hidden by `show_delivered: false`.
- The integration no longer fails to set up on FIPS-mode Python.
- `parcel.add_delivery`: the description example is in English ("New headphones").

### Maintenance
- README: refresh animation GIF in the screenshots, corrected dark screenshot caption, note on the `tests/` (pytest) and `test/` (node) folders.
- Screenshots workflow: hardened apt handling, fork-safe checkout and commits.

## 0.7.0

### Maintenance
- Release workflow: dropped the stale `const.py` mention from the header comment. The `VERSION` constant was removed from `const.py` in 0.4.0, and the workflow only checks `manifest.json` and `PARCEL_CARD_VERSION` in the card, matching the README and `AGENT.md`.

## 0.6.0
### Changes
- Card header: the Parcel icon is 40 px, the same header box as the other ha-* cards (was 36 px).
- Card: the add form buttons are no longer outlined or filled: Cancel uses the neutral tile colour and Add is tinted with the primary colour.
- Card header: 8 px between the header and the first delivery (was 6 px).

## 0.5.1

### Fixes
- Re-authenticating with an API key that another Parcel entry already uses is refused ("This API key is already used by another Parcel entry.") instead of giving two entries that poll the same account and share its 20 requests per hour.

### Maintenance
- Tests for the re-authentication fix and for every Home Assistant variant of the dashboard resources; the duplication check runs on Node 22.

## 0.5.0

### Changes
- Requires Home Assistant 2024.12 or later (was 2024.11): on 2024.11, **Configure** failed with an error.

### Fixes
- A re-authentication reloads the integration once instead of twice, so it uses one call to Parcel's deliveries list (20 per hour) instead of two.
- On Home Assistant versions before 2025.4, the card is added to the dashboard resources again instead of being loaded as an extra script.

### Maintenance
- Tests run on Home Assistant 2026.10 and on the minimum version (2024.12), and fail on any deprecated Home Assistant call; new tests for the fixes and new card tests.

## 0.4.0

### Changes
- The add form opens at the top of the card, between the header and the list, instead of after the list.
- `parcel.add_delivery` checks the email address first: a malformed address fails in Home Assistant and no longer uses one of the 20 daily additions.

### Fixes
- A Parcel timeout no longer fails the whole update when the carriers list is slow, and gives "cannot connect" in the setup and a clear error in `parcel.add_delivery`.
- Carrier search no longer stays empty when the carriers were not loaded yet the first time the form opened.
- Card: without `entity`, the sensor found is kept instead of being searched for on every update.

### Maintenance
- New pytest tests (timeouts, rate limit, reauth, `refresh`, email check); unused `VERSION` constant removed.
- CI hardening: actions pinned by commit SHA, read-only token, Dependabot for actions, duplication check with PR annotations.

## 0.3.1

### Maintenance
- Tooling only, no functional change: ruff/Biome/pre-commit, a Lint CI with duplication and dead-code checks, and internal modernizations.

## 0.3.0

### Changes
- More compact layout with the same information, like the other ha-* cards: 12 px card padding, 36 px header icon, 16 px name and 12 px subtitle, 11 px pills, tighter tiles and sections.
- 36 px logo, deliveries 8 → 6 px, 12 px carrier, last event, expected date and history.

## 0.2.4

### Changes
- The card picker links the card to its documentation (`documentationURL`), like the other ha-* cards.

### Maintenance
- README: Home Assistant 2024.11 or later under **Prerequisites**.
- The release is not published when its CHANGELOG section is empty; **Update release notes** also resets the release title.
- LICENSE held by juju35, like the other ha-* repositories.

## 0.2.3

### Changes
- Card text sizes in px, like the other ha-* cards, instead of em and rem sizes.

### Fixes
- "Expected: Sun, Oct 18" and "Refresh failed: …" in English, without the French space before the colon.

### Maintenance
- The older CHANGELOG entries are in English, with the same headings as the other ha-* repositories.

## 0.2.2

### Changes
- README screenshots show the new chevron. Nothing changes for users.

## 0.2.1

### Changes
- Parcels fold like the other ha-* cards: the chevron points right when a parcel is folded and down when it is unfolded, and a click anywhere else on the page folds it again, as in ha-carburants-france.

## 0.2.0

### Changes
- Card header aligned with the other ha-* cards: 40px Parcel icon, title 18px with the number of active deliveries underneath, refresh and add buttons on the right.
- Status pills tinted with their theme color instead of outlined, with the same size as the other cards; form fields and buttons use the shared 10px radius.
- README in English, with screenshots generated by `scripts/screenshots.py` (light and dark).

## 0.1.7

### What's new
- Visual editor for the card: sensor, title, icon, delivered parcels, Refresh and Add buttons, number of events, without YAML.

## 0.1.6

### What's new
- The Parcel icon shows left of the card title (`show_icon` option, on by default).

## 0.1.5

First public release of the Parcel integration for Home Assistant, with its Lovelace card.

### What's new
- Setup from the UI with the Parcel API key (Parcel Premium required), and re-authentication when the key is refused.
- **Deliveries** sensor: number of active deliveries, with every delivery in the attributes (status, carrier, events, expected date).
- Options: deliveries to show (recent or active only) and update interval, 10 minutes by default and 5 minutes minimum to respect the limit of 20 requests per hour.
- `parcel.add_delivery` action to add a delivery (Parcel limit: 20 additions per day).
- `parcel.refresh` action to force an update.
- Supported carriers list loaded once a day.
- `custom:parcel-card` card bundled with the integration and added to the dashboard resources automatically: deliveries with icon and status pill, carrier, tracking number (copied on click), last event and expected date; click a delivery for its events; **Refresh** button and add form with carrier search; light and dark themes.
- Installation through HACS (custom repository, Integration category) or by copying `custom_components/parcel/`; `parcel.zip` is attached to the release.
- French and English.
