<template>
  <div
    v-html="content"
    class="container p-3"
  ></div>
</template>

<script setup lang="ts">
import { ref } from "vue";

const { siteName, webName } = useRuntimeConfig().public;
const content = ref<string>(`<h1><strong>Contact Us for tools</strong></h1>

<p>Last Updated: November 29, 2025</p>

<h2>1. Contact Us</h2>

<p>If you have any questions, please contact us at:</p>

<p><strong>Email:</strong> ${webName}@${siteName}.com</p>`);

usePageSeo({
  canonicalPath: "/contact/",
  title: `contact ${webName}`,
  description: `Reach the ${webName} team for submissions, partnership requests, or updates to our curated tool listings.`,
  keywords: ["contact", "support", webName],
});
</script>

<style scoped>
.container * {
  all: revert;
}
</style>

