<script setup lang="ts">
import { RIAccountBalanceFilled } from "@ripple-design/icons"
import { RIcon, RRow } from "@ripple-design/rui"
</script>

<template>
    <RRow gap="16px" wrap align="center">
        <RIcon :icon="RIAccountBalanceFilled" />

        <RIcon :icon="RIAccountBalanceFilled" :size="16" />

        <RIcon :icon="RIAccountBalanceFilled" size="2rem" />

        <span>
            <RIcon :icon="RIAccountBalanceFilled" />
            Decorative inline icon
        </span>

        <RIcon :icon="RIAccountBalanceFilled" label="Favorite" />
    </RRow>
</template>
