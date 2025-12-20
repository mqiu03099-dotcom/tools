<template>
  <div
    @click="handleBackTop"
    title="Back Top"
    class="fixed right-6 bottom-10 size-14 sm:size-16 md:size-18 lg:size-20 cursor-pointer active:scale-100 hover:scale-105 transition-all"
  >
    <MIcon
      icon="icon-halou"
      class="size-full"
    />
  </div>
</template>

<script lang="ts" setup>
const { pathname } = useRequestURL();

const handleBackTop = () => {
  if (pathname === "/") {
    const el = document.getElementById("homeTop");
    el?.scrollTo({ top: 0, behavior: "smooth" });
    return;
  }
  const el = document.getElementById("appTop");
  el?.scrollTo({ top: 0, behavior: "smooth" });
};
</script>

<style scoped></style>
