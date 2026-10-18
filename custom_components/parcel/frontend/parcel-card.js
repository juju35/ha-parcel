var PARCEL_CARD_VERSION = '0.1.7';

// ── Integration icon (same drawing as brand/icon.png) ────────────────────────
var PARCEL_ICON = 'data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHZpZXdCb3g9IjAgMCAyNTYgMjU2Ij48cmVjdCB4PSI4IiB5PSI4IiB3aWR0aD0iMjQwIiBoZWlnaHQ9IjI0MCIgcng9IjU2IiBmaWxsPSIjRjU5RTBCIi8+PGcgZmlsbD0ibm9uZSIgc3Ryb2tlPSIjZmZmIiBzdHJva2Utd2lkdGg9IjE0IiBzdHJva2UtbGluZWpvaW49InJvdW5kIiBzdHJva2UtbGluZWNhcD0icm91bmQiPjxwYXRoIGQ9Ik0xMjggNTIgTDIwMCA5MCBMMjAwIDE3MCBMMTI4IDIwOCBMNTYgMTcwIEw1NiA5MCBaIi8+PHBhdGggZD0iTTU2IDkwIEwxMjggMTI4IEwyMDAgOTAiLz48cGF0aCBkPSJNMTI4IDEyOCBMMTI4IDIwOCIvPjxwYXRoIGQ9Ik05MiA3MSBMMTY0IDEwOSBMMTY0IDE0MCIvPjwvZz48L3N2Zz4=';

// ── i18n ──────────────────────────────────────────────────────────────────────
var ParcelI18n = {
  fr: {
    default_title: 'Colis',
    empty: 'Aucun colis à afficher',
    no_entity: 'Capteur Parcel introuvable. Ajoutez l\'intégration Parcel ou renseignez « entity ».',
    in_progress: 'en cours',
    expected: 'Prévu',
    add: 'Ajouter un colis',
    refresh: 'Actualiser',
    refresh_failed: 'Actualisation impossible',
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
    in_progress: 'active',
    expected: 'Expected',
    add: 'Add a delivery',
    refresh: 'Refresh',
    refresh_failed: 'Refresh failed',
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
};

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
  return String(s == null ? '' : s).replace(/[&<>"']/g, function (ch) {
    return { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[ch];
  });
}

// Parcel sends placeholders such as "--//--" when the carrier gave no date.
function parcelDate(s) {
  return /\d/.test(String(s || '')) ? String(s) : '';
}

function parcelLang(hass) {
  var lang = ((hass && (hass.locale && hass.locale.language || hass.language)) || navigator.language || 'en').slice(0, 2);
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
    if (!hass || !hass.states) return null;
    var ids = Object.keys(hass.states);
    for (var i = 0; i < ids.length; i++) {
      var st = hass.states[ids[i]];
      if (ids[i].indexOf('sensor.') === 0 && st.attributes && Array.isArray(st.attributes.deliveries) && st.attributes.config_entry_id) {
        return ids[i];
      }
    }
    return null;
  }

  setConfig(config) {
    this._config = Object.assign(
      { show_icon: true, show_delivered: true, show_add: true, show_refresh: true, max_events: 5 },
      config || {}
    );
    this._expanded = this._expanded || {};
    this._lastState = null;
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

  getCardSize() {
    var st = this._lastState;
    var n = st && st.attributes && Array.isArray(st.attributes.deliveries) ? st.attributes.deliveries.length : 0;
    return 2 + n;
  }

  getGridOptions() {
    return { columns: 12, min_columns: 6, rows: 'auto' };
  }

  _entityId() {
    return (this._config && this._config.entity) || ParcelCard._findEntity(this._hass);
  }

  _t() {
    return ParcelI18n[parcelLang(this._hass)];
  }

  _ensureShell() {
    if (this._root) return;
    this._root = this.attachShadow({ mode: 'open' });
    this._root.innerHTML =
      '<style>' + ParcelCard._styles() + '</style>' +
      '<ha-card><div class="header"></div><div class="list"></div><div class="form" hidden></div></ha-card>';
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
      header.innerHTML = '<div class="title">' + this._iconHtml() + parcelEsc(title) + '</div>';
      list.innerHTML = '<div class="empty">' + parcelEsc(t.no_entity) + '</div>';
      return;
    }

    var deliveries = (st.attributes.deliveries || []).slice();
    if (!this._config.show_delivered) {
      deliveries = deliveries.filter(function (d) { return d.status_code !== 0; });
    }
    // Active first, then by expected date.
    deliveries.sort(function (a, b) {
      var da = a.status_code === 0 ? 1 : 0, db = b.status_code === 0 ? 1 : 0;
      if (da !== db) return da - db;
      var ta = a.timestamp_expected || Date.parse(a.date_expected || '') / 1000 || Infinity;
      var tb = b.timestamp_expected || Date.parse(b.date_expected || '') / 1000 || Infinity;
      return ta - tb;
    });

    header.innerHTML =
      '<div class="title">' + this._iconHtml() + parcelEsc(title) +
      ' <span class="count">' + parcelEsc(st.state) + ' ' + parcelEsc(t.in_progress) + '</span></div>' +
      '<div class="buttons">' +
      (this._config.show_refresh
        ? '<ha-icon-button class="refresh-btn' + (this._refreshing ? ' spinning' : '') + '" label="' + parcelEsc(t.refresh) + '" title="' + parcelEsc(t.refresh) + '"><ha-icon icon="mdi:refresh"></ha-icon></ha-icon-button>'
        : '') +
      (this._config.show_add
        ? '<ha-icon-button class="add-btn" label="' + parcelEsc(t.add) + '" title="' + parcelEsc(t.add) + '"><ha-icon icon="mdi:plus"></ha-icon></ha-icon-button>'
        : '') +
      '</div>';
    var addBtn = header.querySelector('.add-btn');
    if (addBtn) addBtn.addEventListener('click', this._toggleForm.bind(this));
    var refreshBtn = header.querySelector('.refresh-btn');
    if (refreshBtn) refreshBtn.addEventListener('click', this._refresh.bind(this));

    if (!deliveries.length) {
      list.innerHTML = '<div class="empty">' + parcelEsc(t.empty) + '</div>';
      return;
    }
    var self = this;
    list.innerHTML = deliveries.map(function (d) { return self._renderDelivery(d, t); }).join('');
  }

  _iconHtml() {
    return this._config.show_icon ? '<img class="logo" src="' + PARCEL_ICON + '" alt="">' : '';
  }

  _renderDelivery(d, t) {
    var key = d.status || 'unknown';
    var style = PARCEL_STATUS_STYLE[key] || PARCEL_STATUS_STYLE.unknown;
    var id = d.carrier_code + ':' + d.tracking_number;
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
      '<span class="chip" style="color:' + style.color + ';border-color:' + style.color + '">' + parcelEsc(t.status[key] || key) + '</span></div>' +
      '<div class="line2">' + parcelEsc(d.carrier_name || d.carrier_code) + ' · ' +
      '<span class="tracking" data-copy="' + parcelEsc(d.tracking_number) + '" title="' + parcelEsc(t.copy) + '">' + parcelEsc(d.tracking_number) + '</span></div>' +
      (last
        ? '<div class="line3">' + parcelEsc(last.event) + (last.location ? ' · ' + parcelEsc(last.location) : '') +
          (parcelDate(last.date) ? ' <span class="date">' + parcelEsc(parcelDate(last.date)) + '</span>' : '') + '</div>'
        : '') +
      (expected && d.status_code !== 0 ? '<div class="expected">' + parcelEsc(t.expected) + ' : ' + parcelEsc(expected) + '</div>' : '') +
      '</div>' +
      '<ha-icon class="chevron" icon="' + (expanded ? 'mdi:chevron-up' : 'mdi:chevron-down') + '"></ha-icon>' +
      '</div>';

    if (expanded) {
      var shown = events.slice(0, Math.max(1, this._config.max_events));
      html += '<ul class="events">' +
        (shown.length
          ? shown.map(function (e) {
              return '<li>' + (parcelDate(e.date) ? '<span class="date">' + parcelEsc(parcelDate(e.date)) + '</span> ' : '') + parcelEsc(e.event) +
                (e.location ? ' · ' + parcelEsc(e.location) : '') +
                (e.additional ? '<div class="additional">' + parcelEsc(e.additional) + '</div>' : '') + '</li>';
            }).join('')
          : '<li>' + parcelEsc(t.no_events) + '</li>') +
        '</ul>';
    }
    return html + '</div>';
  }

  _formatExpected(d) {
    var locale = (this._hass.locale && this._hass.locale.language) || undefined;
    var opts = { weekday: 'short', day: 'numeric', month: 'short' };
    var fmt = function (ts, raw) {
      if (ts) return new Date(ts * 1000).toLocaleString(locale, Object.assign({ hour: '2-digit', minute: '2-digit' }, opts));
      if (!raw) return '';
      var parsed = Date.parse(String(raw).replace(' ', 'T'));
      if (isNaN(parsed)) return raw;
      var hasTime = /\d{2}:\d{2}/.test(raw) && !/00:00(:00)?$/.test(raw);
      return new Date(parsed).toLocaleString(locale, hasTime ? Object.assign({ hour: '2-digit', minute: '2-digit' }, opts) : opts);
    };
    var start = fmt(d.timestamp_expected, d.date_expected);
    var end = fmt(d.timestamp_expected_end, d.date_expected_end);
    return start && end && end !== start ? start + ' – ' + end : start;
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
    if (st && st.attributes.config_entry_id) data.config_entry_id = st.attributes.config_entry_id;
    this._refreshing = true;
    this._render();
    var self = this;
    var t = this._t();
    this._hass.callService('parcel', 'refresh', data).catch(function (err) {
      var btn = self._root.querySelector('.refresh-btn');
      if (btn) btn.title = t.refresh_failed + ' : ' + ((err && err.message) || err);
    }).finally(function () {
      self._refreshing = false;
      var btn = self._root.querySelector('.refresh-btn');
      if (btn) btn.classList.remove('spinning');
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
    var self = this;
    var st = this._lastState;
    var msg = { type: 'parcel/carriers' };
    if (st && st.attributes.config_entry_id) msg.config_entry_id = st.attributes.config_entry_id;
    this._hass.callWS(msg).then(function (res) {
      self._carriers = res.carriers || {};
      var codes = Object.keys(self._carriers).sort(function (a, b) {
        return self._carriers[a].localeCompare(self._carriers[b]);
      });
      self._root.querySelector('#parcel-carriers').innerHTML = codes.map(function (c) {
        return '<option value="' + parcelEsc(self._carriers[c]) + '">' + parcelEsc(c) + '</option>';
      }).join('');
    }).catch(function () {
      self._carriers = null;
    }).finally(function () {
      self._loadingCarriers = false;
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
    if (st && st.attributes.config_entry_id) data.config_entry_id = st.attributes.config_entry_id;

    btn.disabled = true;
    btn.textContent = t.adding;
    msgEl.textContent = '';
    var self = this;
    this._hass.callService('parcel', 'add_delivery', data).then(function () {
      msgEl.className = 'msg ok';
      msgEl.textContent = t.added;
      form.querySelector('[name=tracking]').value = '';
      form.querySelector('[name=carrier]').value = '';
      form.querySelector('[name=description]').value = '';
    }).catch(function (err) {
      msgEl.className = 'msg error';
      msgEl.textContent = (err && err.message) || String(err);
    }).finally(function () {
      btn.disabled = false;
      btn.textContent = t.submit;
    });
  }

  static _styles() {
    return [
      ':host { display: block; }',
      'ha-card { padding: 12px 0 8px; overflow: hidden; }',
      '.header { display: flex; align-items: center; justify-content: space-between; padding: 0 8px 4px 16px; min-height: 40px; }',
      '.title { display: flex; align-items: center; font-size: 1.15em; font-weight: 500; color: var(--primary-text-color); }',
      '.logo { width: 28px; height: 28px; margin-right: 10px; flex: none; }',
      '.buttons { display: flex; align-items: center; }',
      '.refresh-btn.spinning ha-icon { animation: parcel-spin 1s linear infinite; }',
      '@keyframes parcel-spin { from { transform: rotate(0deg); } to { transform: rotate(360deg); } }',
      '.count { font-size: 0.8em; font-weight: 400; color: var(--secondary-text-color); margin-left: 6px; }',
      '.empty { padding: 12px 16px; color: var(--secondary-text-color); }',
      '.delivery { padding: 8px 16px; cursor: pointer; border-top: 1px solid var(--divider-color, rgba(0,0,0,.12)); }',
      '.delivery:first-child { border-top: none; }',
      '.delivery.done { opacity: 0.6; }',
      '.row { display: flex; align-items: flex-start; gap: 12px; }',
      '.status-icon { flex: none; margin-top: 2px; }',
      '.main { flex: 1; min-width: 0; }',
      '.line1 { display: flex; align-items: center; gap: 8px; justify-content: space-between; }',
      '.desc { font-weight: 500; color: var(--primary-text-color); overflow: hidden; text-overflow: ellipsis; white-space: nowrap; }',
      '.chip { flex: none; font-size: 0.75em; border: 1px solid; border-radius: 10px; padding: 1px 8px; white-space: nowrap; }',
      '.line2, .line3, .expected { font-size: 0.875em; color: var(--secondary-text-color); margin-top: 2px; overflow-wrap: anywhere; }',
      '.tracking { font-family: var(--code-font-family, monospace); cursor: copy; }',
      '.expected { color: var(--primary-text-color); }',
      '.date { color: var(--secondary-text-color); font-size: 0.9em; }',
      '.chevron { flex: none; color: var(--secondary-text-color); }',
      '.events { list-style: none; margin: 6px 0 0 36px; padding: 0 0 0 12px; border-left: 2px solid var(--divider-color, rgba(0,0,0,.12)); font-size: 0.875em; color: var(--primary-text-color); }',
      '.events li { margin: 4px 0; }',
      '.additional { color: var(--secondary-text-color); }',
      '.form { padding: 8px 16px 4px; border-top: 1px solid var(--divider-color, rgba(0,0,0,.12)); display: flex; flex-direction: column; gap: 8px; }',
      '.form[hidden] { display: none; }',
      '.form label { display: flex; flex-direction: column; gap: 4px; font-size: 0.875em; color: var(--secondary-text-color); }',
      '.form label.check { flex-direction: row; align-items: center; gap: 8px; }',
      '.form input:not([type=checkbox]) { font: inherit; font-size: 1rem; padding: 8px; border-radius: 6px; border: 1px solid var(--divider-color, #ccc); background: var(--card-background-color, #fff); color: var(--primary-text-color); }',
      '.hint { font-size: 0.75em; color: var(--secondary-text-color); }',
      '.msg { font-size: 0.875em; }',
      '.msg:empty { display: none; }',
      '.msg.error { color: var(--error-color, #db4437); }',
      '.msg.ok { color: var(--success-color, #43a047); }',
      '.actions { display: flex; justify-content: flex-end; gap: 8px; }',
      '.actions button { font: inherit; padding: 6px 14px; border-radius: 18px; border: 1px solid var(--primary-color); cursor: pointer; background: none; color: var(--primary-color); }',
      '.actions .submit { background: var(--primary-color); color: var(--text-primary-color, #fff); }',
      '.actions button:disabled { opacity: 0.6; cursor: default; }',
    ].join('\n');
  }
}

// ── parcel-card-editor ────────────────────────────────────────────────────────
var PARCEL_EDITOR_SCHEMA = [
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
];

var PARCEL_EDITOR_DEFAULTS = { show_icon: true, show_delivered: true, show_add: true, show_refresh: true, max_events: 5 };

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
      var t = ParcelI18n[parcelLang(this._hass)].editor;
      this._form = document.createElement('ha-form');
      this._form.schema = PARCEL_EDITOR_SCHEMA;
      this._form.computeLabel = function (field) { return t[field.name] || field.name; };
      this._form.addEventListener('value-changed', this._valueChanged.bind(this));
      this.appendChild(this._form);
    }
    this._form.hass = this._hass;
    // Show the defaults as set, so the toggles match what the card does.
    this._form.data = Object.assign({}, PARCEL_EDITOR_DEFAULTS, this._config);
  }

  _valueChanged(ev) {
    var value = Object.assign({}, ev.detail.value);
    // Keep the YAML short: drop options left at their default.
    Object.keys(PARCEL_EDITOR_DEFAULTS).forEach(function (key) {
      if (value[key] === PARCEL_EDITOR_DEFAULTS[key]) delete value[key];
    });
    if (!value.title) delete value.title;
    if (!value.entity) delete value.entity;
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
  });
  console.info('%c PARCEL-CARD %c v' + PARCEL_CARD_VERSION + ' ', 'color:#fff;background:#f59e0b;font-weight:700', 'color:#f59e0b;background:#fff');
}
