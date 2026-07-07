<script setup lang="ts">
/**
 * Text fields let users enter and edit text.
 */

import { computed, ref } from "vue"

import type { RTextFieldProps } from "./types.ts"

import RTextFieldShell from "./components/RTextFieldShell.vue"
import RTextFieldInput from "./components/RTextFieldInput.vue"

const props = defineProps<RTextFieldProps>()

const model = defineModel<string>()

const isFocused = ref(false)
const hasValue = computed(() => model.value != null && model.value !== "")
const isFloating = computed(() => isFocused.value || hasValue.value)
const showPlaceholder = computed(() => !props.label || isFloating.value)
</script>

<template>
    <RTextFieldShell
        :label="props.label"
        :focused="isFocused"
        :floating="isFloating"
        :has-value="hasValue"
        @focus-state-change="isFocused = $event"
    >
        <RTextFieldInput
            v-model="model"
            :placeholder="props.placeholder"
            :show-placeholder="showPlaceholder"
            :text-area="props.textArea"
        />
    </RTextFieldShell>
</template>
