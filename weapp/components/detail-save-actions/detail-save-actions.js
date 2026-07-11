const {
  createRewardedVideoAd,
  cleanupRewardedVideoAd,
  showRewardedVideoAd,
  startRemoteImageDownload,
} = require("../../utils/unlock-download.js");
const {
  consumeShareDownloadChance,
  getShareDownloadLimitState,
} = require("../../utils/share-download-limit.js");

Component({
  properties: {
    imageUrl: {
      type: String,
      value: "",
    },
    deniedModalContent: {
      type: String,
      value: "",
    },
  },

  data: {
    isShareSaveVisible: false,
    shareSaveButtonText: "",
    rewardSaveButtonText: "看视频保存",
  },

  lifetimes: {
    attached() {
      this.refreshShareSaveState();
    },

    detached() {
      cleanupRewardedVideoAd(this);
    },
  },

  pageLifetimes: {
    show() {
      this.refreshShareSaveState();
    },
  },

  methods: {
    handleShareSaveTap() {
      const { imageUrl, deniedModalContent } = this.properties;

      if (!imageUrl) {
        return;
      }

      const limitState = consumeShareDownloadChance();
      this.setShareSaveState(limitState.remainingCount || 0);
      startRemoteImageDownload(this, imageUrl, deniedModalContent);
    },

    handleRewardSaveTap() {
      const { imageUrl, deniedModalContent } = this.properties;

      if (!imageUrl) {
        return;
      }

      createRewardedVideoAd(this, () => {
        startRemoteImageDownload(this, imageUrl, deniedModalContent);
      });
      showRewardedVideoAd(this);
    },

    refreshShareSaveState() {
      const limitState = getShareDownloadLimitState();

      this.setShareSaveState(limitState.remainingCount || 0);
    },

    setShareSaveState(remainingCount) {
      this.setData({
        isShareSaveVisible: remainingCount > 0,
        shareSaveButtonText: `分享保存(${remainingCount})`,
      });
    },
  },
});
