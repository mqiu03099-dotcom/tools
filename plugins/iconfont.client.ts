export default defineNuxtPlugin(() => {
  if (import.meta.server) return;

  const ua = (navigator.userAgent || "").toLowerCase();
  const isBot =
    /bot|crawl|spider|slurp|bing|duckduck|baidu|sogou|soso|yandex|facebookexternalhit|mediapartners-google/.test(
      ua,
    );
  if (isBot) return;

  useHead({
    script: [
      {
        src: "//at.alicdn.com/t/c/font_5093711_lal6xgpzvm.js",
        defer: true,
        crossorigin: "anonymous",
        type: "text/javascript",
      },
    ],
  });
});

