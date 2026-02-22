export type RenderGameRewardedAdType = Partial<{
  slot?: string;
  open?: boolean;
}>;

/**
 * 渲染游戏插屏广告
 * @description 使用规则：在app.vue或者需要引入的页面中引入useRenderGameRewardedAd()方法
 */
export const useRenderGameRewardedAd = (value: RenderGameRewardedAdType) => {
  const { slot = "", open = false } = value || {};
  const gemeRewardedEvent = shallowRef<any>();
  const gameRewardedReady = ref(false);

  /** 展示游戏插屏广告方法 */
  const showGameRewarded = () => {
    const event = gemeRewardedEvent.value;
    if (event && typeof event.makeGameManualInterstitialVisible === "function") {
      event?.makeGameManualInterstitialVisible();
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
        window?.googletag?.enums?.OutOfPageFormat?.GAME_MANUAL_INTERSTITIAL,
      );
      if (!rewardedAdSlot) return;
      rewardedAdSlot?.addService(window?.googletag?.pubads())?.setTargeting("gameRewardedAd");
      window?.googletag
        ?.pubads()
        ?.addEventListener("gameManualInterstitialSlotReady", (event: any) => {
          gemeRewardedEvent.value = event;
          gameRewardedReady.value = true;
        });
      window?.googletag?.enableServices();
      window?.googletag?.display(rewardedAdSlot);
    });
  });

  return {
    gameRewardedReady: readonly(gameRewardedReady),
    showGameRewarded,
  };
};
