<script setup lang="ts">
import type { RTextFieldProps } from "./types.ts"

import RTextFieldShell from "./components/RTextFieldShell.vue"
import RTextInput from "./RTextInput.vue"

defineProps<RTextFieldProps>()

const model = defineModel<string>()
</script>

<template>
    <RTextFieldShell :label="label">
        <RTextInput v-model="model" />
    </RTextFieldShell>
</template>

<style scoped lang="scss"></style>
