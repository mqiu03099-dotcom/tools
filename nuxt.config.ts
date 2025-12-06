import tailwindcss from "@tailwindcss/vite";
import { existsSync, mkdirSync, writeFileSync } from "fs";
import { readPublicSubFolders } from "./utils/fun"; // 确保路径正确
import { join } from "path";

export default defineNuxtConfig({
  hooks: {
    "nitro:init": async (nitro) => {
      nitro.hooks.hook("prerender:done", async () => {
        console.log("开始生成sitemap.xml文件");
        const baseUrl = "https://konw-it-all.mqiu03099.workers.dev";
        const sitemapUrls = await readPublicSubFolders();
        const sitemaps = sitemapUrls.map((uri: string) => {
          const uriObj = {
            "": 1.0,
            detail: 0.9,
            tool: 0.9,
            search: 0.8,
            category: 0.8,
            tag: 0.8,
            menu: 0.8,
            theme: 0.7,
            about: 0.6,
            contact: 0.6,
            privacy: 0.6,
          };
          const priority = uriObj[uri.split("/")[1] as keyof typeof uriObj] || 0.5;
          return {
            loc: `${baseUrl}${uri}`,
            lastmod: new Date().toISOString(),
            changefreq: "weekly",
            priority,
          };
        });
        const xmlContent = `<?xml version="1.0" encoding="UTF-8"?>
          <urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
          ${sitemaps
            .map((route) => {
              return `
                <url>
                  <loc>${route.loc}</loc>
                  <changefreq>${route.changefreq}</changefreq>
                  <priority>${route.priority}</priority>
                  <lastmod>${route.lastmod}</lastmod>
                </url>
              `;
            })
            .join("")}
        </urlset>`;
        const publicDir = join(process.cwd(), "public");
        if (!existsSync(publicDir)) mkdirSync(publicDir);
        writeFileSync(join(publicDir, "sitemap.xml"), xmlContent, "utf-8");
        console.log("生成sitemap.xml文件结束");
      });
    },
  },
  ssr: true,
  compatibilityDate: "2025-05-15",
  devtools: {
    enabled: true,
  },
  devServer: {
    host: "0.0.0.0",
    port: 6179,
  },
  nitro: {
    preset: "static", // 静态模式
    prerender: {
      concurrency: 4, // 限制打包SSG任务数量，避免内存溢出
      crawlLinks: true, // 开启爬虫功能，遍历项目中所有服务端渲染的a标签
    },
  },
  modules: [],
  runtimeConfig: {
    public: {
      env: process.env.NUXT_PUBLIC_ENV,
      siteName: process.env.NUXT_PUBLIC_SITENAME,
    },
  },
  app: {
    head: {
      htmlAttrs: {
        lang: "en",
        translate: "no",
        "data-theme": "dark",
      },
      title: "all-in-one-toolbox",
      link: [
        {
          rel: "icon",
          type: "image/png",
          href: "/img/logo.png",
        },
      ],
      meta: [
        { name: "viewport", content: "width=device-width, initial-scale=1" },
        {
          name: "google-adsense-account",
          content: "ca-pub-6584635184413581",
        },
        {
          name: "msvalidate.01",
          content: "516F092768D2F5A3DEF50BE2BF27F432",
        },
      ],
      script: [
        {
          innerHTML: `
            (function () {
              const theme = localStorage.getItem("theme") || "dark";
              document.documentElement.setAttribute("data-theme", theme);
            })();`,
          tagPriority: "critical", // 最高优先级加载
          tagPosition: "head", // 插入到head标签内
        },
        process.env.NODE_ENV === "development"
          ? {}
          : {
              src: "https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-6584635184413581",
              crossorigin: "anonymous",
              async: true,
              tagPriority: "critical",
              tagPosition: "head",
            },
        process.env.NODE_ENV === "development"
          ? {}
          : {
              innerHTML: `
            (function(c,l,a,r,i,t,y){
                c[a]=c[a]||function(){(c[a].q=c[a].q||[]).push(arguments)};
                t=l.createElement(r);t.async=1;t.src="https://www.clarity.ms/tag/"+i;
                y=l.getElementsByTagName(r)[0];y.parentNode.insertBefore(t,y);
            })(window, document, "clarity", "script", "ubxx0mgosj");`,
              tagPriority: "critical",
              tagPosition: "head",
              async: true,
            },
      ],
    },
  },
  vite: {
    plugins: [tailwindcss()],
    clearScreen: true, // 启动时清空控制台
    build: {
      minify: "esbuild", // 构建时是否进行代码压缩
      sourcemap: false, // 打包时是否生成 sourcemap 文件
      rollupOptions: {
        output: {
          chunkFileNames: `_nuxt/[name].[hash].js`,
          entryFileNames: "_nuxt/[name].[hash].js",
          assetFileNames: "_nuxt/[name].[hash].[ext]",
        },
        cache: true, // 缓存
      },
      cssCodeSplit: true, // 是否开启css代码分割
      chunkSizeWarningLimit: 100, // 构建时超过这个阈值的文件打包会标黄
      reportCompressedSize: true, // 构建时是否生成 gzip 压缩包
      assetsInlineLimit: 10000, // 10000=10kb，当静态资源小于10kb时候，会被转换为base64打入js文件
    },
    css: {
      modules: {
        generateScopedName: `[hash:base64:5]_[local]`, // css module
      },
    },
  },
  css: ["@/public/css/daisyui.css", "@/public/css/index.css"],
});

