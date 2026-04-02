import { LitElement } from 'lit';
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
export declare class OrgSearch extends LitElement {
    value: string;
    placeholder: string;
    size: 'small' | 'medium' | 'large';
    disabled: boolean;
    loading: boolean;
    debounce: number;
    ariaLabel: string;
    private _focused;
    private _input;
    private _debounceTimer?;
    static styles: import("lit").CSSResult;
    private get _wrapperClass();
    private _onInput;
    private _onKeydown;
    private _clear;
    private _onFocus;
    private _onBlur;
    focus(): void;
    blur(): void;
    disconnectedCallback(): void;
    render(): import("lit-html").TemplateResult<1>;
}
declare global {
    interface HTMLElementTagNameMap {
        'org-search': OrgSearch;
    }
}
//# sourceMappingURL=search.d.ts.map