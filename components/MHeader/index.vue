<template>
  <header class="navbar bg-base-100 shadow-none">
    <div class="flex items-center basis-0 shrink-0">
      <MMenuIcon />
      <MSearchIcon />
    </div>
    <MA
      href="/"
      class="flex flex-col flex-1 justify-center items-center gap-0 btn btn-ghost"
      :title="menuName"
    >
      <h1 class="text-center font-bold">{{ webName }}</h1>
      <p
        class="text-[12px] line-clamp-1 break-all"
        style="zoom: 0.8"
      >
        {{ sencondText }}
      </p>
    </MA>
    <div class="flex items-center justify-end basis-0 shrink-0">
      <MFullScreenIcon />
      <MThemeIcon />
    </div>
  </header>
</template>

<script lang="ts" setup>
const { path } = useRoute();
const webName = useWebName();

/** 二级标题 */
const sencondText = computed(() => {
  if (path === "/") {
    return "";
  }
  if (path.startsWith("/menu")) {
    return "menu";
  }
  if (path.startsWith("/privacy")) {
    return "privacy-policy";
  }
  if (path.startsWith("/about")) {
    return "about-us";
  }
  if (path.startsWith("/contact")) {
    return "contact-us";
  }
  if (path.startsWith("/theme")) {
    return "theme";
  }
  if (path.startsWith("/tag")) {
    return "tag";
  }
  if (path.startsWith("/search")) {
    return "search";
  }
  if (path.startsWith("/category/")) {
    const name = path.split("/")?.[2];
    return name;
  }
  if (path.startsWith("/detail/")) {
    const name = path.split("/")?.[2];
    return name;
  }
  if (path.startsWith("/tool/")) {
    const name = path.split("/")?.[2];
    return name;
  }
  return "";
});

/** 面包屑标题 */
const menuName = computed(() => {
  return sencondText.value ? `${webName}-${sencondText.value}` : webName;
});

/** 对应工具的描述 */
const descriptionText = computed(() => {
  const name = path.split("/")?.[2];
  const toolDetail = getToolDetail(name);
  const { description = defaultDescription } = toolDetail || {};
  return description;
});

useHead({
  title: menuName,
  meta: [
    {
      name: "description",
      content: descriptionText,
    },
  ],
});
</script>

<style scoped></style>
