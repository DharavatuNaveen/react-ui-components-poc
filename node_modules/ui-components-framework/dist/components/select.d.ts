import { LitElement } from 'lit';
export interface SelectOption {
    value: string;
    label: string;
    disabled?: boolean;
    group?: string;
}
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
export declare class OrgSelect extends LitElement {
    static formAssociated: boolean;
    private _internals;
    constructor();
    label: string;
    placeholder: string;
    options: SelectOption[];
    value: string;
    values: string[];
    multiple: boolean;
    searchable: boolean;
    disabled: boolean;
    required: boolean;
    size: 'small' | 'medium' | 'large';
    error: string;
    helper: string;
    name: string;
    private _open;
    private _search;
    private _focusedIndex;
    static styles: import("lit").CSSResult;
    connectedCallback(): void;
    disconnectedCallback(): void;
    private _handleOutsideClick;
    private get _filteredOptions();
    private get _displayText();
    private _toggleOpen;
    private _selectOption;
    private _removeTag;
    private _onKeydown;
    render(): import("lit-html").TemplateResult<1>;
}
declare global {
    interface HTMLElementTagNameMap {
        'org-select': OrgSelect;
    }
}
//# sourceMappingURL=select.d.ts.map