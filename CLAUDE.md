# Repository guide for agents

## Commits
- Write every commit message in **English**, following **Conventional Commits**:
  `type(scope): subject` — types: `feat`, `fix`, `chore`, `docs`, `style`, `refactor`,
  `perf`, `test`, `build`, `ci`, `revert`. Subject in imperative mood, lower case,
  no trailing period, ≤ 72 chars.
- Author identity must be **juju35** (`juju35 <julienstephan29@gmail.com>`), never an assistant identity.
- Keep history clean and linear: small, focused commits, one logical change each.
- `main` is protected: land changes through a PR (squash-merge, title + description).

## Before opening a PR — run the checks locally
CI mirrors these; running them first avoids round-trips:
```sh
pre-commit run -a                                             # ruff (check + format), biome, formatting hooks
vulture custom_components .vulture_whitelist.py --min-confidence 60   # dead code (whitelist = existing only)
npx --yes jscpd@5.4.2 .                                       # duplication
pytest                                                        # integration tests
node --test test/*.test.mjs                                   # card tests
node scripts/split-frontend.mjs --check                      # translation split stays valid
```

## Releasing — how it works here
A release is **automatic**: on push to `main`, if `manifest.json` carries a version with
no matching tag, the Release workflow publishes `vX.Y.Z`. **Never create a tag by hand.**

The `Version consistency` check (validate.yml) requires the **same version in three places**,
or the release fails.

## Bumping the version — keep the three files in sync
A bump is complete only when all three carry the new version, updated together in one commit:
1. `CHANGELOG.md` → add a `## X.Y.Z - YYYY-MM-DD` section at the top
   (`### Features` | `Fixes` | `Performance` | `Maintenance`).
2. `custom_components/parcel/manifest.json` → `"version": "X.Y.Z"`.
3. `custom_components/parcel/frontend/parcel-card.js` → `var PARCEL_CARD_VERSION = 'X.Y.Z';`.
- Bump rule: `fix` → patch, `feat` → minor, breaking change → major.
- The PR/commit title carries the version in parentheses, e.g. `feat: notify actions (1.7.0)`.

## Translations
- English is the source. Keep every language in sync when a user-facing string changes.
- Integration strings: `custom_components/parcel/translations/*.json` (all languages).
- Card strings: inline in `frontend/parcel-card.js`. **Do not split them by hand** — the
  release runs `scripts/split-frontend.mjs` to extract each non-English language into its own
  file; the `Translation split` check fails if the split no longer matches.

## Screenshots — do not edit or commit them by hand
The Screenshots workflow regenerates them on the PR branch and commits them with `[skip ci]`.
Comparison is exact. They are English, with light/dark twins, neutral/mock data, and never
real family names.

## Conventions
- Prefer YAML over UI configuration; keep configurations minimal; test iteratively.
- English-only README and screenshots; mock/neutral data in published screenshots.
- Call it the **Marketplace** (Home Assistant 2026.11), not HACS, in docs, issue comments
  and user replies.
- Reply to GitHub issues in the **language of the issue / reporter**, not French by default.
