<template>
  <div class="p-3 flex flex-col gap-3">
    <MResultAlert :total="tools.length" />
    <MGrid>
      <MCard :data="tools" />
    </MGrid>
    <MAllTools />
  </div>
</template>

<script lang="ts" setup>
import { listPreview, slugToTitle } from "@/utils";

const { result } = useRoute().params;
const { webName } = useRuntimeConfig().public;
const rawQuery = String(result);
const blockResult = rawQuery.toLowerCase();
const tools =
  flattenMenu(menu).filter((item) => {
    const { name = "", description = "", updateTime = "", iframeUrl = "" } = item;
    const blokName = name.toLowerCase();
    const blockDescription = description.toLowerCase();
    const blockUpdateTime = updateTime.toLowerCase();
    const blockIframeUrl = iframeUrl.toLowerCase();
    return (
      blokName.includes(blockResult) ||
      blockDescription.includes(blockResult) ||
      blockUpdateTime.includes(blockResult) ||
      blockIframeUrl.includes(blockResult)
    );
  }) || [];
const readableQuery = slugToTitle(rawQuery) || rawQuery.replace(/-/g, " ");

usePageSeo({
  canonicalPath: `/result/${rawQuery}/`,
  title: `results for ${readableQuery} on ${webName}`,
  description: tools.length
    ? `Found ${tools.length} matches for "${readableQuery}" including ${listPreview(
        tools.map((tool) => slugToTitle(tool.name) || tool.name || ""),
      )}.`
    : `No direct matches for "${readableQuery}". Try searching other tool categories on ${webName}.`,
  keywords: [readableQuery, `${readableQuery} tools`, "tool search"],
});
</script>

<style scoped></style>

