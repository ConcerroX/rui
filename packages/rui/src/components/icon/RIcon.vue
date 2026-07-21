<script setup lang="ts">
import { computed } from "vue"

import type { RIconProps } from "./types"

const props = defineProps<RIconProps>()

const style = computed(() => ({
    "--rui-icon-size": typeof props.size === "number" ? `${props.size}px` : props.size,
}))

const isDecorative = computed(() => props.decorative || !props.label)
const role = computed(() => (isDecorative.value ? undefined : "img"))
const ariaLabel = computed(() => (isDecorative.value ? undefined : props.label))
</script>

<template>
    <svg
        class="rui-icon"
        :style="style"
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 24 24"
        focusable="false"
        :aria-hidden="isDecorative ? 'true' : undefined"
        :role="role"
        :aria-label="ariaLabel"
        v-html="props.icon"
    />
</template>

<style scoped lang="scss">
.rui-icon {
    display: inline-block;
    inline-size: var(--rui-icon-size, 1em);
    block-size: var(--rui-icon-size, 1em);
    flex-shrink: 0;
    vertical-align: middle;
    fill: currentColor;
}
</style>
