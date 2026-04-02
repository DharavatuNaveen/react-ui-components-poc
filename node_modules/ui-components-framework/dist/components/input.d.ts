import { LitElement } from 'lit';
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
export declare class OrgInput extends LitElement {
    static formAssociated: boolean;
    private _internals;
    constructor();
    label: string;
    value: string;
    placeholder: string;
    type: 'text' | 'email' | 'password' | 'number' | 'search' | 'tel' | 'url';
    name: string;
    helper: string;
    error: string;
    success: string;
    size: 'small' | 'medium' | 'large';
    disabled: boolean;
    required: boolean;
    readonly: boolean;
    maxlength?: number;
    minlength?: number;
    pattern: string;
    autocomplete: string;
    private _hasPrefix;
    private _hasSuffix;
    private _input;
    static styles: import("lit").CSSResult;
    get validity(): ValidityState;
    get validationMessage(): string;
    focus(): void;
    blur(): void;
    private _onInput;
    private _onChange;
    private _onFocus;
    private _onBlur;
    private get _wrapperClass();
    private get _containerClass();
    private _onPrefixSlotChange;
    private _onSuffixSlotChange;
    render(): import("lit-html").TemplateResult<1>;
}
declare global {
    interface HTMLElementTagNameMap {
        'org-input': OrgInput;
    }
}
//# sourceMappingURL=input.d.ts.map