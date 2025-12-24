<template>
  <div class="flex flex-col h-full">
    <MOpenIframe
      :seoTitle="seoTitle"
      :iframeUrl="iframeUrl"
    />
    <iframe
      :id="toolContainer"
      :title="seoTitle"
      class="size-full"
      src="https://json4u.cn/editor"
      frameborder="0"
    ></iframe>
  </div>
</template>

<script setup lang="ts">
const tool = flattenMenu(menu).find((item) => item.name === "json");
const {
  seoTitle = "",
  seoDescription = "",
  seoKeywords = [],
  path = "",
  iframeUrl = "",
} = tool || {};

usePageSeo({
  canonicalPath: path,
  title: seoTitle,
  seoDescription,
  keywords: seoKeywords,
});
</script>

<style></style>
