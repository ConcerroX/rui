<script setup lang="ts">
import type { RTextFieldBaseProps } from "./types.ts"

withDefaults(defineProps<RTextFieldBaseProps>(), {
    textArea: false,
})
</script>

<template>
    <input />
</template>
