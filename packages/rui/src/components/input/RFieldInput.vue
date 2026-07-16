<script setup lang="ts">
import type { RFieldInputProps } from "./types"

import RInput from "./RInput.vue"

withDefaults(defineProps<RFieldInputProps>(), {
    textArea: false,
})

const model = defineModel<string>()
</script>

<template>
    <RInput
        class="rui-field-input"
        :class="{
            'rui-field-input--focused': focused,
            'rui-field-input--text-area': textArea,
        }"
        v-model="model"
        :input-type="inputType"
        :allow-negative="allowNegative"
        :placeholder="placeholder"
        :show-placeholder="showPlaceholder"
        :text-area="textArea"
    />
</template>

<style scoped lang="scss">
@use "@/styles/density";

.rui-field-input {
    //width: 100%;
    //min-width: fit-content;
    //max-width: 100%;
    min-width: 280px;
    width: 100%;
    height: density.withDecrement(56px, --rui-text-field-density);
    padding-inline: var(--rui-text-field-content-padding-inline);

    &--text-area {
        margin-top: var(--rui-text-field-content-padding-vertical);
        height: density.withDecrement(
            calc(56px - var(--rui-text-field-content-padding-vertical)),
            --rui-text-field-density
        );
        min-height: density.withDecrement(
            calc(56px - var(--rui-text-field-content-padding-vertical)),
            --rui-text-field-density
        );
    }
}
</style>
