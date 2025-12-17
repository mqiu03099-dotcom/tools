export type Menu = Partial<{
  name: string;
  nameShort: string;
  tags: string[];
  path: string;
  iframeUrl: string;
  seoTitle: string;
  seoDescription: string;
  seoKeywords: string[];
  updateTime: string;
  bgImg: string;
  richText: string;
  children: Menu[];
}>;

export type LabelValue = {
  label: string;
  value: string | number;
};

export type UsePageSeoOptions = {
  title: string;
  seoDescription: string;
  canonicalPath: string;
  type?: "website" | "article";
  image?: string;
  publishedTime?: string;
  modifiedTime?: string;
  keywords?: string[];
};

