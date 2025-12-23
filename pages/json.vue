<template>
  <div class="p-3 flex flex-col gap-3 h-full">
    <div class="flex items-center gap-3 shrink-0">
      <button
        class="btn btn-soft btn-primary w-max"
        @click="handleFormatting"
      >
        <h2>JSON Formatting</h2>
      </button>
      <!-- <button
        class="btn btn-soft btn-secondary w-max"
        @click="handleCopy"
      >
        <h2>Copy JSON</h2>
      </button> -->
    </div>
    <textarea
      v-model="json"
      class="textarea h-40 w-full shrink-0"
      placeholder="Please enter JSON"
    ></textarea>
    <pre>{{ formattingJson }}</pre>
  </div>
</template>

<script setup lang="ts">
const tool = flattenMenu(menu).find((item) => item.name === "json");
const { seoTitle = "", seoDescription = "", seoKeywords = [], path = "" } = tool || {};
const json = ref();
const formattingJson = ref();

const handleFormatting = () => {
  try {
    formattingJson.value = JSON.parse(json.value);
  } catch (error) {
    json.value = "Invalid JSON";
  }
};

const handleCopy = () => {
  window.navigator.clipboard?.writeText(JSON.stringify(formattingJson.value));
};

usePageSeo({
  canonicalPath: path,
  title: seoTitle,
  seoDescription: seoDescription,
  keywords: seoKeywords,
});
</script>

<style></style>
