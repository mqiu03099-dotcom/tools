<template>
  <button
    class="btn btn-square btn-ghost"
    title="Toggle Fullscreen"
    @click="handleFullScreen"
  >
    <svg
      title="Toggle Fullscreen"
      t="1764160568173"
      class="icon fill-base-content"
      viewBox="0 0 1024 1024"
      version="1.1"
      xmlns="http://www.w3.org/2000/svg"
      p-id="19796"
      width="20"
      height="20"
    >
      <path
        d="M704 864v-96c0-54.4 41.6-96 96-96h96c19.2 0 32-12.8 32-32s-12.8-32-32-32h-96c-89.6 0-160 70.4-160 160v96c0 19.2 12.8 32 32 32s32-12.8 32-32z m-64-704v96c0 89.6 70.4 160 160 160h96c19.2 0 32-12.8 32-32s-12.8-32-32-32h-96c-54.4 0-96-41.6-96-96v-96c0-19.2-12.8-32-32-32s-32 12.8-32 32z m-256 704v-96c0-89.6-70.4-160-160-160h-96c-19.2 0-32 12.8-32 32s12.8 32 32 32h96c54.4 0 96 41.6 96 96v96c0 19.2 12.8 32 32 32s32-12.8 32-32z m-64-704v96c0 54.4-41.6 96-96 96h-96c-19.2 0-32 12.8-32 32s12.8 32 32 32h96c89.6 0 160-70.4 160-160v-96c0-19.2-12.8-32-32-32s-32 12.8-32 32z"
        p-id="19797"
      ></path>
    </svg>
  </button>
</template>

<script lang="ts" setup>
const handleFullScreen = () => {
  /** 工具内容iframe全屏 */
  const fullScreen = document.getElementById(toolContainer);
  if (fullScreen) {
    fullScreen?.requestFullscreen?.();
    return;
  }
  /** 浏览器全屏和退出全屏 */
  const isFullScreen = document.fullscreenElement;
  if (isFullScreen) {
    document.exitFullscreen();
    return;
  }
  document.documentElement.requestFullscreen();
};
</script>

<style scoped></style>
