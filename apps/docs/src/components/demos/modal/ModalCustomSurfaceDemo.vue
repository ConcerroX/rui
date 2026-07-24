<script setup lang="ts">
import { RButton, RModal, RSurface } from "@ripple-design/rui"
import { ref } from "vue"

const open = ref(false)
</script>

<template>
    <div class="modal-demo">
        <RButton @click="open = true">Open custom modal</RButton>

        <RModal v-model="open" aria-label="Custom modal example">
            <RSurface class="modal-demo__surface" variant="outlined">
                <div class="modal-demo__content">
                    <strong>Custom modal surface</strong>
                    <p>RModal owns native dialog behavior. RSurface owns the visuals.</p>
                    <RButton variant="contained" @click="open = false">Close</RButton>
                </div>
            </RSurface>
        </RModal>
    </div>
</template>

<style scoped>
.modal-demo {
    display: grid;
    gap: 1rem;
}

.modal-demo__surface {
    width: min(420px, calc(100vw - 32px));
}

.modal-demo__content {
    display: grid;
    gap: 0.75rem;
    padding: 20px;
}

.modal-demo__content p {
    margin: 0;
}
</style>
