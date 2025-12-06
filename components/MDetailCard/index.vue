<template>
  <div
    class="hero py-8 min-h-[400px] sm:min-h-[450px] md:min-h-[500px] rounded-[var(--radius-box)] overflow-hidden"
  >
    <div class="hero-overlay bg-transparent!"></div>
    <div class="hero-content p-0! text-neutral-content text-center">
      <div class="max-w-[1000px]">
        <h1 class="mb-5 text-3xl capitalize font-bold text-base-content">{{ name }}</h1>
        <p class="mb-5 font-bold text-base-content">{{ description }}</p>
        <MA :href="`/tool/${name}`">
          <button class="btn btn-primary">{{ getStarted }}</button>
        </MA>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
const { name, description } = defineProps<{
  name: string;
  description: string;
}>();
</script>

<style></style>
