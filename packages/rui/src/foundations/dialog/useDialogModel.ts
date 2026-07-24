import type { Ref } from "vue"

import { nextTick, watch } from "vue"

export function useDialogModel(
    dialogRef: Ref<HTMLDialogElement | null>,
    modelValue: Ref<boolean>,
    options: {
        onAfterOpen?: () => void | Promise<void>
        onBeforeOpen?: () => void
        onRequestClose?: () => void
    },
) {
    watch(
        [dialogRef, modelValue],
        async ([dialog, isOpen]) => {
            if (!dialog) return

            if (isOpen && !dialog.open) {
                options.onBeforeOpen?.()
                dialog.showModal()
                await nextTick()
                await options.onAfterOpen?.()
                return
            }

            if (!isOpen && dialog.open) {
                options.onRequestClose?.()
            }
        },
        { immediate: true, flush: "post" },
    )
}
