<template>
  <div class="w-full h-dvh flex flex-col">
    <MHeader />
    <main
      class="flex-1 w-full flex flex-col overflow-auto bg-base-200"
      id="app-top"
    >
      <NuxtPage />
    </main>
    <MFooter class="mt-auto" />
    <MBackTop />
  </div>
</template>

<script setup lang="ts">
useHead({
  script: [
    {
      src: "https://securepubads.g.doubleclick.net/tag/js/gpt.js",
      type: "text/javascript",
      async: true,
      crossorigin: "anonymous",
    },
  ],
});

useRenderAnchorAd({
  address: "BOTTOM_ANCHOR",
  slot: "/6355419/Travel/Europe/France/Paris7",
  open: true,
});
useRenderInterstitialAd({
  slot: "/6355419/Travel/Europe/France/Paris10",
  open: true,
});
useRenderComAd();
useRenderListener();
</script>

<style></style>

