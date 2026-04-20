<template>
  <div class="home">
    <div class="hero">
      <p class="eyebrow">Tools Box</p>
      <h1>素材管理入口</h1>
      <p class="subtitle">
        从这里进入各个工具页面。头像页已经可用，另外两个入口先预留位置，后面可以直接接着补。
      </p>
    </div>

    <div class="grid">
      <NuxtLink
        class="card active"
        to="/avatar"
      >
        <span class="tag">已完成</span>
        <h2>头像管理</h2>
        <p>上传本地图片、导入外链、生成远程 URL，并编辑整份 avatar.json。</p>
        <strong>进入页面</strong>
      </NuxtLink>

      <NuxtLink
        class="card active"
        to="/wallpaper"
      >
        <span class="tag">已完成</span>
        <h2>壁纸管理</h2>
        <p>上传本地壁纸、导入外链、生成远程 URL，并编辑整份 wallpaper.json。</p>
        <strong>进入页面</strong>
      </NuxtLink>

      <NuxtLink
        class="card active"
        to="/emojis"
      >
        <span class="tag">已完成</span>
        <h2>表情包管理</h2>
        <p>上传本地表情包、导入外链、生成远程 URL，并编辑整份 emojis.json。</p>
        <strong>进入页面</strong>
      </NuxtLink>

      <NuxtLink
        class="card active"
        to="/audio"
      >
        <span class="tag">已完成</span>
        <h2>音频管理</h2>
        <p>上传本地音频、导入外链、生成远程 URL，并编辑整份 audio.json。</p>
        <strong>进入页面</strong>
      </NuxtLink>
    </div>
  </div>
</template>

<script setup lang="ts">
useHead({
  title: "素材管理入口",
});
</script>

<style scoped>
.home {
  min-height: 100vh;
  padding: 32px;
  background:
    radial-gradient(circle at top left, rgba(79, 70, 229, 0.14), transparent 30%),
    radial-gradient(circle at bottom right, rgba(14, 165, 233, 0.14), transparent 24%),
    linear-gradient(180deg, #f7faff 0%, #eef2f7 100%);
  color: #122033;
}

.hero {
  max-width: 1080px;
  margin: 0 auto 28px;
}

.eyebrow {
  margin: 0 0 10px;
  color: #4f46e5;
  font-size: 12px;
  font-weight: 800;
  letter-spacing: 0.16em;
  text-transform: uppercase;
}

h1 {
  margin: 0;
  font-size: clamp(34px, 5vw, 54px);
  line-height: 1.05;
}

.subtitle {
  max-width: 720px;
  margin: 14px 0 0;
  color: #475467;
  line-height: 1.8;
}

.grid {
  display: grid;
  grid-template-columns: repeat(2, minmax(0, 1fr));
  gap: 20px;
  max-width: 1080px;
  margin: 0 auto;
}

.card {
  display: flex;
  flex-direction: column;
  gap: 14px;
  min-height: 240px;
  padding: 24px;
  border-radius: 24px;
  text-decoration: none;
  border: 1px solid rgba(18, 32, 51, 0.08);
  background: rgba(255, 255, 255, 0.88);
  box-shadow: 0 20px 45px rgba(21, 34, 50, 0.08);
  transition:
    transform 0.18s ease,
    box-shadow 0.18s ease,
    border-color 0.18s ease;
}

.card h2 {
  margin: 0;
  color: #122033;
  font-size: 24px;
}

.card p {
  margin: 0;
  color: #475467;
  line-height: 1.8;
}

.card strong {
  margin-top: auto;
  color: #1d4ed8;
}

.card.active:hover {
  transform: translateY(-3px);
  border-color: rgba(79, 70, 229, 0.24);
  box-shadow: 0 24px 50px rgba(79, 70, 229, 0.16);
}

.tag {
  display: inline-flex;
  align-items: center;
  width: fit-content;
  padding: 6px 10px;
  border-radius: 999px;
  background: rgba(34, 197, 94, 0.12);
  color: #15803d;
  font-size: 12px;
  font-weight: 700;
}

@media (max-width: 980px) {
  .grid {
    grid-template-columns: 1fr;
  }
}

@media (max-width: 720px) {
  .home {
    padding: 18px;
  }
}
</style>
