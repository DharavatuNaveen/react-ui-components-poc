import { LitElement } from 'lit';
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
export declare class OrgSpinner extends LitElement {
    size: 'small' | 'medium' | 'large' | 'xlarge';
    color: string;
    label: string;
    static styles: import("lit").CSSResult;
    render(): import("lit-html").TemplateResult<1>;
}
/**
 * A skeleton loading placeholder component.
 *
 * @element org-skeleton
 *
 * @cssprop --org-skeleton-base   - Base color of the skeleton
 * @cssprop --org-skeleton-shine  - Shimmer highlight color
 */
export declare class OrgSkeleton extends LitElement {
    variant: 'text' | 'circle' | 'rect' | 'card';
    width: string;
    height: string;
    lines: number;
    animated: boolean;
    static styles: import("lit").CSSResult;
    render(): import("lit-html").TemplateResult<1>;
}
declare global {
    interface HTMLElementTagNameMap {
        'org-spinner': OrgSpinner;
        'org-skeleton': OrgSkeleton;
    }
}
//# sourceMappingURL=spinner.d.ts.map