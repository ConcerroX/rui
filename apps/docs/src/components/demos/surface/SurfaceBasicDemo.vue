<script setup lang="ts">
import { RColumn, RSurface } from "@ripple-design/rui"
</script>

<template>
    <RColumn gap="16px" class="surface-demo">
        <RSurface>
            <div class="surface-demo__content">
                <strong>Elevated surface</strong>
                <p>Default surface container for grouping related content.</p>
            </div>
        </RSurface>

        <RSurface variant="outlined">
            <div class="surface-demo__content">
                <strong>Outlined surface</strong>
                <p>Use the outlined treatment when a visible boundary is needed.</p>
            </div>
        </RSurface>
    </RColumn>
</template>

<style scoped lang="scss">
.surface-demo {
    width: 100%;
}

.surface-demo__content {
    padding: 16px;
}

.surface-demo__content p {
    margin: 8px 0 0;
}
</style>
