<script setup lang="ts">
import { computed, nextTick, onMounted, ref, useAttrs } from "vue"

import { RUI_DIALOG_ACTION_ATTRIBUTE } from "@/foundations/dialog/constants"
import { getDialogActionTarget, getDialogActionValue, isDialogBackdropClick } from "@/foundations/dialog/useDialogDismiss"
import { useDialogModel } from "@/foundations/dialog/useDialogModel"
import { useReturnFocus } from "@/foundations/dialog/useReturnFocus"

import type { RModalCloseDetail, RModalCloseReason, RModalProps } from "./types"

const props = withDefaults(defineProps<RModalProps>(), {
    modelValue: false,
    closeOnEscape: true,
    closeOnBackdrop: true,
    returnFocus: true,
    role: "dialog",
})

const emit = defineEmits<{
    (e: "update:modelValue", value: boolean): void
    (e: "before-open"): void
    (e: "open"): void
    (e: "before-close", detail: RModalCloseDetail): void
    (e: "close", detail: RModalCloseDetail): void
}>()

const attrs = useAttrs()
const dialogRef = ref<HTMLDialogElement | null>(null)
const pendingClose = ref<RModalCloseDetail | null>(null)
const { capture, restore } = useReturnFocus()

const model = computed(() => !!props.modelValue)
const resolvedInitialFocus = computed(() => props.initialFocus)
const ariaLabel = computed(() => props.ariaLabel)
const ariaLabelledby = computed(() => props.ariaLabelledBy)
const ariaDescribedby = computed(() => props.ariaDescribedBy)
const role = computed(() => props.role)

function focusInitialTarget() {
    const dialog = dialogRef.value
    if (!dialog) return

    const target = resolvedInitialFocus.value

    if (typeof target === "string") {
        dialog.querySelector<HTMLElement>(target)?.focus()
        return
    }

    if (target instanceof HTMLElement) {
        target.focus()
        return
    }

    dialog.focus()
}

async function afterOpen() {
    await nextTick()
    focusInitialTarget()
    emit("open")
}

function requestClose(detail: RModalCloseDetail) {
    const dialog = dialogRef.value
    if (!dialog?.open) return

    pendingClose.value = detail
    emit("before-close", detail)
    dialog.close(detail.action ?? detail.reason)
}

useDialogModel(dialogRef, model, {
    onBeforeOpen() {
        capture()
        emit("before-open")
    },
    onAfterOpen: afterOpen,
    onRequestClose() {
        requestClose({ reason: "programmatic" })
    },
})

function handleCancel(event: Event) {
    if (!props.closeOnEscape) {
        event.preventDefault()
        return
    }

    event.preventDefault()
    requestClose({ reason: "cancel" })
}

function handleWheel(event: WheelEvent) {
    if (event.target instanceof Element && event.target.closest(".rui-dialog__content")) {
        return
    }

    event.preventDefault()
}

function handleClick(event: MouseEvent) {
    const actionTarget = getDialogActionTarget(event.target)
    if (actionTarget) {
        requestClose({
            reason: "action",
            action: getDialogActionValue(actionTarget),
        })
        return
    }

    const dialog = dialogRef.value
    if (!dialog || !props.closeOnBackdrop) return

    if (isDialogBackdropClick(event, dialog)) {
        requestClose({ reason: "backdrop" })
    }
}

function handleClose() {
    const detail = pendingClose.value ?? { reason: "programmatic" as RModalCloseReason }
    pendingClose.value = null
    restore(props.returnFocus)
    emit("update:modelValue", false)
    emit("close", detail)
}

defineExpose({
    open() {
        if (!props.modelValue) {
            emit("update:modelValue", true)
        }
    },
    close(detail?: Partial<RModalCloseDetail>) {
        requestClose({
            reason: detail?.reason ?? "programmatic",
            action: detail?.action,
        })
    },
    element: dialogRef,
})

onMounted(() => {
    if (!dialogRef.value) return
    if (!dialogRef.value.hasAttribute("tabindex")) {
        dialogRef.value.tabIndex = -1
    }
})
</script>

<template>
    <dialog
        ref="dialogRef"
        v-bind="attrs"
        :aria-label="ariaLabel"
        :aria-labelledby="ariaLabelledby"
        :aria-describedby="ariaDescribedby"
        :role="role"
        @cancel="handleCancel"
        @click="handleClick"
        @close="handleClose"
        @wheel.prevent="handleWheel"
    >
        <slot />
    </dialog>
</template>

<style scoped>
dialog {
    border: 0;
    padding: 0;
    background: transparent;
}

dialog::backdrop {
    background: rgba(from var(--rui-sys-color-on-surface) r g b / 0.32);
}
</style>
