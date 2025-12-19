<template>
  <div class="flex flex-col flex-1">
    <div
      role="alert"
      class="alert rounded-none! w-full shadow-none! bg-transparent!"
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
        class="stroke-info h-6 w-6 shrink-0"
      >
        <path
          stroke-linecap="round"
          stroke-linejoin="round"
          stroke-width="2"
          d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
        ></path>
      </svg>
      <span>
        If the page fails to load, you can click the button on the right.&nbsp;
        <a
          :title="seoTitle"
          :href="iframeUrl"
          target="_blank"
          class="link link-primary"
        >
          {{ getStarted }}
        </a>
      </span>
    </div>
    <iframe
      :id="toolContainer"
      :title="seoTitle"
      class="w-full h-full flex-1"
      :src="iframeUrl"
      frameborder="0"
    ></iframe>
  </div>
</template>

<script setup lang="ts">
const { toolId } = useRoute().params as any;
const {
  iframeUrl,
  seoTitle = "",
  seoDescription,
  tags = [],
  seoKeywords = [],
} = getToolDetail(toolId) || {};

usePageSeo({
  canonicalPath: `/tool/${toolId}/`,
  title: seoTitle,
  seoDescription: `Launch Or Embed ${seoDescription} Instantly From Tools. Test Features Before Visiting The Official Site.`,
  keywords: [`${seoTitle}`, `${seoTitle} online`, `${seoTitle} demo`, ...tags, ...seoKeywords],
});
</script>

<style scoped></style>
