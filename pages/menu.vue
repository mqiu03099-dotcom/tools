<template>
  <MMenu class="w-full flex-1" />
</template>

<script setup lang="ts">
const { webName } = useRuntimeConfig().public;

usePageSeo({
  canonicalPath: "/menu/",
  title: `${webName} category explorer`,
  description: `Jump into every category curated on ${webName}, from AI productivity boosters to niche utilities.`,
  keywords: ["tool categories", "directory", webName],
});
</script>

<style scoped></style>

