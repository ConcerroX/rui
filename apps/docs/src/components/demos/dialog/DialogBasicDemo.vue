<script setup lang="ts">
import { RButton, RDialog } from "@ripple-design/rui"
import { ref } from "vue"

const open = ref(false)
</script>

<template>
    <div class="dialog-demo">
        <RButton variant="contained" @click="open = true">Open dialog</RButton>

        <RDialog v-model="open" title="Delete item" subtitle="This action cannot be undone.">
            <p>Dialogs combine native modal behavior with the shared surface foundation.</p>

            <template #actions="{ close }">
                <RButton variant="text" @click="close('cancel')">Cancel</RButton>
                <RButton variant="contained" @click="close('confirm')">Delete</RButton>
            </template>
        </RDialog>
    </div>
</template>

<style scoped>
.dialog-demo {
    display: grid;
    gap: 1rem;
}

.dialog-demo p {
    margin: 0;
}
</style>
