<script setup lang="ts">
import { computed, useAttrs } from "vue"

import type { RSurfaceProps } from "./types"

defineOptions({
    inheritAttrs: false,
})

const props = withDefaults(defineProps<RSurfaceProps>(), {
    variant: "elevated",
    as: "div",
})

const attrs = useAttrs()
const tagName = computed(() => props.as)
const classes = computed(() => ["rui-surface", `rui-surface--${props.variant}`])
</script>

<template>
    <component :is="tagName" v-bind="attrs" :class="classes">
        <slot />
    </component>
</template>

<style scoped lang="scss">
@use "@/styles/color";
@use "@/styles/shape";

.rui-surface {
    --rui-surface-shape-family: var(--rui-sys-shape-medium-family);
    --rui-surface-shape-start-start: var(--rui-sys-shape-medium-start-start);
    --rui-surface-shape-start-end: var(--rui-sys-shape-medium-start-end);
    --rui-surface-shape-end-end: var(--rui-sys-shape-medium-end-end);
    --rui-surface-shape-end-start: var(--rui-sys-shape-medium-end-start);

    display: block;
    box-sizing: border-box;
    margin: 0;
    padding: 0;
    background-color: color.$surface;
    color: color.$on-surface;
    border: 1px solid transparent;

    @include shape.apply(
        var(--rui-surface-shape-family),
        var(--rui-surface-shape-start-start),
        var(--rui-surface-shape-start-end),
        var(--rui-surface-shape-end-end),
        var(--rui-surface-shape-end-start)
    );

    &--outlined {
        border-color: color.$on-surface-outline;
    }
}
</style>
