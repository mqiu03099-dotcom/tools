<template>
  <div class="flex flex-col gap-3 p-3">
    <MSearchAlert :total="tools?.length" />
    <MGrid>
      <MCard :data="tools" />
    </MGrid>
    <MAllTools />
  </div>
</template>

<script setup lang="ts">
import { listPreview, slugToTitle } from "@/utils";

const { tag } = useRoute().params;
const tagSlug = String(tag);
const { data: tools } = await useFetch<Menu[]>("/api/getToolsByTag", {
  method: "POST",
  body: {
    tags: [tagSlug],
  },
});
const { webName } = useRuntimeConfig().public;
const readableTag = slugToTitle(tagSlug) || tagSlug.replace(/-/g, " ");
const toolList = tools.value || [];

usePageSeo({
  canonicalPath: `/tag/${tagSlug}/`,
  title: `${readableTag} tag highlights on ${webName}`,
  description: toolList.length
    ? `See ${toolList.length} ${readableTag.toLowerCase()} tools such as ${listPreview(
        toolList.map((tool) => slugToTitle(tool.name) || tool.name || ""),
      )}.`
    : `Browse ${readableTag.toLowerCase()} resources curated by ${webName}.`,
  keywords: Array.from(
    new Set([readableTag, `${readableTag} tools`, ...toolList.flatMap((item) => item.tags || [])]),
  ),
});
</script>

<style scoped></style>

