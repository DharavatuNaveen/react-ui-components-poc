import { LitElement } from 'lit';
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
export declare class OrgButton extends LitElement {
    variant: 'primary' | 'secondary' | 'danger' | 'ghost';
    size: 'small' | 'medium' | 'large';
    disabled: boolean;
    loading: boolean;
    ariaLabel: string;
    type: 'button' | 'submit' | 'reset';
    static styles: import("lit").CSSResult;
    private handleClick;
    render(): import("lit-html").TemplateResult<1>;
}
declare global {
    interface HTMLElementTagNameMap {
        'org-button': OrgButton;
    }
}
//# sourceMappingURL=button.d.ts.map