/**
 * 监听广告的各种事件
 * @description 使用规则：在app.vue引入useRenderListener()方法
 */
export const useRenderListener = () => {
  onMounted(() => {
    window.googletag = window.googletag || { cmd: [] };
    window.googletag.cmd.push(() => {
      // 所有广告请求开始
      window?.googletag?.pubads()?.addEventListener("slotRequested", (event: any) => {
        const { slot } = event || {};
        const adType = slot?.getTargetingKeys()?.[0];
        const slotId = slot?.getSlotId()?.getAdUnitPath();
        const domId = slot?.getSlotElementId();
        if (adType === "comAd") {
          console.log("qm普通广告开始请求：", `slot：${slotId}，`, `id：${domId}`);
        }
        if (adType === "anchorAd") {
          console.log("qm锚定广告开始请求：", `slot：${slotId}，`, `id：${domId}`);
        }
        if (adType === "rewardedAd") {
          console.log("qm激励广告开始请求：", `slot：${slotId}，`, `id：${domId}`);
        }
        if (adType === "interstitialAd") {
          console.log("qm插屏广告开始请求：", `slot：${slotId}，`, `id：${domId}`);
        }
        if (adType === "gameRewardedAd") {
          console.log("qm游戏插屏广告开始请求：", `slot：${slotId}，`, `id：${domId}`);
        }
      });
      // 所有渲染结束，带成功或者失败参数
      window?.googletag?.pubads()?.addEventListener("slotRenderEnded", (event: any) => {
        const { slot, isEmpty } = event;
        const adType = slot?.getTargetingKeys()?.[0];
        const slotId = slot?.getSlotId()?.getAdUnitPath();
        const domId = slot?.getSlotElementId();
        if (adType === "comAd") {
          if (!isEmpty) {
            console.log("qm普通广告填充成功：", `slot：${slotId}，`, `id：${domId}`);
          } else {
            console.log("qm普通广告填充失败：", `slot：${slotId}，`, `id：${domId}`);
          }
        }
        if (adType === "anchorAd") {
          if (!isEmpty) {
            console.log("qm锚定广告填充成功：", `slot：${slotId}，`, `id：${domId}`);
          } else {
            console.log("qm锚定广告填充失败：", `slot：${slotId}，`, `id：${domId}`);
          }
        }
        if (adType === "rewardedAd") {
          if (!isEmpty) {
            console.log("qm激励广告填充成功：", `slot：${slotId}，`, `id：${domId}`);
          } else {
            console.log("qm激励广告填充失败：", `slot：${slotId}，`, `id：${domId}`);
          }
        }
        if (adType === "gameRewardedAd") {
          if (!isEmpty) {
            console.log("qm游戏插屏广告填充成功：", `slot：${slotId}，`, `id：${domId}`);
          } else {
            console.log("qm游戏插屏广告填充失败：", `slot：${slotId}，`, `id：${domId}`);
          }
        }
        if (adType === "interstitialAd") {
          if (!isEmpty) {
            console.log("qm插屏广告填充成功：", `slot：${slotId}，`, `id：${domId}`);
          } else {
            console.log("qm插屏广告填充失败：", `slot：${slotId}，`, `id：${domId}`);
          }
        }
      });
      // 所有出现在可视界面：前提条件必须渲染成功
      window?.googletag?.pubads()?.addEventListener("impressionViewable", (event: any) => {
        const { slot } = event;
        const adType = slot?.getTargetingKeys()?.[0];
        const slotId = slot?.getSlotId()?.getAdUnitPath();
        const domId = slot?.getSlotElementId();
        if (adType === "comAd") {
          console.log("qm普通广告出现在可视界面：", `slot：${slotId}，`, `id：${domId}`);
        }
        if (adType === "anchorAd") {
          console.log("qm锚定广告出现在可视界面：", `slot：${slotId}，`, `id：${domId}`);
        }
        if (adType === "rewardedAd") {
          console.log("qm激励广告出现在可视界面：", `slot：${slotId}，`, `id：${domId}`);
        }
        if (adType === "gameRewardedAd") {
          console.log("qm游戏插屏广告出现在可视界面：", `slot：${slotId}，`, `id：${domId}`);
        }
        if (adType === "interstitialAd") {
          console.log("qm插屏广告出现在可视界面：", `slot：${slotId}，`, `id：${domId}`);
        }
      });
      // 激励广告播放完成事件
      window?.googletag?.pubads()?.addEventListener("rewardedSlotVideoCompleted", (event: any) => {
        const { slot } = event;
        const slotId = slot?.getSlotId()?.getAdUnitPath();
        const domId = slot?.getSlotElementId();
        console.log("qm激励播放完成：", `slot：${slotId}，`, `id：${domId}`);
      });
      // 激励广告关闭事件
      window?.googletag?.pubads()?.addEventListener("rewardedSlotClosed", (event: any) => {
        const { slot } = event;
        const slotId = slot?.getSlotId()?.getAdUnitPath();
        const domId = slot?.getSlotElementId();
        console.log("qm激励广告关闭：", `slot：${slotId}，`, `id：${domId}`);
      });
      // 插屏广告关闭事件
      window?.addEventListener("message", (event) => {
        if (event?.data && typeof event?.data === "string" && event?.data?.includes("adClosed")) {
          console.log("qm插屏广告关闭：", event.data);
        }
      });
      // 游戏插屏广告关闭事件
      window?.googletag
        ?.pubads()
        ?.addEventListener("gameManualInterstitialSlotClosed", (event: any) => {
          const { slot } = event;
          const slotId = slot?.getSlotId()?.getAdUnitPath();
          const domId = slot?.getSlotElementId();
          console.log("qm游戏插屏广告关闭：", `slot：${slotId}，`, `id：${domId}`);
        });
    });
  });
};
