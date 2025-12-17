<template>
  <div
    v-html="richText"
    class="container p-3 max-w-[800px] mx-auto"
  ></div>
</template>

<script setup lang="ts">
const { webName } = useRuntimeConfig().public;
const { article } = useRoute().params;
const blogDetail = flattenMenu(articles).find((item) => item.nameShort === article);
const { seoTitle = "", seoDescription = "", seoKeywords = [], richText = "" } = blogDetail || {};

usePageSeo({
  canonicalPath: `/article/${article}/`,
  title: `${seoTitle} | ${webName}`,
  seoDescription,
  keywords: [...seoKeywords, webName],
  type: "article",
});
</script>

<style scoped>
.container * {
  all: revert;
}
</style>
