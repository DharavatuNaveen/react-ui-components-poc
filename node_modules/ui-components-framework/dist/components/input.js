var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
import { LitElement, html, css, nothing } from 'lit';
import { customElement, property, state, query } from 'lit/decorators.js';
/**
 * A cross-framework enterprise input component with full form participation.
 *
 * @element org-input
 *
 * @slot prefix - Icon or text shown at the left inside the input
 * @slot suffix - Icon or text shown at the right inside the input
 *
 * @csspart container - Outer wrapper div
 * @csspart label     - The label element
 * @csspart input     - The inner <input> element
 * @csspart helper    - Helper / error message text
 *
 * @cssprop --org-input-bg            - Input background
 * @cssprop --org-input-border        - Default border color
 * @cssprop --org-input-border-focus  - Border on focus
 * @cssprop --org-input-border-error  - Border when invalid
 * @cssprop --org-input-border-success- Border when valid
 * @cssprop --org-input-radius        - Border radius
 * @cssprop --org-input-color         - Text color
 * @cssprop --org-input-placeholder   - Placeholder color
 *
 * @fires org-input:input  - On every keystroke with { value }
 * @fires org-input:change - On blur/commit with { value }
 * @fires org-input:focus  - On focus
 * @fires org-input:blur   - On blur
 */
let OrgInput = class OrgInput extends LitElement {
    constructor() {
        super();
        this.label = '';
        this.value = '';
        this.placeholder = '';
        this.type = 'text';
        this.name = '';
        this.helper = '';
        this.error = '';
        this.success = '';
        this.size = 'medium';
        this.disabled = false;
        this.required = false;
        this.readonly = false;
        this.pattern = '';
        this.autocomplete = '';
        this._hasPrefix = false;
        this._hasSuffix = false;
        this._internals = this.attachInternals();
    }
    get validity() { return this._internals.validity; }
    get validationMessage() { return this._internals.validationMessage; }
    focus() { var _a; (_a = this._input) === null || _a === void 0 ? void 0 : _a.focus(); }
    blur() { var _a; (_a = this._input) === null || _a === void 0 ? void 0 : _a.blur(); }
    _onInput(e) {
        const input = e.target;
        this.value = input.value;
        this._internals.setFormValue(this.value);
        this.dispatchEvent(new CustomEvent('org-input:input', {
            bubbles: true, composed: true, detail: { value: this.value }
        }));
    }
    _onChange(e) {
        const input = e.target;
        this.value = input.value;
        this.dispatchEvent(new CustomEvent('org-input:change', {
            bubbles: true, composed: true, detail: { value: this.value }
        }));
    }
    _onFocus() {
        this.dispatchEvent(new CustomEvent('org-input:focus', { bubbles: true, composed: true }));
    }
    _onBlur() {
        this.dispatchEvent(new CustomEvent('org-input:blur', { bubbles: true, composed: true }));
    }
    get _wrapperClass() {
        const classes = ['input-wrapper'];
        if (this.error)
            classes.push('error');
        if (this.success && !this.error)
            classes.push('success');
        if (this.disabled)
            classes.push('disabled');
        if (this._hasPrefix)
            classes.push('has-prefix');
        if (this._hasSuffix)
            classes.push('has-suffix');
        return classes.join(' ');
    }
    get _containerClass() {
        return this.size;
    }
    _onPrefixSlotChange(e) {
        const slot = e.target;
        this._hasPrefix = slot.assignedNodes({ flatten: true }).length > 0;
    }
    _onSuffixSlotChange(e) {
        const slot = e.target;
        this._hasSuffix = slot.assignedNodes({ flatten: true }).length > 0;
    }
    render() {
        var _a, _b;
        const charCount = this.value.length;
        const overLimit = this.maxlength !== undefined && charCount > this.maxlength;
        const helperMsg = this.error || this.success || this.helper;
        const helperType = this.error ? 'error' : this.success ? 'success' : '';
        return html `
      <div class="container ${this._containerClass}" part="container">

        ${this.label ? html `
          <label part="label">
            ${this.label}
            ${this.required ? html `<span class="required-star" aria-hidden="true">*</span>` : nothing}
          </label>
        ` : nothing}

        <div class="${this._wrapperClass}">
          <span class="slot-prefix">
            <slot name="prefix" @slotchange="${this._onPrefixSlotChange}"></slot>
          </span>

          <input
            part="input"
            type="${this.type}"
            name="${this.name || nothing}"
            .value="${this.value}"
            placeholder="${this.placeholder || nothing}"
            ?disabled="${this.disabled}"
            ?required="${this.required}"
            ?readonly="${this.readonly}"
            maxlength="${(_a = this.maxlength) !== null && _a !== void 0 ? _a : nothing}"
            minlength="${(_b = this.minlength) !== null && _b !== void 0 ? _b : nothing}"
            pattern="${this.pattern || nothing}"
            autocomplete="${this.autocomplete || nothing}"
            aria-invalid="${this.error ? 'true' : nothing}"
            aria-describedby="${helperMsg ? 'helper' : nothing}"
            @input="${this._onInput}"
            @change="${this._onChange}"
            @focus="${this._onFocus}"
            @blur="${this._onBlur}"
          />

          <span class="slot-suffix">
            <slot name="suffix" @slotchange="${this._onSuffixSlotChange}"></slot>
          </span>
        </div>

        <div style="display:flex; align-items:center;">
          ${helperMsg ? html `
            <span id="helper" class="helper-text ${helperType}" part="helper">
              ${helperMsg}
            </span>
          ` : nothing}

          ${this.maxlength !== undefined ? html `
            <span class="char-count ${overLimit ? 'over' : ''}">
              ${charCount}/${this.maxlength}
            </span>
          ` : nothing}
        </div>

      </div>
    `;
    }
};
OrgInput.formAssociated = true;
OrgInput.styles = css `
    :host {
      display: block;
      font-family: var(--org-font-family, sans-serif);
    }

    .container {
      display: flex;
      flex-direction: column;
      gap: 4px;
    }

    label {
      font-size: var(--org-font-size-sm, 12px);
      font-weight: var(--org-font-weight-medium, 500);
      color: var(--org-input-label-color, #616161);
    }

    label .required-star {
      color: var(--org-color-danger, #d32f2f);
      margin-left: 2px;
    }

    .input-wrapper {
      display: flex;
      align-items: center;
      border: 1px solid var(--org-input-border, #e0e0e0);
      border-radius: var(--org-input-radius, 6px);
      background: var(--org-input-bg, #fff);
      transition: border-color var(--org-transition-fast, 0.15s ease),
                  box-shadow var(--org-transition-fast, 0.15s ease);
      overflow: hidden;
    }

    /* Sizes */
    .small  .input-wrapper { min-height: 30px; }
    .medium .input-wrapper { min-height: 36px; }
    .large  .input-wrapper { min-height: 44px; }

    .input-wrapper:has(input:focus) {
      border-color: var(--org-input-border-focus, #1976d2);
      box-shadow: 0 0 0 3px color-mix(in srgb, var(--org-input-border-focus, #1976d2) 15%, transparent);
    }

    .input-wrapper.error {
      border-color: var(--org-input-border-error, #d32f2f);
    }

    .input-wrapper.error:has(input:focus) {
      box-shadow: 0 0 0 3px color-mix(in srgb, var(--org-input-border-error, #d32f2f) 15%, transparent);
    }

    .input-wrapper.success {
      border-color: var(--org-input-border-success, #2e7d32);
    }

    .input-wrapper.disabled {
      opacity: 0.55;
      cursor: not-allowed;
      background: var(--org-color-gray-100, #f5f5f5);
    }

    input {
      flex: 1;
      border: none;
      outline: none;
      background: transparent;
      color: var(--org-input-color, #212121);
      font-family: inherit;
      width: 100%;
    }

    .small  input { padding: 5px 10px;  font-size: var(--org-font-size-sm, 12px); }
    .medium input { padding: 8px 12px;  font-size: var(--org-font-size-md, 14px); }
    .large  input { padding: 11px 14px; font-size: var(--org-font-size-lg, 16px); }

    input::placeholder {
      color: var(--org-input-placeholder, #9e9e9e);
    }

    input:disabled {
      cursor: not-allowed;
    }

    .slot-prefix, .slot-suffix {
      display: flex;
      align-items: center;
      color: var(--org-color-gray-500, #9e9e9e);
      flex-shrink: 0;
    }

    .small  .slot-prefix, .small  .slot-suffix { padding: 0 6px; }
    .medium .slot-prefix, .medium .slot-suffix { padding: 0 10px; }
    .large  .slot-prefix, .large  .slot-suffix { padding: 0 12px; }

    .slot-prefix ::slotted(*),
    .slot-suffix ::slotted(*) {
      display: flex;
      align-items: center;
      font-size: 16px;
    }

    /* no left padding on input when prefix slot is used */
    .has-prefix input { padding-left: 0; }
    .has-suffix input { padding-right: 0; }

    .helper-text {
      font-size: var(--org-font-size-xs, 11px);
      color: var(--org-input-helper-color, #616161);
      display: flex;
      align-items: center;
      gap: 4px;
    }

    .helper-text.error   { color: var(--org-input-error-color, #d32f2f); }
    .helper-text.success { color: var(--org-input-success-color, #2e7d32); }

    .char-count {
      font-size: var(--org-font-size-xs, 11px);
      color: var(--org-color-gray-500, #9e9e9e);
      text-align: right;
      margin-left: auto;
    }

    .char-count.over { color: var(--org-input-error-color, #d32f2f); }
  `;
__decorate([
    property({ type: String })
], OrgInput.prototype, "label", void 0);
__decorate([
    property({ type: String })
], OrgInput.prototype, "value", void 0);
__decorate([
    property({ type: String })
], OrgInput.prototype, "placeholder", void 0);
__decorate([
    property({ type: String })
], OrgInput.prototype, "type", void 0);
__decorate([
    property({ type: String })
], OrgInput.prototype, "name", void 0);
__decorate([
    property({ type: String })
], OrgInput.prototype, "helper", void 0);
__decorate([
    property({ type: String })
], OrgInput.prototype, "error", void 0);
__decorate([
    property({ type: String })
], OrgInput.prototype, "success", void 0);
__decorate([
    property({ type: String })
], OrgInput.prototype, "size", void 0);
__decorate([
    property({ type: Boolean, reflect: true })
], OrgInput.prototype, "disabled", void 0);
__decorate([
    property({ type: Boolean, reflect: true })
], OrgInput.prototype, "required", void 0);
__decorate([
    property({ type: Boolean })
], OrgInput.prototype, "readonly", void 0);
__decorate([
    property({ type: Number })
], OrgInput.prototype, "maxlength", void 0);
__decorate([
    property({ type: Number })
], OrgInput.prototype, "minlength", void 0);
__decorate([
    property({ type: String })
], OrgInput.prototype, "pattern", void 0);
__decorate([
    property({ type: String })
], OrgInput.prototype, "autocomplete", void 0);
__decorate([
    state()
], OrgInput.prototype, "_hasPrefix", void 0);
__decorate([
    state()
], OrgInput.prototype, "_hasSuffix", void 0);
__decorate([
    query('input')
], OrgInput.prototype, "_input", void 0);
OrgInput = __decorate([
    customElement('org-input')
], OrgInput);
export { OrgInput };
//# sourceMappingURL=input.js.map