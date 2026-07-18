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
          src: "https://5gvci.com/act/files/tag.min.js?z=11342775",
          "data-cfasync": "false",
          async: true,
        },
        {
          innerHTML:
            "(function(s){s.dataset.zone='11342663',s.src='https://nap5k.com/tag.min.js'})([document.documentElement, document.body].filter(Boolean).pop().appendChild(document.createElement('script')))",
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
