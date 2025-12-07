<template>
  <div
    :key="index"
    v-for="({ name, description, updateTime }, index) in data || []"
    class="w-full h-full hover:scale-98 transition-all overflow-hidden rounded-[var(--radius-box)]"
  >
    <div class="card bg-base-100 h-full image-full card-sm w-full shadow-sm">
      <figure :class="['relative', changeTheme(index)]">
        <div class="bg-[#00000050] absolute left-0 top-0 w-full h-full"></div>
      </figure>
      <div class="card-body">
        <h2
          class="card-title line-clamp-1 break-all"
          :title="name"
        >
          {{ name }}
        </h2>
        <div
          :title="description"
          class="line-clamp-3 h-[54px]"
        >
          {{ description }}
        </div>
        <div class="card-actions justify-between items-center">
          <div class="text-[10px] font-bold">{{ updateTime }}</div>
          <MA :href="`/detail/${name}`">
            <button
              class="btn btn-primary btn-sm"
              title="Look"
            >
              Look
            </button>
          </MA>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
const { data = [] } = defineProps<{
  data: Menu[] | null | undefined;
}>();

const changeTheme = (index: number) => {
  if (index % 7 == 0) {
    return "bg-primary";
  }
  if (index % 7 == 1) {
    return "bg-secondary";
  }
  if (index % 7 == 2) {
    return "bg-accent";
  }
  if (index % 7 == 3) {
    return "bg-info";
  }
  if (index % 7 == 4) {
    return "bg-success";
  }
  if (index % 7 == 5) {
    return "bg-warning";
  }
  if (index % 7 == 6) {
    return "bg-error";
  }
  return "bg-primary";
};
</script>

<style scoped></style>
