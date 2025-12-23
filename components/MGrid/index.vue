<template>
  <div
    :class="[
      'gap-3',
      type === 'grid'
        ? 'grid grid-cols-[repeat(auto-fill,minmax(250px,1fr))]'
        : 'flex items-center flex-nowrap overflow-x-auto *:shrink-0 *:w-[250px] hide-x-scrollbar',
    ]"
  >
    <slot></slot>
  </div>
</template>

<script lang="ts" setup>
const { type = "grid" } = defineProps<{
  type?: "grid" | "flex";
}>();
</script>

<style scoped></style>
