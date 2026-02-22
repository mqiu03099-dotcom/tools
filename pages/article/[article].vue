<template>
  <div
    v-html="richText"
    class="container p-3 max-w-200 mx-auto container-rich"
  ></div>
</template>

<script setup lang="ts">
const { article } = useRoute().params;
const blogDetail = flattenMenu(articles).find((item) => item.nameShort === article);
const { seoTitle = "", seoDescription = "", seoKeywords = [], richText = "" } = blogDetail || {};

usePageSeo({
  canonicalPath: `/article/${article}/`,
  title: seoTitle,
  seoDescription,
  keywords: [...seoKeywords, "Tools"],
  type: "article",
});
useRenderAnchorAd({
  address: "LEFT_SIDE_RAIL",
  slot: "/6355419/Travel/Europe/France/Paris6",
  open: true,
});
useRenderAnchorAd({
  address: "RIGHT_SIDE_RAIL",
  slot: "/6355419/Travel/Europe/France/Paris6",
  open: true,
});
</script>

<style scoped>
.container * {
  all: revert;
}
</style>
