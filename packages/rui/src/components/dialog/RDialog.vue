<script setup lang="ts">
import { computed, ref, useId, useSlots } from "vue"

import RModal from "@/components/modal/RModal.vue"
import RSurface from "@/components/surface/RSurface.vue"

import type { RDialogProps } from "./types"

const props = withDefaults(defineProps<RDialogProps>(), {
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
    (e: "before-close", detail: { reason: "cancel" | "backdrop" | "action" | "programmatic"; action?: string }): void
    (e: "close", detail: { reason: "cancel" | "backdrop" | "action" | "programmatic"; action?: string }): void
}>()

const slots = useSlots()
const modalRef = ref<InstanceType<typeof RModal> | null>(null)
const titleId = useId()
const descriptionId = useId()
const hasHeader = computed(() => !!slots.header || !!slots.title || !!props.title || !!slots.subtitle || !!props.subtitle)
const hasFooter = computed(() => !!slots.footer || !!slots.actions)
const hasSubtitle = computed(() => !!slots.subtitle || !!props.subtitle)
const hasContent = computed(() => !!slots.default)
const labelledby = computed(() => (hasHeader.value ? titleId : props.ariaLabelledBy))
const describedby = computed(() => (hasContent.value ? descriptionId : props.ariaDescribedBy))
const classes = computed(() => [
    "rui-dialog",
    {
        "rui-dialog--with-header": hasHeader.value,
        "rui-dialog--with-footer": hasFooter.value,
    },
])

function closeWithAction(action: string) {
    modalRef.value?.close({ reason: "action", action })
}

defineExpose({
    open() {
        modalRef.value?.open()
    },
    close(action?: string) {
        modalRef.value?.close(action ? { reason: "action", action } : { reason: "programmatic" })
    },
})
</script>

<template>
    <RModal
        ref="modalRef"
        :model-value="modelValue"
        :close-on-escape="closeOnEscape"
        :close-on-backdrop="closeOnBackdrop"
        :return-focus="returnFocus"
        :initial-focus="initialFocus"
        :role="role"
        :aria-label="ariaLabel"
        :aria-labelledby="labelledby"
        :aria-describedby="describedby"
        class="rui-dialog-modal"
        @update:model-value="emit('update:modelValue', $event)"
        @before-open="emit('before-open')"
        @open="emit('open')"
        @before-close="emit('before-close', $event)"
        @close="emit('close', $event)"
    >
        <RSurface :class="classes">
            <header v-if="hasHeader" class="rui-dialog__header">
                <slot name="header">
                    <h2 :id="titleId" class="rui-dialog__title">
                        <slot name="title">{{ title }}</slot>
                    </h2>
                    <p v-if="hasSubtitle" class="rui-dialog__subtitle">
                        <slot name="subtitle">{{ subtitle }}</slot>
                    </p>
                </slot>
            </header>

            <div v-if="hasContent" :id="descriptionId" class="rui-dialog__content">
                <slot />
            </div>

            <footer v-if="hasFooter" class="rui-dialog__footer">
                <slot name="footer">
                    <div v-if="$slots.actions" class="rui-dialog__actions">
                        <slot name="actions" :close="closeWithAction" />
                    </div>
                </slot>
            </footer>
        </RSurface>
    </RModal>
</template>

<style scoped lang="scss">
@use "@/styles/color";
@use "@/styles/typography";

.rui-dialog {
    width: min(560px, calc(100vw - 32px));
    max-height: calc(100vh - 32px);
    overflow: hidden;
    display: grid;
    grid-template-rows: auto minmax(0, 1fr) auto;
}

.rui-dialog__header,
.rui-dialog__footer {
    padding: 24px 24px 0;
}

.rui-dialog__content {
    @include typography.subtitle1("--rui-comp-dialog-content");
    padding: 20px 24px;
    overflow: auto;
    overscroll-behavior: contain;
}

.rui-dialog__footer {
    padding: 0 24px 24px;
}

.rui-dialog__title {
    @include typography.subtitle1("--rui-comp-dialog-title");
    margin: 0;
    color: color.$on-surface;
}

.rui-dialog__subtitle {
    @include typography.caption("--rui-comp-dialog-subtitle");
    margin: 8px 0 0;
    color: color.$on-surface-medium;
}

.rui-dialog__actions {
    display: flex;
    justify-content: flex-end;
    gap: 8px;
}

.rui-dialog--with-header .rui-dialog__header {
    border-bottom: 1px solid color.$on-surface-outline;
    padding-bottom: 16px;
}

.rui-dialog--with-footer .rui-dialog__footer {
    border-top: 1px solid color.$on-surface-outline;
    padding-top: 16px;
}
</style>
