<script setup lang="ts">
import type { RFloatingLabelProps } from "@/components"

defineProps<RFloatingLabelProps>()
</script>

<template>
    <span class="rui-floating-label" :class="{ 'rui-floating-label--float-above': floatAbove }">{{ label }}</span>
</template>

<style scoped lang="scss">
@use "@/styles/typography";
@use "@/styles/color";

.rui-floating-label {
    @include typography.subtitle1("--rui-comp-text-field-input-text");
    display: inline-block;
    position: relative;
    top: 50%;
    inset-inline-start: 0;
    transform: translateY(-50%);
    pointer-events: none;
    color: color.$on-surface-medium;
    /* TODO: fix me */
    // Duration from: fast out slow in
    // https://github.com/material-components/material-components-android/blob/master/lib/java/com/google/android/material/textfield/TextInputLayout.java#L210
    transition:
        all 167ms cubic-bezier(0.4, 0, 0.2, 1),
        color 167ms cubic-bezier(0.4, 0, 0.2, 1);

    &--float-above {
        @include typography.caption("--rui-comp-text-field-floating-label");
        top: 0;
        color: color.$primary;
    }
}
</style>
