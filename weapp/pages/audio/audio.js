const { RESOURCE_LINKS } = require("../../utils/resource-links.js");
const {
  cleanupRewardedVideoAd,
  createRewardedVideoAd,
  showRewardedVideoAd,
} = require("../../utils/unlock-download.js");
const SHARE_TITLE = "奶呱语音包合集搞笑抽象魔性语音";
const SHARE_PATH = "/pages/audio/audio";

function normalizeAudioItems(items) {
  if (!Array.isArray(items)) {
    return [];
  }

  return items
    .map((item, index) => {
      const avatar = typeof item?.avatar === "string" ? item.avatar.trim() : "";
      const audioSrc = typeof item?.audioSrc === "string" ? item.audioSrc.trim() : "";
      const title = typeof item?.title === "string" ? item.title.trim() : "";
      const description =
        typeof item?.description === "string" && item.description.trim()
          ? item.description.trim()
          : title;

      if (!avatar || !audioSrc || !title) {
        return null;
      }

      return {
        id: item?.id || `audio-${index + 1}`,
        avatar,
        audioSrc,
        title,
        description,
      };
    })
    .filter(Boolean);
}

function getFirstAudioImage(items) {
  return items?.[0]?.avatar || "";
}

function buildAudioFileName(title) {
  const safeTitle = (title || "奶呱语音").replace(/[\\/:*?"<>|]/g, "").trim();
  return `${safeTitle || "奶呱语音"}.mp3`;
}

function buildAudioLocalFilePath() {
  return `${wx.env.USER_DATA_PATH}/milk-frog-audio-${Date.now()}.mp3`;
}

Page({
  data: {
    nativeTemplateAdUnitId: RESOURCE_LINKS.nativeTemplateAdUnitId,
    downloadImageUrl: "/assets/dowlod.png",
    loadingImageUrl: RESOURCE_LINKS.loadingImageUrl,
    playImageUrl: RESOURCE_LINKS.playImageUrl,
    shareButtonImageUrl: RESOURCE_LINKS.shareImageUrl,
    stopPlayImageUrl: RESOURCE_LINKS.stopPlayImageUrl,
    audioItems: [],
    isAudioLoading: true,
    isRewardTipDialogVisible: false,
    isAudioShareDialogVisible: false,
    playingAudioId: "",
    isAudioPaused: false,
    isAudioStarting: false,
    pageIntroTitle: "奶呱语音",
    pageIntroText: "适合聊天整活和分享朋友使用，点一下就可以直接播放奶呱语音。",
    pageIntroTags: ["语音专区", "奶呱语音", "聊天整活", "分享朋友"],
  },

  onLoad() {
    this.initializeAudioItems();
    this.initAudioContext();
  },

  onShow() {
    this.initAudioContext();
  },

  onHide() {
    this.destroyAudioContext();
  },

  onUnload() {
    this.destroyAudioContext();
    cleanupRewardedVideoAd(this);
  },

  onShareAppMessage(event) {
    const shareTitle = event?.target?.dataset?.title || SHARE_TITLE;
    const shareImageUrl = event?.target?.dataset?.image || getFirstAudioImage(this.data.audioItems);

    const sharePayload = {
      title: shareTitle,
      path: SHARE_PATH,
    };

    if (shareImageUrl) {
      sharePayload.imageUrl = shareImageUrl;
    }

    return sharePayload;
  },

  onShareTimeline() {
    const shareImageUrl = getFirstAudioImage(this.data.audioItems);
    const sharePayload = {
      title: SHARE_TITLE,
      query: "",
    };

    if (shareImageUrl) {
      sharePayload.imageUrl = shareImageUrl;
    }

    return sharePayload;
  },

  handleTogglePlay(event) {
    const { id, src } = event.currentTarget.dataset;

    if (!id || !src || !this.audioContext) {
      return;
    }

    if (this.data.isAudioStarting && this.data.playingAudioId === id) {
      return;
    }

    if (this.data.playingAudioId === id) {
      if (this.data.isAudioPaused) {
        this.setData({
          isAudioStarting: true,
          isAudioPaused: false,
        });
        this.audioContext.play();
        return;
      }

      this.audioContext.pause();
      this.setData({
        isAudioPaused: true,
      });
      return;
    }

    this.pendingAudioId = id;
    if (this.currentAudioSrc !== src) {
      this.currentAudioSrc = src;
      this.audioContext.src = src;
    }

    this.setData({
      playingAudioId: id,
      isAudioPaused: false,
      isAudioStarting: true,
    });
    this.audioContext.play();
  },

  handleRewardShareAudioTap(event) {
    const { src, title } = event.currentTarget.dataset;

    if (!src) {
      return;
    }

    if (!wx.shareFileMessage) {
      wx.showToast({
        title: "当前微信版本暂不支持发送文件",
        icon: "none",
      });
      return;
    }

    this.pendingRewardAudioShare = {
      src,
      title,
    };
    this.setData({
      isRewardTipDialogVisible: true,
    });
  },

  closeRewardTipDialog() {
    this.pendingRewardAudioShare = null;
    this.setData({
      isRewardTipDialogVisible: false,
    });
  },

  confirmRewardShareAudioTap() {
    const pendingAudioShare = this.pendingRewardAudioShare;

    if (!pendingAudioShare?.src) {
      this.closeRewardTipDialog();
      return;
    }

    createRewardedVideoAd(this, () => {
      const pendingAudioShare = this.pendingRewardAudioShare;
      this.pendingRewardAudioShare = null;

      if (!pendingAudioShare?.src) {
        return;
      }

      this.prepareAudioFileForShare(pendingAudioShare);
    });

    if (!this.rewardedVideoAd) {
      wx.showToast({
        title: "激励视频加载中，请稍后再试",
        icon: "none",
      });
      return;
    }

    this.setData({
      isRewardTipDialogVisible: false,
    });
    showRewardedVideoAd(this, () => {
      wx.showToast({
        title: "激励视频加载失败，请稍后再试",
        icon: "none",
      });
    });
  },

  noop() {},

  closeAudioShareDialog() {
    this.setData({
      isAudioShareDialogVisible: false,
    });
  },

  handleSharePreparedAudioTap() {
    if (!this.readyAudioShareFilePath) {
      wx.showToast({
        title: "语音还未准备好",
        icon: "none",
      });
      return;
    }

    wx.shareFileMessage({
      filePath: this.readyAudioShareFilePath,
      fileName: this.readyAudioShareFileName || "奶呱语音.mp3",
      success: () => {
        this.closeAudioShareDialog();
      },
      fail: (error) => {
        console.error("语音文件发送失败", error);
        wx.showToast({
          title: "语音发送失败",
          icon: "none",
        });
      },
    });
  },

  initializeAudioItems() {
    this.setData({
      isAudioLoading: true,
    });
    this.loadRemoteAudioItems();
  },

  loadRemoteAudioItems() {
    wx.request({
      url: RESOURCE_LINKS.audioItemsJsonUrl,
      success: (res) => {
        const remoteAudioItems = normalizeAudioItems(res.data);

        this.setData({
          audioItems: remoteAudioItems,
          isAudioLoading: false,
        });
      },
      fail: () => {
        this.setData({
          audioItems: [],
          isAudioLoading: false,
        });
      },
    });
  },

  prepareAudioFileForShare(audio) {
    const audioFileName = buildAudioFileName(audio.title);
    const audioFilePath = buildAudioLocalFilePath();

    wx.showLoading({
      title: "语音准备中",
      mask: true,
    });

    wx.downloadFile({
      url: audio.src,
      filePath: audioFilePath,
      success: (downloadRes) => {
        const downloadedFilePath = downloadRes.filePath || downloadRes.tempFilePath || audioFilePath;

        if (downloadRes.statusCode !== 200 || !downloadedFilePath) {
          console.error("语音文件下载失败", downloadRes);
          wx.hideLoading();
          wx.showToast({
            title: "语音下载失败",
            icon: "none",
          });
          return;
        }

        wx.hideLoading();
        this.readyAudioShareFilePath = downloadedFilePath;
        this.readyAudioShareFileName = audioFileName;
        this.setData({
          isAudioShareDialogVisible: true,
        });
      },
      fail: (error) => {
        console.error("语音文件下载失败", error);
        wx.hideLoading();
        wx.showToast({
          title: "语音下载失败",
          icon: "none",
        });
      },
    });
  },

  initAudioContext() {
    if (this.audioContext) {
      return;
    }

    this.pendingAudioId = "";
    this.currentAudioSrc = "";
    this.audioContext = wx.createInnerAudioContext();
    this.audioContext.obeyMuteSwitch = false;
    this.audioContext.loop = true;
    this.audioContext.onPlay(() => {
      this.setData({
        playingAudioId: this.pendingAudioId || this.data.playingAudioId,
        isAudioPaused: false,
        isAudioStarting: false,
      });
    });
    this.audioContext.onPause(() => {
      this.setData({
        isAudioPaused: true,
        isAudioStarting: false,
      });
    });
    this.audioContext.onEnded(() => {
      this.pendingAudioId = "";
      this.setData({
        playingAudioId: "",
        isAudioPaused: false,
        isAudioStarting: false,
      });
    });
    this.audioContext.onWaiting(() => {
      this.setData({
        isAudioStarting: true,
      });
    });
    this.audioContext.onCanplay(() => {
      this.setData({
        isAudioStarting: false,
      });
    });
    this.audioContext.onStop(() => {
      if (!this.isDestroyingAudioContext) {
        return;
      }

      this.pendingAudioId = "";
      this.currentAudioSrc = "";
      this.setData({
        playingAudioId: "",
        isAudioPaused: false,
        isAudioStarting: false,
      });
    });
    this.audioContext.onError(() => {
      this.pendingAudioId = "";
      this.currentAudioSrc = "";
      this.setData({
        playingAudioId: "",
        isAudioPaused: false,
        isAudioStarting: false,
      });
    });
  },

  destroyAudioContext() {
    if (!this.audioContext) {
      return;
    }

    this.isDestroyingAudioContext = true;
    this.audioContext.stop();
    this.audioContext.destroy();
    this.audioContext = null;
    this.isDestroyingAudioContext = false;
    this.pendingAudioId = "";
    this.currentAudioSrc = "";
    this.setData({
      playingAudioId: "",
      isAudioPaused: false,
      isAudioStarting: false,
    });
  },
});
