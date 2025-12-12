<template>
  <div class="flex flex-col p-3 gap-3">
    <MDetailAlert />
    <MDetailBreadcrumbs :name="name" />
    <MDetailCard
      :name="name"
      :seoDescription="seoDescription"
      :bgImg="bgImg"
    />
    <MDescription
      :tags="tags"
      :name="name"
      :seoTitle="seoTitle"
      :seoDescription="seoDescription"
      :seoKeywords="seoKeywords"
      :moreTools="moreTools"
    />
    <div class="divider divider-primary m-0! text-[12px]!">More Tools</div>
    <MGrid>
      <MCard :data="moreTools" />
    </MGrid>
    <MAllTools />
  </div>
</template>

<script setup lang="ts">
const { toolId } = useRoute().params as any;
const toolDetail = getToolDetail(toolId) || {};
const {
  name = "",
  tags = [],
  updateTime = "",
  bgImg = "",
  seoTitle = "",
  seoDescription = "",
  seoKeywords = [],
} = toolDetail;
const { data: moreTools } = await useFetch<Menu[]>("/api/getRandomTools", {
  method: "POST",
  body: {
    menu: flattenMenu(menu),
    count: 10,
  },
});

usePageSeo({
  canonicalPath: `/detail/${toolId}/`,
  title: `${seoTitle} Overview And Alternatives From Tools`,
  seoDescription,
  type: "article",
  publishedTime: new Date(updateTime).toISOString(),
  modifiedTime: new Date(updateTime).toISOString(),
  keywords: [...seoKeywords, ...tags],
});
</script>

<style></style>

