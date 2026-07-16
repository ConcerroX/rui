/** Props for the {@link RNumberField} component. */
export type RNumberFieldProps = {
    /** Sets the visible field label. */
    label?: string
    /** Sets the placeholder text shown when the field is empty. */
    placeholder?: string
    /** Controls whether the field accepts integer or decimal numeric input. */
    inputType?: "numeric" | "decimal"
    /** Sets the minimum allowed numeric value. */
    min?: number
    /** Sets the maximum allowed numeric value. */
    max?: number
}
