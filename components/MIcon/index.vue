<template>
  <i :class="['iconfont', icon]"></i>
</template>

<script lang="ts" setup>
const { icon = "" } = defineProps<{
  icon?: string;
}>();
</script>

<style scoped></style>
