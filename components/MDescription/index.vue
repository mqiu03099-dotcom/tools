<template>
  <div class="flex flex-col gap-3 rounded-[var(--radius-box)] bg-base-100 p-3">
    <h2 class="font-bold capitalize">{{ name }}</h2>
    <div class="flex flex-wrap gap-3">
      <a
        :href="`/tag/${label}`"
        v-for="{ label, value } in tagsCount || []"
        :title="label"
      >
        <button
          class="btn capitalize btn-soft btn-primary btn-sm"
          :title="label"
        >
          {{ label }}
          <div class="badge badge-sm badge-secondary">{{ value }}</div>
        </button>
      </a>
    </div>
  </div>
</template>

<script lang="ts" setup>
const { tags = [], name = "" } = defineProps<{
  tags: string[];
  name: string;
}>();

const { data: tagsCount } = await useFetch<LabelValue[]>("/api/getTags", {
  method: "POST",
  body: {
    tags,
  },
});
</script>

<style scoped></style>
