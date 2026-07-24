<script setup lang="ts">
import { RAlertDialog, RButton } from "@ripple-design/rui"
import { ref } from "vue"

const open = ref(false)
</script>

<template>
    <div class="dialog-demo">
        <RButton variant="outlined" @click="open = true">Open alert dialog</RButton>

        <RAlertDialog v-model="open" title="Discard draft?">
            <p>Your unsaved changes will be lost.</p>

            <template #actions="{ close }">
                <RButton variant="text" @click="close('keep')">Keep editing</RButton>
                <RButton variant="contained" @click="close('discard')">Discard</RButton>
            </template>
        </RAlertDialog>
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
