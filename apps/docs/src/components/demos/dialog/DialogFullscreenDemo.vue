<script setup lang="ts">
import { RButton, RFullscreenDialog } from "@ripple-design/rui"
import { ref } from "vue"

const open = ref(false)
</script>

<template>
    <div class="dialog-demo">
        <RButton variant="outlined" @click="open = true">Open fullscreen dialog</RButton>

        <RFullscreenDialog v-model="open" title="Edit event" subtitle="Review details before saving.">
            <div class="dialog-demo__long-content">
                <p v-for="item in 12" :key="item">Fullscreen dialog content row {{ item }}.</p>
            </div>

            <template #actions="{ close }">
                <RButton variant="text" @click="close('cancel')">Cancel</RButton>
                <RButton variant="contained" @click="close('save')">Save</RButton>
            </template>
        </RFullscreenDialog>
    </div>
</template>

<style scoped>
.dialog-demo {
    display: grid;
    gap: 1rem;
}

.dialog-demo__long-content {
    display: grid;
    gap: 0.75rem;
}

.dialog-demo__long-content p {
    margin: 0;
}
</style>
