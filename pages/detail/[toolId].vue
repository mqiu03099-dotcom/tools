<template>
  <div class="flex flex-col p-3 gap-3">
    <MDetailAlert />
    <MDetailBreadcrumbs :name="name" />
    <MDetailCard
      :name="name"
      :setDescription="setDescription"
      :bgImg="bgImg"
    />
    <MDescription
      :tags="tags"
      :name="name"
    />
    <div class="divider divider-primary m-0! text-[12px]!">More Tools</div>
    <MGrid>
      <MCard :data="moreTools" />
    </MGrid>
    <MAllTools />
  </div>
</template>

<script setup lang="ts">
const { toolId } = useRoute().params;
const toolDetail = getToolDetail(String(toolId)) || {};
const {
  name = "",
  tags = [],
  updateTime,
  bgImg = "",
  seoTitle = "",
  setDescription = "",
  seoKeywords = [],
} = toolDetail;
const { data: moreTools } = await useFetch<Menu[]>("/api/getRandomTools", {
  method: "POST",
  body: {
    menu: flattenMenu(menu),
    count: 12,
  },
});
const parsedDate = updateTime ? new Date(updateTime) : undefined;
const isoDate =
  parsedDate && !Number.isNaN(parsedDate.valueOf()) ? parsedDate.toISOString() : undefined;

usePageSeo({
  canonicalPath: `/detail/${toolId}/`,
  title: `${seoTitle} overview and alternatives from Tools`,
  setDescription,
  type: "article",
  publishedTime: isoDate,
  modifiedTime: isoDate,
  keywords: seoKeywords,
});
</script>

<style></style>

