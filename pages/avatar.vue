<template>
  <MediaAdminPage
    kind="avatar"
    title="头像管理工作台"
    json-file-name="avatar.json"
    eyebrow="Avatar Admin"
    upload-label="选择一张头像图片"
    placeholder="https://example.com/avatar.jpg"
  />
</template>

<script setup lang="ts">
definePageMeta({
  layout: false,
});

useHead({
  title: "头像管理",
});
</script>
