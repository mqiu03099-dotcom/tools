<template>
  <div class="flex items-center gap-1 w-full">
    <MA href="/">{{ useWebName() }}</MA>
    <MFromIcon class="size-5 shrink-0" />
    <MA
      :href="`/detail/${name}`"
      class="flex-1 line-clamp-1"
    >
      {{ name }}
    </MA>
  </div>
</template>

<script setup lang="ts">
const { name } = defineProps<{
  name: string;
}>();
</script>

<style></style>
