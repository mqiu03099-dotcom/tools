<template>
  <div class="flex flex-col gap-3">
    <div class="divider divider-primary m-0! text-[12px]!">All Tools</div>
    <div class="flex flex-wrap gap-3">
      <MA
        v-for="({ nameShort, name }, index) in blockTools"
        :key="index"
        :title="name"
        :href="`/detail/${name}`"
      >
        <button :class="['btn btn-sm capitalize btn-soft', changeTheme(index)]">
          {{ nameShort }}
        </button>
      </MA>
    </div>
  </div>
</template>

<script lang="ts" setup>
const tools = flattenMenu(menu);
const blockTools = tools.slice(0, tools.length - 3);

const changeTheme = (index: number) => {
  if (index % 7 == 0) {
    return "btn-primary";
  }
  if (index % 7 == 1) {
    return "btn-secondary";
  }
  if (index % 7 == 2) {
    return "btn-accent";
  }
  if (index % 7 == 3) {
    return "btn-info";
  }
  if (index % 7 == 4) {
    return "btn-success";
  }
  if (index % 7 == 5) {
    return "btn-warning";
  }
  if (index % 7 == 6) {
    return "btn-error";
  }
  return "btn-primary";
};
</script>

<style scoped></style>
