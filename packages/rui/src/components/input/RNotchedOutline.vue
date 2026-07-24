<script setup lang="ts">
import { computed, ref } from "vue"

import { useResizeObserver } from "@/utils/useResizeObserver"

import type { RNotchedOutlineProps } from "./types"

import RFloatingLabel from "./RFloatingLabel.vue"

const props = defineProps<RNotchedOutlineProps>()

const shadowLabelRef = ref<HTMLSpanElement | null>(null)
const shadowLabelWidth = ref(0)
const notchWidthPx = computed(() => (props.floating ? shadowLabelWidth.value + "px" : "0px"))

useResizeObserver(shadowLabelRef, (entry) => {
    shadowLabelWidth.value = entry.borderBoxSize[0]?.inlineSize ?? 0
})
</script>

<template>
    <span
        class="rui-notched-outline"
        :class="{
            'rui-notched-outline--hovered': hovered,
            'rui-notched-outline--floating': floating,
            'rui-notched-outline--focused': focused,
        }"
    >
        <span class="rui-notched-outline__leading" />
        <span class="rui-notched-outline__label-space" :style="{ width: shadowLabelWidth + 'px' }">
            <span class="rui-notched-outline__label-space__leading" />
            <span class="rui-notched-outline__label-space__notch" :style="{ width: notchWidthPx }" />
            <span class="rui-notched-outline__label-space__trailing" />
            <span class="rui-notched-outline__label-space__shadow-label" ref="shadowLabelRef">{{ label }}</span>
        </span>
        <span class="rui-notched-outline__trailing" />
        <RFloatingLabel
            class="rui-notched-outline__label"
            :focused="focused"
            :floating="floating"
            :text-area="textArea"
            :has-value="hasValue"
            :label="label"
        />
    </span>
</template>

<style scoped lang="scss">
@use "@/styles/color";
@use "@/styles/shape";
@use "@/styles/typography";

.rui-notched-outline {
    --rui-comp-notched-outline-color: rgba(0 0 0 / 38%);

    $block: &;

    display: flex;
    position: absolute;
    box-sizing: border-box;
    pointer-events: none;
    inset: 0;

    &__leading,
    &__trailing {
        border-width: 1px;
        border-color: var(--rui-comp-notched-outline-color);
        box-sizing: border-box;
    }

    &__leading {
        width: 12px;
        @include shape.apply(
            var(--rui-text-field-shape-family),
            var(--rui-text-field-shape-start-start),
            0,
            0,
            var(--rui-text-field-shape-end-start)
        );
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
            border-color: var(--rui-comp-notched-outline-color);
        }

        &__notch {
            transition: width 200ms cubic-bezier(0.4, 0, 0.2, 1);
            border-width: 1px;
            border-bottom-style: solid;
            border-color: var(--rui-comp-notched-outline-color);
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
        @include shape.apply(
            var(--rui-text-field-shape-family),
            0,
            var(--rui-text-field-shape-start-end),
            var(--rui-text-field-shape-end-end),
            0
        );
        border-inline-end-style: solid;
        border-top-style: solid;
        border-bottom-style: solid;
    }

    &__label {
        position: absolute;
        inset-inline-start: var(--rui-text-field-content-padding-inline);
    }

    &--hovered {
        #{$block}__leading,
        #{$block}__label-space > #{$block}__label-space__leading,
        #{$block}__label-space > #{$block}__label-space__notch,
        #{$block}__label-space > #{$block}__label-space__trailing,
        #{$block}__trailing {
            border-color: color.$on-surface-high;
        }
    }

    &--floating {
        #{$block}__label-space > #{$block}__label-space__notch {
            border-top-style: none;
        }
    }

    &--focused {
        #{$block}__leading,
        #{$block}__label-space > #{$block}__label-space__leading,
        #{$block}__label-space > #{$block}__label-space__notch,
        #{$block}__label-space > #{$block}__label-space__trailing,
        #{$block}__trailing {
            border-width: 2px;
            border-color: color.$primary;
        }

        #{$block}__label-space > #{$block}__label-space__notch {
            transition: width 75ms cubic-bezier(0.4, 0, 0.2, 1);
        }
    }
}
</style>
