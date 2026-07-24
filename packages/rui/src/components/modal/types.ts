/** Close reasons emitted by the {@link RModal} component. */
export type RModalCloseReason = "cancel" | "backdrop" | "action" | "programmatic"

/** Detail payload emitted when a modal closes. */
export type RModalCloseDetail = {
    /** Describes why the modal closed. */
    reason: RModalCloseReason
    /** Carries the action name when the close came from an action trigger. */
    action?: string
}

/** Props for the {@link RModal} component. */
export type RModalProps = {
    /** Controls whether the modal is open. */
    modelValue?: boolean
    /** Allows the Escape key / native cancel event to close the modal. */
    closeOnEscape?: boolean
    /** Allows clicking the backdrop area to close the modal. */
    closeOnBackdrop?: boolean
    /** Restores focus to the previously focused element after close. */
    returnFocus?: boolean
    /** Moves focus to a specific element after the modal opens. */
    initialFocus?: string | HTMLElement
    /** Sets an accessible label when no visible title is present. */
    ariaLabel?: string
    /** Points to the element that labels the modal. */
    ariaLabelledBy?: string
    /** Points to the element that describes the modal. */
    ariaDescribedBy?: string
    /** Controls the dialog role announced to assistive technology. */
    role?: "dialog" | "alertdialog"
}
