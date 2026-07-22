<script setup lang="ts">
defineProps<{
    active?: boolean
}>()
</script>

<template>
    <span class="rui-touch-target-wrapper" :class="{ 'rui-touch-target-wrapper--active': active }">
        <slot />
    </span>
</template>

<style scoped lang="scss">
.rui-touch-target-wrapper {
    position: relative;
    display: inline-flex;
}
</style>
