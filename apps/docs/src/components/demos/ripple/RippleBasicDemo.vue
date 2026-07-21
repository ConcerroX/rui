<script setup lang="ts">
import { RColumn, RRow, vRipple } from "@ripple-design/rui"
</script>

<template>
    <RColumn gap="24px" class="ripple-demo">
        <RRow gap="16px" wrap>
            <button v-ripple class="demo-button" type="button">
                <span class="demo-button__label">Bounded</span>
            </button>

            <button v-ripple="{ disabled: true }" class="demo-button" type="button">
                <span class="demo-button__label">Disabled</span>
            </button>
        </RRow>

        <RColumn gap="12px">
            <span class="demo-section-title">Unbounded behavior</span>

            <RRow gap="24px" wrap align="center">
                <div class="demo-icon-example">
                    <button
                        v-ripple
                        class="demo-button demo-button--icon"
                        type="button"
                        aria-label="Bounded icon action"
                    >
                        <span class="demo-button__label">★</span>
                    </button>
                    <span class="demo-caption">Bounded icon</span>
                </div>

                <div class="demo-icon-example">
                    <button
                        v-ripple.unbounded
                        class="demo-button demo-button--icon"
                        type="button"
                        aria-label="Unbounded icon action"
                    >
                        <span class="demo-button__label">★</span>
                    </button>
                    <span class="demo-caption">Unbounded icon</span>
                </div>
            </RRow>
        </RColumn>

        <RColumn gap="12px">
            <span class="demo-section-title">Keyboard focus</span>

            <div class="demo-keyboard-row">
                <div v-ripple class="demo-button demo-button--custom" role="button" tabindex="0">
                    <span class="demo-button__label">Focus and press Enter or Space</span>
                </div>
            </div>
        </RColumn>
    </RColumn>
</template>

<style scoped>
.ripple-demo {
    width: 100%;
}

.demo-button {
    position: relative;
    display: inline-flex;
    align-items: center;
    justify-content: center;
    min-width: 120px;
    min-height: 44px;
    border: 0;
    border-radius: 0;
    background: transparent;
    color: var(--rui-sys-color-primary);
    padding: 0 20px;
    font: inherit;
    cursor: pointer;
}

.demo-button__label {
    position: relative;
    z-index: 1;
}

.demo-button--icon {
    min-width: 44px;
    width: 44px;
    padding: 0;
    font-size: 1.125rem;
}

.demo-section-title {
    font-size: 0.875rem;
    font-weight: 600;
    color: var(--rui-sys-color-on-surface-medium);
}

.demo-icon-example {
    display: inline-flex;
    flex-direction: column;
    align-items: center;
    gap: 8px;
}

.demo-caption {
    font-size: 0.875rem;
    color: var(--rui-sys-color-on-surface-medium);
}

.demo-keyboard-row {
    display: flex;
}

.demo-button--custom {
    outline: none;
}

.demo-button--custom:focus-visible {
    box-shadow: 0 0 0 3px rgba(from var(--rui-sys-color-primary) r g b / 0.28);
}
</style>
