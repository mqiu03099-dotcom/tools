<template>
  <div class="flex flex-col gap-3 p-3">
    <div
      class="flex flex-col gap-3"
      v-for="({ name, children = [] }, index) in menu"
      :key="index"
    >
      <div class="flex items-center justify-between gap-3 w-full">
        <MA :href="`/category/${name}`">
          <button class="btn btn-primary">
            <div class="line-clamp-1 break-all">{{ name }}</div>
          </button>
        </MA>
        <MA
          :href="`/category/${name}`"
          class="flex justify-between items-center"
        >
          <MFromIcon />
        </MA>
      </div>
      <MGrid>
        <MCard :data="children.slice(0, 10)" />
      </MGrid>
    </div>
  </div>
</template>

<script setup lang="ts">
usePageSeo({
  canonicalPath: "/",
  title: `Tools Curated Resource Hub: 290+ AI & Productivity Tools`,
  seoDescription: `Discover 290+ Reliable Tools Across 37 Categories On Tools. Updated Daily With Trusted AI, Productivity, And Utility Resources.`,
  keywords: ["online tools", "ai tools", "productivity resources", "utility directory"],
});
</script>

<style scoped></style>

