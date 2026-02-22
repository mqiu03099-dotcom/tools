export type RenderRewardedAdType = Partial<{
  slot?: string;
  open?: boolean;
}>;

/**
 * 渲染激励广告
 * @description 使用规则：在app.vue或者需要引入的页面中引入useRenderRewardedAd()方法
 */
export const useRenderRewardedAd = (value?: RenderRewardedAdType) => {
  const { slot = "", open = false } = value || {};
  const rewardedEvent = shallowRef<any>();
  const rewardedReady = ref(false);

  /** 展示激励广告方法 */
  const showRewarded = () => {
    const event = rewardedEvent.value;
    if (event && typeof event.makeRewardedVisible === "function") {
      event?.makeRewardedVisible();
      return true;
    }
    return false;
  };

  onMounted(() => {
    if (!open) return;
    window.googletag = window.googletag || { cmd: [] };
    window.googletag.cmd.push(() => {
      const rewardedAdSlot = window?.googletag?.defineOutOfPageSlot(
        slot,
        window?.googletag?.enums?.OutOfPageFormat?.REWARDED,
      );
      if (!rewardedAdSlot) return;
      rewardedAdSlot?.addService(window?.googletag?.pubads())?.setTargeting("rewardedAd");
      window?.googletag?.pubads()?.addEventListener("rewardedSlotReady", (event: any) => {
        rewardedEvent.value = event;
        rewardedReady.value = true;
      });
      window?.googletag?.enableServices();
      window?.googletag?.display(rewardedAdSlot);
    });
  });

  return {
    rewardedReady: readonly(rewardedReady),
    showRewarded,
  };
};

