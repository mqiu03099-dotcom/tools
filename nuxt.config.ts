export default defineNuxtConfig({
  ssr: true,
  experimental: {
    inlineSSRStyles: false,
  },
  compatibilityDate: "2025-05-15",
  devtools: {
    enabled: process.env.NODE_ENV === "development",
  },
  devServer: {
    host: "0.0.0.0",
    port: 6179,
  },
  nitro: {
    preset: "static", // 静态模式
    prerender: {
      concurrency: 16, // 限制打包SSG任务数量，避免内存溢出
      crawlLinks: true, // 开启爬虫功能，遍历项目中所有服务端渲染的a标签
    },
  },
});
