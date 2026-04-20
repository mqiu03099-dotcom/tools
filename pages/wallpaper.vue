<template>
  <MediaAdminPage
    kind="wallpaper"
    title="壁纸管理工作台"
    json-file-name="wallpaper.json"
    eyebrow="Wallpaper Admin"
    upload-label="选择一张壁纸图片"
    placeholder="https://example.com/wallpaper.jpg"
  />
</template>

<script setup lang="ts">
definePageMeta({
  layout: false,
});

useHead({
  title: "壁纸管理",
});
</script>
