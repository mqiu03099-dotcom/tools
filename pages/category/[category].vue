<template>
  <MGrid class="p-3">
    <MCard :data="children" />
  </MGrid>
</template>

<script setup lang="ts">
const { category } = useRoute().params as any;
const {
  children = [],
  seoTitle = "",
  setDescription = "",
  seoKeywords = [],
} = getToolsByCategory(category) || {};

usePageSeo({
  canonicalPath: `/category/${category}/`,
  title: `${seoTitle}: ${children?.length || 0} Vetted & Updated Recommendations`,
  setDescription,
  keywords: seoKeywords,
});
</script>

<style scoped></style>

