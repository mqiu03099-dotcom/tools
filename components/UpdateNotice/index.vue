<template>
  <div
    role="alert"
    class="alert alert-success flex items-center justify-between"
  >
    <div class="flex flex-col w-full font-bold">
      <div class="line-clamp-1 break-all w-full">
        {{ newToolName }}
      </div>
      <div
        class="text-xs line-clamp-1 break-all w-full"
        style="zoom: 0.8"
      >
        New tools released today
      </div>
    </div>
    <MA
      :href="`/detail/${newToolName}/`"
      :title="newToolName"
    >
      <button class="btn btn-sm font-bold">See</button>
    </MA>
  </div>
</template>

<script lang="ts" setup>
const newToolName = "doubao-ai-productivity-assistant";
</script>

<style scoped></style>
