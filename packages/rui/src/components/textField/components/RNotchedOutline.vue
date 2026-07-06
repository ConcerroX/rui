<script setup lang="ts">
import { computed, onMounted, ref } from "vue"

import type { RNotchedOutlineProps } from "../types.ts"

import RFloatingLabel from "../components/RFloatingLabel.vue"

const props = defineProps<RNotchedOutlineProps>()

const shadowLabelRef = ref<HTMLSpanElement | null>(null)
const shadowLabelWidth = ref(0)
const notchWidthPx = computed(() => (props.focused ? shadowLabelWidth.value + "px" : "0px"))

onMounted(() => {
    if (shadowLabelRef.value) {
        console.log(shadowLabelRef.value.offsetWidth)
        shadowLabelWidth.value = shadowLabelRef.value.offsetWidth
    }
})
</script>

<template>
    <span class="rui-notched-outline">
        <span class="rui-notched-outline__leading" />
        <span class="rui-notched-outline__label-space" :style="{ width: shadowLabelWidth + 'px' }">
            <span class="rui-notched-outline__label-space__leading" />
            <span class="rui-notched-outline__label-space__notch" :style="{ width: notchWidthPx }" />
            <span class="rui-notched-outline__label-space__trailing" />
            <span class="rui-notched-outline__label-space__shadow-label" ref="shadowLabelRef">{{ label }}</span>
        </span>
        <span class="rui-notched-outline__trailing" />
        <RFloatingLabel class="rui-notched-outline__label" :float-above="focused" :label="label" />
    </span>
</template>

<style scoped lang="scss">
@use "@/styles/color";
@use "@/styles/typography";

.rui-notched-outline {
    $block: &;

    display: flex;
    position: absolute;
    box-sizing: border-box;
    pointer-events: none;
    inset: 0;

    &__leading,
    &__trailing {
        border-width: 1px;
        border-color: rgba(0 0 0 / 12%);
        box-sizing: border-box;
    }

    &__leading {
        width: 12px;
        // Baseline: widely available since September 2021.
        border-start-start-radius: var(--rui-text-field-outlined-top-left-radius);
        border-end-start-radius: var(--rui-text-field-outlined-bottom-left-radius);
        border-inline-start-style: solid;
        border-top-style: solid;
        border-bottom-style: solid;
    }

    &__label-space {
        display: flex;

        &__leading,
        &__trailing {
            flex: 1;
            border-width: 1px;
            border-top-style: solid;
            border-bottom-style: solid;
            border-color: rgba(0 0 0 / 12%);
        }

        &__notch {
            transition: width 200ms cubic-bezier(0.4, 0, 0.2, 1);
            border-width: 1px;
            border-bottom-style: solid;
            border-color: rgba(0 0 0 / 12%);
        }

        &__shadow-label {
            @include typography.caption("--rui-comp-text-field-floating-label");
            opacity: 0;
            visibility: hidden;
            position: absolute;
            padding: 0 4px;
        }
    }

    &__trailing {
        flex-grow: 1;
        // Baseline: widely available since September 2021.
        border-start-end-radius: var(--rui-text-field-outlined-top-right-radius);
        border-end-end-radius: var(--rui-text-field-outlined-bottom-right-radius);
        border-inline-end-style: solid;
        border-top-style: solid;
        border-bottom-style: solid;
    }

    &__label {
        position: absolute;
        inset-inline-start: 16px;
    }
}
</style>
