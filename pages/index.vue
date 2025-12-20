<template>
  <div class="flex flex-row w-full h-full">
    <ul class="menu w-56 flex-nowrap overflow-auto hidden md:block">
      <li
        v-for="({ name = '', icon }, index) in menu"
        :key="index"
      >
        <a
          @click="handleActiveMenu(name)"
          :href="`#${name}`"
          :class="[activeMenuName === name ? 'menu-active' : '', name]"
        >
          <MIcon :icon="icon" />
          <div class="line-clamp-1 break-all">{{ name }}</div>
        </a>
      </li>
    </ul>
    <div
      class="flex flex-col gap-3 p-3 flex-1 overflow-auto scroll-smooth"
      id="home-top"
    >
      <div
        class="flex flex-col gap-3"
        v-for="({ name, icon, children = [] }, index) in menu"
        :key="index"
      >
        <div class="flex items-center justify-between gap-3 w-full">
          <MA
            class="scroll-mt-3"
            :href="`/category/${name}`"
            :id="name"
          >
            <button class="btn btn-primary">
              <MIcon :icon="icon" />
              <div class="line-clamp-1 break-all">{{ name }}</div>
            </button>
          </MA>
          <MA
            :href="`/category/${name}`"
            class="flex justify-between items-center"
          >
            <MFromIcon />
          </MA>
        </div>
        <MGrid>
          <MCard :data="children.slice(0, 10)" />
        </MGrid>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
const activeMenuName = ref<string>("");

const handleActiveMenu = (name: string) => {
  activeMenuName.value = name;
  handleScroll();
};

onMounted(() => {
  if (import.meta.client) {
    const { hash } = useRoute();
    activeMenuName.value = hash.split("#")?.[1] || menu?.[0]?.name || "";
    handleScroll();
  }
});

const handleScroll = () => {
  const el = document.getElementsByClassName(activeMenuName.value)?.[0] as any;
  el?.scrollIntoView({ behavior: "smooth", block: "center" });
  el?.click();
  const targetEl = document.getElementById(activeMenuName.value);
  targetEl?.blur();
};

usePageSeo({
  canonicalPath: "/",
  title: `Tools Curated Resource Hub: 290+ AI & Productivity Tools`,
  seoDescription: `Discover 290+ Reliable Tools Across 37 Categories On Tools. Updated Daily With Trusted AI, Productivity, And Utility Resources.`,
  keywords: ["online tools", "ai tools", "productivity resources", "utility directory"],
});
</script>

<style scoped></style>

