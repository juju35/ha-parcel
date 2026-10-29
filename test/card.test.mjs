// Unit tests for the card logic: the card file is evaluated with stubs, no browser needed.
import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import { test } from 'node:test';
import vm from 'node:vm';

const source = readFileSync(new URL('../custom_components/parcel/frontend/parcel-card.js', import.meta.url), 'utf8');
const context = {
  HTMLElement: class {},
  customElements: { get: () => true, define() {} },
  window: {},
  navigator: { language: 'en' },
  document: { addEventListener() {}, removeEventListener() {} },
  console,
};
vm.createContext(context);
vm.runInContext(`${source}\nthis.parcel = { parcelEsc, parcelDate, parcelLang, ParcelCard };`, context);
const { parcelEsc, parcelDate, parcelLang, ParcelCard } = context.parcel;
const card = ParcelCard.prototype;

const sensor = (id, extra = {}) => ({
  entity_id: id,
  state: '1',
  attributes: { deliveries: [], config_entry_id: 'abc', ...extra },
});
const flush = () => new Promise((resolve) => setImmediate(resolve));

test('parcelEsc escapes HTML in text and attributes', () => {
  assert.equal(parcelEsc('<img src=x onerror="a">\'&'), '&lt;img src=x onerror=&quot;a&quot;&gt;&#39;&amp;');
  assert.equal(parcelEsc(null), '');
  assert.equal(parcelEsc(0), '0');
});

test('parcelDate drops the placeholders Parcel sends without a date', () => {
  assert.equal(parcelDate('--//--'), '');
  assert.equal(parcelDate(''), '');
  assert.equal(parcelDate(undefined), '');
  assert.equal(parcelDate('18/10 08:12'), '18/10 08:12');
});

test('parcelLang follows Home Assistant and falls back to English', () => {
  assert.equal(parcelLang({ locale: { language: 'fr-FR' } }), 'fr');
  assert.equal(parcelLang({ language: 'fr' }), 'fr');
  assert.equal(parcelLang({ locale: { language: 'de-DE' } }), 'de');
  assert.equal(parcelLang({ language: 'es' }), 'es');
  assert.equal(parcelLang({ locale: { language: 'xx' } }), 'en');
});

test('every card language has exactly the English keys', () => {
  const keys = (o, p = '') => Object.entries(o).flatMap(([k, v]) => (v && typeof v === 'object' ? keys(v, `${p}${k}.`) : [`${p}${k}`])).sort();
  const i18n = vm.runInContext('ParcelI18n', context);
  for (const lang of ['fr', 'de', 'es']) assert.deepEqual(keys(i18n[lang]), keys(i18n.en), lang);
});

test('getStubConfig picks the Parcel sensor only', () => {
  const states = {
    'sensor.other': { attributes: { deliveries: [] } },
    'sensor.parcel_deliveries': sensor('sensor.parcel_deliveries'),
  };
  assert.deepEqual({ ...ParcelCard.getStubConfig({ states }) }, { entity: 'sensor.parcel_deliveries' });
  assert.deepEqual({ ...ParcelCard.getStubConfig({ states: {} }) }, {});
  assert.deepEqual({ ...ParcelCard.getStubConfig(undefined) }, {});
});

test('the sensor found automatically is kept, and looked up again when it disappears', () => {
  const self = { _config: {}, _hass: { states: { 'sensor.a': sensor('sensor.a') } } };
  assert.equal(card._entityId.call(self), 'sensor.a');
  // Still there: kept even if another one appears first in the states.
  self._hass = { states: { 'sensor.b': sensor('sensor.b'), 'sensor.a': sensor('sensor.a') } };
  assert.equal(card._entityId.call(self), 'sensor.a');
  // Renamed: found again.
  self._hass = { states: { 'sensor.b': sensor('sensor.b') } };
  assert.equal(card._entityId.call(self), 'sensor.b');
  // Missing at first, present later: found.
  self._autoEntity = null;
  self._hass = { states: {} };
  assert.equal(card._entityId.call(self), null);
  self._hass = { states: { 'sensor.c': sensor('sensor.c') } };
  assert.equal(card._entityId.call(self), 'sensor.c');
  // A configured entity wins.
  self._config = { entity: 'sensor.x' };
  assert.equal(card._entityId.call(self), 'sensor.x');
});

test('_carrierCode matches a code or a name, and trusts the input without a carriers list', () => {
  const self = { _carriers: { colissimo: 'Colissimo', ups: 'UPS' } };
  assert.equal(card._carrierCode.call(self, 'ups'), 'ups');
  assert.equal(card._carrierCode.call(self, ' colissimo '), 'colissimo');
  assert.equal(card._carrierCode.call(self, 'Colissimo'), 'colissimo');
  assert.equal(card._carrierCode.call(self, 'UPS'), 'ups');
  assert.equal(card._carrierCode.call(self, 'dhl'), null);
  assert.equal(card._carrierCode.call(self, ''), null);
  assert.equal(card._carrierCode.call({ _carriers: null }, 'dhl'), 'dhl');
});

test('an empty carriers answer is not cached: the next opening asks again', async () => {
  const datalist = { innerHTML: '' };
  const answers = [{ carriers: {} }, { carriers: { ups: 'UPS', colissimo: 'Colissimo' } }];
  const calls = [];
  const self = {
    _config: { entity: 'sensor.a' },
    _lastState: sensor('sensor.a'),
    _entryId: card._entryId,
    _entityId: card._entityId,
    _root: { querySelector: () => datalist },
    _hass: { states: {}, callWS: (msg) => { calls.push(msg); return Promise.resolve(answers.shift()); } },
  };
  card._loadCarriers.call(self);
  await flush();
  assert.equal(self._carriers, undefined);
  assert.equal(self._loadingCarriers, false);
  card._loadCarriers.call(self);
  await flush();
  assert.equal(calls.length, 2);
  assert.deepEqual({ ...calls[0] }, { type: 'parcel/carriers', config_entry_id: 'abc' });
  assert.deepEqual(Object.keys(self._carriers), ['ups', 'colissimo']);
  // Sorted by name: Colissimo, then UPS.
  assert.equal(datalist.innerHTML, '<option value="Colissimo">colissimo</option><option value="UPS">ups</option>');
  // Cached now: no third call.
  card._loadCarriers.call(self);
  assert.equal(calls.length, 2);
});

test('a failed carriers request is retried at the next opening', async () => {
  let n = 0;
  const self = {
    _config: {},
    _lastState: null,
    _entryId: card._entryId,
    _entityId: card._entityId,
    _root: { querySelector: () => ({}) },
    _hass: { states: {}, callWS: () => (++n === 1 ? Promise.reject(new Error('down')) : Promise.resolve({ carriers: { ups: 'UPS' } })) },
  };
  card._loadCarriers.call(self);
  await flush();
  assert.equal(self._carriers, null);
  card._loadCarriers.call(self);
  await flush();
  assert.equal(n, 2);
  assert.deepEqual({ ...self._carriers }, { ups: 'UPS' });
});

test('_formatExpected shows a range only when the end differs', () => {
  const self = { _hass: { locale: { language: 'en' } } };
  assert.equal(card._formatExpected.call(self, {}), '');
  const one = card._formatExpected.call(self, { date_expected: '2026-10-20 00:00:00' });
  assert.ok(one.length > 0 && !one.includes('–'));
  const same = card._formatExpected.call(self, { date_expected: '2026-10-20', date_expected_end: '2026-10-20' });
  assert.equal(same, one);
  const range = card._formatExpected.call(self, { date_expected: '2026-10-20', date_expected_end: '2026-10-22' });
  assert.ok(range.includes('–'));
  assert.equal(card._formatExpected.call(self, { date_expected: 'soon' }), 'soon');
});

test('set hass redraws only when the sensor state object changes', () => {
  let renders = 0;
  const st = sensor('sensor.a');
  const self = { _config: { entity: 'sensor.a' }, _render: () => renders++, _entityId: card._entityId };
  const setHass = Object.getOwnPropertyDescriptor(card, 'hass').set;
  setHass.call(self, { states: { 'sensor.a': st } });
  setHass.call(self, { states: { 'sensor.a': st, 'light.x': {} } });
  assert.equal(renders, 1);
  setHass.call(self, { states: { 'sensor.a': { ...st, state: '2' } } });
  assert.equal(renders, 2);
});

test('deliveries sort by expected date even when Date.parse is strict (Safari/WebKit)', () => {
  // Safari/WebKit returns NaN for "YYYY-MM-DD HH:MM:SS" (no "T"): the card is re-evaluated
  // in a realm emulating that, and the sort must still order by date_expected.
  const strict = {
    HTMLElement: class {},
    customElements: { get: () => true, define() {} },
    window: {},
    navigator: { language: 'en' },
    document: { addEventListener() {}, removeEventListener() {} },
    console,
  };
  vm.createContext(strict);
  vm.runInContext('const realParse = Date.parse; Date.parse = (s) => (/\\d \\d/.test(String(s)) ? NaN : realParse(s));', strict);
  vm.runInContext(`${source}\nthis.parcel = { ParcelCard };`, strict);
  const header = { querySelector: () => null };
  const list = {};
  const delivery = (id, extra) => ({ carrier_code: 'ups', tracking_number: id, status_code: 10, events: [], ...extra });
  const self = Object.assign(Object.create(strict.parcel.ParcelCard.prototype), {
    _config: { entity: 'sensor.a', show_delivered: true, show_icon: false, show_refresh: false, show_add: false, max_events: 5 },
    _hass: { locale: { language: 'en' } },
    _lastState: sensor('sensor.a', {
      deliveries: [
        delivery('done', { status_code: 0, date_expected: '2026-10-18 00:00:00' }),
        delivery('late', { date_expected: '2026-10-22 00:00:00' }),
        delivery('none', {}),
        delivery('soon', { date_expected: '2026-10-20 00:00:00' }),
        delivery('ts', { timestamp_expected: 1793404800 }), // 2026-10-31
      ],
    }),
    _root: { querySelector: (sel) => (sel === '.header' ? header : list) },
    _expanded: {},
    _ensureShell() {},
  });
  self._render();
  const order = [...list.innerHTML.matchAll(/data-id="ups:(\w+)"/g)].map((m) => m[1]);
  // Active sorted by date, unknown date last, delivered after the active ones.
  assert.deepEqual(order, ['soon', 'late', 'ts', 'none', 'done']);
});

// Minimal card instance whose _render writes into plain objects.
const renderable = (extra = {}) => {
  const header = { innerHTML: '', querySelector: () => null };
  const list = { innerHTML: '' };
  return Object.assign(Object.create(ParcelCard.prototype), {
    _root: { querySelector: (sel) => (sel === '.header' ? header : list) },
    _ensureShell() {},
    _expanded: {},
    header,
    list,
    ...extra,
  });
};

test('setConfig reads the sensor at once when hass is already set (visual editor)', () => {
  const self = renderable({ _hass: { states: { 'sensor.a': sensor('sensor.a', { deliveries: [] }) } } });
  self.setConfig({ entity: 'sensor.a', show_icon: false });
  assert.equal(self._lastState, self._hass.states['sensor.a']);
  assert.ok(!self.list.innerHTML.includes('not found'), self.list.innerHTML);
  // The automatically found sensor too.
  const auto = renderable({ _hass: { states: { 'sensor.b': sensor('sensor.b') } } });
  auto.setConfig({ show_icon: false });
  assert.equal(auto._lastState, auto._hass.states['sensor.b']);
});

test('an unavailable sensor shows a dedicated message, without a count', () => {
  const st = { entity_id: 'sensor.a', state: 'unavailable', attributes: { friendly_name: 'Parcel' } };
  const self = renderable({ _hass: { states: { 'sensor.a': st } } });
  self.setConfig({ entity: 'sensor.a', show_icon: false });
  assert.ok(self.list.innerHTML.includes('Parcel is unavailable'), self.list.innerHTML);
  assert.ok(!self.header.innerHTML.includes('active'), self.header.innerHTML);
  assert.ok(!self.header.innerHTML.includes('unavailable'), self.header.innerHTML);
});

test('the active count is a status pill on the right of the header, not a subtitle', () => {
  const self = renderable({ _hass: { states: { 'sensor.a': sensor('sensor.a', { deliveries: [] }) } } });
  self.setConfig({ entity: 'sensor.a', show_icon: false, show_refresh: true });
  const html = self.header.innerHTML;
  assert.ok(html.includes('<span class="status">1 active</span>'), html);
  assert.ok(!html.includes('class="sub"'), html);
  // Inside the right-hand group, before the buttons.
  assert.ok(html.indexOf('class="buttons"') < html.indexOf('class="status"'), html);
  assert.ok(html.indexOf('class="status"') < html.indexOf('refresh-btn'), html);
});

test('an unavailable Parcel sensor is still found through the entity registry', () => {
  const hass = {
    states: { 'sensor.other': { state: '3', attributes: {} }, 'sensor.parcel_deliveries': { state: 'unavailable', attributes: {} } },
    entities: { 'sensor.other': { platform: 'other' }, 'sensor.parcel_deliveries': { platform: 'parcel' } },
  };
  assert.equal(ParcelCard._findEntity(hass), 'sensor.parcel_deliveries');
});

test('the language option wins over the Home Assistant language', () => {
  assert.equal(parcelLang({ language: 'fr' }, { language: 'de' }), 'de');
  assert.equal(parcelLang({ language: 'fr' }, { language: '' }), 'fr');
  assert.equal(parcelLang({ language: 'fr' }, { language: 'xx' }), 'en');
});

// An unavailable sensor has no attributes: the account comes from the entity and device registries.
const unavailableHass = (extra = {}) => ({
  states: { 'sensor.parcel_deliveries': { entity_id: 'sensor.parcel_deliveries', state: 'unavailable', attributes: {} } },
  entities: { 'sensor.parcel_deliveries': { platform: 'parcel', device_id: 'dev1' } },
  devices: { dev1: { config_entries: ['entry_b'] } },
  ...extra,
});

test('with the sensor unavailable, refresh still targets its Parcel account', async () => {
  const calls = [];
  const hass = unavailableHass({ callService: (...args) => { calls.push(args); return Promise.resolve(); } });
  const self = renderable({ _hass: hass });
  self.setConfig({ entity: 'sensor.parcel_deliveries', show_icon: false });
  self._refresh();
  await flush();
  assert.equal(calls.length, 1);
  assert.deepEqual({ ...calls[0][2] }, { config_entry_id: 'entry_b' });
});

test('with the sensor unavailable, the carriers request targets its Parcel account', async () => {
  const msgs = [];
  const hass = unavailableHass({ callWS: (msg) => { msgs.push(msg); return Promise.resolve({ carriers: {} }); } });
  const self = { _hass: hass, _config: { entity: 'sensor.parcel_deliveries' }, _lastState: hass.states['sensor.parcel_deliveries'], _entityId: card._entityId, _entryId: card._entryId };
  card._loadCarriers.call(self);
  await flush();
  assert.deepEqual({ ...msgs[0] }, { type: 'parcel/carriers', config_entry_id: 'entry_b' });
});

test('with the sensor unavailable, adding a delivery targets its Parcel account', async () => {
  const calls = [];
  const hass = unavailableHass({ callService: (...args) => { calls.push(args); return Promise.resolve(); } });
  const fields = { tracking: { value: '1Z' }, carrier: { value: 'ups' }, description: { value: 'Shoes' }, push: { checked: false } };
  const form = { querySelector: (sel) => (sel === '.msg' ? {} : sel === '.submit' ? { disabled: false } : fields[sel.slice(6, -1)]) };
  const self = renderable({ _hass: hass, _carriers: { ups: 'UPS' } });
  self._root = { querySelector: () => form };
  self.setConfig.call(Object.assign(self, { _render() {} }), { entity: 'sensor.parcel_deliveries' });
  self._submit();
  await flush();
  assert.equal(calls.length, 1);
  assert.equal(calls[0][2].config_entry_id, 'entry_b');
});

test('the account is left out when neither the attribute nor the registries know it', () => {
  const st = { state: 'unavailable', attributes: {} };
  const base = { _config: { entity: 'sensor.a' }, _lastState: st, _entityId: card._entityId };
  // Older Home Assistant without hass.entities / hass.devices.
  assert.equal(card._entryId.call({ ...base, _hass: { states: { 'sensor.a': st } } }), null);
  // Entity without a device, or device unknown.
  assert.equal(card._entryId.call({ ...base, _hass: { states: {}, entities: { 'sensor.a': {} }, devices: {} } }), null);
  assert.equal(card._entryId.call({ ...base, _hass: { states: {}, entities: { 'sensor.a': { device_id: 'x' } }, devices: {} } }), null);
  // The attribute wins over the registries.
  const ok = sensor('sensor.a');
  assert.equal(card._entryId.call({ ...base, _lastState: ok, _hass: unavailableHass() }), 'abc');
});
