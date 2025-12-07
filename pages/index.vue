<template>
  <div class="flex flex-col gap-3 p-3">
    <div
      class="flex flex-col gap-3"
      v-for="({ name, children = [] }, titleIndex) in homeDataSource"
      :key="titleIndex"
    >
      <MA
        :href="`/category/${name}`"
        class="flex justify-between items-center"
      >
        <h1 class="line-clamp-1 break-all font-bold">{{ name }}</h1>
        <MFromIcon />
      </MA>
      <MGrid>
        <MCard :data="children.slice(0, 20)" />
      </MGrid>
    </div>
  </div>
</template>

<script setup lang="ts">
const homeDataSource = menu.filter((item) => item.isHomeData);
const { webName } = useRuntimeConfig().public;
const categoryCount = homeDataSource.length;
const toolCount = homeDataSource.reduce((sum, current) => sum + (current.children?.length || 0), 0);

usePageSeo({
  canonicalPath: "/",
  title: `${webName} curated resource hub`,
  description: `Discover ${toolCount}+ reliable tools across ${categoryCount} categories on ${webName}. Updated daily with trusted AI, productivity, and utility resources.`,
  keywords: ["online tools", "ai tools", "productivity resources", "utility directory", webName],
});
</script>

<style scoped></style>

