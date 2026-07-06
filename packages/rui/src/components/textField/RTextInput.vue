<script setup lang="ts">
import { ref } from "vue"

import type { RTextInputProps } from "./types.ts"

withDefaults(defineProps<RTextInputProps>(), {
    textArea: false,
})

const model = defineModel<string>()

const textAreaRef = ref<HTMLTextAreaElement | null>(null)
</script>

<template>
    <input v-if="!textArea" class="rui-text-input" v-model="model" />
    <textarea v-else class="rui-text-input" v-model="model" ref="textAreaRef" />
</template>

<style scoped lang="scss">
@use "@/styles/typography";
@use "@/styles/normalize";
@use "@/styles/color";
@use "@/styles/mixin";

.rui-text-input {
    /* TODO: declare a global var */
    --rui-comp-text-highlight-color: #{mixin.alpha(color.$primary, 40%)};

    @include normalize.input;
    @include typography.subtitle1("--rui-comp-text-field-input-text");

    // Baseline: widely available since January 2020.
    caret-color: color.$primary;

    // Limited availability: not supported by Safari on iOS
    &::selection {
        // Color definition from:
        // https://cs.android.com/android/platform/superproject/+/android-latest-release:frameworks/base/core/res/res/color/highlighted_text_material.xml
        background-color: var(--rui-comp-text-highlight-color);
    }
}
</style>
