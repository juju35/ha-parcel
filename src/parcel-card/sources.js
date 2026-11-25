// ── sources ───────────────────────────────────────────────────────────────────
// The card shows Parcel's deliveries, or those of 17TRACK or AfterShip (for those without Parcel, an Apple-only
// app). Each source is read into Parcel's own delivery shape (status_code, status, events…), so that the rest of
// the card does not know where a delivery comes from.
import { parcelLocale } from "./illustration.js";

export var PARCEL_SOURCES = ['parcel', 'seventeentrack', 'aftership'];
// The source of a card configuration: Parcel unless `source` names another one.
export function parcelSourceOf(config) {
  return PARCEL_SOURCES.indexOf(config?.source) > 0 ? config.source : 'parcel';
}
export var PARCEL_SOURCE_NAMES = { parcel: 'Parcel', seventeentrack: '17TRACK', aftership: 'AfterShip' };

// Parcel's status codes, by key (see custom_components/parcel/const.py STATUS_KEYS).
var PARCEL_CODES = { delivered: 0, frozen: 1, in_transit: 2, awaiting_pickup: 3, out_for_delivery: 4, not_found: 5, failed_attempt: 6, exception: 7, info_received: 8 };
var PARCEL_KEYS = Object.fromEntries(Object.entries(PARCEL_CODES).map(([k, v]) => [v, k]));

// « Ready to be Picked Up », « InTransit », « out_for_delivery » → ready_to_be_picked_up, in_transit, out_for_delivery.
function parcelSlug(s) {
  return String(s == null ? '' : s).trim().replace(/([a-z])([A-Z])/g, '$1_$2').replace(/[\s-]+/g, '_').toLowerCase();
}

// 17TRACK statuses (the integration's package states).
var PARCEL_17_STATUS = {
  not_found: 'not_found',
  in_transit: 'in_transit',
  expired: 'frozen',
  ready_to_be_picked_up: 'awaiting_pickup',
  available_for_pickup: 'awaiting_pickup',
  undelivered: 'failed_attempt',
  delivery_failure: 'failed_attempt',
  delivered: 'delivered',
  alert: 'exception',
  exception: 'exception',
  out_for_delivery: 'out_for_delivery',
  info_received: 'info_received',
};
// AfterShip tags.
var PARCEL_AS_STATUS = {
  pending: 'not_found',
  info_received: 'info_received',
  in_transit: 'in_transit',
  out_for_delivery: 'out_for_delivery',
  attempt_fail: 'failed_attempt',
  delivered: 'delivered',
  available_for_pickup: 'awaiting_pickup',
  exception: 'exception',
  expired: 'frozen',
};

export function parcelSourceStatus(source, status) {
  var map = source === 'aftership' ? PARCEL_AS_STATUS : PARCEL_17_STATUS;
  var key = map[parcelSlug(status)] || 'in_transit';
  return { status: key, status_code: PARCEL_CODES[key] };
}

// An event date as the card shows Parcel's (a short date and time), from an ISO time.
function parcelEventDate(hass, config, iso) {
  if (!iso) return '';
  var ms = Date.parse(iso);
  if (Number.isNaN(ms)) return String(iso);
  return new Date(ms).toLocaleString(parcelLocale(hass, config), { day: 'numeric', month: 'short', hour: '2-digit', minute: '2-digit' });
}

function parcelDelivery(fields) {
  return Object.assign({ description: '', carrier_code: '', carrier_name: '', date_expected: null, timestamp_expected: null, events: [] }, fields, {
    status: PARCEL_KEYS[fields.status_code] || 'unknown',
  });
}

// A state like the Parcel sensor's: the active count, and the deliveries in Parcel's shape.
function parcelSourceState(deliveries, extra) {
  return Object.assign({ state: String(deliveries.filter((d) => d.status_code !== 0).length), attributes: { deliveries } }, extra || {});
}

// 17TRACK: the packages of seventeentrack.get_packages (tracking_number, friendly_name, status, info_text, location,
// timestamp, origin_country, destination_country, package_type).
export function parcelFrom17Track(hass, config, packages) {
  var deliveries = (Array.isArray(packages) ? packages : []).filter((p) => p && p.tracking_number).map((p) => {
    var st = parcelSourceStatus('seventeentrack', p.status);
    var route = [p.origin_country, p.destination_country].filter((c) => c && !/^unknown$/i.test(c)).join(' → ');
    return parcelDelivery({
      tracking_number: String(p.tracking_number),
      description: p.friendly_name || '',
      carrier_code: '17track',
      carrier_name: route || '17TRACK',
      status_code: st.status_code,
      events: p.info_text ? [{ event: p.info_text, date: parcelEventDate(hass, config, p.timestamp), location: p.location || '' }] : [],
    });
  });
  return parcelSourceState(deliveries);
}

// AfterShip: the `trackings` attribute of its sensor (name, tracking_number, slug, last_update, expected_delivery,
// status, last_checkpoint as an object or a message).
export function parcelFromAftership(hass, config, st) {
  if (!st || st.state === 'unavailable' || st.state === 'unknown') return st ? { state: st.state, attributes: {} } : null;
  var deliveries = (Array.isArray(st.attributes?.trackings) ? st.attributes.trackings : []).filter((t) => t && t.tracking_number).map((t) => {
    var status = parcelSourceStatus('aftership', t.status);
    var cp = t.last_checkpoint;
    var event = cp && typeof cp === 'object'
      ? { event: cp.message || '', date: parcelEventDate(hass, config, cp.checkpoint_time || cp.created_at || t.last_update), location: cp.location || [cp.city, cp.country_name].filter(Boolean).join(', ') }
      : cp ? { event: String(cp), date: parcelEventDate(hass, config, t.last_update), location: '' } : null;
    return parcelDelivery({
      tracking_number: String(t.tracking_number),
      description: t.name && t.name !== t.tracking_number ? t.name : '',
      carrier_code: t.slug || '',
      carrier_name: t.slug || 'AfterShip',
      status_code: status.status_code,
      date_expected: t.expected_delivery || null,
      events: event && event.event ? [event] : [],
    });
  });
  return parcelSourceState(deliveries, { last_updated: st.last_updated });
}

// The sensor a source is read from, without one configured: the AfterShip sensor (its `trackings` attribute), or
// any 17TRACK sensor (its device gives the account).
export function parcelFindSourceEntity(hass, source) {
  if (!hass?.states) return null;
  if (source === 'aftership') {
    return Object.keys(hass.states).find((id) => id.indexOf('sensor.') === 0 && Array.isArray(hass.states[id].attributes?.trackings)) || null;
  }
  var entities = hass.entities || {};
  return Object.keys(entities).find((id) => id.indexOf('sensor.') === 0 && entities[id].platform === source && hass.states[id]) || null;
}
