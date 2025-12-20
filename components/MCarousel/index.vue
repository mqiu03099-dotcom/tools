<template>
  <div
    class="carousel rounded-box w-full max-h-100"
    v-if="carousel.length"
  >
    <MA
      class="carousel-item relative size-full cursor-pointer"
      v-for="({ bgImg, seoTitle, name }, index) in carousel"
      :key="index"
      :href="`/detail/${name}/`"
    >
      <img
        :src="bgImg"
        class="size-full object-cover"
        :alt="seoTitle"
      />
      <div
        class="absolute font-bold text-primary p-3 backdrop-blur-md bg-base-100/50 left-0 bottom-0 w-full flex items-center justify-center"
      >
        <div class="w-full line-clamp-1 break-all">{{ seoTitle }}</div>
      </div>
    </MA>
  </div>
</template>

<script lang="ts" setup>
const names: string[] = ["doubao-ai-productivity-assistant", "ghdhair", "macrumors-iphone17-hub"];
const carousel = flattenMenu(menu).filter((item) => names.includes(item?.name || ""));
</script>

<style scoped></style>
