<template>
  <a :href="href">
    <slot></slot>
  </a>
</template>

<script lang="ts" setup>
const { href = "/" } = defineProps<{
  href?: string;
}>();
</script>

<style scoped></style>
