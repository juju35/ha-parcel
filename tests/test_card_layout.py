"""The card keeps a width in auto-sized containers and still shrinks in a `1fr 1fr` grid (rendered in Chromium)."""

import importlib.util
from pathlib import Path

import pytest

SCRIPT = Path(__file__).resolve().parent.parent / "scripts" / "screenshots.py"

# Places the card (and a twin in the grids) in the given container, directly or wrapped in a <div>, and measures.
PLACE = """({ctx, wrap, width}) => {
  const card = document.querySelector('parcel-card');
  const box = document.createElement('div');
  if (ctx === 'inline-block') box.style.display = 'inline-block';
  else if (ctx === 'grid-auto')
    Object.assign(box.style, {display: 'grid', gridTemplateColumns: 'auto', justifyContent: 'start'});
  else
    Object.assign(box.style, {display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '8px', width: width + 'px'});
  document.body.style.width = 'auto';
  document.body.appendChild(box);
  const cards = [card];
  if (ctx === 'grid-1fr') {
    const twin = document.createElement('parcel-card');
    twin.setConfig({type: 'custom:parcel-card'});
    cards.push(twin);
  }
  for (const c of cards) {
    if (!wrap) { box.appendChild(c); continue; }
    const div = document.createElement('div');
    div.appendChild(c);
    box.appendChild(div);
  }
  document.getElementById('root').remove();
  for (const c of cards) if (c !== card) c.hass = card._hass;
  const b = box.getBoundingClientRect();
  return {box: b.width, scroll: box.scrollWidth, cards: cards.map((c) => {
    const r = c.shadowRoot.querySelector('ha-card').getBoundingClientRect();
    return {width: r.width, right: r.right - b.left};
  })};
}"""

CASES = [
    ("inline-block", False, None),
    ("inline-block", True, None),
    ("grid-auto", False, None),
    ("grid-auto", True, None),
    *[("grid-1fr", wrap, width) for wrap in (False, True) for width in (320, 360, 500)],
]


def test_the_card_width_in_intrinsic_and_shared_containers():
    """container-type: inline-size left the card at a few pixels in an inline-block or a grid `auto` column;
    contain-intrinsic-inline-size fixed that but gave the card a 320 px minimum: in a `1fr 1fr` grid it refused to
    shrink and overflowed by up to 332 px (two 322 px cards in 320 px), wrapped in a div or not."""
    spec = importlib.util.spec_from_file_location("parcel_screenshots", SCRIPT)
    script = importlib.util.module_from_spec(spec)
    spec.loader.exec_module(script)
    sync_api = pytest.importorskip("playwright.sync_api")
    failures = []
    with sync_api.sync_playwright() as p:
        try:
            browser = p.chromium.launch()
        except Exception as err:  # noqa: BLE001 - no browser installed here
            pytest.skip(f"no Chromium: {err}")
        for ctx, wrap, width in CASES:
            page = script.mount(browser.new_context(), {"file": "x", "theme": "light", "lang": "en", "config": {}})
            out = page.evaluate(PLACE, {"ctx": ctx, "wrap": wrap, "width": width or 0})
            page.close()
            cards = out["cards"]
            if ctx == "grid-1fr":
                ok = out["scroll"] <= out["box"] and all(
                    c["right"] <= out["box"] + 0.5 and c["width"] >= (width - 8) / 2 - 0.5 for c in cards
                )
            else:
                ok = cards[0]["width"] >= 300  # its preferred width, not a few pixels
            if not ok:
                failures.append((ctx, "in a div" if wrap else "direct", width, out))
        browser.close()
    assert not failures, failures


# Measures the header's status pill and title of the card mounted by `mount`, once it has fitted its pill.
MEASURE_PILL = """async () => {
  await new Promise((r) => requestAnimationFrame(() => requestAnimationFrame(r)));
  await document.fonts.ready;
  const card = document.querySelector('#root > *');
  const sr = card.shadowRoot;
  const rect = (n) => n.getBoundingClientRect();
  const shown = (n) => n && n.getClientRects().length > 0 && getComputedStyle(n).display !== 'none';
  const textWidth = (n) => {
    const r = document.createRange();
    r.selectNodeContents(n);
    return Math.max(n.scrollWidth, r.getBoundingClientRect().width);
  };
  const name = sr.querySelector('.head .name');
  const chip = sr.querySelector('.head .chip.st');
  const txt = chip && chip.querySelector('.txt');
  const block = name.closest('.titles, .next');
  const mid = (n) => rect(n).top + rect(n).height / 2;
  const onRow = shown(chip) && Math.abs(mid(chip) - mid(name)) < 3;
  const margin = parseFloat(getComputedStyle(name).marginRight) || 0;
  const hero = sr.querySelector('.header.hero');
  const out = [];
  if (hero) {
    const b = rect(hero);
    for (const n of [name, chip, ...block.querySelectorAll('.sub, .l2')]) {
      if (!shown(n)) continue;
      const r = rect(n);
      const off = r.bottom > b.bottom - 10 + 0.5 || r.top < b.top - 0.5;
      if (off || r.right > b.right + 0.5 || r.left < b.left - 0.5) out.push(n.className);
    }
  }
  return {
    pill: !shown(chip) ? 'none' : !shown(txt) ? 'dot' : textWidth(txt) > rect(txt).width + 0.5 ? 'cut' : 'full',
    nameOk: rect(name).width >= 4 * parseFloat(getComputedStyle(name).fontSize) * 0.5,
    onRow,
    titleCut: onRow && textWidth(name) > rect(name).width + 1,
    couldFit: !onRow && shown(chip) && textWidth(name) + margin + 8 + rect(chip).width <= rect(block).width - 1,
    outside: out,
  };
}"""


def test_the_status_pill_beside_the_whole_title_or_under_the_subtitle():
    """The header's status pill (the featured parcel's state, in the icon's colour), in six languages from 190 to 500
    px, on the full card and the mini card (compact and expanded): right after the title only when the whole title
    and the whole label fit there, else on its own line under the subtitle; its label whole or only its dot (always
    at 190 px); nothing of the title block over the road strip or out of the banner."""
    spec = importlib.util.spec_from_file_location("parcel_screenshots", SCRIPT)
    script = importlib.util.module_from_spec(spec)
    spec.loader.exec_module(script)
    sync_api = pytest.importorskip("playwright.sync_api")
    failures = []
    with sync_api.sync_playwright() as p:
        try:
            browser = p.chromium.launch()
        except Exception as err:  # noqa: BLE001 - no browser installed here
            pytest.skip(f"no Chromium: {err}")
        context = browser.new_context()
        for element, zoom in (("parcel-card", False), ("parcel-mini-card", False), ("parcel-mini-card", True)):
            for lang in ("en", "fr", "de", "hu", "el", "ru"):
                for scene in ("drop", "failed"):
                    for width in (190, 245, 300, 400, 460, 500):
                        shot = {
                            "file": "x",
                            "theme": "light",
                            "config": {},
                            "element": element,
                            "scene": scene,
                            "width": width,
                            "lang": lang,
                            "zoom": zoom,
                        }
                        page = script.mount(context, shot)
                        out = page.evaluate(MEASURE_PILL)
                        page.close()
                        ok = (
                            out["pill"] in ("full", "dot")
                            and (out["pill"] == "dot" or width > 200)
                            and out["nameOk"]
                            and not out["titleCut"]
                            and not out["couldFit"]
                            and not out["outside"]
                        )
                        if not ok:
                            failures.append((element, zoom, lang, scene, width, {k: v for k, v in out.items() if v}))
        browser.close()
    assert not failures, failures
