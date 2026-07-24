import { RUI_DIALOG_ACTION_ATTRIBUTE } from "./constants"

export function getDialogActionTarget(target: EventTarget | null) {
    if (!(target instanceof Element)) return null
    return target.closest<HTMLElement>(`[${RUI_DIALOG_ACTION_ATTRIBUTE}]`)
}

export function getDialogActionValue(target: HTMLElement) {
    return target.getAttribute(RUI_DIALOG_ACTION_ATTRIBUTE) ?? ""
}

export function isDialogBackdropClick(event: MouseEvent, dialog: HTMLDialogElement) {
    return event.target === dialog && event.currentTarget === dialog
}
