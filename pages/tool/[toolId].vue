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
          :title="name"
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
      :title="name"
      class="w-full h-full flex-1"
      :src="iframeUrl"
      frameborder="0"
    ></iframe>
  </div>
</template>

<script setup lang="ts">
import { slugToTitle } from "@/utils";

const { toolId } = useRoute().params;
const toolDetail = getToolDetail(String(toolId)) || {};
const { iframeUrl, name } = toolDetail;
const readableName = slugToTitle(name || String(toolId)) || String(toolId);

usePageSeo({
  canonicalPath: `/tool/${toolId}/`,
  title: `${readableName} Live Preview On Tools.`,
  setDescription: `Launch or embed ${readableName} instantly from tools. Test features before visiting the official site.`,
  keywords: [readableName, `${readableName} online`, `${readableName} demo`],
});
</script>

<style scoped></style>
