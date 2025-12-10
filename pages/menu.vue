<template>
  <MMenu class="w-full flex-1" />
</template>

<script setup lang="ts">
const { webName } = useRuntimeConfig().public;

usePageSeo({
  canonicalPath: "/menu/",
  title: `Tools Category Explorer: Browse 37+ AI, Productivity & Utility Tool Categories`,
  seoDescription: `Jump Into 37+ Curated Tool Categories On Our Hub, From AI Productivity Boosters To Niche Utility Tools – Explore Trusted Resources By Category.`,
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

