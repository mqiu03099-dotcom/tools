import type { UsePageSeoOptions } from "@/utils";

export const usePageSeo = (values: UsePageSeoOptions) => {
  const {
    title,
    description,
    type = "website",
    canonicalPath,
    image = "/logo.png",
    publishedTime,
    modifiedTime,
    keywords,
  } = values;
  const { siteName } = useRuntimeConfig().public;
  const siteBase = `https://${siteName}`;
  const canonicalUrl = new URL(canonicalPath, siteBase).toString();
  const keywordList = keywords && keywords.length ? keywords.join(", ") : undefined;

  useSeoMeta({
    title,
    description,
    ogTitle: title,
    ogDescription: description,
    ogType: type,
    ogUrl: canonicalUrl,
    ogImage: image,
    twitterCard: "summary_large_image",
    twitterTitle: title,
    twitterDescription: description,
    twitterImage: image,
    robots: "index, follow",
    articlePublishedTime: type === "article" ? publishedTime : undefined,
    articleModifiedTime: type === "article" ? modifiedTime : undefined,
    keywords: keywordList,
  });

  useHead({
    link: [{ rel: "canonical", href: canonicalUrl }],
  });
};

