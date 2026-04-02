var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
import { LitElement, html, css, nothing } from 'lit';
import { customElement, property, state, query } from 'lit/decorators.js';
/**
 * A cross-framework enterprise search input component.
 *
 * @element org-search
 *
 * @csspart container - Outer wrapper div
 * @csspart input     - The inner <input> element
 * @csspart clear-btn - The clear button
 *
 * @cssprop --org-search-bg           - Input background
 * @cssprop --org-search-border       - Border color
 * @cssprop --org-search-border-focus - Border color on focus
 * @cssprop --org-search-radius       - Border radius
 * @cssprop --org-search-icon-color   - Search icon color
 *
 * @fires org-search:search - Fired on input with { value }
 * @fires org-search:clear  - Fired when clear button is clicked
 * @fires org-search:submit - Fired on Enter key with { value }
 */
let OrgSearch = class OrgSearch extends LitElement {
    constructor() {
        super(...arguments);
        this.value = '';
        this.placeholder = 'Search...';
        this.size = 'medium';
        this.disabled = false;
        this.loading = false;
        this.debounce = 300;
        this.ariaLabel = 'Search';
        this._focused = false;
    }
    get _wrapperClass() {
        const classes = ['search-wrapper'];
        if (this._focused)
            classes.push('focused');
        if (this.disabled)
            classes.push('disabled');
        return classes.join(' ');
    }
    _onInput(e) {
        const input = e.target;
        this.value = input.value;
        if (this._debounceTimer)
            clearTimeout(this._debounceTimer);
        this._debounceTimer = setTimeout(() => {
            this.dispatchEvent(new CustomEvent('org-search:search', {
                bubbles: true, composed: true, detail: { value: this.value }
            }));
        }, this.debounce);
    }
    _onKeydown(e) {
        if (e.key === 'Enter') {
            if (this._debounceTimer)
                clearTimeout(this._debounceTimer);
            this.dispatchEvent(new CustomEvent('org-search:submit', {
                bubbles: true, composed: true, detail: { value: this.value }
            }));
        }
        if (e.key === 'Escape' && this.value) {
            this._clear();
        }
    }
    _clear() {
        var _a;
        this.value = '';
        if (this._debounceTimer)
            clearTimeout(this._debounceTimer);
        (_a = this._input) === null || _a === void 0 ? void 0 : _a.focus();
        this.dispatchEvent(new CustomEvent('org-search:clear', {
            bubbles: true, composed: true
        }));
        this.dispatchEvent(new CustomEvent('org-search:search', {
            bubbles: true, composed: true, detail: { value: '' }
        }));
    }
    _onFocus() { this._focused = true; }
    _onBlur() { this._focused = false; }
    focus() { var _a; (_a = this._input) === null || _a === void 0 ? void 0 : _a.focus(); }
    blur() { var _a; (_a = this._input) === null || _a === void 0 ? void 0 : _a.blur(); }
    disconnectedCallback() {
        super.disconnectedCallback();
        if (this._debounceTimer)
            clearTimeout(this._debounceTimer);
    }
    render() {
        /* inline SVG icons — no external dependency */
        const searchIcon = html `
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
        <circle cx="11" cy="11" r="8"></circle>
        <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
      </svg>`;
        const clearIcon = html `
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round">
        <line x1="18" y1="6" x2="6" y2="18"></line>
        <line x1="6" y1="6" x2="18" y2="18"></line>
      </svg>`;
        return html `
      <div class="${this.size}" part="container">
        <div class="${this._wrapperClass}">
          <span class="search-icon" aria-hidden="true">${searchIcon}</span>

          <input
            part="input"
            type="search"
            .value="${this.value}"
            placeholder="${this.placeholder || nothing}"
            ?disabled="${this.disabled}"
            aria-label="${this.ariaLabel}"
            @input="${this._onInput}"
            @keydown="${this._onKeydown}"
            @focus="${this._onFocus}"
            @blur="${this._onBlur}"
          />

          ${this.loading
            ? html `<span class="spinner" aria-hidden="true"></span>`
            : this.value
                ? html `
                <button
                  class="clear-btn"
                  part="clear-btn"
                  type="button"
                  aria-label="Clear search"
                  @click="${this._clear}"
                >${clearIcon}</button>`
                : nothing}
        </div>
      </div>
    `;
    }
};
OrgSearch.styles = css `
    :host {
      display: block;
      font-family: var(--org-font-family, sans-serif);
    }

    :host([disabled]) {
      pointer-events: none;
    }

    .search-wrapper {
      display: flex;
      align-items: center;
      border: 1px solid var(--org-search-border, var(--org-color-border, #e0e0e0));
      border-radius: var(--org-search-radius, var(--org-radius-full, 9999px));
      background: var(--org-search-bg, var(--org-color-surface, #fff));
      transition: border-color var(--org-transition-fast, 0.15s ease),
                  box-shadow var(--org-transition-fast, 0.15s ease);
      overflow: hidden;
    }

    /* Sizes */
    .small  .search-wrapper { min-height: 30px; }
    .medium .search-wrapper { min-height: 36px; }
    .large  .search-wrapper { min-height: 44px; }

    .search-wrapper.focused {
      border-color: var(--org-search-border-focus, var(--org-color-primary, #1976d2));
      box-shadow: 0 0 0 3px color-mix(in srgb, var(--org-search-border-focus, var(--org-color-primary, #1976d2)) 15%, transparent);
    }

    .search-wrapper.disabled {
      opacity: 0.55;
      cursor: not-allowed;
      background: var(--org-color-gray-100, #f5f5f5);
    }

    /* Search icon */
    .search-icon {
      display: flex;
      align-items: center;
      justify-content: center;
      flex-shrink: 0;
      color: var(--org-search-icon-color, var(--org-color-gray-500, #9e9e9e));
      transition: color var(--org-transition-fast, 0.15s ease);
    }

    .small  .search-icon { padding-left: 10px; }
    .medium .search-icon { padding-left: 12px; }
    .large  .search-icon { padding-left: 14px; }

    .search-icon svg {
      width: 1em;
      height: 1em;
    }

    .small  .search-icon svg { font-size: 14px; }
    .medium .search-icon svg { font-size: 16px; }
    .large  .search-icon svg { font-size: 18px; }

    .focused .search-icon {
      color: var(--org-search-border-focus, var(--org-color-primary, #1976d2));
    }

    /* Input */
    input {
      flex: 1;
      border: none;
      outline: none;
      background: transparent;
      color: var(--org-input-color, #212121);
      font-family: inherit;
      width: 100%;
    }

    .small  input { padding: 5px 8px;   font-size: var(--org-font-size-sm, 12px); }
    .medium input { padding: 8px 10px;   font-size: var(--org-font-size-md, 14px); }
    .large  input { padding: 11px 12px;  font-size: var(--org-font-size-lg, 16px); }

    input::placeholder {
      color: var(--org-input-placeholder, #9e9e9e);
    }

    input:disabled {
      cursor: not-allowed;
    }

    /* Clear button */
    .clear-btn {
      display: flex;
      align-items: center;
      justify-content: center;
      flex-shrink: 0;
      border: none;
      background: none;
      cursor: pointer;
      color: var(--org-color-gray-500, #9e9e9e);
      padding: 0;
      border-radius: 50%;
      transition: color var(--org-transition-fast, 0.15s ease),
                  background var(--org-transition-fast, 0.15s ease);
    }

    .small  .clear-btn { width: 20px; height: 20px; margin-right: 6px; }
    .medium .clear-btn { width: 24px; height: 24px; margin-right: 8px; }
    .large  .clear-btn { width: 28px; height: 28px; margin-right: 10px; }

    .clear-btn:hover {
      color: var(--org-color-text, #212121);
      background: var(--org-color-gray-100, #f5f5f5);
    }

    .clear-btn svg {
      width: 12px;
      height: 12px;
    }

    /* Loading spinner */
    .spinner {
      flex-shrink: 0;
      border-radius: 50%;
      border: 2px solid transparent;
      border-top-color: var(--org-color-primary, #1976d2);
      border-right-color: var(--org-color-primary, #1976d2);
      animation: org-search-spin 0.65s linear infinite;
    }

    .small  .spinner { width: 14px; height: 14px; margin-right: 6px; }
    .medium .spinner { width: 16px; height: 16px; margin-right: 8px; }
    .large  .spinner { width: 18px; height: 18px; margin-right: 10px; }

    @keyframes org-search-spin {
      to { transform: rotate(360deg); }
    }
  `;
__decorate([
    property({ type: String })
], OrgSearch.prototype, "value", void 0);
__decorate([
    property({ type: String })
], OrgSearch.prototype, "placeholder", void 0);
__decorate([
    property({ type: String })
], OrgSearch.prototype, "size", void 0);
__decorate([
    property({ type: Boolean, reflect: true })
], OrgSearch.prototype, "disabled", void 0);
__decorate([
    property({ type: Boolean, reflect: true })
], OrgSearch.prototype, "loading", void 0);
__decorate([
    property({ type: Number })
], OrgSearch.prototype, "debounce", void 0);
__decorate([
    property({ type: String, attribute: 'aria-label' })
], OrgSearch.prototype, "ariaLabel", void 0);
__decorate([
    state()
], OrgSearch.prototype, "_focused", void 0);
__decorate([
    query('input')
], OrgSearch.prototype, "_input", void 0);
OrgSearch = __decorate([
    customElement('org-search')
], OrgSearch);
export { OrgSearch };
//# sourceMappingURL=search.js.map