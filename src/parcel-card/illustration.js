// ── The illustration: a street with houses, and the delivery van of the featured parcel ──────────────────────
// Every animation lasts 8 s or a divisor of it, so a recording of 8 s loops. The scenery is drawn in a 200 × 80 box
// whose bottom 5 units overlap the road strip; the van's wheels roll on that strip, the houses stand at y = 75.
// The scene of the header follows the featured parcel (parcelFeatured): `drop` the van brings it to the door,
// `transit` the van drives by, `pickup` it waits in the parcel shop, `failed` the van leaves a notice on the door,
// `delivered` it lies on the doorstep, `idle` a quiet street.
import { ParcelI18n } from "./i18n/parceli18n.js";

export var PARCEL_SCENE_OF = {
  out_for_delivery: 'drop', awaiting_pickup: 'pickup', failed_attempt: 'failed', exception: 'failed', delivered: 'delivered',
};
// The parcel the mini card puts forward: a problem first, then the one at the door, the one to pick up, the rest.
export var PARCEL_FEATURE_RANK = { failed_attempt: 0, exception: 0, out_for_delivery: 1, awaiting_pickup: 2, in_transit: 3, info_received: 4 };

export var PARCEL_STARS = [[8, 8], [26, 22], [44, 6], [62, 28], [80, 12], [98, 4], [110, 30], [134, 8], [160, 20], [178, 6], [194, 14]];

export function parcelCloud(cls, x, y, s) {
  return `<g class="cloud ${cls}"><path transform="translate(${x} ${y}) scale(${s})" ` +
    'd="M-14,4 C-17,4 -18,0 -14.5,-1 C-14,-5 -8,-6 -6,-3 C-4,-8 4,-8 5,-2 C9,-3 12,0 10,4 Z"/></g>';
}

export var PARCEL_BOX = '<rect width="7" height="6" rx="1" class="box"/><path d="M3.5,0 V6" class="tape"/>';

// Each card instance passes its own uid, so the moon's mask id never clashes with another card on the page.
export var parcelScene = (uid) =>
  '<svg class="scene" viewBox="0 0 200 80" preserveAspectRatio="xMaxYMax slice" aria-hidden="true" focusable="false">' +
  '<g class="stars">' + PARCEL_STARS.map((s, i) => `<circle class="${i % 3 ? '' : 'tw'}" cx="${s[0]}" cy="${s[1]}" r=".6"/>`).join('') + '</g>' +
  '<g class="sun"><circle cx="100" cy="18" r="10" opacity=".28"/><circle cx="100" cy="18" r="6.5"/></g>' +
  `<mask id="parcel-moon-${uid}">`+'<rect width="200" height="80" fill="#fff"/><circle cx="103.5" cy="15.5" r="5.4" fill="#000"/></mask>' +
  '<g class="moon"><circle cx="100" cy="18" r="9" opacity=".12"/><circle cx="100" cy="18" r="6" mask="url(#parcel-moon-' + uid + ')"/></g>' +
  '<g class="clouds">' + parcelCloud('c1', 70, 15, 0.9) + parcelCloud('c2', 186, 36, 0.65) + '</g>' +
  '<path class="hill" d="M0,75 C30,70 52,62 82,63 C110,64 130,55 160,57 C180,58 190,54 200,55 L200,75 Z"/>' +
  '<g class="shop">' +
  '<rect x="97" y="59" width="27" height="16" class="wall"/><path d="M94,54 H127 L125,60 H96 Z" class="awning"/>' +
  '<path d="M100,54 V60 M106,54 V60 M112,54 V60 M118,54 V60 M124,54 V59" class="stripes"/>' +
  '<rect x="100" y="63" width="9" height="12" class="win"/><rect x="112" y="63" width="9" height="8" class="win"/>' +
  '<g class="waiting" transform="translate(113 65)">' + PARCEL_BOX + '</g></g>' +
  '<g class="house">' +
  '<rect x="142" y="57" width="28" height="18" class="wall"/><path d="M139.5,58 L156,45.5 L172.5,58 Z" class="roof"/>' +
  '<path d="M139.5,58 L156,45.5 L172.5,58" class="eave"/>' +
  '<rect x="145" y="61" width="5" height="4.5" class="win"/><rect x="162" y="61" width="5" height="4.5" class="win"/>' +
  '<rect x="152" y="64" width="8" height="11" class="door"/>' +
  '<g class="notice"><rect x="152.5" y="65" width="7" height="5" rx=".6"/><path d="M156,66 V68.2 M156,69 V69.3"/></g></g>' +
  '<g class="house small"><rect x="177" y="61" width="18" height="14" class="wall"/><path d="M175,62 L186,53 L197,62 Z" class="roof grey"/>' +
  '<rect x="183.5" y="65" width="5" height="4.5" class="win"/></g>' +
  '<g class="left" transform="translate(147 69)">' + PARCEL_BOX +
  '<g class="tick"><circle cx="8" cy="-1.5" r="3"/><path d="M6.6,-1.5 L7.6,-.5 L9.5,-2.6"/></g></g>' +
  '<g class="carried">' + PARCEL_BOX + '</g>' +
  '<g class="van"><g class="bodywork">' +
  '<rect x="0" y="60" width="22" height="14" rx="2" class="cargo"/><rect x="3" y="64" width="10" height="2.5" rx="1.2" class="stripe"/>' +
  '<path d="M22,64 H28 L32.5,69 V74 H22 Z" class="cab"/><path d="M24,65.5 H27.4 L30,68.6 H24 Z" class="glass"/>' +
  '<path d="M32.5,70.5 L46,67 V76 Z" class="beam"/><circle cx="32" cy="71.5" r="1" class="lamp"/></g>' +
  '<circle cx="6.5" cy="76.5" r="3" class="wheel"/><circle cx="26.5" cy="76.5" r="3" class="wheel"/></g>' +
  '</svg>';

// Night illustration: forced by illustration_theme, else Home Assistant's dark theme alone (a light sky on a dark
// dashboard glares; a light theme keeps the day sky after sunset).
export function parcelNight(hass, config) {
  var mode = config?.illustration_theme;
  if (mode === 'night') return true;
  if (mode === 'day') return false;
  return !!hass?.themes?.darkMode;
}

// The featured parcel: the most pressing active one (PARCEL_FEATURE_RANK, then the list order: expected date),
// else the first delivered one; null without any parcel.
export function parcelFeatured(deliveries) {
  var active = deliveries.filter((d) => d.status_code !== 0);
  if (!active.length) return deliveries[0] || null;
  var rank = (d) => (d.status in PARCEL_FEATURE_RANK ? PARCEL_FEATURE_RANK[d.status] : 5);
  return active.reduce((best, d) => (rank(d) < rank(best) ? d : best), active[0]);
}

// Colour of the header icon: the state of the featured parcel (out for delivery / in transit, awaiting pickup,
// delivered, failed attempt or exception), a neutral grey without any parcel or with the sensor unavailable.
// The header's status pill: a dot and the state of the featured parcel, in the header icon's colour.
export var PARCEL_CHIP = '<span class="chip st" hidden><span class="dot"></span><span class="txt"></span></span>';

export function parcelHeaderColor(d) {
  if (!d) return 'var(--disabled-text-color, #9e9e9e)';
  var key = d.status in PARCEL_STATUS_STYLE ? d.status : d.status_code === 0 ? 'delivered' : 'in_transit';
  if (key === 'info_received' || key === 'unknown') key = 'in_transit';
  return PARCEL_STATUS_STYLE[key].color;
}

export function parcelSceneOf(d) {
  if (!d) return 'idle';
  return PARCEL_SCENE_OF[d.status] || (d.status_code === 0 ? 'delivered' : 'transit');
}

export var PARCEL_STATUS_STYLE = {
  delivered: { icon: 'mdi:package-variant-closed-check', color: 'var(--success-color, #43a047)' },
  frozen: { icon: 'mdi:snowflake', color: 'var(--disabled-text-color, #9e9e9e)' },
  in_transit: { icon: 'mdi:truck-fast-outline', color: 'var(--info-color, #039be5)' },
  awaiting_pickup: { icon: 'mdi:store-marker-outline', color: 'var(--warning-color, #ffa600)' },
  out_for_delivery: { icon: 'mdi:truck-delivery-outline', color: 'var(--primary-color, #03a9f4)' },
  not_found: { icon: 'mdi:help-circle-outline', color: 'var(--disabled-text-color, #9e9e9e)' },
  failed_attempt: { icon: 'mdi:alert-circle-outline', color: 'var(--error-color, #db4437)' },
  exception: { icon: 'mdi:alert-outline', color: 'var(--error-color, #db4437)' },
  info_received: { icon: 'mdi:package-variant', color: 'var(--secondary-text-color, #727272)' },
  unknown: { icon: 'mdi:package-variant', color: 'var(--secondary-text-color, #727272)' },
};

export function parcelEsc(s) {
  return String(s == null ? '' : s).replace(/[&<>"']/g, (ch) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[ch]));
}

// Service errors carry a translation key (the `exceptions` of the integration's translations): show them in the
// Home Assistant language of the user, else the message the backend already translated in the server language.
export function parcelErrorText(hass, err) {
  var fallback = String(err?.message || err || '').replace(/^Validation error: /, '');
  var key = err?.translation_key;
  if (!key || err.translation_domain !== 'parcel' || typeof hass?.loadBackendTranslation !== 'function') {
    return Promise.resolve(fallback);
  }
  return Promise.resolve(hass.loadBackendTranslation('exceptions', 'parcel'))
    .then((localize) => (localize || hass.localize)(`component.parcel.exceptions.${key}.message`, err.translation_placeholders || {}) || fallback)
    .catch(() => fallback);
}

// Adding a delivery is an admin-only service: hide the button from other users (true while hass.user is unknown).
export function parcelIsAdmin(hass) {
  return hass?.user?.is_admin !== false;
}

// Parcel sends placeholders such as "--//--" when the carrier gave no date.
export function parcelDate(s) {
  return /\d/.test(String(s || '')) ? String(s) : '';
}

// Parse a Parcel expected date into milliseconds (NaN when unparseable). "YYYY-MM-DD HH:MM:SS"
// needs the "T" for Safari/WebKit, and a date alone ("YYYY-MM-DD") is read by Date.parse as UTC
// midnight, i.e. the day before west of UTC: give it a local midnight instead.
export function parcelParseDate(raw) {
  var s = String(raw || '').trim().replace(' ', 'T');
  if (/^\d{4}-\d{2}-\d{2}$/.test(s)) s += 'T00:00:00';
  return Date.parse(s);
}

// The card's `language` option wins over the Home Assistant language. A full code the card knows
// (sr-Latn) is kept, otherwise its part before the dash (fr-FR gives fr, pt-BR gives the European
// Portuguese pt), otherwise English.
export function parcelLang(hass, config) {
  var lang = String(config?.language || (hass && (hass.locale?.language || hass.language)) || navigator.language || 'en');
  if (ParcelI18n[lang]) return lang;
  lang = lang.split('-')[0];
  return ParcelI18n[lang] ? lang : 'en';
}

// Locale for Intl / toLocale*: the full code (fr-CA, pt-BR) of the card's `language` option, else of
// Home Assistant, when its base is the card's resolved language, otherwise the resolved language.
// Plain "pt" is European Portuguese in Home Assistant but Brazilian in Intl, so it becomes pt-PT.
// The sr / sr-Latn scripts never mix.
export function parcelLocale(hass, config) {
  var lang = parcelLang(hass, config);
  var full = String(config?.language || (hass && (hass.locale?.language || hass.language)) || '');
  var sameScript = /-Latn\b/i.test(full) === /-Latn\b/i.test(lang);
  var locale = full && full.split('-')[0] === lang.split('-')[0] && sameScript ? full : lang;
  return locale === 'pt' ? 'pt-PT' : locale;
}
