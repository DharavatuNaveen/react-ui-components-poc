var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
import { LitElement, html, css, nothing } from 'lit';
import { customElement, property, state } from 'lit/decorators.js';
/**
 * A cross-framework enterprise select/dropdown component.
 *
 * @element org-select
 *
 * @csspart trigger   - The visible trigger button
 * @csspart dropdown  - The dropdown panel
 * @csspart option    - Individual option items
 *
 * @cssprop --org-select-bg            - Background color
 * @cssprop --org-select-border        - Border color
 * @cssprop --org-select-border-focus  - Border on focus
 * @cssprop --org-select-radius        - Border radius
 * @cssprop --org-select-option-hover  - Option hover background
 * @cssprop --org-select-option-selected - Selected option background
 *
 * @fires org-select:change - On selection change with { value, values, option }
 */
let OrgSelect = class OrgSelect extends LitElement {
    constructor() {
        super();
        this.label = '';
        this.placeholder = 'Select an option';
        this.options = [];
        this.value = '';
        this.values = [];
        this.multiple = false;
        this.searchable = false;
        this.disabled = false;
        this.required = false;
        this.size = 'medium';
        this.error = '';
        this.helper = '';
        this.name = '';
        this._open = false;
        this._search = '';
        this._focusedIndex = -1;
        this._handleOutsideClick = (e) => {
            if (!this.contains(e.target))
                this._open = false;
        };
        this._internals = this.attachInternals();
    }
    connectedCallback() {
        super.connectedCallback();
        document.addEventListener('click', this._handleOutsideClick);
    }
    disconnectedCallback() {
        super.disconnectedCallback();
        document.removeEventListener('click', this._handleOutsideClick);
    }
    get _filteredOptions() {
        if (!this._search)
            return this.options;
        const q = this._search.toLowerCase();
        return this.options.filter(o => o.label.toLowerCase().includes(q));
    }
    get _displayText() {
        var _a;
        if (this.multiple)
            return '';
        const opt = this.options.find(o => o.value === this.value);
        return (_a = opt === null || opt === void 0 ? void 0 : opt.label) !== null && _a !== void 0 ? _a : '';
    }
    _toggleOpen() {
        if (this.disabled)
            return;
        this._open = !this._open;
        if (!this._open)
            this._search = '';
    }
    _selectOption(opt) {
        if (opt.disabled)
            return;
        if (this.multiple) {
            const idx = this.values.indexOf(opt.value);
            if (idx === -1)
                this.values = [...this.values, opt.value];
            else
                this.values = this.values.filter(v => v !== opt.value);
            this._internals.setFormValue(this.values.join(','));
        }
        else {
            this.value = opt.value;
            this._internals.setFormValue(this.value);
            this._open = false;
            this._search = '';
        }
        this.dispatchEvent(new CustomEvent('org-select:change', {
            bubbles: true, composed: true,
            detail: { value: this.value, values: this.values, option: opt }
        }));
    }
    _removeTag(val, e) {
        e.stopPropagation();
        this.values = this.values.filter(v => v !== val);
        this._internals.setFormValue(this.values.join(','));
        this.dispatchEvent(new CustomEvent('org-select:change', {
            bubbles: true, composed: true, detail: { values: this.values }
        }));
    }
    _onKeydown(e) {
        const opts = this._filteredOptions.filter(o => !o.disabled);
        if (e.key === 'Enter' || e.key === ' ') {
            if (!this._open) {
                this._open = true;
                return;
            }
            if (this._focusedIndex >= 0)
                this._selectOption(opts[this._focusedIndex]);
        }
        if (e.key === 'Escape') {
            this._open = false;
            this._search = '';
        }
        if (e.key === 'ArrowDown') {
            e.preventDefault();
            this._open = true;
            this._focusedIndex = Math.min(this._focusedIndex + 1, opts.length - 1);
        }
        if (e.key === 'ArrowUp') {
            e.preventDefault();
            this._focusedIndex = Math.max(this._focusedIndex - 1, 0);
        }
    }
    render() {
        const filtered = this._filteredOptions;
        const groups = [...new Set(filtered.map(o => o.group))];
        const triggerClass = [
            'trigger',
            this._open ? 'open' : '',
            this.error ? 'error' : ''
        ].filter(Boolean).join(' ');
        return html `
      <div class="container ${this.size}">
        ${this.label ? html `
          <label>
            ${this.label}
            ${this.required ? html `<span class="required-star">*</span>` : nothing}
          </label>
        ` : nothing}

        <button
          part="trigger"
          class="${triggerClass}"
          ?disabled="${this.disabled}"
          aria-haspopup="listbox"
          aria-expanded="${this._open}"
          @click="${this._toggleOpen}"
          @keydown="${this._onKeydown}"
          type="button"
        >
          ${this.multiple ? html `
            <div class="tags">
              ${this.values.length > 0
            ? this.values.map(v => {
                const opt = this.options.find(o => o.value === v);
                return opt ? html `
                      <span class="tag">
                        ${opt.label}
                        <span class="tag-remove" @click="${(e) => this._removeTag(v, e)}">✕</span>
                      </span>
                    ` : nothing;
            })
            : html `<span class="trigger-text placeholder">${this.placeholder}</span>`}
            </div>
          ` : html `
            <span class="trigger-text ${this._displayText ? '' : 'placeholder'}">
              ${this._displayText || this.placeholder}
            </span>
          `}
          <span class="chevron ${this._open ? 'open' : ''}">▼</span>
        </button>

        ${this._open ? html `
          <div class="dropdown" part="dropdown" role="listbox">
            ${this.searchable ? html `
              <div class="search-box">
                <input
                  type="text"
                  placeholder="Search..."
                  .value="${this._search}"
                  @input="${(e) => { this._search = e.target.value; this._focusedIndex = -1; }}"
                  @click="${(e) => e.stopPropagation()}"
                  autofocus
                />
              </div>
            ` : nothing}

            <div class="options-list">
              ${filtered.length === 0
            ? html `<div class="no-results">No results found</div>`
            : groups.map(group => html `
                    ${group ? html `<div class="option-group-label">${group}</div>` : nothing}
                    ${filtered.filter(o => o.group === group).map((opt, idx) => {
                const isSelected = this.multiple
                    ? this.values.includes(opt.value)
                    : this.value === opt.value;
                return html `
                        <div
                          part="option"
                          class="option ${isSelected ? 'selected' : ''} ${opt.disabled ? 'disabled' : ''} ${this._focusedIndex === idx ? 'focused' : ''}"
                          role="option"
                          aria-selected="${isSelected}"
                          @click="${() => this._selectOption(opt)}"
                        >
                          ${this.multiple ? html `<span class="option-check">${isSelected ? '✓' : ''}</span>` : nothing}
                          ${opt.label}
                        </div>
                      `;
            })}
                  `)}
            </div>
          </div>
        ` : nothing}

        ${this.error || this.helper ? html `
          <span class="helper-text ${this.error ? 'error' : ''}">
            ${this.error || this.helper}
          </span>
        ` : nothing}
      </div>
    `;
    }
};
OrgSelect.formAssociated = true;
OrgSelect.styles = css `
    :host {
      display: block;
      font-family: var(--org-font-family, sans-serif);
      position: relative;
    }

    .container { display: flex; flex-direction: column; gap: 4px; }

    label {
      font-size: var(--org-font-size-sm, 12px);
      font-weight: var(--org-font-weight-medium, 500);
      color: var(--org-input-label-color, #616161);
    }

    .required-star { color: var(--org-color-danger, #d32f2f); margin-left: 2px; }

    .trigger {
      display: flex;
      align-items: center;
      justify-content: space-between;
      border: 1px solid var(--org-select-border, #e0e0e0);
      border-radius: var(--org-select-radius, 6px);
      background: var(--org-select-bg, #fff);
      cursor: pointer;
      gap: 8px;
      transition: border-color var(--org-transition-fast, 0.15s ease),
                  box-shadow var(--org-transition-fast, 0.15s ease);
      font-family: inherit;
      text-align: left;
    }

    .small  .trigger { padding: 5px 10px;  font-size: var(--org-font-size-sm, 12px);  min-height: 30px; }
    .medium .trigger { padding: 8px 12px;  font-size: var(--org-font-size-md, 14px);  min-height: 36px; }
    .large  .trigger { padding: 11px 14px; font-size: var(--org-font-size-lg, 16px);  min-height: 44px; }

    .trigger:focus-visible {
      outline: none;
      border-color: var(--org-select-border-focus, #1976d2);
      box-shadow: 0 0 0 3px color-mix(in srgb, var(--org-select-border-focus, #1976d2) 15%, transparent);
    }

    .trigger.open {
      border-color: var(--org-select-border-focus, #1976d2);
      box-shadow: 0 0 0 3px color-mix(in srgb, var(--org-select-border-focus, #1976d2) 15%, transparent);
    }

    .trigger.error { border-color: var(--org-input-border-error, #d32f2f); }
    .trigger:disabled, :host([disabled]) .trigger {
      opacity: 0.55;
      cursor: not-allowed;
      background: var(--org-color-gray-100, #f5f5f5);
    }

    .trigger-text {
      flex: 1;
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;
      color: var(--org-input-color, #212121);
    }

    .trigger-text.placeholder { color: var(--org-input-placeholder, #9e9e9e); }

    .chevron {
      flex-shrink: 0;
      color: var(--org-color-gray-500, #9e9e9e);
      transition: transform var(--org-transition-fast, 0.15s ease);
      font-size: 10px;
    }

    .chevron.open { transform: rotate(180deg); }

    /* Dropdown */
    .dropdown {
      position: absolute;
      top: calc(100% + 4px);
      left: 0;
      right: 0;
      background: var(--org-select-bg, #fff);
      border: 1px solid var(--org-select-border, #e0e0e0);
      border-radius: var(--org-select-radius, 6px);
      box-shadow: var(--org-shadow-md, 0 4px 6px rgba(0,0,0,0.07));
      z-index: var(--org-z-dropdown, 100);
      max-height: 260px;
      display: flex;
      flex-direction: column;
      overflow: hidden;
    }

    .search-box {
      padding: 8px;
      border-bottom: 1px solid var(--org-select-border, #e0e0e0);
      flex-shrink: 0;
    }

    .search-box input {
      width: 100%;
      border: 1px solid var(--org-select-border, #e0e0e0);
      border-radius: 4px;
      padding: 5px 8px;
      font-size: var(--org-font-size-sm, 12px);
      font-family: inherit;
      background: var(--org-input-bg, #fff);
      color: var(--org-input-color, #212121);
      outline: none;
      box-sizing: border-box;
    }

    .search-box input:focus {
      border-color: var(--org-select-border-focus, #1976d2);
    }

    .options-list {
      overflow-y: auto;
      padding: 4px 0;
    }

    .option-group-label {
      padding: 6px 12px 2px;
      font-size: var(--org-font-size-xs, 11px);
      font-weight: var(--org-font-weight-medium, 500);
      color: var(--org-color-gray-500, #9e9e9e);
      text-transform: uppercase;
      letter-spacing: 0.05em;
    }

    .option {
      padding: 8px 12px;
      cursor: pointer;
      display: flex;
      align-items: center;
      gap: 8px;
      font-size: var(--org-font-size-md, 14px);
      color: var(--org-input-color, #212121);
      transition: background var(--org-transition-fast, 0.15s ease);
    }

    .option:hover, .option.focused {
      background: var(--org-select-option-hover, #e3f2fd);
    }

    .option.selected {
      background: var(--org-select-option-selected, #e3f2fd);
      color: var(--org-color-primary, #1976d2);
      font-weight: var(--org-font-weight-medium, 500);
    }

    .option.disabled {
      opacity: 0.45;
      cursor: not-allowed;
      pointer-events: none;
    }

    .option-check {
      flex-shrink: 0;
      width: 16px;
      height: 16px;
      border: 1.5px solid var(--org-select-border, #e0e0e0);
      border-radius: 3px;
      display: flex;
      align-items: center;
      justify-content: center;
      font-size: 10px;
      color: transparent;
    }

    .option.selected .option-check {
      background: var(--org-color-primary, #1976d2);
      border-color: var(--org-color-primary, #1976d2);
      color: white;
    }

    .no-results {
      padding: 12px;
      text-align: center;
      color: var(--org-color-gray-500, #9e9e9e);
      font-size: var(--org-font-size-sm, 12px);
    }

    .tags {
      display: flex;
      flex-wrap: wrap;
      gap: 4px;
      flex: 1;
      min-width: 0;
    }

    .tag {
      display: inline-flex;
      align-items: center;
      gap: 4px;
      padding: 2px 6px;
      background: var(--org-color-primary-light, #e3f2fd);
      color: var(--org-color-primary, #1976d2);
      border-radius: var(--org-radius-sm, 4px);
      font-size: var(--org-font-size-xs, 11px);
      font-weight: var(--org-font-weight-medium, 500);
    }

    .tag-remove {
      cursor: pointer;
      opacity: 0.7;
      line-height: 1;
      font-size: 12px;
    }

    .tag-remove:hover { opacity: 1; }

    .helper-text {
      font-size: var(--org-font-size-xs, 11px);
      color: var(--org-input-helper-color, #616161);
    }

    .helper-text.error { color: var(--org-input-error-color, #d32f2f); }
  `;
__decorate([
    property({ type: String })
], OrgSelect.prototype, "label", void 0);
__decorate([
    property({ type: String })
], OrgSelect.prototype, "placeholder", void 0);
__decorate([
    property({ type: Array })
], OrgSelect.prototype, "options", void 0);
__decorate([
    property({ type: String })
], OrgSelect.prototype, "value", void 0);
__decorate([
    property({ type: Array })
], OrgSelect.prototype, "values", void 0);
__decorate([
    property({ type: Boolean })
], OrgSelect.prototype, "multiple", void 0);
__decorate([
    property({ type: Boolean })
], OrgSelect.prototype, "searchable", void 0);
__decorate([
    property({ type: Boolean, reflect: true })
], OrgSelect.prototype, "disabled", void 0);
__decorate([
    property({ type: Boolean })
], OrgSelect.prototype, "required", void 0);
__decorate([
    property({ type: String })
], OrgSelect.prototype, "size", void 0);
__decorate([
    property({ type: String })
], OrgSelect.prototype, "error", void 0);
__decorate([
    property({ type: String })
], OrgSelect.prototype, "helper", void 0);
__decorate([
    property({ type: String })
], OrgSelect.prototype, "name", void 0);
__decorate([
    state()
], OrgSelect.prototype, "_open", void 0);
__decorate([
    state()
], OrgSelect.prototype, "_search", void 0);
__decorate([
    state()
], OrgSelect.prototype, "_focusedIndex", void 0);
OrgSelect = __decorate([
    customElement('org-select')
], OrgSelect);
export { OrgSelect };
//# sourceMappingURL=select.js.map