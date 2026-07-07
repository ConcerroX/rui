<script setup lang="ts">
import { ref } from "vue"

import type { RTextFieldShellProps } from "../types.ts"

import RNotchedOutline from "./RNotchedOutline.vue"

const emit = defineEmits<{
    focusStateChange: [focused: boolean]
}>()

const isHovered = ref(false)

defineProps<RTextFieldShellProps>()
</script>

<template>
    <label
        class="rui-text-field-shell rui-text-field-shell--outlined"
        @focusin="emit('focusStateChange', true)"
        @focusout="emit('focusStateChange', false)"
        @mouseenter="isHovered = true"
        @mouseleave="isHovered = false"
    >
        <slot />
        <RNotchedOutline
            :focused="focused"
            :floating="floating"
            :has-value="hasValue"
            :hovered="isHovered && !focused"
            :label="label"
        />
    </label>
</template>

<style scoped lang="scss">
@use "@/styles/density";

.rui-text-field-shell {
    --rui-text-field-outlined-top-left-radius: 4px;
    --rui-text-field-outlined-top-right-radius: 4px;
    --rui-text-field-outlined-bottom-left-radius: 4px;
    --rui-text-field-outlined-bottom-right-radius: 4px;
    --rui-text-field-content-padding-inline: 16px;
    --rui-text-field-density: -2;

    position: relative;
    display: inline-flex;
    min-height: density.withDecrement(56px, --rui-text-field-density);
    border-radius: var(--rui-text-field-outlined-top-left-radius) var(--rui-text-field-outlined-top-right-radius)
        var(--rui-text-field-outlined-bottom-right-radius) var(--rui-text-field-outlined-bottom-left-radius);
}
</style>
