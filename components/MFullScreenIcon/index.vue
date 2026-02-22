<template>
  <button
    class="btn btn-square btn-ghost text-lg"
    title="Toggle Fullscreen"
    @click="handleFullScreen"
  >
    ⛶
  </button>
</template>

<script lang="ts" setup>
const handleFullScreen = () => {
  showGameRewarded();
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

const { showGameRewarded } = useRenderGameRewardedAd({
  slot: "/6355419/Travel/Europe/France/Paris70",
  open: true,
});
</script>

<style scoped></style>
