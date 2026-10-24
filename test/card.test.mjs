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
  assert.equal(parcelLang({ locale: { language: 'xx' } }), 'en');
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
    _lastState: sensor('sensor.a'),
    _root: { querySelector: () => datalist },
    _hass: { callWS: (msg) => { calls.push(msg); return Promise.resolve(answers.shift()); } },
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
    _lastState: null,
    _root: { querySelector: () => ({}) },
    _hass: { callWS: () => (++n === 1 ? Promise.reject(new Error('down')) : Promise.resolve({ carriers: { ups: 'UPS' } })) },
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
