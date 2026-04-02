var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
import { LitElement, html, css, nothing } from 'lit';
import { customElement, property } from 'lit/decorators.js';
/**
 * A cross-framework enterprise button component.
 *
 * @element org-button
 *
 * @slot - Default slot for button label text
 * @slot icon - Optional icon rendered before the label (hidden when loading)
 *
 * @csspart button - The inner <button> element; style via org-button::part(button)
 *
 * @cssprop --org-btn-primary-bg         - Primary background color
 * @cssprop --org-btn-primary-bg-hover   - Primary hover background
 * @cssprop --org-btn-primary-color      - Primary text color
 * @cssprop --org-btn-secondary-bg       - Secondary background color
 * @cssprop --org-btn-secondary-bg-hover - Secondary hover background
 * @cssprop --org-btn-secondary-color    - Secondary text color
 * @cssprop --org-btn-danger-bg          - Danger background color
 * @cssprop --org-btn-danger-bg-hover    - Danger hover background
 * @cssprop --org-btn-danger-color       - Danger text color
 * @cssprop --org-btn-ghost-bg           - Ghost background (default transparent)
 * @cssprop --org-btn-ghost-bg-hover     - Ghost hover background
 * @cssprop --org-btn-ghost-color        - Ghost text color
 * @cssprop --org-btn-focus-ring         - Focus ring color
 * @cssprop --org-btn-radius             - Border radius
 *
 * @fires org-button:click - Fired on click with { originalEvent: MouseEvent }
 */
let OrgButton = class OrgButton extends LitElement {
    constructor() {
        super(...arguments);
        this.variant = 'primary';
        this.size = 'medium';
        this.disabled = false;
        this.loading = false;
        this.ariaLabel = '';
        this.type = 'button';
    }
    handleClick(e) {
        if (this.disabled || this.loading) {
            e.preventDefault();
            e.stopPropagation();
            return;
        }
        this.dispatchEvent(new CustomEvent('org-button:click', {
            bubbles: true,
            composed: true,
            detail: { originalEvent: e }
        }));
    }
    render() {
        return html `
      <button
        part="button"
        class="${this.variant} ${this.size}"
        ?disabled="${this.disabled || this.loading}"
        aria-label="${this.ariaLabel || nothing}"
        aria-busy="${this.loading ? 'true' : nothing}"
        type="${this.type}"
        @click="${this.handleClick}"
      >
        ${this.loading
            ? html `<span class="spinner" aria-hidden="true"></span>`
            : html `<span class="icon-slot"><slot name="icon"></slot></span>`}
        <slot></slot>
      </button>
    `;
    }
};
OrgButton.styles = css `
    :host {
      display: inline-block;
      font-family: var(--org-font-family, sans-serif);
    }

    :host([disabled]) {
      pointer-events: none;
    }

    button {
      border: none;
      border-radius: var(--org-btn-radius, 6px);
      cursor: pointer;
      font-family: inherit;
      font-weight: var(--org-font-weight-medium, 500);
      display: inline-flex;
      align-items: center;
      justify-content: center;
      gap: 6px;
      transition: background var(--org-transition-normal, 0.2s ease),
                  opacity var(--org-transition-fast, 0.15s ease);
      white-space: nowrap;
      line-height: 1;
      position: relative;
    }

    /* === Sizes === */
    .small  { padding: 6px 12px;  font-size: var(--org-font-size-sm, 12px);  min-height: 30px; }
    .medium { padding: 9px 16px;  font-size: var(--org-font-size-md, 14px);  min-height: 36px; }
    .large  { padding: 12px 22px; font-size: var(--org-font-size-lg, 16px);  min-height: 44px; }

    /* === Variants === */
    .primary {
      background: var(--org-btn-primary-bg, #1976d2);
      color: var(--org-btn-primary-color, #fff);
    }
    .primary:hover:not(:disabled) {
      background: var(--org-btn-primary-bg-hover, #1565c0);
    }

    .secondary {
      background: var(--org-btn-secondary-bg, #e0e0e0);
      color: var(--org-btn-secondary-color, #212121);
    }
    .secondary:hover:not(:disabled) {
      background: var(--org-btn-secondary-bg-hover, #d5d5d5);
    }

    .danger {
      background: var(--org-btn-danger-bg, #d32f2f);
      color: var(--org-btn-danger-color, #fff);
    }
    .danger:hover:not(:disabled) {
      background: var(--org-btn-danger-bg-hover, #b71c1c);
    }

    .ghost {
      background: var(--org-btn-ghost-bg, transparent);
      color: var(--org-btn-ghost-color, #1976d2);
      border: 1px solid currentColor;
    }
    .ghost:hover:not(:disabled) {
      background: var(--org-btn-ghost-bg-hover, #e3f2fd);
    }

    /* === States === */
    button:disabled {
      opacity: 0.5;
      cursor: not-allowed;
    }

    button:focus-visible {
      outline: 2px solid var(--org-btn-focus-ring, #1976d2);
      outline-offset: 2px;
    }

    /* === Spinner === */
    .spinner {
      width: 1em;
      height: 1em;
      border-radius: 50%;
      border: 2px solid transparent;
      border-top-color: currentColor;
      border-right-color: currentColor;
      animation: org-spin 0.65s linear infinite;
      flex-shrink: 0;
    }

    @keyframes org-spin {
      to { transform: rotate(360deg); }
    }

    .icon-slot ::slotted(*) {
      display: flex;
      align-items: center;
    }
  `;
__decorate([
    property({ type: String })
], OrgButton.prototype, "variant", void 0);
__decorate([
    property({ type: String })
], OrgButton.prototype, "size", void 0);
__decorate([
    property({ type: Boolean, reflect: true })
], OrgButton.prototype, "disabled", void 0);
__decorate([
    property({ type: Boolean, reflect: true })
], OrgButton.prototype, "loading", void 0);
__decorate([
    property({ type: String, attribute: 'aria-label' })
], OrgButton.prototype, "ariaLabel", void 0);
__decorate([
    property({ type: String })
], OrgButton.prototype, "type", void 0);
OrgButton = __decorate([
    customElement('org-button')
], OrgButton);
export { OrgButton };
//# sourceMappingURL=button.js.map