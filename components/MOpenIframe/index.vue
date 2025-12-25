<template>
  <div
    role="alert"
    class="alert rounded-none! w-full shadow-none! bg-base-100! border-none!"
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
      If The Page Fails To Load, You Can Click The Button On The Right.&nbsp;
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
</template>

<script lang="ts" setup>
const { iframeUrl, seoTitle } = defineProps<{
  iframeUrl: string;
  seoTitle: string;
}>();
</script>

<style scoped></style>
