<template>
  <MGrid class="p-3">
    <MCard :data="children" />
  </MGrid>
</template>

<script setup lang="ts">
const { category } = useRoute().params;
const { children = [] } = getToolsByCategory(String(category)) || {};
</script>

<style></style>
