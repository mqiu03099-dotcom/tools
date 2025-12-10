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

const { tag } = useRoute().params as any;
const { data: tools } = await useFetch<Menu[]>("/api/getToolsByTag", {
  method: "POST",
  body: {
    tags: [tag],
  },
});
const toolList = tools?.value || [];

usePageSeo({
  canonicalPath: `/tag/${tag}/`,
  title: `${tag} Tag Highlights On Tools.`,
  seoDescription: `See ${toolList.length} ${tag} Tools Such As ${listPreview(
    toolList.map((tool) => slugToTitle(tool.name) || tool.name || ""),
  )}.`,
  keywords: Array.from(
    new Set([tag, `${tag} tools`, ...toolList.flatMap((item) => item.tags || [])]),
  ),
});
</script>

<style scoped></style>

