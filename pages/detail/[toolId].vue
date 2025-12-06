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
const { toolId } = useRoute().params;
const toolDetail = getToolDetail(String(toolId)) || {};
const { name = "", description = "", tags = [] } = toolDetail;

const { data: moreTools } = await useFetch<Menu[]>("/api/getRandomTools", {
  method: "POST",
  body: {
    menu: flattenMenu(menu),
    count: 12,
  },
});
</script>

<style></style>
