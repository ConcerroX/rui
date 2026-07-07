<script setup lang="ts">
import type { RFloatingLabelProps } from "@/components"

defineProps<RFloatingLabelProps>()
</script>

<template>
    <span
        class="rui-floating-label"
        :class="{
            'rui-floating-label--floating': floating,
            'rui-floating-label--focused': focused,
            'rui-floating-label--has-value': hasValue,
        }"
    >
        {{ label }}
    </span>
</template>

<style scoped lang="scss">
@use "@/styles/typography";
@use "@/styles/color";

.rui-floating-label {
    --rui-text-field-label-position-duration: 167ms;
    --rui-text-field-label-color-duration: 167ms;
    --rui-text-field-label-easing: cubic-bezier(0.4, 0, 0.2, 1);

    @include typography.subtitle1("--rui-comp-text-field-input-text");
    display: inline-block;
    position: relative;
    top: 50%;
    inset-inline-start: 0;
    transform: translateY(-50%);
    pointer-events: none;
    color: color.$on-surface-medium;
    transition:
        top var(--rui-text-field-label-position-duration) var(--rui-text-field-label-easing),
        inset-inline-start var(--rui-text-field-label-position-duration) var(--rui-text-field-label-easing),
        font-size var(--rui-text-field-label-position-duration) var(--rui-text-field-label-easing),
        font-weight var(--rui-text-field-label-position-duration) var(--rui-text-field-label-easing),
        letter-spacing var(--rui-text-field-label-position-duration) var(--rui-text-field-label-easing),
        color var(--rui-text-field-label-color-duration) var(--rui-text-field-label-easing);

    &--floating {
        @include typography.caption("--rui-comp-text-field-floating-label");
        top: 0;
    }

    &--focused {
        color: color.$primary;
    }

    &--has-value {
        --rui-text-field-label-color-duration: 0ms;
    }
}
</style>
