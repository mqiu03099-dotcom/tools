<template>
  <MediaAdminPage
    kind="emojis"
    title="表情包管理工作台"
    json-file-name="emojis.json"
    eyebrow="Emoji Admin"
    upload-label="选择一个表情包文件"
    placeholder="https://example.com/emoji.gif"
  />
</template>

<script setup lang="ts">
definePageMeta({
  layout: false,
});

useHead({
  title: "表情包管理",
});
</script>
