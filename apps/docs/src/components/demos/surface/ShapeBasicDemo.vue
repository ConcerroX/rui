<script setup lang="ts">
import { RColumn, RSurface } from "@ripple-design/rui"
</script>

<template>
    <RColumn gap="16px" class="shape-demo">
        <RSurface class="shape-demo__surface" variant="outlined">
            <div class="shape-demo__content">
                <strong>Rounded surface</strong>
                <p>Uses the default medium rounded shape token.</p>
            </div>
        </RSurface>

        <RSurface class="shape-demo__surface shape-demo__cut-surface" variant="outlined">
            <div class="shape-demo__content">
                <strong>Cut surface</strong>
                <p>Overrides the medium category family to cut corners with corner-shape.</p>
            </div>
        </RSurface>

        <RSurface class="shape-demo__surface shape-demo__asymmetric-surface" variant="outlined">
            <div class="shape-demo__content">
                <strong>Asymmetric cut surface</strong>
                <p>Each logical corner can use a different size through the shared shape vars.</p>
            </div>
        </RSurface>
    </RColumn>
</template>

<style scoped lang="scss">
.shape-demo {
    width: 100%;
}

.shape-demo__surface {
    background-size: 16px 16px;
}

.shape-demo__content {
    padding: 16px;
}

.shape-demo__content p {
    margin: 8px 0 0;
}

.shape-demo__cut-surface {
    --rui-surface-shape-family: bevel;
}

.shape-demo__asymmetric-surface {
    --rui-surface-shape-family: bevel;
    --rui-surface-shape-start-start: 24px;
    --rui-surface-shape-start-end: 8px;
    --rui-surface-shape-end-end: 20px;
    --rui-surface-shape-end-start: 4px;
}
</style>
