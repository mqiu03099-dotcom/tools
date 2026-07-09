// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  modules: ["@nuxt/eslint", "@nuxt/ui"],
  devtools: {
    enabled: true,
  },
  devServer: {
    port: 3004,
  },
  runtimeConfig: {
    postgresHost: process.env.POSTGRES_HOST || "localhost",
    postgresPort: process.env.POSTGRES_PORT || "5432",
    postgresDatabase: process.env.POSTGRES_DATABASE || "milk_frog_admin",
    postgresUser: process.env.POSTGRES_USER || "postgres",
    postgresPassword: process.env.POSTGRES_PASSWORD || "root",
    wechatAppId: process.env.WECHAT_APP_ID || "wx394b878feb6c7786",
    wechatAppSecret: process.env.WECHAT_APP_SECRET || "84f13a5aed45bf9bd7a0c5969a9fa6e1",
  },
  css: ["~/assets/css/main.css"],
  routeRules: {
    "/": { prerender: true },
  },
  compatibilityDate: "2026-06-30",
  eslint: {
    config: {
      stylistic: {
        commaDangle: "never",
        braceStyle: "1tbs",
      },
    },
  },
});
