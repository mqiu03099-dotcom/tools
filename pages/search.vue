<template>
  <div class="p-3 flex flex-col gap-3">
    <MSearchAlert :total="tools?.length" />
    <label class="input w-full">
      <svg
        t="1764679848970"
        title="Search Tools"
        class="icon fill-base-content"
        viewBox="0 0 1024 1024"
        version="1.1"
        xmlns="http://www.w3.org/2000/svg"
        p-id="2496"
        width="16"
        height="16"
      >
        <path
          d="M951 910.7L678.3 638.6c22.9-26.9 41.4-57 55.3-89.7 18.2-43 27.4-88.6 27.4-135.7 0-47-9.2-92.7-27.4-135.7-17.6-41.5-42.7-78.8-74.7-110.8S589.6 109.6 548.1 92c-43-18.2-88.6-27.4-135.7-27.4S319.8 74 276.8 92.2c-41.5 17.6-78.8 42.7-110.8 74.7s-57.1 69.3-74.7 110.8c-18.2 43-27.4 88.6-27.4 135.7 0 47 9.2 92.7 27.4 135.7 17.6 41.5 42.7 78.8 74.7 110.8s69.3 57.1 110.8 74.7c43 18.2 88.6 27.4 135.7 27.4s92.7-9.2 135.7-27.4c33.1-14 63.5-32.8 90.7-56.1l272.7 272.1c10.9 10.9 28.7 10.9 39.6 0 10.8-11.2 10.8-29-0.2-39.9zM412.5 705.8c-78.1 0-151.6-30.4-206.8-85.7S120 491.4 120 413.3c0-78.1 30.4-151.6 85.7-206.8s128.7-85.7 206.8-85.7 151.6 30.4 206.8 85.7c55.2 55.2 85.7 128.7 85.7 206.8 0 78.1-30.4 151.6-85.7 206.8s-128.7 85.7-206.8 85.7z"
          p-id="2497"
        ></path>
      </svg>
      <input
        v-model="search"
        type="search"
        required
        placeholder="Search"
        @keydown="handleToSearch"
      />
    </label>
    <MGrid>
      <MCard :data="tools" />
    </MGrid>
    <MAllTools />
  </div>
</template>

<script setup lang="ts">
const search = ref<string>("");
const tools = ref<Menu[]>();

usePageSeo({
  canonicalPath: "/search/",
  title: `Tool Search: Instantly Find AI, Productivity - Marketing Tools`,
  seoDescription: `Instantly Search Our Curated Library of Tools – Find AI Products, Productivity Suites, and Marketing Resources to Match Your Exact Needs.`,
  keywords: [
    "tool search",
    "ai search",
    "ai tool search",
    "productivity lookup",
    "productivity tool lookup",
    "marketing tool search",
    "curated tool directory search",
  ],
});

const handleToSearch = (payload: KeyboardEvent) => {
  const { key } = payload;
  if (!(key === "Enter")) return;
  const blockSearch = search.value.trim().toLowerCase();
  tools.value =
    flattenMenu(menu).filter((item) => {
      const { name = "", seoDescription = "", updateTime = "", iframeUrl = "" } = item;
      const blokName = name.toLowerCase();
      const blockSeoDescription = seoDescription.toLowerCase();
      const blockUpdateTime = updateTime.toLowerCase();
      const blockIframeUrl = iframeUrl.toLowerCase();
      return (
        blokName.includes(blockSearch) ||
        blockSeoDescription.includes(blockSearch) ||
        blockUpdateTime.includes(blockSearch) ||
        blockIframeUrl.includes(blockSearch)
      );
    }) || [];
};
</script>

<style></style>
