<template>
  <div class="p-3 flex flex-col gap-3">
    <MResultAlert :total="tools.length" />
    <MGrid>
      <MCard :data="tools" />
    </MGrid>
    <MAllTools />
  </div>
</template>

<script lang="ts" setup>
const { result } = useRoute().params;
const blockResult = String(result).toLowerCase();
const tools =
  flattenMenu(menu).filter((item) => {
    const { name = "", description = "", updateTime = "", iframeUrl = "" } = item;
    const blokName = name.toLowerCase();
    const blockDescription = description.toLowerCase();
    const blockUpdateTime = updateTime.toLowerCase();
    const blockIframeUrl = iframeUrl.toLowerCase();
    return (
      blokName.includes(blockResult) ||
      blockDescription.includes(blockResult) ||
      blockUpdateTime.includes(blockResult) ||
      blockIframeUrl.includes(blockResult)
    );
  }) || [];
</script>

<style scoped></style>
