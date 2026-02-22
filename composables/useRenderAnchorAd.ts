export type RenderAnchorUpBottomAdType = Partial<{
  address?: "BOTTOM_ANCHOR" | "TOP_ANCHOR" | "LEFT_SIDE_RAIL" | "RIGHT_SIDE_RAIL";
  slot?: string;
  open?: boolean;
}>;

/**
 * 渲染锚定广告
 * @description 使用规则：在app.vue或者需要引入的页面中引入useRenderAnchorAd()方法
 */
export const useRenderAnchorAd = (value?: RenderAnchorUpBottomAdType) => {
  const { address = "BOTTOM_ANCHOR", slot = "", open = false } = value || {};
  onMounted(() => {
    if (!open) return;
    window.googletag = window.googletag || { cmd: [] };
    window.googletag.cmd.push(() => {
      const anchorAdSlot = window?.googletag?.defineOutOfPageSlot(
        slot,
        window?.googletag?.enums?.OutOfPageFormat?.[address],
      );
      if (!anchorAdSlot) return;
      anchorAdSlot?.addService(window?.googletag?.pubads())?.setTargeting("anchorAd");
      window?.googletag?.enableServices();
      window?.googletag?.display(anchorAdSlot);
    });
  });
};
