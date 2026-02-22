<template>
  <div
    class="py-5 my-0 h-max"
    v-if="open"
  >
    <div class="text-center font-semibold">Advertisement</div>
    <div
      :id="id"
      class="flex justify-center items-center min-h-75 w-full"
    ></div>
  </div>
</template>

<script lang="ts" setup>
const { id = "", open = false } = defineProps<{
  id: string;
  open: boolean;
}>();
</script>

<style scoped></style>
