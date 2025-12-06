export type Menu = Partial<{
  name: string;
  nameStr: string;
  tags: string[];
  path: string;
  iframeUrl: string;
  description: string;
  updateTime: string;
  isHomeData: boolean;
  children: Menu[];
}>;

export type LabelValue = {
  label: string;
  value: string | number;
};

