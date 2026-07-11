const {
  cleanupRewardedVideoAd,
  createRewardedVideoAd,
  showRewardedVideoAd,
  startRemoteImageDownload,
} = require("../../utils/unlock-download.js");
const {
  consumeShareDownloadChance,
  getShareDownloadLimitState,
} = require("../../utils/share-download-limit.js");
const {
  buildMediaDetailPageUrl,
  getMediaDetailConfig,
  getMediaDetailIntro,
} = require("../../utils/media-detail-config.js");
const { RESOURCE_LINKS } = require("../../utils/resource-links.js");

function decodeRouteUrl(url) {
  if (!url) {
    return "";
  }

  try {
    return decodeURIComponent(url);
  } catch (error) {
    return "";
  }
}

Page({
  data: {
    nativeTemplateAdUnitId: RESOURCE_LINKS.nativeTemplateAdUnitId,
    imageUrl: "",
    category: "",
    mediaName: "",
    introTitle: "",
    introText: "",
    introTags: [],
    shareSaveButtonText: "",
    rewardSaveButtonText: "",
    isSaveActionDisabled: true,
    isShareSaveVisible: false,
  },

  onLoad(options) {
    const category = options?.category || "";
    const imageUrl = decodeRouteUrl(options?.url);
    const config = getMediaDetailConfig(category);
    const intro = getMediaDetailIntro();

    if (!config || !imageUrl) {
      wx.showToast({
        title: "图片链接无效",
        icon: "none",
      });
      return;
    }

    wx.setNavigationBarTitle({
      title: config.pageTitle,
    });
    this.setData({
      imageUrl,
      category,
      mediaName: config.mediaName,
      introTitle: intro.title,
      introText: intro.text,
      introTags: intro.tags,
      isSaveActionDisabled: false,
    });
    this.refreshSaveActionState();
  },

  onShow() {
    if (this.data.category) {
      this.refreshSaveActionState();
    }
  },

  onUnload() {
    cleanupRewardedVideoAd(this);
  },

  onShareAppMessage() {
    const { imageUrl, category } = this.data;
    const config = getMediaDetailConfig(category);

    return {
      title: config?.shareTitle || "",
      path: buildMediaDetailPageUrl(imageUrl, category),
      imageUrl,
    };
  },

  handleShareSaveTap() {
    const { imageUrl, category } = this.data;
    const config = getMediaDetailConfig(category);

    if (
      this.data.isSaveActionDisabled ||
      !this.data.isShareSaveVisible ||
      !imageUrl ||
      !config
    ) {
      return;
    }

    const consumeResult = consumeShareDownloadChance(category);
    this.refreshSaveActionState(consumeResult);

    if (!consumeResult.allowed) {
      wx.showToast({
        title: "今日分享保存次数已用完",
        icon: "none",
      });
      return;
    }

    this.startImageDownload(imageUrl, config);
  },

  handleRewardSaveTap() {
    const { imageUrl, category } = this.data;
    const config = getMediaDetailConfig(category);

    if (this.data.isSaveActionDisabled || !imageUrl || !config) {
      return;
    }

    this.startRewardSave(imageUrl, config);
  },

  startRewardSave(imageUrl, config) {
    createRewardedVideoAd(this, () => {
      this.startImageDownload(imageUrl, config);
    });

    if (!this.rewardedVideoAd) {
      wx.showToast({
        title: "视频暂时无法加载",
        icon: "none",
      });
      return;
    }

    showRewardedVideoAd(this, () => {
      wx.showToast({
        title: "视频加载失败",
        icon: "none",
      });
    });
  },

  startImageDownload(imageUrl, config) {
    startRemoteImageDownload(this, imageUrl, config.photoAlbumDeniedContent);
  },

  refreshSaveActionState(limitState) {
    const { category } = this.data;
    const config = getMediaDetailConfig(category);

    if (!config) {
      return;
    }

    const nextLimitState = limitState || getShareDownloadLimitState(category);
    const remainingCount = nextLimitState.remainingCount || 0;

    this.setData({
      isShareSaveVisible: remainingCount > 0,
      shareSaveButtonText: `分享保存(${remainingCount})`,
      rewardSaveButtonText: "看视频保存",
    });
  },
});
