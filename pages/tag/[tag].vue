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
const { tag } = useRoute().params;

const { data: tools } = await useFetch<Menu[]>("/api/getToolsByTag", {
  method: "POST",
  body: {
    tags: [tag],
  },
});
</script>

<style></style>
