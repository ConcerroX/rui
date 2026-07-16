<script setup lang="ts">
import { computed } from "vue"

import type { RInputProps } from "./types"

const props = withDefaults(defineProps<RInputProps>(), {
    textArea: false,
    showPlaceholder: true,
    inputType: "text",
    allowNegative: true,
})

const model = defineModel<string>()

const inputMode = computed(() => {
    if (props.inputType === "numeric") return "numeric"
    if (props.inputType === "decimal") return "decimal"
    return undefined
})

const pattern = computed(() => {
    const sign = props.allowNegative ? "-?" : ""

    if (props.inputType === "numeric") return `${sign}[0-9]*`
    if (props.inputType === "decimal") return `${sign}[0-9]*[.]?[0-9]*`
    return undefined
})

function sanitizeValue(rawValue: string) {
    if (props.inputType === "numeric") {
        const isNegative = props.allowNegative && rawValue.startsWith("-")
        const digits = rawValue.replace(/\D+/g, "")
        return `${isNegative ? "-" : ""}${digits}`
    }

    if (props.inputType === "decimal") {
        let normalized = ""
        let hasDot = false

        for (const [index, char] of [...rawValue].entries()) {
            if (char === "-" && index === 0 && props.allowNegative) {
                normalized += char
                continue
            }

            if (/\d/.test(char)) {
                normalized += char
                continue
            }

            if (char === "." && !hasDot) {
                normalized += char
                hasDot = true
            }
        }

        return normalized
    }

    return rawValue
}

function handleInput(event: Event) {
    const target = event.target as HTMLInputElement | HTMLTextAreaElement
    const rawValue = target.value
    const value = sanitizeValue(rawValue)

    if (value !== rawValue) {
        target.value = value
    }

    model.value = value
}
</script>

<template>
    <input
        v-if="!textArea"
        :value="model ?? ''"
        class="rui-input"
        :class="{ 'rui-input--show-placeholder': showPlaceholder }"
        type="text"
        :inputmode="inputMode"
        :pattern="pattern"
        :placeholder="placeholder"
        @input="handleInput"
    />
    <textarea
        v-else
        :value="model ?? ''"
        class="rui-input rui-input--text-area"
        :class="{ 'rui-input--show-placeholder': showPlaceholder }"
        :placeholder="placeholder"
        @input="handleInput"
    />
</template>

<style scoped lang="scss">
@use "@/styles/typography";
@use "@/styles/normalize";
@use "@/styles/color";
@use "@/styles/mixin";
@use "@/styles/motion";

.rui-input {
    /* TODO: declare a global var */
    --rui-comp-text-highlight-color: #{mixin.alpha(color.$primary, 40%)};

    @include normalize.input;
    @include typography.subtitle1("--rui-comp-text-field-input-text");

    color: color.$on-surface-high;
    // Baseline: widely available since January 2020.
    caret-color: color.$primary;

    // Limited availability: not supported by Safari on iOS
    &::selection {
        // Color definition from:
        // https://cs.android.com/android/platform/superproject/+/android-latest-release:frameworks/base/core/res/res/color/highlighted_text_material.xml
        background-color: var(--rui-comp-text-highlight-color);
    }

    &::placeholder {
        @include motion.fadeOut(87ms, motion.$easing-linear);
        opacity: 0;
        color: color.$on-surface-medium;
    }

    &--show-placeholder::placeholder {
        @include motion.fadeIn(87ms, motion.$easing-linear, 67ms);
        opacity: 1;
    }

    &--text-area {
        resize: vertical;
        scrollbar-width: none;
        &::-webkit-scrollbar {
            //display: none;
        }

        /* TODO: redesign this */
        &::-webkit-resizer {
            //border: 2px solid black;
            //background: red;
            //box-shadow: 0 0 5px 5px blue;
            //outline: 2px solid yellow;
            //display: none;
        }
    }
}
</style>
