const { RESOURCE_LINKS } = require("../../utils/resource-links.js");
const {
  cleanupRewardedVideoAd,
  createRewardedVideoAd,
  showRewardedVideoAd,
  startRemoteImageBatchDownload,
  startRemoteImageDownload,
} = require("../../utils/unlock-download.js");
const {
  DAILY_SHARE_DOWNLOAD_LIMIT,
  consumeShareDownloadChance,
  getShareDownloadLimitState,
} = require("../../utils/share-download-limit.js");
const { buildMediaDetailPageUrl } = require("../../utils/media-detail-config.js");

const SHARE_TITLE = "奶呱表情包合集聊天搞笑动图可保存";
const SHARE_PATH = "/pages/emojis/emojis";
const DOWNLOAD_DIALOG_EXIT_DURATION = 260;
const PHOTO_ALBUM_DENIED_CONTENT = "你已关闭保存到相册权限，请在设置中重新开启后再保存表情包。";
const SHARE_DOWNLOAD_CATEGORY_KEY = "emojis";

function normalizeGroupItems(items) {
  return (items || [])
    .map((item) => {
      if (typeof item === "string") {
        return item;
      }

      return item?.url || "";
    })
    .filter(Boolean);
}

function normalizeRemoteGroups(groups, defaultTitlePrefix) {
  if (!Array.isArray(groups)) {
    return [];
  }

  return groups
    .map((group, groupIndex) => {
      const items = normalizeGroupItems(group?.items);

      if (!items.length) {
        return null;
      }

      return {
        title: group?.title || `精选${defaultTitlePrefix}${groupIndex + 1}组`,
        items,
      };
    })
    .filter(Boolean);
}

function buildMediaGroups(groups) {
  return (groups || [])
    .map((group, groupIndex) => {
      const items = (group?.items || []).filter(Boolean);

      if (!items.length) {
        return null;
      }

      return {
        title: group?.title || `分组 ${groupIndex + 1}`,
        featuredImage: items[0],
        items: items.map((image, itemIndex) => ({
          key: `group-${groupIndex}-item-${itemIndex}`,
          image,
        })),
      };
    })
    .filter(Boolean);
}

function getFirstMediaImage(groups) {
  return groups?.[0]?.featuredImage || "";
}

function getGroupImagesByImage(groups, image) {
  if (!image) {
    return [];
  }

  const matchedGroup = (groups || []).find((group) => (group.items || []).some((item) => item.image === image));

  return matchedGroup ? (matchedGroup.items || []).map((item) => item.image).filter(Boolean) : [];
}

Page({
  data: {
    emojisImageUrl: RESOURCE_LINKS.emojisImageUrl,
    nativeTemplateAdUnitId: RESOURCE_LINKS.nativeTemplateAdUnitId,
    loadingImageUrl: RESOURCE_LINKS.loadingImageUrl,
    mediaGroups: [],
    isMediaLoading: true,
    isDownloadDialogVisible: false,
    isDownloadDialogClosing: false,
    selectedEmojisImage: "",
    selectedGroupImages: [],
    shareDownloadLimit: DAILY_SHARE_DOWNLOAD_LIMIT,
    shareDownloadRemaining: DAILY_SHARE_DOWNLOAD_LIMIT,
    isShareDownloadDisabled: false,
    isShareUnlockVisible: true,
    shareDownloadButtonText: "分享后下载",
    shareDownloadHintText: "",
    pageIntroTitle: "奶呱表情包大全",
    pageIntroText: "精选奶呱表情包、聊天表情包、搞笑动图合集，支持预览后保存，适合微信聊天和斗图使用。",
    pageIntroTags: ["表情包大全", "微信表情包", "搞笑动图"],
  },

  onLoad() {
    this.initializeMediaGroups();
    this.refreshShareDownloadState();
  },

  onUnload() {
    this.clearDownloadDialogTimer();
    cleanupRewardedVideoAd(this);
  },

  onShow() {
    this.refreshShareDownloadState();
  },

  onShareAppMessage() {
    const imageUrl =
      this.pendingShareImage ||
      this.data.selectedEmojisImage ||
      getFirstMediaImage(this.data.mediaGroups) ||
      RESOURCE_LINKS.emojisImageUrl;

    return {
      title: SHARE_TITLE,
      path: SHARE_PATH,
      imageUrl,
    };
  },

  onShareTimeline() {
    const imageUrl =
      this.pendingShareImage ||
      this.data.selectedEmojisImage ||
      getFirstMediaImage(this.data.mediaGroups) ||
      RESOURCE_LINKS.emojisImageUrl;

    return {
      title: SHARE_TITLE,
      query: "",
      imageUrl,
    };
  },

  noop() {},

  initializeMediaGroups() {
    this.setData({
      isMediaLoading: true,
    });
    this.loadRemoteMediaGroups();
  },

  loadRemoteMediaGroups() {
    wx.request({
      url: RESOURCE_LINKS.emojisPagesJsonUrl,
      success: (res) => {
        const remoteGroups = normalizeRemoteGroups(res.data, "表情包");

        this.setData({
          mediaGroups: buildMediaGroups(remoteGroups),
          isMediaLoading: false,
        });
      },
      fail: () => {
        this.setData({
          mediaGroups: [],
          isMediaLoading: false,
        });
      },
    });
  },

  openDownloadDialog(event) {
    const image = event.currentTarget.dataset.image;

    if (!image) {
      return;
    }

    wx.navigateTo({
      url: buildMediaDetailPageUrl(image, SHARE_DOWNLOAD_CATEGORY_KEY),
    });
  },

  closeDownloadDialog() {
    if (!this.data.isDownloadDialogVisible || this.data.isDownloadDialogClosing) {
      return;
    }

    this.clearDownloadDialogTimer();
    this.setData({
      isDownloadDialogClosing: true,
    });

    this.downloadDialogExitTimer = setTimeout(() => {
      this.downloadDialogExitTimer = null;
      this.setData({
        isDownloadDialogVisible: false,
        isDownloadDialogClosing: false,
      });
    }, DOWNLOAD_DIALOG_EXIT_DURATION);
  },

  handleShareUnlockTap(event) {
    const image = event.currentTarget.dataset.image;

    if (!image) {
      return;
    }

    const consumeResult = consumeShareDownloadChance(SHARE_DOWNLOAD_CATEGORY_KEY);
    this.applyShareDownloadState(consumeResult);

    if (!consumeResult.allowed) {
      wx.showToast({
        title: "今日分享下载次数已用完",
        icon: "none",
      });
      return;
    }

    this.pendingShareImage = image;
    this.closeDownloadDialog();
    setTimeout(() => {
      this.startImageDownload(image);
    }, 80);
  },

  handleRewardSaveFeaturedTap(event) {
    const image = event.currentTarget.dataset.image;

    if (!image) {
      return;
    }

    this.clearDownloadDialogTimer();
    this.pendingShareImage = "";
    this.pendingRewardDownloadImage = "";
    this.pendingRewardDownloadGroupImages = [];
    const groupImages = getGroupImagesByImage(this.data.mediaGroups, image);
    this.setData({
      isDownloadDialogVisible: true,
      isDownloadDialogClosing: false,
      isShareUnlockVisible: false,
      selectedEmojisImage: image,
      selectedGroupImages: groupImages,
      shareDownloadHintText: "看完视频后可保存当前这组表情包。",
    });
  },

  handleRewardSaveCurrentTap() {
    const image = this.data.selectedEmojisImage;

    if (!image) {
      return;
    }

    createRewardedVideoAd(this, () => {
      const groupImagesToDownload = this.pendingRewardDownloadGroupImages || [];
      const imageToDownload = this.pendingRewardDownloadImage;
      this.pendingRewardDownloadGroupImages = [];
      this.pendingRewardDownloadImage = "";

      if (groupImagesToDownload.length) {
        this.startGroupDownload(groupImagesToDownload);
        return;
      }

      if (imageToDownload) {
        this.startImageDownload(imageToDownload);
      }
    });

    if (!this.rewardedVideoAd) {
      return;
    }

    this.pendingRewardDownloadGroupImages = getGroupImagesByImage(this.data.mediaGroups, image);
    this.closeDownloadDialog();
    showRewardedVideoAd(this);
  },

  startImageDownload(imageUrl) {
    if (!imageUrl) {
      return;
    }

    this.closeDownloadDialog();
    startRemoteImageDownload(this, imageUrl, PHOTO_ALBUM_DENIED_CONTENT);
  },

  startGroupDownload(imageUrls) {
    if (!imageUrls?.length) {
      return;
    }

    startRemoteImageBatchDownload(this, imageUrls, PHOTO_ALBUM_DENIED_CONTENT);
  },

  clearDownloadDialogTimer() {
    if (this.downloadDialogExitTimer) {
      clearTimeout(this.downloadDialogExitTimer);
      this.downloadDialogExitTimer = null;
    }
  },

  refreshShareDownloadState() {
    this.applyShareDownloadState(getShareDownloadLimitState(SHARE_DOWNLOAD_CATEGORY_KEY));
  },

  applyShareDownloadState(limitState) {
    const remainingCount = limitState?.remainingCount ?? DAILY_SHARE_DOWNLOAD_LIMIT;
    const isDisabled = !!limitState?.isExhausted;
    const buttonText = isDisabled
      ? "今日分享次数已用完"
      : `分享保存（今日剩${remainingCount}次）`;
    const hintText = isDisabled
      ? `分享保存今日已用完，明天会自动恢复 ${DAILY_SHARE_DOWNLOAD_LIMIT} 次；看视频可保存当前这组表情包。`
      : `分享保存今日还可用 ${remainingCount} 次，用完后明天恢复；看视频可保存当前这组表情包。`;

    this.setData({
      shareDownloadLimit: DAILY_SHARE_DOWNLOAD_LIMIT,
      shareDownloadRemaining: remainingCount,
      isShareDownloadDisabled: isDisabled,
      shareDownloadButtonText: buttonText,
      shareDownloadHintText: hintText,
    });
  },
});
