<script setup lang="ts">
import { RColumn } from "@ripple-design/rui"
</script>

<template>
    <RColumn gap="16px" class="touch-target-demo">
        <div class="demo-row" style="--rui-sys-density-scale: 0">
            <span class="demo-label">density 0</span>

            <span class="demo-wrapper">
                <button class="demo-button demo-button--touch-target" type="button">
                    <span class="rui-touch-target" aria-hidden="true" />
                    <span class="demo-button__content">★</span>
                </button>
            </span>
        </div>

        <div class="demo-row" style="--rui-sys-density-scale: -1">
            <span class="demo-label">density -1</span>

            <span class="demo-wrapper">
                <button class="demo-button demo-button--touch-target" type="button">
                    <span class="rui-touch-target" aria-hidden="true" />
                    <span class="demo-button__content">★</span>
                </button>
            </span>
        </div>
    </RColumn>
</template>

<style scoped lang="scss">
@use "@ripple-design/rui/rui" as rui;

.touch-target-demo {
    width: 100%;
}

.demo-row {
    display: flex;
    align-items: center;
    gap: 16px;
}

.demo-label {
    width: 72px;
    font-size: 0.875rem;
    color: var(--rui-sys-color-on-surface-medium);
}

.demo-wrapper {
    position: relative;
    display: inline-flex;
}

.demo-button {
    position: relative;
    width: 24px;
    height: 24px;
    border: 0;
    background: transparent;
    color: var(--rui-sys-color-primary);
    padding: 0;
    font: inherit;
    cursor: pointer;
}

.demo-button--touch-target {
    @include rui.density-touchTargetEnabled();
    @include rui.density-touchTargetMarginXY(24px, 24px);
}

.demo-button__content {
    position: relative;
    z-index: 1;
    display: inline-flex;
    width: 24px;
    height: 24px;
    align-items: center;
    justify-content: center;
}
</style>
