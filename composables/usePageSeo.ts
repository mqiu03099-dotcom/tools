import type { UsePageSeoOptions } from "@/utils";

export const usePageSeo = (values: UsePageSeoOptions) => {
  const {
    title,
    seoDescription,
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
    description: seoDescription,
    ogTitle: title,
    ogDescription: seoDescription,
    ogType: type,
    ogUrl: canonicalUrl,
    ogImage: image,
    twitterCard: "summary_large_image",
    twitterTitle: title,
    twitterDescription: seoDescription,
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

