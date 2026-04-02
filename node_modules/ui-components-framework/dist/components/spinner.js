var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
import { LitElement, html, css, nothing } from 'lit';
import { customElement, property } from 'lit/decorators.js';
/**
 * A loading spinner component.
 *
 * @element org-spinner
 *
 * @csspart spinner - The spinning circle element
 *
 * @cssprop --org-spinner-color  - Spinner color
 * @cssprop --org-spinner-track  - Track (background ring) color
 */
let OrgSpinner = class OrgSpinner extends LitElement {
    constructor() {
        super(...arguments);
        this.size = 'medium';
        this.color = '';
        this.label = 'Loading...';
    }
    render() {
        return html `
      <div
        class="spinner-wrap ${this.size}"
        role="status"
        aria-label="${this.label}"
        style="${this.color ? `--org-spinner-color: ${this.color}` : ''}"
      >
        <div class="spinner" part="spinner"></div>
        ${this.label && this.size !== 'small'
            ? html `<span class="label">${this.label}</span>`
            : nothing}
      </div>
    `;
    }
};
OrgSpinner.styles = css `
    :host { display: inline-flex; align-items: center; justify-content: center; }

    .spinner-wrap {
      display: inline-flex;
      flex-direction: column;
      align-items: center;
      gap: 10px;
    }

    .spinner {
      border-radius: 50%;
      border-style: solid;
      border-color: var(--org-spinner-track, #e0e0e0);
      border-top-color: var(--org-spinner-color, #1976d2);
      border-right-color: var(--org-spinner-color, #1976d2);
      animation: org-spin 0.65s linear infinite;
      flex-shrink: 0;
    }

    .small  .spinner { width: 16px; height: 16px; border-width: 2px; }
    .medium .spinner { width: 24px; height: 24px; border-width: 3px; }
    .large  .spinner { width: 36px; height: 36px; border-width: 3px; }
    .xlarge .spinner { width: 48px; height: 48px; border-width: 4px; }

    .label {
      font-size: var(--org-font-size-sm, 12px);
      color: var(--org-color-text-secondary, #616161);
      font-family: var(--org-font-family, sans-serif);
    }

    @keyframes org-spin {
      to { transform: rotate(360deg); }
    }

    @media (prefers-reduced-motion: reduce) {
      .spinner { animation-duration: 2s; }
    }
  `;
__decorate([
    property({ type: String })
], OrgSpinner.prototype, "size", void 0);
__decorate([
    property({ type: String })
], OrgSpinner.prototype, "color", void 0);
__decorate([
    property({ type: String })
], OrgSpinner.prototype, "label", void 0);
OrgSpinner = __decorate([
    customElement('org-spinner')
], OrgSpinner);
export { OrgSpinner };
// ─────────────────────────────────────────────────────────────────────────────
/**
 * A skeleton loading placeholder component.
 *
 * @element org-skeleton
 *
 * @cssprop --org-skeleton-base   - Base color of the skeleton
 * @cssprop --org-skeleton-shine  - Shimmer highlight color
 */
let OrgSkeleton = class OrgSkeleton extends LitElement {
    constructor() {
        super(...arguments);
        this.variant = 'text';
        this.width = '';
        this.height = '';
        this.lines = 3;
        this.animated = true;
    }
    render() {
        const animClass = this.animated ? 'animated' : '';
        if (this.variant === 'text') {
            return html `
        <div class="text-lines">
          ${Array.from({ length: this.lines }, () => html `
            <div
              class="skeleton text-line ${animClass}"
              style="${this.width ? `width: ${this.width}` : ''}"
            ></div>
          `)}
        </div>
      `;
        }
        if (this.variant === 'circle') {
            const sz = this.width || this.height || '40px';
            return html `
        <div
          class="skeleton circle ${animClass}"
          style="width: ${sz}; height: ${sz};"
        ></div>
      `;
        }
        if (this.variant === 'card') {
            return html `
        <div class="card-skeleton ${animClass}" style="${this.width ? `width: ${this.width}` : ''}">
          <div class="card-header">
            <div class="card-avatar"></div>
            <div class="card-title-block">
              <div class="card-title-line"></div>
              <div class="card-title-line short"></div>
            </div>
          </div>
          <div class="card-image"></div>
          <div style="display:flex; flex-direction:column; gap:6px;">
            <div class="card-body-line"></div>
            <div class="card-body-line"></div>
            <div class="card-body-line short"></div>
          </div>
        </div>
      `;
        }
        // rect
        return html `
      <div
        class="skeleton ${animClass}"
        style="
          width: ${this.width || '100%'};
          height: ${this.height || '20px'};
          border-radius: var(--org-radius-md, 6px);
        "
      ></div>
    `;
    }
};
OrgSkeleton.styles = css `
    :host { display: block; font-family: var(--org-font-family, sans-serif); }

    .skeleton {
      background: var(--org-skeleton-base, #eeeeee);
      border-radius: var(--org-radius-sm, 4px);
      overflow: hidden;
      position: relative;
    }

    .animated::after {
      content: '';
      position: absolute;
      inset: 0;
      background: linear-gradient(
        90deg,
        transparent 0%,
        var(--org-skeleton-shine, #f5f5f5) 50%,
        transparent 100%
      );
      animation: org-shimmer 1.5s infinite;
    }

    @keyframes org-shimmer {
      0%   { transform: translateX(-100%); }
      100% { transform: translateX(100%);  }
    }

    @media (prefers-reduced-motion: reduce) {
      .animated::after { display: none; }
    }

    /* Text lines */
    .text-lines { display: flex; flex-direction: column; gap: 8px; }
    .text-line { height: 14px; border-radius: var(--org-radius-sm, 4px); }
    .text-line:last-child { width: 60%; }

    /* Circle */
    .circle { border-radius: 50%; }

    /* Card */
    .card-skeleton { border-radius: var(--org-radius-lg, 8px); padding: 16px; display: flex; flex-direction: column; gap: 12px; background: var(--org-skeleton-base, #eeeeee); }
    .card-header { display: flex; gap: 12px; align-items: center; }
    .card-avatar { width: 40px; height: 40px; border-radius: 50%; background: var(--org-skeleton-shine, #f5f5f5); flex-shrink: 0; }
    .card-title-block { flex: 1; display: flex; flex-direction: column; gap: 6px; }
    .card-title-line { height: 14px; background: var(--org-skeleton-shine, #f5f5f5); border-radius: 4px; }
    .card-title-line.short { width: 55%; }
    .card-body-line { height: 12px; background: var(--org-skeleton-shine, #f5f5f5); border-radius: 4px; }
    .card-body-line.short { width: 70%; }
    .card-image { height: 120px; background: var(--org-skeleton-shine, #f5f5f5); border-radius: var(--org-radius-md, 6px); }
  `;
__decorate([
    property({ type: String })
], OrgSkeleton.prototype, "variant", void 0);
__decorate([
    property({ type: String })
], OrgSkeleton.prototype, "width", void 0);
__decorate([
    property({ type: String })
], OrgSkeleton.prototype, "height", void 0);
__decorate([
    property({ type: Number })
], OrgSkeleton.prototype, "lines", void 0);
__decorate([
    property({ type: Boolean })
], OrgSkeleton.prototype, "animated", void 0);
OrgSkeleton = __decorate([
    customElement('org-skeleton')
], OrgSkeleton);
export { OrgSkeleton };
//# sourceMappingURL=spinner.js.map