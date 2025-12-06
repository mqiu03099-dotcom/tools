<template>
  <div class="flex flex-col gap-3 p-3">
    <div
      class="flex flex-col gap-3"
      v-for="({ name, children = [] }, titleIndex) in homeDataSource"
      :key="titleIndex"
    >
      <MA
        :href="`/category/${name}`"
        class="flex justify-between items-center"
      >
        <h1 class="line-clamp-1 break-all font-bold">{{ name }}</h1>
        <MFromIcon />
      </MA>
      <MGrid>
        <MCard :data="children.slice(0, 8)" />
      </MGrid>
    </div>
  </div>
</template>

<script setup lang="ts">
const homeDataSource = menu.filter((item) => item.isHomeData || 0);
</script>

<style></style>
