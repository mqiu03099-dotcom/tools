<template>
  <MMenu class="w-full flex-1" />
</template>

<script setup lang="ts">
const { webName } = useRuntimeConfig().public;

usePageSeo({
  canonicalPath: "/menu/",
  title: `Tools Category Explorer: Browse 37+ AI, Productivity & Utility Tool Categories`,
  setDescription: `Jump into 37+ curated tool categories on our hub, from AI productivity boosters to niche utility tools – explore trusted resources by category.`,
  keywords: [
    "tool categories",
    "AI tool categories",
    "productivity tool directory",
    "utility tools",
    "curated tools",
    webName,
  ],
});
</script>

<style scoped></style>

