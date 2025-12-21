<template>
  <div class="flex w-full flex-col gap-3">
    <MUpdateNotice :tool="tool" />
    <MHero :tool="tool" />
  </div>
</template>

<script lang="ts" setup>
const { tools = [] } = defineProps<{
  tools: Menu[];
}>();
const tool = flattenMenu(menu).find((item) => item.name === "ghdhair");
</script>

<style scoped></style>
