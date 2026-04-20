<template>
  <MediaAdminPage
    kind="audio"
    title="音频管理工作台"
    json-file-name="audio.json"
    media-kind="audio"
    input-accept="audio/*"
    eyebrow="Audio Admin"
    upload-label="选择一个音频文件"
    upload-hint="支持常见音频类型，上传后自动写入 public 目录"
    placeholder="https://example.com/demo.mp3"
  />
</template>

<script setup lang="ts">
definePageMeta({
  layout: false,
});

useHead({
  title: "音频管理",
});
</script>
