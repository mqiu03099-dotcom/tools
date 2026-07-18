// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  modules: ["@nuxt/eslint", "@nuxt/ui"],
  devtools: {
    enabled: true,
  },
  devServer: {
    port: 3004,
  },
  css: ["~/assets/css/main.css"],
  app: {
    head: {
      meta: [
        {
          name: "monetag",
          content: "4a951198454410f52d108eab417cf58a",
        },
      ],
      script: [
        {
          src: "https://quge5.com/88/tag.min.js",
          "data-zone": "261038",
          async: true,
          "data-cfasync": "false",
        },
      ],
    },
  },
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
