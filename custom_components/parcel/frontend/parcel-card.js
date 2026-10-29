var PARCEL_CARD_VERSION = '0.10.0';

// ── Integration icon (same drawing as brand/icon.png) ────────────────────────
var PARCEL_ICON = 'data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHZpZXdCb3g9IjAgMCAyNTYgMjU2Ij48cmVjdCB4PSI4IiB5PSI4IiB3aWR0aD0iMjQwIiBoZWlnaHQ9IjI0MCIgcng9IjU2IiBmaWxsPSIjRjU5RTBCIi8+PGcgZmlsbD0ibm9uZSIgc3Ryb2tlPSIjZmZmIiBzdHJva2Utd2lkdGg9IjE0IiBzdHJva2UtbGluZWpvaW49InJvdW5kIiBzdHJva2UtbGluZWNhcD0icm91bmQiPjxwYXRoIGQ9Ik0xMjggNTIgTDIwMCA5MCBMMjAwIDE3MCBMMTI4IDIwOCBMNTYgMTcwIEw1NiA5MCBaIi8+PHBhdGggZD0iTTU2IDkwIEwxMjggMTI4IEwyMDAgOTAiLz48cGF0aCBkPSJNMTI4IDEyOCBMMTI4IDIwOCIvPjxwYXRoIGQ9Ik05MiA3MSBMMTY0IDEwOSBMMTY0IDE0MCIvPjwvZz48L3N2Zz4=';

// ── i18n ──────────────────────────────────────────────────────────────────────
var ParcelI18n = {
  fr: {
    default_title: 'Colis',
    empty: 'Aucun colis à afficher',
    no_entity: 'Capteur Parcel introuvable. Ajoutez l\'intégration Parcel ou renseignez « entity ».',
    unavailable: 'Parcel est indisponible. Les colis s\'afficheront après la prochaine mise à jour réussie.',
    in_progress: 'en cours',
    expected: 'Prévu :',
    add: 'Ajouter un colis',
    refresh: 'Actualiser',
    refresh_failed: 'Actualisation impossible :',
    tracking_number: 'Numéro de suivi',
    carrier: 'Transporteur',
    carrier_search: 'Rechercher un transporteur',
    description: 'Description',
    push: 'Notification de confirmation Parcel',
    submit: 'Ajouter',
    cancel: 'Annuler',
    adding: 'Ajout…',
    added: 'Colis ajouté. Il apparaîtra après la prochaine mise à jour de Parcel.',
    unknown_carrier: 'Choisissez un transporteur dans la liste.',
    required: 'Numéro de suivi, transporteur et description sont obligatoires.',
    limit: 'Parcel limite les ajouts à 20 par jour.',
    no_events: 'Aucun événement pour l\'instant',
    copy: 'Copier le numéro',
    editor: {
      entity: 'Capteur Parcel',
      title: 'Titre',
      show_icon: 'Afficher l\'icône',
      show_delivered: 'Afficher les colis livrés',
      show_add: 'Afficher le bouton d\'ajout',
      show_refresh: 'Afficher le bouton Actualiser',
      max_events: 'Événements affichés quand un colis est déplié',
      language: 'Langue',
      lang_auto: 'Automatique',
    },
    status: {
      delivered: 'Livré',
      frozen: 'Sans mise à jour',
      in_transit: 'En transit',
      awaiting_pickup: 'À retirer',
      out_for_delivery: 'En cours de livraison',
      not_found: 'Introuvable',
      failed_attempt: 'Échec de livraison',
      exception: 'Problème',
      info_received: 'Annoncé',
      unknown: 'Inconnu',
    },
  },
  en: {
    default_title: 'Deliveries',
    empty: 'No deliveries to show',
    no_entity: 'Parcel sensor not found. Add the Parcel integration or set "entity".',
    unavailable: 'Parcel is unavailable. The deliveries will show up after the next successful update.',
    in_progress: 'active',
    expected: 'Expected:',
    add: 'Add a delivery',
    refresh: 'Refresh',
    refresh_failed: 'Refresh failed:',
    tracking_number: 'Tracking number',
    carrier: 'Carrier',
    carrier_search: 'Search a carrier',
    description: 'Description',
    push: 'Parcel push confirmation',
    submit: 'Add',
    cancel: 'Cancel',
    adding: 'Adding…',
    added: 'Delivery added. It will show up after the next Parcel update.',
    unknown_carrier: 'Pick a carrier from the list.',
    required: 'Tracking number, carrier and description are required.',
    limit: 'Parcel allows 20 additions per day.',
    no_events: 'No events yet',
    copy: 'Copy tracking number',
    editor: {
      entity: 'Parcel sensor',
      title: 'Title',
      show_icon: 'Show icon',
      show_delivered: 'Show delivered parcels',
      show_add: 'Show add button',
      show_refresh: 'Show refresh button',
      max_events: 'Events shown when a parcel is expanded',
      language: 'Language',
      lang_auto: 'Auto',
    },
    status: {
      delivered: 'Delivered',
      frozen: 'No updates',
      in_transit: 'In transit',
      awaiting_pickup: 'Awaiting pickup',
      out_for_delivery: 'Out for delivery',
      not_found: 'Not found',
      failed_attempt: 'Failed attempt',
      exception: 'Exception',
      info_received: 'Info received',
      unknown: 'Unknown',
    },
  },
  de: {
    default_title: 'Sendungen',
    empty: 'Keine Sendungen vorhanden',
    no_entity: 'Parcel-Sensor nicht gefunden. Füge die Parcel-Integration hinzu oder setze „entity“.',
    unavailable: 'Parcel ist nicht verfügbar. Die Sendungen erscheinen nach der nächsten erfolgreichen Aktualisierung.',
    in_progress: 'aktiv',
    expected: 'Erwartet:',
    add: 'Sendung hinzufügen',
    refresh: 'Aktualisieren',
    refresh_failed: 'Aktualisierung fehlgeschlagen:',
    tracking_number: 'Sendungsnummer',
    carrier: 'Versanddienstleister',
    carrier_search: 'Versanddienstleister suchen',
    description: 'Beschreibung',
    push: 'Push-Bestätigung von Parcel',
    submit: 'Hinzufügen',
    cancel: 'Abbrechen',
    adding: 'Wird hinzugefügt…',
    added: 'Sendung hinzugefügt. Sie erscheint nach der nächsten Aktualisierung von Parcel.',
    unknown_carrier: 'Wähle einen Versanddienstleister aus der Liste.',
    required: 'Sendungsnummer, Versanddienstleister und Beschreibung sind erforderlich.',
    limit: 'Parcel erlaubt maximal 20 neue Sendungen pro Tag.',
    no_events: 'Noch keine Ereignisse',
    copy: 'Sendungsnummer kopieren',
    editor: {
      entity: 'Parcel-Sensor',
      title: 'Titel',
      show_icon: 'Symbol anzeigen',
      show_delivered: 'Zugestellte Sendungen anzeigen',
      show_add: 'Schaltfläche „Hinzufügen“ anzeigen',
      show_refresh: 'Schaltfläche „Aktualisieren“ anzeigen',
      max_events: 'Angezeigte Ereignisse bei aufgeklappter Sendung',
      language: 'Sprache',
      lang_auto: 'Automatisch',
    },
    status: {
      delivered: 'Zugestellt',
      frozen: 'Keine Aktualisierungen',
      in_transit: 'Unterwegs',
      awaiting_pickup: 'Zur Abholung bereit',
      out_for_delivery: 'In Zustellung',
      not_found: 'Nicht gefunden',
      failed_attempt: 'Fehlversuch',
      exception: 'Problem',
      info_received: 'Angekündigt',
      unknown: 'Unbekannt',
    },
  },
  es: {
    default_title: 'Envíos',
    empty: 'No hay envíos que mostrar',
    no_entity: 'No se encuentra el sensor de Parcel. Añade la integración Parcel o indica «entity».',
    unavailable: 'Parcel no está disponible. Los envíos aparecerán tras la próxima actualización correcta.',
    in_progress: 'en curso',
    expected: 'Previsto:',
    add: 'Añadir un envío',
    refresh: 'Actualizar',
    refresh_failed: 'No se pudo actualizar:',
    tracking_number: 'Número de seguimiento',
    carrier: 'Transportista',
    carrier_search: 'Buscar un transportista',
    description: 'Descripción',
    push: 'Confirmación push de Parcel',
    submit: 'Añadir',
    cancel: 'Cancelar',
    adding: 'Añadiendo…',
    added: 'Envío añadido. Aparecerá tras la próxima actualización de Parcel.',
    unknown_carrier: 'Elige un transportista de la lista.',
    required: 'El número de seguimiento, el transportista y la descripción son obligatorios.',
    limit: 'Parcel permite 20 envíos añadidos al día.',
    no_events: 'Aún no hay eventos',
    copy: 'Copiar el número de seguimiento',
    editor: {
      entity: 'Sensor de Parcel',
      title: 'Título',
      show_icon: 'Mostrar el icono',
      show_delivered: 'Mostrar los envíos entregados',
      show_add: 'Mostrar el botón Añadir',
      show_refresh: 'Mostrar el botón Actualizar',
      max_events: 'Eventos mostrados al desplegar un envío',
      language: 'Idioma',
      lang_auto: 'Automático',
    },
    status: {
      delivered: 'Entregado',
      frozen: 'Sin actualizaciones',
      in_transit: 'En tránsito',
      awaiting_pickup: 'Listo para recoger',
      out_for_delivery: 'En reparto',
      not_found: 'No encontrado',
      failed_attempt: 'Intento fallido',
      exception: 'Incidencia',
      info_received: 'Información recibida',
      unknown: 'Desconocido',
    },
  },
};

// Single source of the config defaults, shared by the card (setConfig) and the editor.
var PARCEL_DEFAULTS = { show_icon: true, show_delivered: true, show_add: true, show_refresh: true, max_events: 5 };

var PARCEL_STATUS_STYLE = {
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

function parcelEsc(s) {
  return String(s == null ? '' : s).replace(/[&<>"']/g, (ch) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[ch]));
}

// Parcel sends placeholders such as "--//--" when the carrier gave no date.
function parcelDate(s) {
  return /\d/.test(String(s || '')) ? String(s) : '';
}

// The card's `language` option wins over the Home Assistant language.
function parcelLang(hass, config) {
  var lang = (config?.language || (hass && (hass.locale?.language || hass.language)) || navigator.language || 'en').slice(0, 2);
  return ParcelI18n[lang] ? lang : 'en';
}

// ── parcel-card ───────────────────────────────────────────────────────────────
class ParcelCard extends HTMLElement {
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
    this._expanded = this._expanded || {};
    // Read the sensor now: with hass already set (visual editor, dashboard change), waiting for the
    // next hass update would show "sensor not found" meanwhile.
    var entityId = this._hass ? this._entityId() : null;
    this._lastState = entityId ? this._hass.states[entityId] || null : null;
    if (this._hass) this._render();
  }

  set hass(hass) {
    var first = !this._hass;
    this._hass = hass;
    var entityId = this._entityId();
    var st = entityId ? hass.states[entityId] : null;
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
    document.addEventListener('click', this._onOutside, true);
  }

  disconnectedCallback() {
    document.removeEventListener('click', this._onOutside, true);
  }

  getCardSize() {
    var st = this._lastState;
    var deliveries = st?.attributes && Array.isArray(st.attributes.deliveries) ? st.attributes.deliveries : [];
    // Count only the rows actually shown.
    if (this._config && !this._config.show_delivered) deliveries = deliveries.filter((d) => d.status_code !== 0);
    return 2 + deliveries.length;
  }

  getGridOptions() {
    return { columns: 12, min_columns: 6, rows: 'auto' };
  }

  // Without a configured entity, the Parcel sensor found is kept: scanning all the states on every hass update
  // (several times a second) is wasted work. It is looked up again only when it disappears.
  _entityId() {
    if (this._config?.entity) return this._config.entity;
    if (!this._autoEntity || !this._hass?.states[this._autoEntity]) this._autoEntity = ParcelCard._findEntity(this._hass);
    return this._autoEntity;
  }

  _t() {
    return ParcelI18n[parcelLang(this._hass, this._config)];
  }

  _ensureShell() {
    if (this._root) return;
    this._root = this.attachShadow({ mode: 'open' });
    this._root.innerHTML =
      '<style>' + ParcelCard._styles() + '</style>' +
      '<ha-card><div class="header"></div><div class="form" hidden></div><div class="list"></div></ha-card>';
    this._root.querySelector('.list').addEventListener('click', this._onListClick.bind(this));
  }

  _render() {
    if (!this._config || !this._hass) return;
    this._ensureShell();
    var t = this._t();
    var st = this._lastState;
    var header = this._root.querySelector('.header');
    var list = this._root.querySelector('.list');
    var title = this._config.title || t.default_title;

    if (!st) {
      header.innerHTML = `<div class="title">${this._iconHtml()}<div class="titles"><div class="name">${parcelEsc(title)}</div></div></div>`;
      list.innerHTML = `<div class="empty">${parcelEsc(t.no_entity)}</div>`;
      return;
    }

    // A failed update (rate limit, Parcel down) leaves the sensor unavailable, without its attributes:
    // say so instead of showing "unavailable active" and an empty list.
    var unavailable = st.state === 'unavailable' || st.state === 'unknown';
    var deliveries = (st.attributes?.deliveries || []).slice();
    if (!this._config.show_delivered) {
      deliveries = deliveries.filter((d) => d.status_code !== 0);
    }
    // Active first, then by expected date. Same ISO normalization as _formatExpected:
    // "YYYY-MM-DD HH:MM:SS" is not parseable by Safari/WebKit without the "T".
    var expectedTs = (d) => d.timestamp_expected || Date.parse(String(d.date_expected || '').replace(' ', 'T')) / 1000 || Infinity;
    deliveries.sort((a, b) => {
      var da = a.status_code === 0 ? 1 : 0, db = b.status_code === 0 ? 1 : 0;
      if (da !== db) return da - db;
      return expectedTs(a) - expectedTs(b);
    });

    header.innerHTML =
      '<div class="title">' + this._iconHtml() + '<div class="titles"><div class="name">' + parcelEsc(title) + '</div>' +
      // The refresh error survives re-renders (hass updates) until the next refresh attempt.
      (this._refreshError ? '<div class="sub error">' + parcelEsc(this._refreshError) + '</div>' : '') +
      '</div></div>' +
      '<div class="buttons">' +
      // Status pill on the right of the header (card convention), not a subtitle under the title.
      (unavailable ? '' : `<span class="status">${parcelEsc(st.state)} ${parcelEsc(t.in_progress)}</span>`) +
      (this._config.show_refresh
        ? `<ha-icon-button class="refresh-btn${this._refreshing ? ' spinning' : ''}" label="${parcelEsc(t.refresh)}" title="${parcelEsc(t.refresh)}"><ha-icon icon="mdi:refresh"></ha-icon></ha-icon-button>`
        : '') +
      (this._config.show_add
        ? `<ha-icon-button class="add-btn" label="${parcelEsc(t.add)}" title="${parcelEsc(t.add)}"><ha-icon icon="mdi:plus"></ha-icon></ha-icon-button>`
        : '') +
      '</div>';
    var addBtn = header.querySelector('.add-btn');
    if (addBtn) addBtn.addEventListener('click', this._toggleForm.bind(this));
    var refreshBtn = header.querySelector('.refresh-btn');
    if (refreshBtn) refreshBtn.addEventListener('click', this._refresh.bind(this));

    if (unavailable) {
      list.innerHTML = `<div class="empty">${parcelEsc(t.unavailable)}</div>`;
      return;
    }
    if (!deliveries.length) {
      list.innerHTML = `<div class="empty">${parcelEsc(t.empty)}</div>`;
      return;
    }
    list.innerHTML = deliveries.map((d) => this._renderDelivery(d, t)).join('');
  }

  _iconHtml() {
    return this._config.show_icon ? `<img class="logo" src="${PARCEL_ICON}" alt="">` : '';
  }

  _renderDelivery(d, t) {
    var key = d.status || 'unknown';
    var style = PARCEL_STATUS_STYLE[key] || PARCEL_STATUS_STYLE.unknown;
    var id = `${d.carrier_code}:${d.tracking_number}`;
    var expanded = !!this._expanded[id];
    var events = d.events || [];
    var last = events[0];
    var expected = this._formatExpected(d);

    var html =
      '<div class="delivery' + (d.status_code === 0 ? ' done' : '') + '" data-id="' + parcelEsc(id) + '">' +
      '<div class="row">' +
      '<ha-icon class="status-icon" icon="' + style.icon + '" style="color:' + style.color + '"></ha-icon>' +
      '<div class="main">' +
      '<div class="line1"><span class="desc">' + parcelEsc(d.description || d.tracking_number) + '</span>' +
      '<span class="chip" style="--c:' + style.color + '">' + parcelEsc(t.status[key] || key) + '</span></div>' +
      '<div class="line2">' + parcelEsc(d.carrier_name || d.carrier_code) + ' · ' +
      '<span class="tracking" data-copy="' + parcelEsc(d.tracking_number) + '" title="' + parcelEsc(t.copy) + '">' + parcelEsc(d.tracking_number) + '</span></div>' +
      (last
        ? '<div class="line3">' + parcelEsc(last.event) + (last.location ? ` · ${parcelEsc(last.location)}` : '') +
          (parcelDate(last.date) ? ` <span class="date">${parcelEsc(parcelDate(last.date))}</span>` : '') + '</div>'
        : '') +
      (expected && d.status_code !== 0 ? `<div class="expected">${parcelEsc(t.expected)} ${parcelEsc(expected)}</div>` : '') +
      '</div>' +
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
    var locale = this._config?.language || this._hass.locale?.language || undefined;
    var opts = { weekday: 'short', day: 'numeric', month: 'short' };
    var fmt = (ts, raw) => {
      if (ts) return new Date(ts * 1000).toLocaleString(locale, Object.assign({ hour: '2-digit', minute: '2-digit' }, opts));
      if (!raw) return '';
      var parsed = Date.parse(String(raw).replace(' ', 'T'));
      if (Number.isNaN(parsed)) return raw;
      var hasTime = /\d{2}:\d{2}/.test(raw) && !/00:00(:00)?$/.test(raw);
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
      if (navigator.clipboard) navigator.clipboard.writeText(copy.getAttribute('data-copy'));
      return;
    }
    var item = ev.target.closest('.delivery');
    if (!item) return;
    var id = item.getAttribute('data-id');
    this._expanded[id] = !this._expanded[id];
    this._render();
  }

  _refresh() {
    if (this._refreshing) return;
    var data = {};
    var st = this._lastState;
    if (st?.attributes?.config_entry_id) data.config_entry_id = st.attributes.config_entry_id;
    this._refreshing = true;
    this._refreshError = null;
    this._render();
    var t = this._t();
    this._hass.callService('parcel', 'refresh', data).catch((err) => {
      // Kept in state and rendered under the title: a tooltip on the button
      // would be wiped by the next re-render.
      this._refreshError = `${t.refresh_failed} ${(err?.message) || err}`;
    }).finally(() => {
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
    if (!form.firstChild) this._buildForm(form);
    form.hidden = false;
    this._loadCarriers();
    form.querySelector('[name=tracking]').focus();
  }

  _buildForm(form) {
    var t = this._t();
    form.innerHTML =
      '<label>' + parcelEsc(t.tracking_number) + '<input name="tracking" autocomplete="off"></label>' +
      '<label>' + parcelEsc(t.carrier) + '<input name="carrier" list="parcel-carriers" placeholder="' + parcelEsc(t.carrier_search) + '" autocomplete="off"></label>' +
      '<datalist id="parcel-carriers"></datalist>' +
      '<label>' + parcelEsc(t.description) + '<input name="description" autocomplete="off"></label>' +
      '<label class="check"><input type="checkbox" name="push"> ' + parcelEsc(t.push) + '</label>' +
      '<div class="msg"></div>' +
      '<div class="hint">' + parcelEsc(t.limit) + '</div>' +
      '<div class="actions"><button type="button" class="cancel">' + parcelEsc(t.cancel) + '</button>' +
      '<button type="button" class="submit">' + parcelEsc(t.submit) + '</button></div>';
    form.querySelector('.cancel').addEventListener('click', this._toggleForm.bind(this));
    form.querySelector('.submit').addEventListener('click', this._submit.bind(this));
    form.addEventListener('keydown', function (ev) {
      if (ev.key === 'Enter' && ev.target.tagName === 'INPUT' && ev.target.type !== 'checkbox') this._submit();
    }.bind(this));
  }

  _loadCarriers() {
    if (this._carriers || this._loadingCarriers) return;
    this._loadingCarriers = true;
    var st = this._lastState;
    var msg = { type: 'parcel/carriers' };
    if (st?.attributes?.config_entry_id) msg.config_entry_id = st.attributes.config_entry_id;
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
    var carrierInput = form.querySelector('[name=carrier]').value;
    var description = form.querySelector('[name=description]').value.trim();
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
    var st = this._lastState;
    if (st?.attributes?.config_entry_id) data.config_entry_id = st.attributes.config_entry_id;

    btn.disabled = true;
    btn.textContent = t.adding;
    msgEl.textContent = '';
    this._hass.callService('parcel', 'add_delivery', data).then(() => {
      msgEl.className = 'msg ok';
      msgEl.textContent = t.added;
      form.querySelector('[name=tracking]').value = '';
      form.querySelector('[name=carrier]').value = '';
      form.querySelector('[name=description]').value = '';
    }).catch((err) => {
      msgEl.className = 'msg error';
      msgEl.textContent = (err?.message) || String(err);
    }).finally(() => {
      btn.disabled = false;
      btn.textContent = t.submit;
    });
  }

  static _styles() {
    return [
      ':host { display: block; }',
      'ha-card { padding: 0 0 8px; overflow: hidden; }',
      '.header { display: flex; align-items: center; justify-content: space-between; gap: 10px; padding: 12px 8px 8px 12px; min-height: 36px; }',
      '.title { flex: 1; min-width: 0; display: flex; align-items: center; gap: 10px; }',
      '.logo { width: 40px; height: 40px; flex: none; object-fit: contain; }',
      '.titles { min-width: 0; }',
      '.name { font-size: 16px; font-weight: 500; line-height: 1.25; color: var(--primary-text-color); white-space: nowrap; overflow: hidden; text-overflow: ellipsis; }',
      '.sub { font-size: 12px; color: var(--secondary-text-color); white-space: nowrap; overflow: hidden; text-overflow: ellipsis; }',
      '.sub.error { color: var(--error-color, #db4437); }',
      '.buttons { display: flex; align-items: center; flex: none; }',
      '.status { font-size: 12px; font-weight: 500; line-height: 1; white-space: nowrap; border-radius: 12px; padding: 5px 10px; margin-right: 4px;' +
        ' color: var(--primary-color); background: color-mix(in srgb, var(--primary-color) 15%, transparent); }',
      '.refresh-btn.spinning ha-icon { animation: parcel-spin 1s linear infinite; }',
      '@keyframes parcel-spin { from { transform: rotate(0deg); } to { transform: rotate(360deg); } }',
      '.empty { padding: 12px 16px; color: var(--secondary-text-color); }',
      '.delivery { padding: 6px 12px; cursor: pointer; border-top: 1px solid var(--divider-color, rgba(0,0,0,.12)); }',
      '.delivery:first-child { border-top: none; }',
      '.delivery.done { opacity: 0.6; }',
      '.row { display: flex; align-items: flex-start; gap: 10px; }',
      '.status-icon { flex: none; margin-top: 2px; }',
      '.main { flex: 1; min-width: 0; }',
      '.line1 { display: flex; align-items: center; gap: 8px; justify-content: space-between; }',
      '.desc { font-weight: 500; color: var(--primary-text-color); overflow: hidden; text-overflow: ellipsis; white-space: nowrap; }',
      '.chip { flex: none; font-size: 11px; font-weight: 500; border-radius: 12px; padding: 1px 8px; white-space: nowrap; color: var(--c); background: color-mix(in srgb, var(--c) 15%, transparent); }',
      '.line2, .line3, .expected { font-size: 12px; color: var(--secondary-text-color); margin-top: 1px; overflow-wrap: anywhere; }',
      '.tracking { font-family: var(--code-font-family, monospace); cursor: copy; }',
      '.expected { color: var(--primary-text-color); }',
      '.date { color: var(--secondary-text-color); font-size: 12px; }',
      '.chevron { flex: none; color: var(--secondary-text-color); transition: transform .2s ease; }',
      '.chevron.closed { transform: rotate(-90deg); }',
      '.events { list-style: none; margin: 4px 0 0 34px; padding: 0 0 0 12px; border-left: 2px solid var(--divider-color, rgba(0,0,0,.12)); font-size: 12px; color: var(--primary-text-color); }',
      '.events li { margin: 4px 0; }',
      '.additional { color: var(--secondary-text-color); }',
      '.form { padding: 6px 12px 4px; border-block: 1px solid var(--divider-color, rgba(0,0,0,.12)); display: flex; flex-direction: column; gap: 6px; }',
      '.form[hidden] { display: none; }',
      '.form label { display: flex; flex-direction: column; gap: 4px; font-size: 13px; color: var(--secondary-text-color); }',
      '.form label.check { flex-direction: row; align-items: center; gap: 8px; }',
      '.form input:not([type=checkbox]) { font: inherit; font-size: 16px; padding: 8px 12px; border-radius: 10px; border: 1px solid var(--divider-color, #ccc); background: var(--card-background-color, #fff); color: var(--primary-text-color); }',
      '.hint { font-size: 12px; color: var(--secondary-text-color); }',
      '.msg { font-size: 13px; }',
      '.msg:empty { display: none; }',
      '.msg.error { color: var(--error-color, #db4437); }',
      '.msg.ok { color: var(--success-color, #43a047); }',
      '.actions { display: flex; justify-content: flex-end; gap: 8px; }',
      '.actions button { font: inherit; padding: 6px 14px; border-radius: 10px; border: none; cursor: pointer;' +
        ' background: var(--secondary-background-color, rgba(127,127,127,.12)); color: var(--primary-text-color); }',
      '.actions .submit { background: color-mix(in srgb, var(--primary-color) 16%, transparent); color: var(--primary-color); }',
      '.actions .submit:hover:not(:disabled) { background: color-mix(in srgb, var(--primary-color) 24%, transparent); }',
      '.actions button:disabled { opacity: 0.6; cursor: default; }',
    ].join('\n');
  }
}

// ── parcel-card-editor ────────────────────────────────────────────────────────
function parcelEditorSchema(t) {
  return [
    { name: 'entity', selector: { entity: { domain: 'sensor', integration: 'parcel' } } },
    { name: 'title', selector: { text: {} } },
    {
      type: 'grid',
      name: '',
      schema: [
        { name: 'show_icon', selector: { boolean: {} } },
        { name: 'show_delivered', selector: { boolean: {} } },
        { name: 'show_refresh', selector: { boolean: {} } },
        { name: 'show_add', selector: { boolean: {} } },
      ],
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
          ],
        },
      },
    },
  ];
}

class ParcelCardEditor extends HTMLElement {
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
    if (lang !== this._lang) {
      this._lang = lang;
      var t = ParcelI18n[lang].editor;
      this._form.schema = parcelEditorSchema(t);
      this._form.computeLabel = (field) => t[field.name] || field.name;
    }
    this._form.hass = this._hass;
    // Show the defaults as set, so the toggles match what the card does.
    this._form.data = Object.assign({}, PARCEL_DEFAULTS, this._config);
  }

  _valueChanged(ev) {
    var value = Object.assign({}, ev.detail.value);
    // Keep the YAML short: drop options left at their default.
    Object.keys(PARCEL_DEFAULTS).forEach((key) => {
      if (value[key] === PARCEL_DEFAULTS[key]) delete value[key];
    });
    if (!value.title) delete value.title;
    if (!value.entity) delete value.entity;
    if (!value.language) delete value.language;
    this._config = value;
    this.dispatchEvent(new CustomEvent('config-changed', { detail: { config: value }, bubbles: true, composed: true }));
  }
}

if (!customElements.get('parcel-card-editor')) {
  customElements.define('parcel-card-editor', ParcelCardEditor);
}

if (!customElements.get('parcel-card')) {
  customElements.define('parcel-card', ParcelCard);
  window.customCards = window.customCards || [];
  window.customCards.push({
    type: 'parcel-card',
    name: 'Parcel',
    description: 'Deliveries tracked in Parcel, with a form to add one.',
    preview: true,
    documentationURL: 'https://github.com/juju35/ha-parcel',
  });
  console.info(`%c PARCEL-CARD %c v${PARCEL_CARD_VERSION} `, 'color:#fff;background:#f59e0b;font-weight:700', 'color:#f59e0b;background:#fff');
}
