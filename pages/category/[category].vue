<template>
  <MGrid class="p-3">
    <MCard :data="children" />
  </MGrid>
</template>

<script setup lang="ts">
import { listPreview, slugToTitle } from "@/utils";

const { category } = useRoute().params;
const categorySlug = String(category);
const { children = [] } = getToolsByCategory(categorySlug) || {};
const { webName } = useRuntimeConfig().public;
const readableCategory = slugToTitle(categorySlug) || categorySlug.replace(/-/g, " ");
const featuredExamples = listPreview(
  children.map((child) => slugToTitle(child.name) || child.name || ""),
);
const categoryKeywords = [
  ...new Set(
    [
      readableCategory,
      `${readableCategory} tools`,
      ...children.flatMap((child) => child.tags || []),
    ].filter(Boolean),
  ),
];

usePageSeo({
  canonicalPath: `/category/${categorySlug}/`,
  title: `${readableCategory}: ${children?.length || 0} Vetted & Updated Recommendations`,
  description: children.length
    ? `Browse ${
        children.length
      } vetted ${readableCategory.toLowerCase()} resources including ${featuredExamples}. Updated recommendations from ${webName}.`
    : `Discover curated ${readableCategory.toLowerCase()} resources on ${webName}.`,
  keywords: categoryKeywords,
});
</script>

<style scoped></style>

