// The card's other sources: 17TRACK and AfterShip deliveries read into Parcel's shape, fetched, refreshed and added.
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
vm.runInContext(
  `${source}\nthis.parcel = { ParcelCard, parcelEditorSchema, parcelFrom17Track, parcelFromAftership, parcelFindSourceEntity, parcelSourceOf, parcelSourceStatus, PARCEL_17_REQUESTS };`,
  context,
);
const { ParcelCard, parcelEditorSchema, parcelFrom17Track, parcelFromAftership, parcelFindSourceEntity, parcelSourceOf, parcelSourceStatus, PARCEL_17_REQUESTS } = context.parcel;
const clear17 = () => {
  for (const k of Object.keys(PARCEL_17_REQUESTS)) delete PARCEL_17_REQUESTS[k];
};
const card = ParcelCard.prototype;
const json = (v) => JSON.parse(JSON.stringify(v));
const flush = () => new Promise((resolve) => setImmediate(resolve));
const hass = (extra = {}) => ({ language: 'en', locale: { language: 'en' }, states: {}, entities: {}, devices: {}, ...extra });

test('the source of a configuration: Parcel unless 17TRACK or AfterShip is named', () => {
  assert.equal(parcelSourceOf({}), 'parcel');
  assert.equal(parcelSourceOf(undefined), 'parcel');
  assert.equal(parcelSourceOf({ source: 'seventeentrack' }), 'seventeentrack');
  assert.equal(parcelSourceOf({ source: 'aftership' }), 'aftership');
  assert.equal(parcelSourceOf({ source: 'other' }), 'parcel');
});

test('17TRACK and AfterShip statuses map to Parcel states', () => {
  const s17 = (v) => parcelSourceStatus('seventeentrack', v).status;
  assert.equal(s17('In Transit'), 'in_transit');
  assert.equal(s17('Ready to be Picked Up'), 'awaiting_pickup');
  assert.equal(s17('Delivered'), 'delivered');
  assert.equal(s17('Undelivered'), 'failed_attempt');
  assert.equal(s17('Alert'), 'exception');
  assert.equal(s17('Expired'), 'frozen');
  assert.equal(s17('Not Found'), 'not_found');
  assert.equal(parcelSourceStatus('seventeentrack', 'Delivered').status_code, 0);
  const as = (v) => parcelSourceStatus('aftership', v).status;
  assert.equal(as('InTransit'), 'in_transit');
  assert.equal(as('OutForDelivery'), 'out_for_delivery');
  assert.equal(as('AttemptFail'), 'failed_attempt');
  assert.equal(as('AvailableForPickup'), 'awaiting_pickup');
  assert.equal(as('InfoReceived'), 'info_received');
  assert.equal(as('Pending'), 'not_found');
  assert.equal(as('Delivered'), 'delivered');
});

test('17TRACK packages become deliveries: name, state, last event, route, active count', () => {
  const st = parcelFrom17Track(hass(), {}, [
    { tracking_number: 'LX123', friendly_name: 'Shoes', status: 'In Transit', info_text: 'Arrived at the sorting centre', location: 'Paris', timestamp: '2026-11-24T10:00:00+00:00', origin_country: 'China', destination_country: 'France' },
    { tracking_number: 'LX456', friendly_name: '', status: 'Delivered', info_text: '', location: '' },
    null,
  ]);
  assert.equal(st.state, '1');
  const [a, b] = st.attributes.deliveries;
  assert.deepEqual(json({ ...a, events: a.events.map((e) => ({ event: e.event, location: e.location })) }), {
    description: 'Shoes',
    carrier_code: '17track',
    carrier_name: 'China → France',
    date_expected: null,
    timestamp_expected: null,
    events: [{ event: 'Arrived at the sorting centre', location: 'Paris' }],
    tracking_number: 'LX123',
    status_code: 2,
    status: 'in_transit',
  });
  assert.match(a.events[0].date, /Nov/);
  assert.equal(b.status, 'delivered');
  assert.equal(b.carrier_name, '17TRACK');
  assert.deepEqual(json(b.events), []);
});

test('AfterShip trackings become deliveries; an unavailable sensor stays unavailable', () => {
  const raw = {
    state: '1',
    last_updated: 'x',
    attributes: {
      trackings: [
        { name: 'Book', tracking_number: '1Z9', slug: 'ups', status: 'OutForDelivery', expected_delivery: '2026-11-26', last_update: '2026-11-25T08:00:00+00:00', last_checkpoint: { message: 'Out for delivery', city: 'Lyon', country_name: 'France', checkpoint_time: '2026-11-25T07:30:00' } },
        { name: 'RU1NL', tracking_number: 'RU1NL', slug: 'postnl-international', status: 'Pending', last_checkpoint: 'Shipment pending' },
      ],
    },
  };
  const st = parcelFromAftership(hass(), {}, raw);
  assert.equal(st.state, '2');
  const [a, b] = st.attributes.deliveries;
  assert.equal(a.status, 'out_for_delivery');
  assert.equal(a.description, 'Book');
  assert.equal(a.carrier_name, 'ups');
  assert.equal(a.date_expected, '2026-11-26');
  assert.equal(a.events[0].event, 'Out for delivery');
  assert.equal(a.events[0].location, 'Lyon, France');
  // A tracking named after its number keeps its number alone.
  assert.equal(b.description, '');
  assert.equal(b.events[0].event, 'Shipment pending');
  assert.equal(parcelFromAftership(hass(), {}, { state: 'unavailable', attributes: {} }).state, 'unavailable');
  assert.equal(parcelFromAftership(hass(), {}, null), null);
});

test('the sensor of a source is found: the AfterShip one by its trackings, a 17TRACK one by its integration', () => {
  const h = hass({
    states: { 'sensor.aftership': { state: '0', attributes: { trackings: [] } }, 'sensor.17track_in_transit': { state: '1', attributes: {} } },
    entities: { 'sensor.17track_in_transit': { platform: 'seventeentrack', device_id: 'd1' } },
  });
  assert.equal(parcelFindSourceEntity(h, 'aftership'), 'sensor.aftership');
  assert.equal(parcelFindSourceEntity(h, 'seventeentrack'), 'sensor.17track_in_transit');
  assert.equal(parcelFindSourceEntity(hass(), 'seventeentrack'), null);
});

// A card instance without the DOM: its config, hass and the calls it makes.
const make = (config, h) => {
  clear17();
  const self = Object.create(card);
  Object.assign(self, { _config: config, _expanded: {}, _renders: 0 });
  self._render = function () {
    this._renders++;
  };
  self._t = () => ({ refresh_failed: 'Refresh failed:', required_source: 'required', adding: 'Adding…', added_source: 'added', submit: 'Add' });
  self._hass = h;
  return self;
};
const h17 = (calls, packages = [{ tracking_number: 'LX1', friendly_name: 'Shoes', status: 'In Transit' }]) =>
  hass({
    states: { 'sensor.17track_in_transit': { state: '1', attributes: {} } },
    entities: { 'sensor.17track_in_transit': { platform: 'seventeentrack', device_id: 'd1' } },
    devices: { d1: { config_entries: ['e17'] } },
    callService(domain, service, data, target, notify, response) {
      calls.push(json([domain, service, data, response ?? null]));
      return Promise.resolve(service === 'get_packages' ? { response: { packages } } : {});
    },
  });

test('17TRACK: its packages are asked with the account of its sensor, and shown once they come', async () => {
  const calls = [];
  const self = make({ source: 'seventeentrack' }, h17(calls));
  const first = self._sourceState(self._hass);
  assert.equal(first.state, '0', 'nothing yet');
  assert.deepEqual(calls[0], ['seventeentrack', 'get_packages', { config_entry_id: 'e17' }, true]);
  await flush();
  assert.equal(self._lastState.attributes.deliveries[0].description, 'Shoes');
  assert.ok(self._renders >= 1);
  // The same counts: not asked again.
  self._sourceState(self._hass);
  assert.equal(calls.length, 1);
  // A 17TRACK sensor changed: asked again.
  self._hass = { ...self._hass, states: { 'sensor.17track_in_transit': { state: '2', attributes: {} } } };
  self._sourceState(self._hass);
  assert.equal(calls.length, 2);
  // config_entry_id in YAML wins over the device's.
  assert.equal(make({ source: 'seventeentrack', config_entry_id: 'yaml' }, h17([]))._entryId(), 'yaml');
});

test('17TRACK: a failed request keeps the deliveries shown, is reported on refresh, unavailable only without any', async () => {
  const calls = [];
  const h = h17(calls);
  const self = make({ source: 'seventeentrack' }, h);
  self._sourceState(h);
  await flush();
  assert.equal(self._lastState.attributes.deliveries.length, 1);
  h.callService = () => Promise.reject(new Error('down'));
  self._refresh();
  await flush();
  await flush();
  await flush();
  assert.equal(self._lastState.attributes.deliveries.length, 1, 'kept');
  assert.match(String(self._refreshError), /^Refresh failed:/);
  assert.equal(self._refreshing, false);
  // Never had any: unavailable.
  const empty = make({ source: 'seventeentrack' }, { ...h17([]), callService: () => Promise.reject(new Error('down')) });
  empty._sourceState(empty._hass);
  await flush();
  await flush();
  assert.equal(empty._lastState.state, 'unavailable');
  assert.equal(empty._sourceText({ unavailable_source: '{source} is unavailable.' }, 'unavailable'), '17TRACK is unavailable.');
});

test('17TRACK: the cards of one account share a request; a sensor change asks again', async () => {
  const calls = [];
  const h = h17(calls);
  const a = make({ source: 'seventeentrack' }, h);
  const b = Object.assign(Object.create(card), { _config: { source: 'seventeentrack' }, _expanded: {}, _render() {}, _hass: h });
  a._sourceState(h);
  b._sourceState(h);
  await flush();
  assert.equal(calls.length, 1);
  assert.equal(b._lastState.attributes.deliveries[0].description, 'Shoes');
  // The registry is listed again only when it changes.
  const ids = a._ids17;
  a._sourceState({ ...h, states: { ...h.states } });
  assert.equal(a._ids17, ids);
});

test('back to Parcel in the editor: the sensor found for another source is looked up again', () => {
  const h = h17([]);
  h.states['sensor.parcel_deliveries'] = { state: '0', attributes: { deliveries: [], config_entry_id: 'p' } };
  const self = make({ source: 'seventeentrack' }, h);
  assert.equal(self._entityId(), 'sensor.17track_in_transit');
  self._config = {};
  assert.equal(self._entityId(), 'sensor.parcel_deliveries');
});

test('AfterShip: read from its sensor, the same object kept while the sensor does not change; refresh updates it', async () => {
  const calls = [];
  const raw = { state: '0', attributes: { trackings: [{ tracking_number: 'A1', status: 'InTransit' }] } };
  const h = hass({
    states: { 'sensor.aftership': raw },
    callService(...args) {
      calls.push(json(args.slice(0, 3)));
      return Promise.resolve();
    },
  });
  const self = make({ source: 'aftership' }, h);
  const a = self._sourceState(h);
  assert.equal(a.attributes.deliveries[0].tracking_number, 'A1');
  assert.equal(self._sourceState(h), a);
  assert.equal(self._entryId(), null);
  self._refresh();
  await flush();
  assert.deepEqual(calls[0], ['homeassistant', 'update_entity', { entity_id: 'sensor.aftership' }]);
  assert.equal(self._refreshing, false);
});

// The add form, as the card reads it.
const formOf = (values) => {
  const nodes = {};
  for (const [name, value] of Object.entries(values)) nodes[`[name=${name}]`] = { value };
  nodes['.msg'] = { className: '', textContent: '' };
  nodes['.submit'] = { disabled: false, textContent: 'Add' };
  return { querySelector: (sel) => nodes[sel] || null, nodes };
};

test('adding: 17TRACK add_package with the account, AfterShip add_tracking with the optional carrier', async () => {
  const calls = [];
  const self = make({ source: 'seventeentrack' }, h17(calls));
  const form = formOf({ tracking: 'LX9', description: 'Gift' });
  self._submitSource(form, 'LX9', '', 'Gift');
  await flush();
  assert.deepEqual(calls[0], ['seventeentrack', 'add_package', { package_tracking_number: 'LX9', package_friendly_name: 'Gift', config_entry_id: 'e17' }, null]);
  assert.equal(form.nodes['.msg'].textContent, 'added');
  assert.equal(form.nodes['[name=tracking]'].value, '');

  const asCalls = [];
  const as = make({ source: 'aftership' }, hass({ callService: (...a) => (asCalls.push(json(a)), Promise.resolve()) }));
  as._submitSource(formOf({}), '1Z9', 'UPS', 'Book');
  as._submitSource(formOf({}), '1Z8', '', 'Lamp');
  await flush();
  assert.deepEqual(asCalls[0], ['aftership', 'add_tracking', { tracking_number: '1Z9', title: 'Book', slug: 'ups' }]);
  assert.deepEqual(asCalls[1], ['aftership', 'add_tracking', { tracking_number: '1Z8', title: 'Lamp' }]);
  const empty = formOf({});
  as._submitSource(empty, '', '', 'x');
  assert.equal(empty.nodes['.msg'].textContent, 'required');
});

test('the editor offers the source first, and lists the sensors of the chosen one', () => {
  const schema = parcelEditorSchema({}, 'aftership');
  assert.equal(schema[0].name, 'source');
  assert.deepEqual(json(schema[0].selector.select.options.map((o) => o.label)), ['Parcel', '17TRACK', 'AfterShip']);
  assert.equal(schema[1].selector.entity.integration, 'aftership');
  assert.equal(parcelEditorSchema({})[1].selector.entity.integration, 'parcel');
});
