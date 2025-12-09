<template>
  <MGrid class="gap-3 p-3">
    <div
      :key="index"
      class="card card-sm bg-base-100 image-full hover:scale-98 transition-all"
      v-for="({ name, description, backgroundColor, fontColor }, index) in themes"
    >
      <figure>
        <div
          :style="{ backgroundColor: backgroundColor }"
          class="w-full h-full"
        ></div>
      </figure>
      <div class="card-body">
        <h2
          class="card-title"
          :style="{ color: fontColor }"
        >
          {{ name }}
        </h2>
        <p :style="{ color: fontColor }">{{ description }}</p>
        <div class="card-actions justify-end">
          <button
            class="btn btn-primary btn-sm"
            @click="handleChangeTheme(name)"
          >
            use
          </button>
        </div>
      </div>
    </div>
  </MGrid>
</template>

<script setup lang="ts">
import { themes } from "@/utils";

const { webName } = useRuntimeConfig().public;
const themeCount = Array.isArray(themes) ? themes.length : 0;

usePageSeo({
  canonicalPath: "/theme/",
  title: `Tools Theme Gallery: 35 Ready-to-Use Color Palettes & DaisyUI Themes`,
  description: `Preview 35 ready-to-use color palettes and DaisyUI themes, then apply them instantly to customize your tool experience across our platform.`,
  keywords: [
    "theme switcher",
    "daisyui themes",
    "color palettes for tools",
    "ready-to-use themes",
    "tool UI customization",
    webName,
  ],
});

/**
 * 设置主题
 * @param theme 主题名字
 */
const handleChangeTheme = async (theme: string) => {
  localStorage.setItem("theme", theme);
  useHead({
    htmlAttrs: {
      "data-theme": theme,
    },
  });
};
</script>

<style></style>
