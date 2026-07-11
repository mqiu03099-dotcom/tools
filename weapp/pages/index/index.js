const { RESOURCE_LINKS } = require("../../utils/resource-links.js");
const { HOME_TOOL_ACTIONS } = require("../../utils/home-tool-actions.js");
const {
  cleanupRewardedVideoAd,
  createRewardedVideoAd,
  showRewardedVideoAd,
} = require("../../utils/unlock-download.js");
const DEFAULT_VIDEO_BG_COLOR = "#000000";
const DEFAULT_VIDEO_ASPECT_RATIO = "1 / 1";
const ACTION_CARD_BG_COLOR = "#050506";
const DEFAULT_PLAYBACK_TITLE = "龟速前行";
const PHOTO_ALBUM_DENIED_CONTENT = "你已关闭保存到相册权限，请在设置中重新开启后再下载视频。";
const SHARE_TITLE = "奶呱表情包头像壁纸语音包合集";
const SHARE_PATH = "/pages/index/index";

function normalizePlaybackMode(rawItem) {
  if (!rawItem || typeof rawItem !== "object") {
    return null;
  }

  const title = typeof rawItem.title === "string" ? rawItem.title.trim() : "";
  const playingTitle = typeof rawItem.playingTitle === "string" ? rawItem.playingTitle.trim() : "";
  const url = typeof rawItem.url === "string" ? rawItem.url.trim() : "";
  const poster =
    typeof rawItem.poster === "string" && rawItem.poster.trim() ? rawItem.poster.trim() : "";
  const aspectRatio =
    typeof rawItem.aspectRatio === "string" && rawItem.aspectRatio.trim()
      ? rawItem.aspectRatio.trim()
      : DEFAULT_VIDEO_ASPECT_RATIO;
  const bgColor =
    typeof rawItem.bgColor === "string" && rawItem.bgColor.trim()
      ? rawItem.bgColor.trim()
      : DEFAULT_VIDEO_BG_COLOR;

  if (!title || !playingTitle || !url) {
    return null;
  }

  return {
    title,
    playingTitle,
    url,
    poster,
    aspectRatio,
    bgColor,
    isPosterLoading: true,
  };
}

function normalizePlaybackModes(rawList) {
  if (!Array.isArray(rawList)) {
    return [];
  }

  return rawList.map(normalizePlaybackMode).filter(Boolean);
}

Page({
  data: {
    homeToolActions: HOME_TOOL_ACTIONS,
    nativeTemplateAdUnitId: RESOURCE_LINKS.nativeTemplateAdUnitId,
    shareButtonImageUrl: RESOURCE_LINKS.shareImageUrl,
    playbackModes: [],
    currentPlaybackIndex: 0,
    currentPlaybackTitle: DEFAULT_PLAYBACK_TITLE,
    currentPlaybackPlayingTitle: "",
    isRewardDownloadDialogVisible: false,
    rewardDownloadTitle: "",
    isVideoReady: false,
    isVideoMounted: true,
    isVideoSwitching: false,
    actionCardBgColor: ACTION_CARD_BG_COLOR,
    currentVideoAspectRatio: DEFAULT_VIDEO_ASPECT_RATIO,
    currentVideoBgColor: DEFAULT_VIDEO_BG_COLOR,
    currentVideoSrc: "",
    isPlaying: false,
    isStopping: false,
    loopImageUrl: RESOURCE_LINKS.loopImageUrl,
    disabledImageUrl: RESOURCE_LINKS.disabledImageUrl,
    downloadImageUrl: "/assets/dowlod.png",
    loadingImageUrl: RESOURCE_LINKS.loadingImageUrl,
  },

  onLoad() {
    this.initializePlaybackModes();
  },

  onShareAppMessage() {
    const currentPlayback = this.data.playbackModes[this.data.currentPlaybackIndex] || {};
    const sharePayload = {
      title: currentPlayback.title || this.data.currentPlaybackTitle || SHARE_TITLE,
      path: SHARE_PATH,
      imageUrl: currentPlayback.poster || RESOURCE_LINKS.logoImageUrl,
    };

    return sharePayload;
  },

  onShareTimeline() {
    const currentPlayback = this.data.playbackModes[this.data.currentPlaybackIndex] || {};

    return {
      title: currentPlayback.title || this.data.currentPlaybackTitle || SHARE_TITLE,
      query: "",
      imageUrl: currentPlayback.poster || RESOURCE_LINKS.logoImageUrl,
    };
  },

  onShow() {},

  onReady() {
    this.videoContext = wx.createVideoContext("homeVideo", this);
    this.currentPlaybackTime = 0;
  },

  onUnload() {
    this.clearVideoReadyTimer();
    this.clearPlaybackTimers();
    cleanupRewardedVideoAd(this);
  },

  handleShareButtonTap() {},

  handleHomeToolTap(event) {
    const actionId = event.currentTarget.dataset.id;
    const action = this.data.homeToolActions.find((item) => item.id === actionId);

    if (action?.pageUrl) {
      wx.navigateTo({
        url: action.pageUrl,
      });
      return;
    }

    wx.showToast({
      title: "敬请期待",
      icon: "none",
    });
  },

  noop() {},

  initializePlaybackModes() {
    this.loadRemotePlaybackModes();
  },

  loadRemotePlaybackModes() {
    wx.request({
      url: RESOURCE_LINKS.playbackModesJsonUrl,
      timeout: 6000,
      success: (response) => {
        if (response.statusCode < 200 || response.statusCode >= 300) {
          return;
        }

        const playbackModes = normalizePlaybackModes(response.data);

        if (!playbackModes.length) {
          return;
        }

        this.applyPlaybackModes(playbackModes, {
          preserveCurrentSelection: true,
        });
      },
      fail: () => {},
    });
  },

  applyPlaybackModes(rawModes, options = {}) {
    const playbackModes = normalizePlaybackModes(rawModes);

    if (!playbackModes.length) {
      return;
    }

    const nextIndex = this.getPlaybackModeIndex(playbackModes, options.preserveCurrentSelection);

    this.setData({
      playbackModes,
      ...this.getPlaybackSelectionState(playbackModes, nextIndex),
    });
  },

  getPlaybackModeIndex(playbackModes, preserveCurrentSelection = false) {
    if (!playbackModes.length) {
      return 0;
    }

    if (preserveCurrentSelection) {
      const currentIndex = playbackModes.findIndex(
        (item) => item.title === this.data.currentPlaybackTitle,
      );

      if (currentIndex >= 0) {
        return currentIndex;
      }
    }

    return 0;
  },

  getPlaybackSelectionState(playbackModes, index) {
    const safeIndex = Math.min(Math.max(index, 0), playbackModes.length - 1);
    const currentPlayback = playbackModes[safeIndex];

    return {
      currentPlaybackIndex: safeIndex,
      currentPlaybackTitle: currentPlayback.title,
      currentPlaybackPlayingTitle: currentPlayback.playingTitle,
      currentVideoSrc: currentPlayback.url,
      currentVideoAspectRatio: currentPlayback.aspectRatio || DEFAULT_VIDEO_ASPECT_RATIO,
      currentVideoBgColor: currentPlayback.bgColor || DEFAULT_VIDEO_BG_COLOR,
    };
  },

  handlePlaybackModeTap(event) {
    const nextIndex = Number(event.currentTarget.dataset.index);

    if (
      !Number.isInteger(nextIndex) ||
      nextIndex < 0 ||
      nextIndex >= this.data.playbackModes.length
    ) {
      return;
    }

    if (this.data.currentPlaybackIndex === nextIndex) {
      return;
    }

    this.updatePlaybackMode(nextIndex);
  },

  handleCurrentRewardDownloadTap() {
    const playback = this.data.playbackModes[this.data.currentPlaybackIndex];

    this.openRewardDownloadDialog(playback);
  },

  openRewardDownloadDialog(playback) {
    if (!playback?.url) {
      return;
    }

    this.pendingRewardVideoDownload = playback;
    this.setData({
      isRewardDownloadDialogVisible: true,
      rewardDownloadTitle: playback.title || "",
    });
  },

  closeRewardDownloadDialog() {
    this.pendingRewardVideoDownload = null;
    this.setData({
      isRewardDownloadDialogVisible: false,
      rewardDownloadTitle: "",
    });
  },

  confirmRewardDownloadModeTap() {
    const playback = this.pendingRewardVideoDownload;

    if (!playback?.url) {
      this.closeRewardDownloadDialog();
      return;
    }

    this.setData({
      isRewardDownloadDialogVisible: false,
    });
    this.ensureRewardedVideoAd(() => {
      showRewardedVideoAd(this, () => {
        wx.showToast({
          title: "暂无可用广告，请稍后再试",
          icon: "none",
        });
      });
    });
  },

  toggleLoopPlay() {
    if (this.data.isPlaying) {
      this.stopPlayback();
      return;
    }

    this.isAwaitingPlaybackStart = true;
    this.setData({
      isPlaying: true,
      isStopping: false,
    });

    this.resumePlayback();
  },

  handleEnded() {
    this.currentPlaybackTime = 0;

    if (this.data.isPlaying) {
      this.restartPlaybackAt(0);
    }
  },

  handleTimeUpdate(event) {
    this.currentPlaybackTime = event.detail.currentTime || 0;
  },

  handleVideoPlay() {
    this.isAwaitingPlaybackStart = false;

    if (!this.data.isPlaying) {
      this.setData({
        isPlaying: true,
      });
    }
  },

  handleVideoPause() {
    if (this.isSwitchingPlaybackMode) {
      return;
    }

    if (this.isAwaitingPlaybackStart) {
      return;
    }

    if (this.data.isStopping) {
      this.setData({
        isStopping: false,
      });
      return;
    }

    if (this.data.isPlaying) {
      this.setData({
        isPlaying: false,
      });
    }
  },

  handleVideoReady() {
    this.clearVideoReadyTimer();
    this.videoReadyTimer = setTimeout(() => {
      this.videoReadyTimer = null;
      this.isSwitchingPlaybackMode = false;

      if (!this.data.isVideoReady || this.data.isVideoSwitching) {
        this.setData({
          isVideoReady: true,
          isVideoSwitching: false,
        });
      }
    }, 100);
  },

  handleVideoError(event) {
    this.clearVideoReadyTimer();
    this.isSwitchingPlaybackMode = false;
    this.setData({
      isVideoReady: true,
      isVideoSwitching: false,
    });
    console.error("video error", event.detail);
  },

  handlePlaybackPosterReady(event) {
    const index = Number(event.currentTarget.dataset.index);

    if (!Number.isInteger(index) || index < 0 || index >= this.data.playbackModes.length) {
      return;
    }

    this.setData({
      [`playbackModes[${index}].isPosterLoading`]: false,
    });
  },

  stopPlayback() {
    this.clearPlaybackTimers();
    this.isAwaitingPlaybackStart = false;

    this.setData({
      isStopping: true,
      isPlaying: false,
    });

    if (!this.videoContext) {
      return;
    }

    this.videoContext.pause();
  },

  resumePlayback() {
    if (!this.videoContext) {
      return;
    }

    this.clearPlaybackTimers();
    this.videoContext.play();
  },

  updatePlaybackMode(nextIndex) {
    const nextPlayback = this.data.playbackModes[nextIndex];

    if (!nextPlayback) {
      return;
    }

    this.clearVideoReadyTimer();
    this.clearPlaybackTimers();
    this.isAwaitingPlaybackStart = false;
    this.isSwitchingPlaybackMode = true;
    this.currentPlaybackTime = 0;

    if (this.videoContext) {
      this.videoContext.pause();
    }

    this.setData(
      {
        isVideoMounted: false,
        isVideoReady: false,
        isVideoSwitching: true,
        isStopping: false,
        isPlaying: false,
        ...this.getPlaybackSelectionState(this.data.playbackModes, nextIndex),
      },
      () => {
        this.mountNextVideo();
      },
    );
  },

  mountNextVideo() {
    const mountVideo = () => {
      this.setData(
        {
          isVideoMounted: true,
        },
        () => {
          this.videoContext = wx.createVideoContext("homeVideo", this);
        },
      );
    };

    if (wx.nextTick) {
      wx.nextTick(mountVideo);
      return;
    }

    setTimeout(mountVideo, 0);
  },

  restartPlaybackAt(startTime) {
    this.clearPlaybackTimers();
    this.currentPlaybackTime = startTime;
    this.videoContext.seek(startTime);
    this.videoContext.play();
  },

  initRewardedVideoAd() {
    createRewardedVideoAd(
      this,
      () => {
        const playback = this.pendingRewardVideoDownload;
        this.pendingRewardVideoDownload = null;

        if (!playback?.url) {
          return;
        }

        this.downloadVideoToAlbum(playback);
      },
      (error) => {
        this.handleRewardedVideoError(error);
      },
    );
  },

  ensureRewardedVideoAd(onReady) {
    if (!wx.createRewardedVideoAd) {
      wx.showToast({
        title: "当前微信版本不支持激励视频",
        icon: "none",
      });
      return;
    }

    if (!this.rewardedVideoAd) {
      this.initRewardedVideoAd();
    }

    if (!this.rewardedVideoAd) {
      wx.showToast({
        title: "激励视频初始化失败",
        icon: "none",
      });
      return;
    }

    onReady();
  },

  handleRewardedVideoError(error) {
    const errorCode = Number(error?.errCode);

    if (errorCode === 1004) {
      wx.showToast({
        title: "暂无合适广告，稍后再试",
        icon: "none",
      });
      return;
    }

    wx.showToast({
      title: "激励视频加载失败，请稍后再试",
      icon: "none",
    });
  },

  downloadVideoToAlbum(playback) {
    if (!wx.saveVideoToPhotosAlbum) {
      wx.showToast({
        title: "当前微信版本暂不支持保存视频",
        icon: "none",
      });
      return;
    }

    wx.showLoading({
      title: "视频下载中",
      mask: true,
    });

    this.ensurePhotoAlbumPermission(
      () => {
        wx.downloadFile({
          url: playback.url,
          success: (downloadRes) => {
            if (downloadRes.statusCode !== 200 || !downloadRes.tempFilePath) {
              wx.hideLoading();
              wx.showToast({
                title: "视频下载失败",
                icon: "none",
              });
              return;
            }

            wx.saveVideoToPhotosAlbum({
              filePath: downloadRes.tempFilePath,
              success: () => {
                wx.hideLoading();
                wx.showToast({
                  title: "已保存到相册",
                  icon: "success",
                });
              },
              fail: () => {
                wx.hideLoading();
                wx.showToast({
                  title: "视频保存失败",
                  icon: "none",
                });
              },
            });
          },
          fail: () => {
            wx.hideLoading();
            wx.showToast({
              title: "视频下载失败",
              icon: "none",
            });
          },
        });
      },
      () => {
        wx.hideLoading();
      },
    );
  },

  ensurePhotoAlbumPermission(onGranted, onDenied = () => {}) {
    wx.getSetting({
      success: (settingRes) => {
        const photoAlbumAuth = settingRes.authSetting["scope.writePhotosAlbum"];

        if (photoAlbumAuth === true) {
          onGranted();
          return;
        }

        if (photoAlbumAuth === false) {
          this.promptOpenPhotoAlbumSetting(onGranted, onDenied);
          return;
        }

        wx.authorize({
          scope: "scope.writePhotosAlbum",
          success: onGranted,
          fail: onDenied,
        });
      },
      fail: onDenied,
    });
  },

  promptOpenPhotoAlbumSetting(onGranted, onDenied = () => {}) {
    wx.showModal({
      title: "需要相册权限",
      content: PHOTO_ALBUM_DENIED_CONTENT,
      confirmText: "去开启",
      success: (modalRes) => {
        if (!modalRes.confirm) {
          onDenied();
          return;
        }

        wx.openSetting({
          success: (settingRes) => {
            if (settingRes.authSetting["scope.writePhotosAlbum"]) {
              onGranted();
              return;
            }

            onDenied();
          },
          fail: onDenied,
        });
      },
      fail: onDenied,
    });
  },

  clearPlaybackTimers() {
    if (!this.data.isPlaying) {
      this.isAwaitingPlaybackStart = false;
    }
  },

  clearVideoReadyTimer() {
    if (this.videoReadyTimer) {
      clearTimeout(this.videoReadyTimer);
      this.videoReadyTimer = null;
    }
  },

});
