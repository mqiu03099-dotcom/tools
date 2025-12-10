<template>
  <div
    class="hero min-h-[400px] sm:min-h-[450px] md:min-h-[500px] rounded-[var(--radius-box)] relative overflow-hidden"
  >
    <div class="absolute left-0 top-0 w-full h-full">
      <img
        v-if="bgImg"
        :src="bgImg"
        :alt="bgImg"
        class="absolute left-0 top-0 w-full h-full object-cover blur-xs"
      />
      <div class="bg-base-100 opacity-70 absolute left-0 top-0 w-full h-full"></div>
    </div>
    <div class="hero-content p-0! text-neutral-content text-center">
      <div class="max-w-[1000px]">
        <h1 class="mb-5 px-3 text-3xl capitalize font-bold text-base-content">{{ name }}</h1>
        <p class="mb-5 px-3 font-bold text-base-content">{{ seoDescription }}</p>
        <MA :href="`/tool/${name}`">
          <button class="btn btn-primary">{{ getStarted }}</button>
        </MA>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
const { name, seoDescription, bgImg } = defineProps<{
  name: string;
  seoDescription: string;
  bgImg: string;
}>();
</script>

<style></style>
