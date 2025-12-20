<template>
  <div class="flex w-full flex-col gap-3">
    <UpdateNotice />
    <MCarousel />
  </div>
</template>

<script lang="ts" setup>
const { tools = [] } = defineProps<{
  tools: Menu[];
}>();
</script>

<style scoped></style>
