<template>
  <div class="flex flex-col p-3 gap-3">
    <MDetailAlert />
    <MDetailBreadcrumbs :name="name" />
    <MDetailCard
      :name="name"
      :description="description"
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
import { slugToTitle } from "@/utils";

const { toolId } = useRoute().params;
const toolDetail = getToolDetail(String(toolId)) || {};
const { name = "", description = "", tags = [], updateTime } = toolDetail;
const { data: moreTools } = await useFetch<Menu[]>("/api/getRandomTools", {
  method: "POST",
  body: {
    menu: flattenMenu(menu),
    count: 12,
  },
});
const { webName } = useRuntimeConfig().public;
const readableName = slugToTitle(name || String(toolId)) || String(toolId);
const parsedDate = updateTime ? new Date(updateTime) : undefined;
const isoDate =
  parsedDate && !Number.isNaN(parsedDate.valueOf()) ? parsedDate.toISOString() : undefined;

usePageSeo({
  canonicalPath: `/detail/${toolId}/`,
  title: `${readableName} overview and alternatives from ${webName}`,
  description:
    description ||
    `Explore ${readableName} features, use cases, and trusted alternatives on ${webName}.`,
  type: "article",
  publishedTime: isoDate,
  modifiedTime: isoDate,
  keywords: Array.from(new Set([readableName, ...(tags || [])].filter(Boolean))),
});
</script>

<style></style>

