export type RenderInterstitialAdType = Partial<{
  slot?: string;
  open?: boolean;
}>;

/**
 * 渲染插屏广告
 * @description 使用规则：在app.vue或者需要引入的页面中引入useRenderInterstitialAd()方法
 */
export const useRenderInterstitialAd = (value: RenderInterstitialAdType) => {
  const { slot, open } = value;
  onMounted(() => {
    if (!open) return;
    window.googletag = window.googletag || { cmd: [] };
    window.googletag.cmd.push(() => {
      const interstitialAdSlot = window?.googletag?.defineOutOfPageSlot(
        slot,
        window?.googletag?.enums?.OutOfPageFormat?.INTERSTITIAL,
      );
      if (!interstitialAdSlot) return;
      interstitialAdSlot
        ?.addService(window?.googletag?.pubads())
        ?.setTargeting("interstitialAd")
        ?.setConfig({
          interstitial: {
            triggers: {
              navBar: true,
              unhideWindow: true,
            },
          },
        });
      window?.googletag?.enableServices();
      window?.googletag?.display(interstitialAdSlot);
    });
  });
};
