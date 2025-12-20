<template>
  <svg class="size-3.5 shrink-0">
    <use :xlink:href="`#${icon}`"></use>
  </svg>
</template>

<script lang="ts" setup>
const { icon = "" } = defineProps<{
  icon?: string;
}>();
</script>

<style scoped></style>
