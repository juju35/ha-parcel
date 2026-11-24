// ── parcel-mini-card ──────────────────────────────────────────────────────────
// A lower illustrated banner with the featured parcel (parcelFeatured), like the next flight of the flight board.
// Its detail button (top right) switches to the full card and back; a click outside the card folds it back.
import { parcelEsc } from "./illustration.js";
import { ParcelCard, parcelInDialog, parcelWatchOutside } from "./parcel-card-2.js";

export class ParcelMiniCard extends ParcelCard {
  constructor() {
    super();
    this._zoomed = false;
    this._onOutsideMini = (ev) => {
      if (this._zoomed && !ev.composedPath().includes(this) && !parcelInDialog(ev)) this._setZoom(false);
    };
  }

  connectedCallback() {
    // Compact again before the base card draws it back.
    (this._miniWatch = this._miniWatch || parcelWatchOutside(this, this._onOutsideMini)).on();
    super.connectedCallback();
  }

  disconnectedCallback() {
    super.disconnectedCallback();
    this._miniWatch?.off();
    this._zoomed = false;
  }

  setConfig(config) {
    // The host attribute behind the mini card's styles; never set in the constructor.
    this.setAttribute?.('mini', '');
    super.setConfig(config);
  }

  getCardSize() {
    return this._zoomed ? super.getCardSize() : 2;
  }

  getGridOptions() {
    return this._zoomed ? super.getGridOptions() : { columns: 6, min_columns: 4, rows: 'auto' };
  }

  _compact() {
    return !this._zoomed;
  }

  _detailButton(t) {
    var label = this._zoomed ? t.show_compact : t.show_full;
    return `<button class="detail" title="${parcelEsc(label)}" aria-label="${parcelEsc(label)}">` +
      `<ha-icon icon="mdi:${this._zoomed ? 'arrow-collapse' : 'arrow-expand'}"></ha-icon></button>`;
  }

  _toggleDetail(ev) {
    ev.stopPropagation();
    this._setZoom(!this._zoomed);
    // Keyboard use (Enter / Space: no click count) keeps the focus on the button, without scrolling the page.
    if (!ev.detail) this._root.querySelector('.detail')?.focus?.({ preventScroll: true });
  }

  _setZoom(zoomed) {
    this._zoomed = zoomed;
    if (!zoomed) {
      this._expanded = {};
      var form = this._root?.querySelector('.form');
      if (form) form.hidden = true;
    }
    this._render();
  }

  _render() {
    super._render();
    var card = this._root?.querySelector('ha-card');
    if (card) card.classList.toggle('mini', this._compact());
    this._fitPill();
  }
}
