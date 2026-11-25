// ── parcel-card ───────────────────────────────────────────────────────────────
// Shadow DOM patching: a redraw updates the nodes already on the page (text, attributes, classes) instead of replacing
// them, so that a state update never re-creates the pictures (SVG scenes, logos) nor restarts their animations, and the
// card keeps its height (a re-created card is laid out again, which can move the dashboard under the reader's eyes).
// An open <dialog> keeps its `open` state: it is driven by showModal() / close().
import { PARCEL_ACCENT } from "./header-icon.js";
import { PARCEL_DEFAULTS } from "./i18n-helpers.js";
import { PARCEL_CHIP, PARCEL_STATUS_STYLE, parcelDate, parcelErrorText, parcelEsc, parcelFeatured, parcelHeaderColor, parcelIsAdmin, parcelLang, parcelLocale, parcelNight, parcelParseDate, parcelScene, parcelSceneOf } from "./illustration.js";
import { ParcelI18n } from "./i18n/parceli18n.js";
import { PARCEL_SOURCE_NAMES, parcelFindSourceEntity, parcelFrom17Track, parcelFromAftership, parcelSourceOf } from "./sources.js";

export var parcelUid = 0;

export function parcelMorphAttrs(cur, next) {
  for (var a of Array.from(cur.attributes)) {
    if (!next.hasAttribute(a.name) && !(a.name === 'open' && cur.localName === 'dialog')) cur.removeAttribute(a.name);
  }
  for (var b of Array.from(next.attributes)) {
    if (cur.getAttribute(b.name) === b.value) continue;
    if (b.namespaceURI) cur.setAttributeNS(b.namespaceURI, b.name, b.value);
    else cur.setAttribute(b.name, b.value);
  }
}

// A Home Assistant element given no content (<ha-icon>…) draws itself: what it adds to its own node is not ours to
// remove. It is kept as long as the attributes the HTML gives it do not change, and replaced when they do.
export function parcelMorphOwnDrawn(o, n) {
  if (!n.localName.includes('-') || n.firstChild) return false;
  var key = Array.from(n.attributes, (a) => `${a.name}=${a.value}`).join('\n');
  if (o.__morphKey === undefined && Array.from(n.attributes).every((a) => o.getAttribute(a.name) === a.value)) o.__morphKey = key;
  if (o.__morphKey !== key) {
    n.__morphKey = key;
    o.parentNode.replaceChild(n, o);
  }
  return true;
}

export function parcelMorphChildren(cur, next) {
  var old = Array.from(cur.childNodes);
  var fresh = Array.from(next.childNodes);
  fresh.forEach((n, i) => {
    var o = old[i];
    var ref = cur.childNodes[i] || null;
    if (!o || o.nodeType !== n.nodeType || o.nodeName !== n.nodeName) {
      cur.insertBefore(n, ref);
      return;
    }
    if (o !== ref) cur.insertBefore(o, ref);
    if (n.nodeType !== 1) {
      if (o.nodeValue !== n.nodeValue) o.nodeValue = n.nodeValue;
    } else if (!parcelMorphOwnDrawn(o, n)) {
      parcelMorphAttrs(o, n);
      parcelMorphChildren(o, n);
    }
  });
  while (cur.childNodes.length > fresh.length) cur.removeChild(cur.lastChild);
}

// Gives `root` (a shadow root or an element) the content of `html`, patching what is already there (a plain
// innerHTML where there is no DOM to patch, as in the unit tests' stubs).
export function parcelMorph(root, html) {
  var tpl = root.childNodes && typeof document !== 'undefined' && document.createElement?.('template');
  if (!tpl?.content) {
    root.innerHTML = html;
    return;
  }
  tpl.innerHTML = html;
  parcelMorphChildren(root, tpl.content);
}

export class ParcelCard extends HTMLElement {
  static getConfigElement() {
    return document.createElement('parcel-card-editor');
  }

  static getStubConfig(hass) {
    var entity = ParcelCard._findEntity(hass);
    return entity ? { entity: entity } : {};
  }

  static _findEntity(hass) {
    if (!hass?.states) return null;
    var ids = Object.keys(hass.states);
    for (var i = 0; i < ids.length; i++) {
      var st = hass.states[ids[i]];
      if (ids[i].indexOf('sensor.') === 0 && st.attributes && Array.isArray(st.attributes.deliveries) && st.attributes.config_entry_id) {
        return ids[i];
      }
    }
    // An unavailable sensor (failed update) has no attributes: fall back to the entity registry.
    var entities = hass.entities || {};
    var reg = Object.keys(entities);
    for (var j = 0; j < reg.length; j++) {
      if (reg[j].indexOf('sensor.') === 0 && entities[reg[j]].platform === 'parcel' && hass.states[reg[j]]) return reg[j];
    }
    return null;
  }

  setConfig(config) {
    this._config = Object.assign({}, PARCEL_DEFAULTS, config || {});
    // show_title: the header's title, hidden by the stylesheet
    this.toggleAttribute?.('hide-title', config?.show_title === false);
    this._expanded = this._expanded || {};
    // Read the sensor now: with hass already set (visual editor, dashboard change), waiting for the
    // next hass update would show "sensor not found" meanwhile.
    if (parcelSourceOf(config) !== 'parcel' && this._source17Key !== this._sourceKey()) this._data17 = null;
    this._lastState = this._hass ? this._sourceState(this._hass) : null;
    if (this._hass) this._render();
  }

  set hass(hass) {
    var first = !this._hass;
    this._hass = hass;
    var entityId = this._entityId();
    // Parcel's sensor as it is; 17TRACK and AfterShip read into the same shape.
    var st = parcelSourceOf(this._config) === 'parcel' ? (entityId ? hass.states[entityId] : null) : this._sourceState(hass);
    // Only redraw when the sensor changed, so typing in the form is never interrupted.
    if (first || st !== this._lastState) {
      this._lastState = st;
      this._render();
    }
  }

  connectedCallback() {
    this._onOutside = this._onOutside || ((ev) => {
      var form = this._root && this._root.querySelector('.form');
      var formOpen = !!(form && !form.hidden);
      var anyExpanded = Object.keys(this._expanded || {}).some((k) => this._expanded[k]);
      if (!formOpen && !anyExpanded) return;
      var path = ev.composedPath ? ev.composedPath() : [];
      if (path.indexOf(this) !== -1) return;
      // Like the other cards: a click outside collapses the expanded deliveries and the add form.
      if (formOpen) form.hidden = true;
      if (anyExpanded) {
        this._expanded = {};
        this._render();
      }
    });
    (this._outsideWatch = this._outsideWatch || parcelWatchOutside(this, (ev) => this._onOutside(ev))).on();
    // Back on the page after leaving it: drawn again in its default state.
    if (this._left && this._hass && this._config) this._render();
    this._left = false;
    // A new width (or the web font loaded): the status pill is fitted again, in the next frame.
    if (typeof ResizeObserver === 'function') {
      this._resize = this._resize || new ResizeObserver((entries) => {
        var w = Math.round(entries[entries.length - 1].contentRect.width);
        if (w === this._fitWidth) return;
        this._fitWidth = w;
        cancelAnimationFrame(this._fitFrame);
        this._fitFrame = requestAnimationFrame(() => this._fitPill());
      });
      this._resize.observe(this);
    }
    document.fonts?.ready?.then(() => this._fitPill());
  }

  disconnectedCallback() {
    this._outsideWatch?.off();
    this._resize?.disconnect();
    this._fitWidth = null;
    if (this._fitFrame) cancelAnimationFrame(this._fitFrame);
    // Left (another dashboard view, a conditional card hidden): back to its default state, without the add form open
    // or a delivery unfolded.
    this._left = true;
    this._expanded = {};
    var form = this._root?.querySelector('.form');
    if (form) form.hidden = true;
  }

  getCardSize() {
    var st = this._lastState;
    var deliveries = st?.attributes && Array.isArray(st.attributes.deliveries) ? st.attributes.deliveries : [];
    // Count only the rows actually shown.
    if (this._config && !this._config.show_delivered) deliveries = deliveries.filter((d) => d.status_code !== 0);
    return 2 + deliveries.length;
  }

  getGridOptions() {
    // 6 columns of a phone section (~160 px) cannot hold a 4-letter title, the pill and the two buttons.
    return { columns: 12, min_columns: 8, rows: 'auto' };
  }

  // Without a configured entity, the Parcel sensor found is kept: scanning all the states on every hass update
  // (several times a second) is wasted work. It is looked up again only when it disappears.
  _entityId() {
    if (this._config?.entity) return this._config.entity;
    if (parcelSourceOf(this._config) !== 'parcel') {
      var src = parcelSourceOf(this._config);
      if (!this._autoEntity || !this._hass?.states[this._autoEntity] || this._autoSource !== src) {
        this._autoEntity = parcelFindSourceEntity(this._hass, src);
        this._autoSource = src;
      }
      return this._autoEntity;
    }
    if (!this._autoEntity || !this._hass?.states[this._autoEntity]) this._autoEntity = ParcelCard._findEntity(this._hass);
    return this._autoEntity;
  }

  // Parcel account of the sensor, sent with the actions so several accounts can be used. An unavailable
  // sensor has no attributes: the account then comes from the entity and device registries.
  // The state the card shows: the Parcel sensor, or the deliveries of 17TRACK or AfterShip read into the same shape
  // (kept between hass updates as long as their data is the same, so that the card is only redrawn on a change).
  _sourceState(hass) {
    var src = parcelSourceOf(this._config);
    var entityId = this._entityId();
    var raw = entityId ? hass.states[entityId] || null : null;
    if (src === 'parcel') return raw;
    if (src === 'aftership') {
      if (raw !== this._asRaw || this._asLang !== hass.language) {
        this._asRaw = raw;
        this._asLang = hass.language;
        this._asState = parcelFromAftership(hass, this._config, raw);
      }
      return this._asState;
    }
    if (!raw) return null;
    // 17TRACK only gives its packages through an action: asked again when one of its sensors changes, or every
    // 30 minutes.
    var counts = Object.keys(hass.entities || {}).filter((id) => hass.entities[id].platform === 'seventeentrack' && hass.states[id])
      .map((id) => `${id}=${hass.states[id].state}`).join('|');
    if (!this._data17 || counts !== this._counts17 || Date.now() - (this._fetched17 || 0) > 30 * 60000) {
      this._counts17 = counts;
      this._fetch17();
    }
    return this._data17 || { state: '0', attributes: { deliveries: [] } };
  }

  _sourceKey() {
    return `${parcelSourceOf(this._config)}|${this._config?.entity || ''}|${this._config?.config_entry_id || ''}`;
  }

  _fetch17() {
    if (this._fetching17) return this._fetching17;
    var entryId = this._entryId();
    this._fetched17 = Date.now();
    this._source17Key = this._sourceKey();
    if (!entryId) {
      this._data17 = { state: 'unavailable', attributes: {} };
      return Promise.resolve();
    }
    var hass = this._hass;
    this._fetching17 = Promise.resolve(hass.callService('seventeentrack', 'get_packages', { config_entry_id: entryId }, undefined, false, true))
      .then((res) => {
        this._data17 = parcelFrom17Track(hass, this._config, res?.response?.packages);
      })
      .catch(() => {
        this._data17 = { state: 'unavailable', attributes: {} };
      })
      .finally(() => {
        this._fetching17 = null;
        this._lastState = this._data17;
        if (this._config) this._render();
      });
    return this._fetching17;
  }

  _entryId() {
    if (parcelSourceOf(this._config) === 'aftership') return null;
    if (parcelSourceOf(this._config) === 'seventeentrack' && this._config.config_entry_id) return this._config.config_entry_id;
    var st = parcelSourceOf(this._config) === 'parcel' ? this._lastState : null;
    if (st?.attributes?.config_entry_id) return st.attributes.config_entry_id;
    var entityId = this._entityId();
    var ent = entityId ? this._hass?.entities?.[entityId] : null;
    var dev = ent?.device_id ? this._hass?.devices?.[ent.device_id] : null;
    return (dev && Array.isArray(dev.config_entries) && dev.config_entries[0]) || null;
  }

  _t() {
    return ParcelI18n[parcelLang(this._hass, this._config)];
  }

  _ensureShell() {
    if (this._root) return;
    this._root = this.attachShadow({ mode: 'open' });
    this._root.innerHTML =
      '<style>' + ParcelCard._styles() + '</style>' +
      '<ha-card><div class="header"></div><div class="tabs" role="tablist" hidden></div><div class="form" hidden></div><div class="list"></div></ha-card>';
    var list = this._root.querySelector('.list');
    list.addEventListener('click', this._onListClick.bind(this));
    list.addEventListener('keydown', this._onListKeydown.bind(this));
    this._root.querySelector('.tabs').addEventListener('click', this._onTabClick.bind(this));
  }

  // Active / Delivered tabs, under the header (like the flight board): shown when delivered parcels are listed.
  _renderTabs(all, t) {
    var done = all.filter((d) => d.status_code === 0).length;
    var show = !this._compact() && this._config.show_delivered && done > 0;
    var tabs = this._root.querySelector('.tabs');
    if (tabs) tabs.hidden = !show;
    if (!show) {
      this._tab = 'active';
      return false;
    }
    var tab = (id, label, n) =>
      `<button class="tab" role="tab" data-tab="${id}" aria-selected="${this._tab === id}">${parcelEsc(label)}` +
      ` <span class="n">${n}</span></button>`;
    if (tabs) parcelMorph(tabs, tab('active', t.tab_active, all.length - done) + tab('delivered', t.status.delivered, done));
    return true;
  }

  _onTabClick(ev) {
    var btn = ev.target.closest && ev.target.closest('[data-tab]');
    if (!btn) return;
    ev.stopPropagation();
    this._tab = btn.getAttribute('data-tab');
    this._expanded = {};
    this._render();
  }

  _render() {
    if (!this._config || !this._hass) return;
    this._ensureShell();
    var t = this._t();
    var st = this._lastState;
    var header = this._root.querySelector('.header');
    var list = this._root.querySelector('.list');
    var title = this._config.title || t.default_title;
    this._tab = this._tab || 'active';

    // A failed update (rate limit, Parcel down) leaves the sensor unavailable, without its attributes:
    // say so instead of showing "unavailable active" and an empty list.
    var unavailable = !st || st.state === 'unavailable' || st.state === 'unknown';
    var deliveries = unavailable ? [] : (st.attributes?.deliveries || []).slice();
    if (!this._config.show_delivered) {
      deliveries = deliveries.filter((d) => d.status_code !== 0);
    }
    // Active first, then by expected date, parsed like _formatExpected does (parcelParseDate).
    var expectedTs = (d) => d.timestamp_expected || parcelParseDate(d.date_expected) / 1000 || Infinity;
    deliveries.sort((a, b) => {
      var da = a.status_code === 0 ? 1 : 0, db = b.status_code === 0 ? 1 : 0;
      if (da !== db) return da - db;
      return expectedTs(a) - expectedTs(b);
    });

    this._renderHeader(header, t, st, title, deliveries);
    var tabbed = this._renderTabs(deliveries, t);
    if (!st) {
      parcelMorph(list, `<div class="empty">${parcelEsc(this._sourceText(t, 'no_entity'))}</div>`);
      return;
    }
    if (unavailable) {
      parcelMorph(list, `<div class="empty">${parcelEsc(this._sourceText(t, 'unavailable'))}</div>`);
      return;
    }
    // The compact mini card is its banner alone.
    if (this._compact()) {
      parcelMorph(list, '');
      return;
    }
    // With the tabs, each one lists its own parcels.
    if (tabbed) deliveries = deliveries.filter((d) => (d.status_code === 0) === (this._tab === 'delivered'));
    // Nothing to show: the card ends on its header (its road), as the camera cards do; an empty tab keeps its line.
    if (!deliveries.length) {
      parcelMorph(list, tabbed ? `<div class="empty">${parcelEsc(t.empty)}</div>` : '');
      return;
    }
    // The rows are patched in place (parcelMorph): the focused row normally keeps the focus; if it was replaced, the
    // focus goes back on the same row or tracking number.
    var focus = this._focusSelector();
    parcelMorph(list, deliveries.map((d) => this._renderDelivery(d, t)).join(''));
    var again = focus && list.querySelector ? list.querySelector(focus) : null;
    if (again && this._root.activeElement === again) again = null;
    // Without preventScroll the browser scrolls the dashboard to the row on every sensor update.
    if (again) again.focus({ preventScroll: true });
  }

  // The header is built once and then updated in place: rebuilding it with innerHTML on every sensor update or
  // refresh dropped the keyboard focus of its buttons. It is rebuilt only when its buttons or language change.
  _renderHeader(header, t, st, title, deliveries) {
    var c = this._config;
    var compact = this._compact();
    var hero = c.illustration !== false;
    var canAdd = c.show_add && parcelIsAdmin(this._hass);
    var unavailable = !st || st.state === 'unavailable' || st.state === 'unknown';
    // The mini card with nothing to unfold keeps the refresh and add buttons in its banner, in place of the expand one.
    var idle = compact && !!st && (unavailable || !deliveries.length);
    var key = [!!st, c.show_refresh, canAdd, parcelLang(this._hass, c), compact, hero, idle].join('|');
    if (this._headerKey !== key || !header.querySelector('.head')) {
      this._headerKey = key;
      header.className = hero ? 'header hero' : 'header';
      header.innerHTML =
        (hero ? `${parcelScene(this._uid || (this._uid = ++parcelUid))}<div class="road"><span class="marks"></span></div>` : '') +
        '<div class="head">' +
        // The compact mini card counts the other parcels on the way in a badge on its icon.
        (compact ? `<div class="mark">${this._iconHtml()}<span class="more" hidden></span></div>` : this._iconHtml()) +
        (compact
          // The compact mini card: the featured parcel laid on the sky, like the next flight of the flight board.
          ? `<div class="next"><div class="trow"><div class="name"></div>${PARCEL_CHIP}</div>` +
            '<div class="l2"></div></div>'
          : `<div class="titles"><div class="trow"><div class="name"></div>${PARCEL_CHIP}</div><div class="sub count" hidden></div>` +
            // The refresh error survives re-renders (hass updates) until the next refresh attempt.
            '<div class="sub error" hidden></div></div>') +
        '</div>' +
        (st && (!compact || idle)
          ? '<div class="buttons">' +
            (c.show_refresh
              ? `<button class="hbtn refresh-btn" aria-label="${parcelEsc(t.refresh)}" title="${parcelEsc(t.refresh)}"><ha-icon icon="mdi:refresh"></ha-icon></button>`
              : '') +
            (canAdd
              ? `<button class="hbtn add-btn" aria-label="${parcelEsc(t.add)}" title="${parcelEsc(t.add)}"><ha-icon icon="mdi:plus"></ha-icon></button>`
              : '') +
            this._detailButton(t) +
            '</div>'
          : this._detailButton(t));
      var addBtn = header.querySelector('.add-btn');
      if (addBtn) addBtn.addEventListener('click', this._toggleForm.bind(this));
      var refreshBtn = header.querySelector('.refresh-btn');
      if (refreshBtn) refreshBtn.addEventListener('click', this._refresh.bind(this));
      var detailBtn = header.querySelector('.detail');
      if (detailBtn) detailBtn.addEventListener('click', this._toggleDetail.bind(this));
    }
    var featured = unavailable ? null : parcelFeatured(deliveries);
    header.style?.setProperty('--pc-state', parcelHeaderColor(featured));
    if (hero) {
      header.classList?.toggle('night', parcelNight(this._hass, c));
      // illustration_background: false keeps the houses and the van, without the sky and the road.
      header.classList?.toggle('bare', c.illustration_background === false);
      header.setAttribute?.('data-scene', parcelSceneOf(featured));
    }
    if (compact) {
      this._renderNext(header, t, st, title, deliveries, featured);
    } else {
      var name = header.querySelector('.name');
      if (name) name.textContent = title;
      var count = header.querySelector('.count');
      if (count) {
        // An unavailable sensor has no count to show: the list says it is unavailable.
        // The sensor's state is the active count (its filter included); the parcels arriving today follow it.
        var today = unavailable ? 0 : this._counts(st.attributes?.deliveries || []).today;
        count.hidden = unavailable || !!this._refreshError;
        count.textContent = unavailable ? '' : `${st.state} ${t.in_progress}` + (today ? ` · ${today} ${t.today}` : '');
      }
      // The status pill: the featured parcel's state (the one the icon's colour and the street show), else nothing
      // on the way.
      var pill = header.querySelector('.chip.st');
      if (pill) {
        pill.hidden = unavailable;
        pill.style.setProperty('--c', parcelHeaderColor(featured));
        var label = featured ? t.status[featured.status || 'unknown'] || featured.status : t.nothing;
        pill.querySelector('.txt').textContent = unavailable ? '' : label;
        pill.title = unavailable ? '' : label;
      }
      var sub = header.querySelector('.sub.error');
      if (sub) {
        sub.hidden = !(st && this._refreshError);
        sub.textContent = (st && this._refreshError) || '';
      }
    }
    // The mini card has nothing to unfold without a parcel: no detail button (kept once unfolded, to fold back).
    var detail = header.querySelector('.detail');
    if (detail) detail.hidden = idle;
    var refresh = header.querySelector('.refresh-btn');
    if (refresh) refresh.classList.toggle('spinning', !!this._refreshing);
    this._fitPill();
  }

  // The status pill goes right after the title only when the whole title and the whole label fit there; otherwise it
  // takes a line of its own under the subtitle (.below, the subtitle on one line). When the label does not fit that
  // line either, or the banner has no room for the lines above its road, the pill keeps its dot only (.dot-only, back
  // beside the title when the dot fits there). Measured after render, so that it holds in every language.
  _fitPill() {
    // Home Assistant's <ha-card> (a Lit element) shows its content only from its first update, a microtask after it
    // is connected: measured before, everything is 0 px wide and the pill lands on the wrong line. Fitted then.
    var haCard = this._root?.querySelector?.('ha-card');
    if (haCard && haCard.hasUpdated === false) {
      this._pillWait ??= (haCard.updateComplete?.then ? haCard.updateComplete : new Promise((r) => requestAnimationFrame(r))).then(() => {
        this._pillWait = null;
        this._fitPill();
      });
      return;
    }
    var root = this._root;
    if (!root?.querySelectorAll || typeof getComputedStyle !== 'function' || !document.createRange) return;
    for (var t of root.querySelectorAll('.head .titles, .head .next')) {
      var chip = t.querySelector('.trow > .chip.st');
      t.classList.remove('below', 'dot-only');
      if (!chip || !chip.getClientRects().length) continue;
      var row = chip.parentElement;
      var name = row.querySelector('.name');
      var fits = () => {
        var title = 0;
        if (name && getComputedStyle(name).display !== 'none') {
          var range = document.createRange();
          range.selectNodeContents(name);
          var cs = getComputedStyle(name);
          title = Math.max(name.scrollWidth, range.getBoundingClientRect().width) + (parseFloat(cs.marginLeft) || 0) + (parseFloat(cs.marginRight) || 0) +
            (parseFloat(getComputedStyle(row).columnGap) || 0);
        }
        return title + chip.getBoundingClientRect().width <= row.getBoundingClientRect().width + 0.5;
      };
      if (fits()) continue;
      t.classList.add('below');
      for (var sub of t.querySelectorAll('.sub, .l2')) sub.title = sub.scrollWidth > sub.clientWidth ? sub.textContent.trim() : '';
      var text = chip.querySelector('.txt');
      var banner = t.closest('.hero');
      var tb = t.getBoundingClientRect();
      var bb = banner?.getBoundingClientRect();
      var ground = banner ? parseFloat(getComputedStyle(banner).getPropertyValue('--road-h')) || 0 : 0;
      var tall = !!bb && (tb.top < bb.top - 0.5 || tb.bottom > bb.bottom - ground + 0.5);
      if (!tall && !(text && text.scrollWidth > text.clientWidth + 0.5)) continue;
      t.classList.add('dot-only');
      t.classList.remove('below');
      if (!fits()) t.classList.add('below');
    }
  }

  // The banner of the compact mini card: the featured parcel, its state pill, its carrier and what comes next.
  _renderNext(header, t, st, title, deliveries, featured) {
    var name = header.querySelector('.name');
    var chip = header.querySelector('.chip');
    var l2 = header.querySelector('.l2');
    var more = header.querySelector('.more');
    if (!name || !chip || !l2 || !more) return;
    var unavailable = !st || st.state === 'unavailable' || st.state === 'unknown';
    chip.hidden = !featured;
    more.hidden = true;
    if (!featured) {
      name.textContent = title;
      l2.textContent = !st ? this._sourceText(t, 'no_entity') : unavailable ? this._sourceText(t, 'unavailable') : t.nothing;
      return;
    }
    var key = featured.status || 'unknown';
    var style = PARCEL_STATUS_STYLE[key] || PARCEL_STATUS_STYLE.unknown;
    name.textContent = featured.description || featured.tracking_number;
    chip.style.setProperty('--c', parcelHeaderColor(featured));
    chip.querySelector('.txt').textContent = t.status[key] || key;
    chip.title = t.status[key] || key;
    var last = (featured.events || [])[0];
    var expected = featured.status_code !== 0 ? this._formatExpected(featured) : '';
    var ms = featured.timestamp_expected ? featured.timestamp_expected * 1000 : parcelParseDate(featured.date_expected);
    if (featured.status_code === 4 || (expected && !Number.isNaN(ms) && parcelIsToday(ms, Date.now()))) expected = t.today;
    var where = expected || last?.location || '';
    l2.textContent = (featured.carrier_name || featured.carrier_code || '') + (where ? ` · ${where}` : '');
    var others = deliveries.filter((d) => d.status_code !== 0 && d !== featured).length;
    more.hidden = !others;
    more.textContent = others ? `+${others}` : '';
    more.title = others ? t.more.replace('{n}', others) : '';
    if (more.setAttribute) more.setAttribute('aria-label', more.title);
  }

  // Active: not delivered yet. Arriving today: out for delivery, or expected today.
  _counts(deliveries) {
    var now = Date.now();
    var active = deliveries.filter((d) => d.status_code !== 0);
    var today = active.filter((d) => {
      if (d.status_code === 4) return true;
      var ms = d.timestamp_expected ? d.timestamp_expected * 1000 : parcelParseDate(d.date_expected);
      return !Number.isNaN(ms) && parcelIsToday(ms, now);
    });
    return { active: active.length, today: today.length };
  }

  // Overridden by the mini card: compact view, and its detail button at the top right.
  _compact() {
    return false;
  }

  _detailButton() {
    return '';
  }

  // Selector of the delivery description or tracking number that has the focus, to find it again after a re-render.
  _focusSelector() {
    var el = this._root?.activeElement;
    if (!el || !el.closest) return null;
    var item = el.closest('.delivery');
    if (!item) return null;
    var base = `.delivery[data-id="${String(item.getAttribute('data-id')).replace(/["\\]/g, '\\$&')}"]`;
    if (el.closest('[data-copy]')) return `${base} .tracking`;
    return el.closest('.desc') ? `${base} .desc` : null;
  }

  // Parcel's own messages, or those of another source ({source}: 17TRACK, AfterShip).
  _sourceText(t, key) {
    var src = parcelSourceOf(this._config);
    if (src === 'parcel') return t[key];
    return String(t[`${key}_source`]).replace('{source}', PARCEL_SOURCE_NAMES[src] || src);
  }

  _iconHtml() {
    return '<div class="logo" aria-hidden="true"><ha-icon icon="mdi:package-variant-closed"></ha-icon></div>';
  }

  // A delivery is a tile (the common tile of the cards): a tinted round icon with its state badge, the description
  // in bold, the state line in the state color, then the expected date and the carrier as pills.
  _renderDelivery(d, t) {
    var key = d.status || 'unknown';
    var style = PARCEL_STATUS_STYLE[key] || PARCEL_STATUS_STYLE.unknown;
    var id = `${d.carrier_code}:${d.tracking_number}`;
    var expanded = !!this._expanded[id];
    var events = d.events || [];
    var last = events[0];
    var done = d.status_code === 0;
    var expected = done ? '' : this._formatExpected(d);
    var icon = done
      // Delivered: a check mark drawn in the round icon.
      ? '<svg class="draw" viewBox="0 0 24 24" aria-hidden="true"><path d="M5.5,12.5 L10,17 L18.5,7.5"/></svg>'
      : `<ha-icon icon="${style.icon}"></ha-icon>`;
    var where = [last?.location, parcelDate(last?.date)].filter(Boolean).join(' ');

    var html =
      `<div class="delivery s-${parcelEsc(key)}${done ? ' done' : ''}" data-id="${parcelEsc(id)}" style="--c:${style.color}">` +
      // Only the description is the keyboard toggle: a role="button" row would hide the copy button
      // inside it from screen readers (nested interactive). A click anywhere on the row still toggles it.
      '<div class="row">' +
      `<div class="pill" aria-hidden="true">${icon}<span class="badge"></span></div>` +
      '<div class="main">' +
      '<div class="line1"><span class="desc" role="button" tabindex="0" aria-expanded="' + expanded + '">' + parcelEsc(d.description || d.tracking_number) + '</span></div>' +
      `<div class="state"><span class="label">${parcelEsc(t.status[key] || key)}</span>${where ? ` · ${parcelEsc(where)}` : ''}</div>` +
      (last ? `<div class="line3">${parcelEsc(last.event)}</div>` : '') +
      (key === 'out_for_delivery' ? '<div class="track" aria-hidden="true"><span class="fill"></span><ha-icon icon="mdi:truck-fast"></ha-icon></div>' : '') +
      '<div class="chips">' +
      (expected ? `<span class="chip expected" title="${parcelEsc(t.expected)}"><ha-icon icon="mdi:clock-outline"></ha-icon>${parcelEsc(expected)}</span>` : '') +
      '<span class="chip carrier">' + parcelEsc(d.carrier_name || d.carrier_code) + ' · ' +
      '<span class="tracking" role="button" tabindex="0" data-copy="' + parcelEsc(d.tracking_number) + '" title="' + parcelEsc(t.copy) + '">' + parcelEsc(d.tracking_number) + '</span></span>' +
      '</div></div>' +
      '<ha-icon class="chevron' + (expanded ? '' : ' closed') + '" icon="mdi:chevron-down"></ha-icon>' +
      '</div>';

    if (expanded) {
      var shown = events.slice(0, Math.max(1, this._config.max_events));
      html += '<ul class="events">' +
        (shown.length
          ? shown.map((e) => '<li>' + (parcelDate(e.date) ? `<span class="date">${parcelEsc(parcelDate(e.date))}</span> ` : '') + parcelEsc(e.event) +
                (e.location ? ` · ${parcelEsc(e.location)}` : '') +
                (e.additional ? `<div class="additional">${parcelEsc(e.additional)}</div>` : '') + '</li>').join('')
          : `<li>${parcelEsc(t.no_events)}</li>`) +
        '</ul>';
    }
    return `${html}</div>`;
  }

  _formatExpected(d) {
    var locale = parcelLocale(this._hass, this._config);
    var opts = { weekday: 'short', day: 'numeric', month: 'short' };
    var fmt = (ts, raw) => {
      if (ts) return new Date(ts * 1000).toLocaleString(locale, Object.assign({ hour: '2-digit', minute: '2-digit' }, opts));
      if (!raw) return '';
      var parsed = parcelParseDate(raw);
      if (Number.isNaN(parsed)) return raw;
      var hasTime = /\d{2}:\d{2}/.test(raw) && !/(^|[ T])00:00(:00)?$/.test(String(raw).trim());
      return new Date(parsed).toLocaleString(locale, hasTime ? Object.assign({ hour: '2-digit', minute: '2-digit' }, opts) : opts);
    };
    var start = fmt(d.timestamp_expected, d.date_expected);
    var end = fmt(d.timestamp_expected_end, d.date_expected_end);
    return start && end && end !== start ? `${start} – ${end}` : start;
  }

  _onListClick(ev) {
    var copy = ev.target.closest('[data-copy]');
    if (copy) {
      ev.stopPropagation();
      this._copy(copy);
      return;
    }
    var item = ev.target.closest('.delivery');
    if (!item) return;
    var id = item.getAttribute('data-id');
    this._expanded[id] = !this._expanded[id];
    this._render();
  }

  // Enter and Space act like a click on a description or a tracking number (both are role="button").
  _onListKeydown(ev) {
    if (ev.key !== 'Enter' && ev.key !== ' ') return;
    if (!ev.target.closest('[data-copy]') && !ev.target.closest('.desc')) return;
    ev.preventDefault();
    this._onListClick(ev);
  }

  // The copy can be refused (iframe, companion app permission, plain http): caught, and a short
  // check mark confirms a successful copy.
  _copy(el) {
    if (!navigator.clipboard) return;
    navigator.clipboard.writeText(el.getAttribute('data-copy')).then(() => {
      el.classList.add('copied');
      setTimeout(() => el.classList.remove('copied'), 1000);
    }).catch(() => {});
  }

  _refresh() {
    if (this._refreshing) return;
    if (parcelSourceOf(this._config) !== 'parcel') return this._refreshSource();
    var data = {};
    var entryId = this._entryId();
    if (entryId) data.config_entry_id = entryId;
    this._refreshing = true;
    this._refreshError = null;
    this._render();
    var t = this._t();
    this._hass.callService('parcel', 'refresh', data).catch((err) => parcelErrorText(this._hass, err).then((text) => {
      // Kept in state and rendered under the title: a tooltip on the button
      // would be wiped by the next re-render. A translated error already says the update failed.
      this._refreshError = err?.translation_key ? text : `${t.refresh_failed} ${text}`;
    })).finally(() => {
      this._refreshing = false;
      this._render();
    });
  }

  // 17TRACK: its packages asked again; AfterShip: its sensor updated.
  _refreshSource() {
    this._refreshing = true;
    this._refreshError = null;
    this._render();
    var t = this._t();
    var done = parcelSourceOf(this._config) === 'seventeentrack'
      ? this._fetch17()
      : this._hass.callService('homeassistant', 'update_entity', { entity_id: this._entityId() });
    Promise.resolve(done).catch((err) => parcelErrorText(this._hass, err).then((text) => {
      this._refreshError = `${t.refresh_failed} ${text}`;
    })).finally(() => {
      this._refreshing = false;
      this._render();
    });
  }

  // ── add form ────────────────────────────────────────────────────────────────
  _toggleForm() {
    var form = this._root.querySelector('.form');
    if (!form.hidden) {
      form.hidden = true;
      return;
    }
    // Built for the source of the card: built again when the source changed.
    if (!form.firstChild || this._formSource !== parcelSourceOf(this._config)) {
      this._formSource = parcelSourceOf(this._config);
      this._buildForm(form);
    }
    form.hidden = false;
    this._loadCarriers();
    form.querySelector('[name=tracking]').focus();
  }

  _buildForm(form) {
    var t = this._t();
    var src = parcelSourceOf(this._config);
    // Parcel: carrier from its list, push confirmation, its daily limit. AfterShip: an optional carrier code (it
    // detects the carrier otherwise). 17TRACK: the number and a name only.
    var carrier = src === 'parcel'
      ? '<label>' + parcelEsc(t.carrier) + '<input name="carrier" list="parcel-carriers" placeholder="' + parcelEsc(t.carrier_search) + '" autocomplete="off"></label>' +
        '<datalist id="parcel-carriers"></datalist>'
      : src === 'aftership'
        ? '<label>' + parcelEsc(t.carrier_optional) + '<input name="carrier" placeholder="ups, dhl, colissimo…" autocomplete="off"></label>'
        : '';
    form.innerHTML =
      '<label>' + parcelEsc(t.tracking_number) + '<input name="tracking" autocomplete="off"></label>' +
      carrier +
      '<label>' + parcelEsc(t.description) + '<input name="description" autocomplete="off"></label>' +
      (src === 'parcel' ? '<label class="check"><input type="checkbox" name="push"> ' + parcelEsc(t.push) + '</label>' : '') +
      '<div class="msg"></div>' +
      (src === 'parcel' ? '<div class="hint">' + parcelEsc(t.limit) + '</div>' : '') +
      '<div class="actions"><button type="button" class="cancel">' + parcelEsc(t.cancel) + '</button>' +
      '<button type="button" class="submit">' + parcelEsc(t.submit) + '</button></div>';
    form.querySelector('.cancel').addEventListener('click', this._toggleForm.bind(this));
    form.querySelector('.submit').addEventListener('click', this._submit.bind(this));
    form.addEventListener('keydown', function (ev) {
      if (ev.key === 'Enter' && ev.target.tagName === 'INPUT' && ev.target.type !== 'checkbox') this._submit();
    }.bind(this));
  }

  _loadCarriers() {
    if (parcelSourceOf(this._config) !== 'parcel' || this._carriers || this._loadingCarriers) return;
    this._loadingCarriers = true;
    var msg = { type: 'parcel/carriers' };
    var entryId = this._entryId();
    if (entryId) msg.config_entry_id = entryId;
    this._hass.callWS(msg).then((res) => {
      var carriers = res.carriers || {};
      // An empty list means the backend couldn't load the carriers yet: don't cache it, the next opening asks again.
      if (!Object.keys(carriers).length) return;
      this._carriers = carriers;
      var codes = Object.keys(this._carriers).sort((a, b) => this._carriers[a].localeCompare(this._carriers[b]));
      this._root.querySelector('#parcel-carriers').innerHTML = codes.map((c) => `<option value="${parcelEsc(this._carriers[c])}">${parcelEsc(c)}</option>`).join('');
    }).catch(() => {
      this._carriers = null;
    }).finally(() => {
      this._loadingCarriers = false;
    });
  }

  _carrierCode(value) {
    var v = String(value || '').trim();
    if (!v) return null;
    var carriers = this._carriers || {};
    if (carriers[v]) return v;
    var lower = v.toLowerCase();
    var codes = Object.keys(carriers);
    for (var i = 0; i < codes.length; i++) {
      if (carriers[codes[i]].toLowerCase() === lower || codes[i].toLowerCase() === lower) return codes[i];
    }
    // Carriers list unavailable: trust what was typed as a code.
    return codes.length ? null : v;
  }

  _submit() {
    var t = this._t();
    var form = this._root.querySelector('.form');
    var msgEl = form.querySelector('.msg');
    var btn = form.querySelector('.submit');
    if (btn.disabled) return;
    var tracking = form.querySelector('[name=tracking]').value.trim();
    var carrierInput = form.querySelector('[name=carrier]')?.value || '';
    var description = form.querySelector('[name=description]').value.trim();
    if (parcelSourceOf(this._config) !== 'parcel') return this._submitSource(form, tracking, carrierInput.trim(), description);
    var push = form.querySelector('[name=push]').checked;

    msgEl.className = 'msg error';
    if (!tracking || !carrierInput.trim() || !description) {
      msgEl.textContent = t.required;
      return;
    }
    var code = this._carrierCode(carrierInput);
    if (!code) {
      msgEl.textContent = t.unknown_carrier;
      return;
    }

    var data = { tracking_number: tracking, carrier_code: code, description: description, send_push_confirmation: push };
    var entryId = this._entryId();
    if (entryId) data.config_entry_id = entryId;

    this._sendAdd(form, ['parcel', 'add_delivery', data], t.added);
  }

  // Sends the form's delivery: « Adding… » meanwhile, the fields emptied and `okText` once added, else the error.
  _sendAdd(form, call, okText, onAdded) {
    var t = this._t();
    var msgEl = form.querySelector('.msg');
    var btn = form.querySelector('.submit');
    btn.disabled = true;
    btn.textContent = t.adding;
    msgEl.textContent = '';
    Promise.resolve(this._hass.callService(call[0], call[1], call[2])).then(() => {
      msgEl.className = 'msg ok';
      msgEl.textContent = okText;
      for (var name of ['tracking', 'carrier', 'description']) {
        var input = form.querySelector(`[name=${name}]`);
        if (input) input.value = '';
      }
      onAdded?.();
    }).catch((err) => parcelErrorText(this._hass, err).then((text) => {
      msgEl.className = 'msg error';
      msgEl.textContent = text;
    })).finally(() => {
      btn.disabled = false;
      btn.textContent = t.submit;
    });
  }

  // 17TRACK (seventeentrack.add_package) or AfterShip (aftership.add_tracking).
  _submitSource(form, tracking, carrier, description) {
    var t = this._t();
    var msgEl = form.querySelector('.msg');
    msgEl.className = 'msg error';
    if (!tracking || !description) {
      msgEl.textContent = t.required_source;
      return;
    }
    var seventeen = parcelSourceOf(this._config) === 'seventeentrack';
    var call = seventeen
      ? ['seventeentrack', 'add_package', { package_tracking_number: tracking, package_friendly_name: description, config_entry_id: this._entryId() }]
      : ['aftership', 'add_tracking', Object.assign({ tracking_number: tracking, title: description }, carrier ? { slug: carrier.toLowerCase() } : {})];
    // 17TRACK only gives its packages through an action: asked again at once.
    this._sendAdd(form, call, t.added_source, seventeen ? () => this._fetch17() : null);
  }

  static _styles() {
    return [
      ':host { display: block; --pc-accent: ' + PARCEL_ACCENT + '; }',
      // The container query needs size containment, which gives ha-card no intrinsic width: in an auto-sized parent
      // (inline-block, grid `auto` column, layout-card) the card fell to a few pixels. This empty, 0 px high line
      // gives the host a preferred width of 320 px (max-content) but no minimum (min-content 0), so a `1fr 1fr` grid
      // can still shrink it, even with the card wrapped in a div. contain-intrinsic-inline-size gave both: the card
      // then refused to shrink and overflowed such a grid.
      ':host::before { content: ""; display: grid; grid-template-columns: minmax(0, 320px); height: 0; }',
      'ha-card { padding: 0 0 4px; overflow: hidden; container-type: inline-size; container-name: pc-card; }',
      // ── Header. Classic (illustration: false): the round icon, the title and its subtitle, the buttons.
      '.header { position: relative; display: flex; align-items: center; gap: 10px; padding: 12px 10px 8px 12px; min-height: 40px; }',
      '.head { flex: 1 1 0; min-width: 0; display: flex; align-items: center; gap: 10px; }',
      '.logo { width: 40px; height: 40px; flex: none; border-radius: 50%; display: grid; place-items: center;' +
        ' color: var(--pc-state, var(--pc-accent)); background: color-mix(in srgb, var(--pc-state, var(--pc-accent)) 16%, transparent); }',
      '.logo ha-icon { --mdc-icon-size: 24px; }',
      '.titles { flex: 1 1 0; min-width: 0; overflow: hidden; display: flex; flex-direction: column; }',
      // Title row: the name, then the status pill right after it, only when the whole name and the whole label fit there
      // (measured by the card, see _fitPill); else the pill takes a line of its own under the subtitle (.below), and
      // when even that does not fit, only its dot stays (.dot-only, its label in its title).
      '.trow { display: flex; align-items: center; gap: 8px; min-width: 0; }',
      '.trow > .name { flex: 0 1 auto; min-width: 4ch; }',
      '.head .chip.st { flex: none; max-width: none; display: inline-flex; align-items: center; gap: 4px; padding: 1px 8px; border-radius: 12px; box-sizing: border-box;' +
        ' overflow: hidden; white-space: nowrap; font-size: 11px; font-weight: 500; line-height: 16px;' +
        ' color: color-mix(in srgb, var(--c) 45%, var(--primary-text-color)); background: color-mix(in srgb, var(--c) 15%, transparent); }',
      '.head .chip.st .txt { min-width: 0; overflow: hidden; text-overflow: ellipsis; }',
      '.head .chip.st .dot { width: 7px; height: 7px; flex: none; border-radius: 50%; background: var(--c); }',
      '.below > .trow { display: contents; }',
      '.below .chip.st { order: 3; align-self: flex-start; max-width: 100%; margin-top: 2px; }',
      '.dot-only .chip.st { padding: 0; width: 16px; height: 16px; justify-content: center; } .dot-only .chip.st .txt { display: none; }',
      '@container pc-card (max-width: 200px) { .head .chip.st { padding: 0; width: 16px; height: 16px; justify-content: center; } .head .chip.st .txt { display: none; } }',
      ':host([hide-title]) .titles .name { display: none; }',
      '.name { font-size: 16px; font-weight: 500; line-height: 1.25; white-space: nowrap; overflow: hidden; text-overflow: ellipsis; }',
      '.header:not(.hero) .name { color: var(--primary-text-color); }',
      '.sub { font-size: 12px; line-height: 16px; color: var(--sky-muted, var(--secondary-text-color)); white-space: nowrap; overflow: hidden; text-overflow: ellipsis; }',
      '.sub[hidden], .more[hidden], .chip[hidden], .tabs[hidden] { display: none; }',
      '.sub.error { color: color-mix(in srgb, var(--error-color, #db4437) 55%, var(--sky-text, var(--primary-text-color))); }',
      '.buttons { display: flex; align-items: center; gap: 4px; flex: none; }',
      // Plain buttons sized like the detail button: HA 2026.11's ha-icon-button ignores --mdc-icon-button-size (48 px).
      '.refresh-btn.spinning ha-icon { animation: parcel-spin 1s linear infinite; }',
      '@keyframes parcel-spin { from { transform: rotate(0deg); } to { transform: rotate(360deg); } }',
      // ── Illustrated header: the sky, the street on the right, the road, the texts laid on the sky (as on the flight
      // and train boards). The scene takes 2.5 times its height, at most --scene-max of the card; the texts the rest.
      '.header.hero { display: block; padding: 0; height: var(--hero-h); overflow: hidden; --hero-h: 90px; --road-h: 10px; --scene-max: 56%;' +
        ' --scene-w: min(calc((var(--hero-h) - var(--road-h) + 5px) * 2.5), var(--scene-max));' +
        ' --sky-text: #0d2a45; --sky-muted: #3b5b78; color: var(--sky-text);' +
        ' background: linear-gradient(90deg, #f1f8ff 0%, #e2f1fd 34%, #b9def8 70%, #9fd0f3 100%); }',
      '.header.hero.night { --sky-text: #ffffff; --sky-muted: rgba(255,255,255,.78);' +
        ' background: linear-gradient(90deg, #1b2f52 0%, #15284a 36%, #0f1f3d 72%, #0a1830 100%); }',
      '.hero .scene { position: absolute; z-index: 1; right: 0; bottom: calc(var(--road-h) - 5px); height: calc(100% - var(--road-h) + 5px); width: var(--scene-w); }',
      '.hero .road { position: absolute; left: 0; right: 0; bottom: 0; height: var(--road-h); background: #8e9399; box-shadow: inset 0 1px 0 #7a8087; }',
      '.hero.night .road { background: #2c323b; box-shadow: inset 0 1px 0 #1f242b; }',
      '.hero .road .marks { position: absolute; left: 0; right: 0; top: calc(50% - .8px); height: 1.6px;' +
        ' background: repeating-linear-gradient(90deg, rgba(255,255,255,.85) 0 10px, transparent 10px 20px); }',
      '.hero.night .road .marks { background: repeating-linear-gradient(90deg, rgba(255,255,255,.4) 0 10px, transparent 10px 20px); }',
      '.hero .head { position: absolute; z-index: 2; left: 0; top: 0; bottom: var(--road-h); right: var(--scene-w); box-sizing: border-box; padding: 8px 8px 8px 14px; }',
      // The round icon on the sky: frosted glass, the Parcel accent.
      '.hero .logo { background: rgba(255,255,255,.62); box-shadow: inset 0 0 0 1px color-mix(in srgb, var(--pc-state, var(--pc-accent)) 22%, transparent); }',
      // At night the state colour is lifted toward white so it stays readable on the dark sky.
      '.hero.night .logo { background: rgba(255,255,255,.12); color: color-mix(in srgb, var(--pc-state, var(--pc-accent)) 78%, #ffffff); box-shadow: inset 0 0 0 1px rgba(255,255,255,.14); }',
      // The buttons on the sky: frosted glass, never a plain filled button.
      // The header's buttons in the banner's top right corner, small frosted rounds, the detail button last.
      '.hero .buttons { position: absolute; z-index: 3; top: 5px; right: 5px; gap: 4px; }',
      '.hero .hbtn, .hero .detail { color: #33506b; background: rgba(255,255,255,.55); border-radius: 50%; box-shadow: inset 0 0 0 1px rgba(255,255,255,.7); }',
      '.hero.night .hbtn, .hero.night .detail { color: #ffffff; background: rgba(255,255,255,.12); box-shadow: inset 0 0 0 1px rgba(255,255,255,.2); }',
      // Scenery colours, day and night.
      '.scene .sun { fill: #ffd65a; } .scene .moon, .scene .stars { display: none; fill: #f3eed2; }',
      '.night .scene .sun { display: none; } .night .scene .moon, .night .scene .stars { display: inline; } .scene .stars { fill: #ffffff; }',
      '.scene .clouds { fill: #ffffff; opacity: .92; } .night .scene .clouds { opacity: .1; }',
      '.scene .hill { fill: #a7d39f; } .night .scene .hill { fill: #1d3a4a; }',
      '.scene .wall { fill: #f4f6f8; stroke: #cfd7df; stroke-width: .5; } .night .scene .wall { fill: #2a3646; stroke: #3a4759; }',
      '.scene .roof { fill: #ffffff; } .scene .roof.grey { fill: #90a4ae; } .night .scene .roof { fill: #34404f; } .night .scene .roof.grey { fill: #3a4759; }',
      '.scene .eave { fill: none; stroke: var(--pc-accent); stroke-width: 2.2; stroke-linejoin: round; stroke-linecap: round; }',
      '.scene .win { fill: #86b9de; } .night .scene .win { fill: #ffcf6e; }',
      '.scene .door { fill: #8d6e63; transform-box: fill-box; transform-origin: left; } .night .scene .door { fill: #5d4037; }',
      '.scene .awning { fill: #ffa600; } .scene .stripes { stroke: #ffffff; stroke-width: 1.6; }',
      '.scene .box { fill: #e0a85a; stroke: #a86a25; stroke-width: .5; } .scene .tape { stroke: #a86a25; stroke-width: .5; }',
      '.scene .notice rect { fill: #ffffff; stroke: #db4437; stroke-width: .6; } .scene .notice path { stroke: #db4437; stroke-width: 1; stroke-linecap: round; }',
      '.scene .tick circle { fill: #43a047; } .scene .tick path { fill: none; stroke: #ffffff; stroke-width: .9; stroke-linecap: round; stroke-linejoin: round; }',
      '.scene .cargo { fill: #ffffff; stroke: #cfd5db; stroke-width: .5; } .night .scene .cargo { fill: #dfe5ea; }',
      '.scene .stripe { fill: var(--pc-accent); } .scene .cab { fill: #039be5; } .scene .glass { fill: #e3f4fd; } .night .scene .glass { fill: #ffe7a8; }',
      '.scene .beam { fill: #ffe9a0; opacity: 0; } .night .scene .beam { opacity: .35; } .scene .lamp { fill: #ffd54a; }',
      '.scene .wheel { fill: #37474f; stroke: #263238; stroke-width: .6; }',
      // What each scene shows (data-scene on the header): the van, the parcel it carries, the shop, the notice…
      '.scene .shop, .scene .notice, .scene .left, .scene .carried, .scene .van { display: none; }',
      '[data-scene="pickup"] .scene .shop, [data-scene="failed"] .scene .notice, [data-scene="delivered"] .scene .left { display: inline; }',
      '[data-scene="drop"] .scene .carried, [data-scene="drop"] .scene .van, [data-scene="failed"] .scene .van, [data-scene="transit"] .scene .van { display: inline; }',
      // ── Animations of the scene, each one 8 s or a divisor of it, so a recording of 8 s loops.
      '.scene .van { transform: translateX(104px); } .scene .carried { transform: translate(152.5px, 69px); }',
      '.scene .bodywork { animation: parcel-bob .5s ease-in-out infinite; }',
      '[data-scene="drop"] .scene .van, [data-scene="failed"] .scene .van { animation: parcel-stop 8s infinite; }',
      '[data-scene="transit"] .scene .van { animation: parcel-pass 8s linear infinite; }',
      '[data-scene="drop"] .scene .carried { animation: parcel-carry 8s ease-in-out infinite; }',
      '[data-scene="drop"] .scene .door { animation: parcel-door 8s ease-in-out infinite; }',
      '[data-scene="failed"] .scene .notice { animation: parcel-notice 8s ease-in-out infinite; }',
      '.scene .tick { transform-box: fill-box; transform-origin: center; animation: parcel-pop 4s ease-out infinite; }',
      '.scene .waiting { animation: parcel-blink 2s ease-in-out infinite; }',
      '.scene .cloud { animation: parcel-drift 4s ease-in-out infinite alternate; } .scene .cloud.c2 { animation-delay: -2s; animation-direction: alternate-reverse; }',
      '.scene .stars .tw { animation: parcel-blink 4s ease-in-out infinite; }',
      '@keyframes parcel-bob { 0%, 100% { transform: translateY(0); } 50% { transform: translateY(-.6px); } }',
      '@keyframes parcel-stop { 0% { transform: translateX(-46px); animation-timing-function: ease-out; } 38%, 62% { transform: translateX(104px); animation-timing-function: ease-in; } 100% { transform: translateX(236px); } }',
      '@keyframes parcel-pass { from { transform: translateX(-46px); } to { transform: translateX(236px); } }',
      '@keyframes parcel-carry { 0%, 42% { transform: translate(118px, 64px) scale(.5); opacity: 0; } 47% { transform: translate(132px, 60px) scale(1); opacity: 1; }' +
        ' 55%, 94% { transform: translate(152.5px, 69px); opacity: 1; } 100% { transform: translate(152.5px, 69px); opacity: 0; } }',
      '@keyframes parcel-door { 0%, 42%, 60%, 100% { transform: scaleX(1); } 46%, 56% { transform: scaleX(.2); } }',
      '@keyframes parcel-notice { 0%, 56% { opacity: 0; transform: rotate(0); } 60% { opacity: 1; transform: rotate(-6deg); } 64% { transform: rotate(5deg); } 68%, 94% { opacity: 1; transform: rotate(0); } 100% { opacity: 0; } }',
      '.scene .notice { transform-box: fill-box; transform-origin: top center; }',
      '@keyframes parcel-pop { 0% { transform: scale(0); } 12% { transform: scale(1.25); } 18%, 100% { transform: scale(1); } }',
      '@keyframes parcel-blink { 0%, 100% { opacity: 1; } 50% { opacity: .3; } }',
      '@keyframes parcel-drift { from { transform: translateX(-7px); } to { transform: translateX(7px); } }',
      // Without background (illustration_background: false): the houses and the van stand on a hairline of the card,
      // without the sky, its sun, moon, stars, clouds and hill, nor the road; texts, icon and buttons take the card's look.
      '.header.hero.bare, .header.hero.bare.night { background: none; --sky-text: var(--primary-text-color); --sky-muted: var(--secondary-text-color); }',
      '.bare .scene .sun, .bare .scene .moon, .bare .scene .stars, .bare .scene .clouds, .bare .scene .hill, .bare .road .marks { display: none; }',
      '.hero.bare .road, .hero.bare.night .road { background: none; box-shadow: inset 0 -1px 0 var(--divider-color, rgba(127,127,127,.25)); }',
      '.hero.bare .logo, .hero.bare.night .logo { color: var(--pc-state, var(--pc-accent)); background: color-mix(in srgb, var(--pc-state, var(--pc-accent)) 16%, transparent); box-shadow: none; }',
      '.hero.bare .hbtn, .hero.bare .detail, .hero.bare.night .hbtn, .hero.bare.night .detail { color: var(--secondary-text-color); background: none; box-shadow: none; }',
      '.hero.bare .head .chip.st, .hero.bare.night .head .chip.st { color: color-mix(in srgb, var(--c) 50%, var(--primary-text-color)); background: color-mix(in srgb, var(--c) 15%, transparent); }',
      '.hero.bare .more, .hero.bare.night .more { box-shadow: 0 0 0 2px var(--card-background-color, #fff); }',
      // A narrow card keeps the sky and the road for its texts: no scenery.
      // Narrow card: no street, the texts take the width; only the title line keeps clear of the corner buttons.
      '.hero { --btns-w: 34px; } .hero:has(.buttons > :nth-child(2)) { --btns-w: 62px; } .hero:has(.buttons > :nth-child(3)) { --btns-w: 90px; }',
      '@container pc-card (max-width: 300px) { ha-card:not(.mini) .hero .scene { display: none; } ha-card:not(.mini) .hero .head { right: 0; padding-right: var(--btns-w); } }',
      '@container pc-card (max-width: 260px) { .hero .head { padding-right: 8px !important; } .hero .trow > .name { margin-right: calc(var(--btns-w) - 8px); } }',
      // ── Tabs, right under the header.
      '.tabs { display: flex; gap: 18px; padding: 0 16px; border-bottom: 1px solid var(--divider-color, rgba(127,127,127,.2)); }',
      '.tab { all: unset; cursor: pointer; padding: 9px 0 7px; font-size: 14px; font-weight: 500; color: var(--secondary-text-color);' +
        ' border-bottom: 2px solid transparent; margin-bottom: -1px; white-space: nowrap; }',
      '.tab .n { font-weight: 400; }',
      '.tab:hover { color: var(--primary-text-color); }',
      '.tab:focus-visible { outline: 2px solid var(--primary-color); outline-offset: 2px; }',
      '.tab[aria-selected="true"] { color: var(--primary-text-color); border-bottom-color: var(--pc-accent); }',
      // ── Deliveries: the tiles of the cards (neutral background, tinted round icon, coloured state line).
      '.list { display: flex; flex-direction: column; gap: 6px; padding: 8px 10px 6px; }',
      '.list:empty { display: none; }',
      '.empty { padding: 6px 4px; font-size: 13px; color: var(--secondary-text-color); }',
      '.delivery { padding: 8px 10px 8px 8px; cursor: pointer; border-radius: 12px; background: var(--secondary-background-color, rgba(127,127,127,.1)); transition: background .2s; }',
      '.delivery:hover { background: color-mix(in srgb, var(--c) 12%, var(--secondary-background-color, transparent)); }',
      '.desc:focus-visible, .tracking:focus-visible { outline: 2px solid var(--primary-color); outline-offset: 2px; border-radius: 4px; }',
      '.row { display: flex; align-items: flex-start; gap: 10px; }',
      '.pill { position: relative; flex: none; width: 40px; height: 40px; border-radius: 50%; display: grid; place-items: center;' +
        ' color: var(--c); background: color-mix(in srgb, var(--c) 18%, transparent); --mdc-icon-size: 24px; }',
      // The state badge of every tile, on the icon's corner (red for an alert, without tinting the tile).
      '.pill .badge { position: absolute; right: -1px; bottom: -1px; width: 10px; height: 10px; border-radius: 50%; background: var(--c);' +
        ' box-shadow: 0 0 0 2px var(--secondary-background-color, var(--card-background-color, #fff)); }',
      '.pill .draw { width: 24px; height: 24px; fill: none; stroke: currentColor; stroke-width: 2.6; stroke-linecap: round; stroke-linejoin: round;' +
        ' stroke-dasharray: 20; animation: parcel-draw 4s ease-out infinite; }',
      '.s-out_for_delivery .pill { animation: parcel-ping 2s ease-out infinite; }',
      '.s-out_for_delivery .pill ha-icon { animation: parcel-bob-icon 1s ease-in-out infinite; }',
      '.main { flex: 1; min-width: 0; }',
      '.line1 { display: flex; min-width: 0; }',
      '.desc { min-width: 0; max-width: 100%; font-size: 14px; font-weight: 500; line-height: 1.3; color: var(--primary-text-color); overflow: hidden; text-overflow: ellipsis; white-space: nowrap; }',
      // State texts are mixed with the text colour to stay readable (WCAG 4.5:1); the state colour stays on the icon.
      '.state { font-size: 12.5px; line-height: 1.3; color: color-mix(in srgb, var(--c) 70%, var(--primary-text-color)); overflow-wrap: anywhere; }',
      '.done .state, .s-info_received .state, .s-unknown .state, .s-frozen .state, .s-not_found .state { color: var(--secondary-text-color); }',
      '.done .state .label { color: color-mix(in srgb, var(--c) 70%, var(--primary-text-color)); }',
      '.s-failed_attempt .state .label, .s-exception .state .label { display: inline-block; animation: parcel-shake 4s ease-in-out infinite; }',
      '.line3 { font-size: 12px; line-height: 1.3; color: var(--secondary-text-color); margin-top: 1px; overflow-wrap: anywhere; }',
      // Out for delivery: a van runs along the last part of the way.
      '.track { position: relative; height: 3px; margin: 10px 18px 4px 0; border-radius: 2px; background: color-mix(in srgb, var(--c) 22%, transparent); }',
      '.track .fill { position: absolute; inset: 0 auto 0 0; width: 78%; border-radius: 2px; background: var(--c); animation: parcel-way 4s ease-in-out infinite; }',
      '.track ha-icon { position: absolute; top: -9px; left: 74%; --mdc-icon-size: 16px; color: var(--c); animation: parcel-van 4s ease-in-out infinite; }',
      '.chips { display: flex; flex-wrap: wrap; gap: 4px; margin-top: 5px; }',
      '.chip { display: inline-flex; align-items: center; gap: 3px; max-width: 100%; box-sizing: border-box; overflow: hidden; white-space: nowrap; text-overflow: ellipsis;' +
        ' font-size: 11.5px; font-weight: 500; line-height: 18px; padding: 0 7px; border-radius: 999px; --mdc-icon-size: 12px; }',
      '.chip.expected { color: color-mix(in srgb, var(--c) 60%, var(--primary-text-color)); background: color-mix(in srgb, var(--c) 15%, transparent); }',
      '.chip.carrier { color: var(--secondary-text-color); background: color-mix(in srgb, var(--secondary-text-color) 13%, transparent); font-weight: 400; }',
      '.tracking { font-family: var(--code-font-family, monospace); cursor: copy; overflow: hidden; text-overflow: ellipsis; }',
      '.tracking.copied::after { content: " ✓"; color: var(--primary-text-color); }',
      '.date { color: var(--secondary-text-color); font-size: 12px; }',
      '.chevron { flex: none; color: var(--secondary-text-color); margin-top: 8px; transition: transform .2s ease; }',
      '.chevron.closed { transform: rotate(-90deg); }',
      '.events { list-style: none; margin: 6px 0 0 50px; padding: 0 0 0 12px; border-left: 2px solid color-mix(in srgb, var(--c) 35%, transparent); font-size: 12px; color: var(--primary-text-color); }',
      '.events li { margin: 4px 0; }',
      '.additional { color: var(--secondary-text-color); }',
      '@keyframes parcel-ping { 0% { box-shadow: 0 0 0 0 color-mix(in srgb, var(--c) 50%, transparent); } 70%, 100% { box-shadow: 0 0 0 8px transparent; } }',
      '@keyframes parcel-bob-icon { 0%, 100% { transform: translateY(0); } 50% { transform: translateY(-1.5px); } }',
      '@keyframes parcel-draw { 0%, 20% { stroke-dashoffset: 20; } 45%, 100% { stroke-dashoffset: 0; } }',
      '@keyframes parcel-shake { 0%, 80%, 100% { transform: translateX(0); } 84% { transform: translateX(-2px); } 88% { transform: translateX(2px); } 92% { transform: translateX(-1px); } }',
      '@keyframes parcel-way { 0% { width: 30%; } 60%, 100% { width: 78%; } }',
      '@keyframes parcel-van { 0% { left: 26%; } 60%, 100% { left: 74%; } }',
      // ── Add form, under the header.
      '.form { padding: 10px 12px 4px; display: flex; flex-direction: column; gap: 6px; }',
      '.form[hidden] { display: none; }',
      '.form label { display: flex; flex-direction: column; gap: 4px; font-size: 13px; color: var(--secondary-text-color); }',
      '.form label.check { flex-direction: row; align-items: center; gap: 8px; }',
      '.form input:not([type=checkbox]) { font: inherit; font-size: 16px; padding: 8px 12px; border-radius: 10px; border: 1px solid var(--divider-color, #ccc); background: var(--card-background-color, #fff); color: var(--primary-text-color); }',
      '.hint { font-size: 12px; color: var(--secondary-text-color); }',
      '.msg { font-size: 13px; }',
      '.msg:empty { display: none; }',
      '.msg.error { color: color-mix(in srgb, var(--error-color, #db4437) 50%, var(--primary-text-color)); }',
      '.msg.ok { color: color-mix(in srgb, var(--success-color, #43a047) 50%, var(--primary-text-color)); }',
      '.actions { display: flex; justify-content: flex-end; gap: 8px; }',
      '.actions button { font: inherit; padding: 6px 14px; border-radius: 10px; border: none; cursor: pointer;' +
        ' background: var(--secondary-background-color, rgba(127,127,127,.12)); color: var(--primary-text-color); }',
      '.actions .submit { background: color-mix(in srgb, var(--primary-color) 16%, transparent); color: color-mix(in srgb, var(--primary-color) 50%, var(--primary-text-color)); }',
      '.actions .submit:hover:not(:disabled) { background: color-mix(in srgb, var(--primary-color) 24%, transparent); }',
      '.actions button:disabled { opacity: 0.6; cursor: default; }',
      // ── Mini card: a 240 px preferred width, a lower banner with the featured parcel, the detail button top right.
      ':host([mini])::before { grid-template-columns: minmax(0, 240px); }',
      'ha-card.mini { padding: 0; }',
      'ha-card.mini > .form { padding-bottom: 12px; }',
      // Nothing under the header (no list, form or tabs): no band under the road.
      'ha-card:not(:has(> .list:not(:empty), > .form:not([hidden]), > .tabs:not([hidden]))) { padding-bottom: 0; }',
      'ha-card.mini .header.hero { --scene-max: 36%; }',
      'ha-card.mini .header:not(.hero) { padding-bottom: 12px; }',
      '.hbtn, .detail { all: unset; box-sizing: border-box; flex: none; cursor: pointer; width: 26px; height: 26px; border-radius: 50%; align-self: flex-start;' +
        ' display: grid; place-items: center; color: var(--secondary-text-color); --mdc-icon-size: 16px; }',
      '.hero > .detail { position: absolute; z-index: 3; top: 5px; right: 5px; }',
      // Classic header: the mini card's detail button in the card's top right corner, out of the title row.
      'ha-card.mini .header:not(.hero) { padding-right: 40px; }',
      '.header:not(.hero) > .detail { position: absolute; top: 8px; right: 8px; box-shadow: inset 0 0 0 1px var(--divider-color, rgba(127,127,127,.3)); }',
      '.hero .hbtn, .hero .detail { width: 24px; height: 24px; align-self: center; -webkit-backdrop-filter: blur(4px); backdrop-filter: blur(4px); }',
      '.hbtn:hover, .detail:hover { background: color-mix(in srgb, var(--secondary-text-color) 14%, transparent); color: var(--primary-text-color); }',
      '.hero .hbtn:hover, .hero .detail:hover { background: rgba(255,255,255,.75); } .hero.night .hbtn:hover, .hero.night .detail:hover { background: rgba(255,255,255,.22); }',
      '.detail[hidden] { display: none; }',
      '.hbtn:focus-visible, .detail:focus-visible { outline: 2px solid var(--primary-color); outline-offset: 1px; }',
      '.next { flex: 1 1 0; min-width: 0; display: flex; flex-direction: column; gap: 1px; }',
      '.next .name { font-size: 17px; line-height: 22px; }',
      'ha-card.mini .hero .head { gap: 8px; padding-left: 12px; }',
      '.next .l2 { font-size: 12.5px; line-height: 16px; min-width: 0; white-space: nowrap; overflow: hidden; text-overflow: ellipsis; color: var(--sky-muted, var(--secondary-text-color)); }',
      // The other parcels on the way: a count badge on the icon's corner, the Parcel accent.
      '.mark { position: relative; flex: none; display: flex; }',
      '.more { position: absolute; right: -5px; bottom: -3px; min-width: 18px; height: 18px; box-sizing: border-box; padding: 0 5px; border-radius: 9px;' +
        ' font-size: 11px; font-weight: 500; line-height: 18px; text-align: center; color: #ffffff; background: var(--pc-accent);' +
        ' box-shadow: 0 0 0 2px var(--card-background-color, #fff); }',
      '.hero .more { box-shadow: 0 0 0 2px rgba(255,255,255,.85); } .hero.night .more { box-shadow: 0 0 0 2px #15284a; }',
      // The state pill of the featured parcel, on the sky: frosted glass under the tint.
      '.hero .head .chip.st { color: color-mix(in srgb, var(--c) 45%, #0d2a45); background: color-mix(in srgb, var(--c) 18%, rgba(255,255,255,.78)); }',
      '.hero.night .head .chip.st { color: color-mix(in srgb, var(--c) 35%, #ffffff); background: color-mix(in srgb, var(--c) 30%, rgba(8,18,38,.55)); }',
      'ha-card.mini .hero .head { padding-right: 8px; }',
      // A very narrow mini card keeps the sky for its texts, up to the detail button.
      '@container pc-card (max-width: 280px) { ha-card.mini .hero .scene { display: none; } ha-card.mini .hero .head { right: 0; padding-right: var(--btns-w); } }',
      '@media (prefers-reduced-motion: reduce) { .scene *, .pill, .pill *, .state .label, .track *, .refresh-btn.spinning ha-icon { animation: none !important; }' +
        ' .pill .draw { stroke-dasharray: none; } .chevron, .delivery { transition: none; } }',
    ].join('\n');
  }
}

// A click inside Home Assistant's dialogs (more-info, confirmations) is not "outside" the card.
export function parcelInDialog(ev) {
  return ev.composedPath().some((n) => ['ha-more-info-dialog', 'ha-dialog', 'dialog'].includes(n.localName));
}

// « A click elsewhere », caught on the pointer: iOS (Safari and the companion app) sends no click for a tap on
// something that is not clickable. It counts when the press and the release are both outside the card (a slider
// dragged out of it does not count, nor a scroll, which cancels the pointer); keyboard clicks (no click count) go
// through the click event. Clicks in a dialog opened from the card are not outside it.
export function parcelWatchOutside(card, handler) {
  var downOutside = false;
  var outside = (ev) => !ev.composedPath().includes(card) && !parcelInDialog(ev);
  var onDown = (ev) => {
    downOutside = outside(ev);
  };
  var onUp = (ev) => {
    if (downOutside && outside(ev)) handler(ev);
    downOutside = false;
  };
  var onClick = (ev) => {
    if (ev.detail === 0 && outside(ev)) handler(ev);
  };
  return {
    on() {
      document.addEventListener('pointerdown', onDown, true);
      document.addEventListener('pointerup', onUp, true);
      document.addEventListener('click', onClick, true);
    },
    off() {
      document.removeEventListener('pointerdown', onDown, true);
      document.removeEventListener('pointerup', onUp, true);
      document.removeEventListener('click', onClick, true);
    },
    // A tap (press and release at the same spot), for the tests.
    tap(ev) {
      onDown(ev);
      onUp(ev);
    },
  };
}

// Same calendar day, in the browser's time zone.
export function parcelIsToday(ms, now) {
  var d = new Date(ms);
  var n = new Date(now);
  return d.getFullYear() === n.getFullYear() && d.getMonth() === n.getMonth() && d.getDate() === n.getDate();
}
