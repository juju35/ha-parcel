// ── parcel-card-editor ────────────────────────────────────────────────────────
import { PARCEL_CARD_VERSION, pickerDefine } from "./card-picker.js";
import { PARCEL_DEFAULTS } from "./i18n-helpers.js";
import { parcelLang } from "./illustration.js";
import { ParcelCard } from "./parcel-card-2.js";
import { ParcelMiniCard } from "./parcel-mini-card.js";
import { ParcelI18n } from "./i18n/parceli18n.js";
import { PARCEL_SOURCE_NAMES, PARCEL_SOURCES } from "./sources.js";

// `source`: where the deliveries come from (Parcel, 17TRACK or AfterShip); the entity picker lists its sensors.
export function parcelEditorSchema(t, source) {
  return [
    {
      name: 'source',
      selector: { select: { mode: 'dropdown', options: PARCEL_SOURCES.map((s) => ({ value: s, label: PARCEL_SOURCE_NAMES[s] })) } },
    },
    { name: 'entity', selector: { entity: { domain: 'sensor', integration: source || 'parcel' } } },
    { name: 'title', selector: { text: {} } },
    {
      type: 'grid',
      name: '',
      schema: [
        { name: 'show_title', selector: { boolean: {} } },
        { name: 'show_delivered', selector: { boolean: {} } },
        { name: 'show_refresh', selector: { boolean: {} } },
        { name: 'show_add', selector: { boolean: {} } },
        { name: 'illustration', selector: { boolean: {} } },
        { name: 'illustration_background', selector: { boolean: {} } },
      ],
    },
    {
      name: 'illustration_theme',
      selector: {
        select: {
          mode: 'dropdown',
          options: [
            { value: 'auto', label: t.theme_auto },
            { value: 'day', label: t.theme_day },
            { value: 'night', label: t.theme_night },
          ],
        },
      },
    },
    { name: 'max_events', selector: { number: { min: 1, max: 20, mode: 'box' } } },
    {
      name: 'language',
      selector: {
        select: {
          mode: 'dropdown',
          options: [
            { value: '', label: t.lang_auto },
            { value: 'en', label: 'English' },
            { value: 'fr', label: 'Français' },
            { value: 'de', label: 'Deutsch' },
            { value: 'es', label: 'Español' },
            { value: 'sr', label: 'Српски' },
            { value: 'sr-Latn', label: 'Srpski (latinica)' },
            { value: 'it', label: 'Italiano' },
            { value: 'nl', label: 'Nederlands' },
            { value: 'pt', label: 'Português (Portugal)' },
            { value: 'pl', label: 'Polski' },
            { value: 'ro', label: 'Română' },
            { value: 'da', label: 'Dansk' },
            { value: 'sv', label: 'Svenska' },
            { value: 'bg', label: 'Български' },
            { value: 'ru', label: 'Русский' },
            { value: 'uk', label: 'Українська' },
            { value: 'hu', label: 'Magyar' },
            { value: 'sk', label: 'Slovenčina' },
            { value: 'cs', label: 'Čeština' },
            { value: 'sl', label: 'Slovenščina' },
            { value: 'lv', label: 'Latviešu' },
            { value: 'el', label: 'Ελληνικά' },
          ],
        },
      },
    },
  ];
}

export class ParcelCardEditor extends HTMLElement {
  setConfig(config) {
    this._config = Object.assign({}, config);
    this._render();
  }

  set hass(hass) {
    this._hass = hass;
    if (this._form) this._form.hass = hass;
    else this._render();
  }

  _render() {
    if (!this._hass || !this._config) return;
    if (!this._form) {
      this._form = document.createElement('ha-form');
      this._form.addEventListener('value-changed', this._valueChanged.bind(this));
      this.appendChild(this._form);
    }
    // The labels follow the language picked in the editor: rebuilt only when it changes.
    var lang = parcelLang(this._hass, this._config);
    var source = this._config.source || 'parcel';
    if (lang !== this._lang || source !== this._schemaSource) {
      this._lang = lang;
      this._schemaSource = source;
      var t = ParcelI18n[lang].editor;
      this._form.schema = parcelEditorSchema(t, source);
      this._form.computeLabel = (field) => t[field.name] || field.name;
    }
    this._form.hass = this._hass;
    // Show the defaults as set, so the toggles match what the card does.
    this._form.data = Object.assign({ source: 'parcel' }, PARCEL_DEFAULTS, this._config);
  }

  _valueChanged(ev) {
    var value = Object.assign({}, ev.detail.value);
    // Keep the YAML short: drop options left at their default.
    Object.keys(PARCEL_DEFAULTS).forEach((key) => {
      if (value[key] === PARCEL_DEFAULTS[key]) delete value[key];
    });
    if (!value.title) delete value.title;
    // Another source: the sensor picked for the previous one no longer applies.
    if ((value.source || 'parcel') !== (this._config.source || 'parcel')) delete value.entity;
    if (value.source === 'parcel') delete value.source;
    if (!value.entity) delete value.entity;
    if (!value.language) delete value.language;
    this._config = value;
    this.dispatchEvent(new CustomEvent('config-changed', { detail: { config: value }, bubbles: true, composed: true }));
  }
}

if (!customElements.get('parcel-card-editor')) {
  pickerDefine('parcel-card-editor', ParcelCardEditor);
}

export var parcelDefined = false;
if (!customElements.get('parcel-card')) {
  pickerDefine('parcel-card', ParcelCard);
  parcelDefined = true;
  window.customCards = window.customCards || [];
  window.customCards.push({
    type: 'parcel-card',
    name: 'Parcel',
    description: 'Deliveries tracked in Parcel, 17TRACK or AfterShip under an animated street, with a form to add one.',
    preview: true,
    documentationURL: 'https://github.com/juju35/ha-parcel',
  });
}
if (!customElements.get('parcel-mini-card')) {
  pickerDefine('parcel-mini-card', ParcelMiniCard);
  parcelDefined = true;
  window.customCards = window.customCards || [];
  window.customCards.push({
    type: 'parcel-mini-card',
    name: 'Parcel mini',
    description: 'The featured delivery of Parcel, 17TRACK or AfterShip on an animated street, with a button to show the full card.',
    preview: true,
    documentationURL: 'https://github.com/juju35/ha-parcel',
  });
}
if (parcelDefined) {
  console.info(`%c PARCEL-CARD %c v${PARCEL_CARD_VERSION} `, 'color:#fff;background:#f59e0b;font-weight:700', 'color:#f59e0b;background:#fff');
}
