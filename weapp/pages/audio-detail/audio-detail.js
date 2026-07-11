const { RESOURCE_LINKS } = require("../../utils/resource-links.js");
const {
  cleanupRewardedVideoAd,
  createRewardedVideoAd,
  showRewardedVideoAd,
} = require("../../utils/unlock-download.js");
const {
  AUDIO_DETAIL_PAGE_HEADER,
  AUDIO_DETAIL_TEXT,
} = require("../../utils/audio-page-config.js");
const { prepareAudioFileForShare } = require("../../utils/audio-file-share.js");
const { requestStaticAudioDetail } = require("../../utils/static-media-detail.js");
const PAGE_PATH = "/pages/audio-detail/audio-detail";

Page({
  data: {
    downloadImageUrl: "/assets/dowlod.png",
    loadingImageUrl: RESOURCE_LINKS.loadingImageUrl,
    pageHeader: AUDIO_DETAIL_PAGE_HEADER,
    playImageUrl: RESOURCE_LINKS.playImageUrl,
    stopPlayImageUrl: RESOURCE_LINKS.stopPlayImageUrl,
    detailText: AUDIO_DETAIL_TEXT,
    id: "",
    audioSrc: "",
    cover: "",
    isDetailLoading: true,
    isAudioPlaying: false,
    isAudioStarting: false,
    isAudioShareDialogVisible: false,
  },

  onLoad(options) {
    const id = options.id;

    this.setData({
      id,
    });
    this.loadAudioDetail(id);
  },

  onShow() {
    this.initAudioContext();
  },

  onHide() {
    this.stopAudio();
  },

  onUnload() {
    this.destroyAudioContext();
    cleanupRewardedVideoAd(this);
  },

  onShareAppMessage() {
    return {
      title: AUDIO_DETAIL_PAGE_HEADER.title,
      path: `${PAGE_PATH}?id=${encodeURIComponent(this.data.id)}`,
      imageUrl: this.data.cover,
    };
  },

  loadAudioDetail(id) {
    this.setData({
      isDetailLoading: true,
    });

    requestStaticAudioDetail(RESOURCE_LINKS.audioItemsJsonUrl, id, ({ audioSrc, cover }) => {
      this.setData({
        audioSrc,
        cover,
        isDetailLoading: false,
      });
    });
  },

  handleTogglePlay() {
    const { audioSrc } = this.data;

    if (!audioSrc) {
      return;
    }

    this.initAudioContext();

    if (this.data.isAudioPlaying) {
      this.audioContext.pause();
      this.setData({
        isAudioPlaying: false,
        isAudioStarting: false,
      });
      return;
    }

    if (this.currentAudioSrc !== audioSrc) {
      this.currentAudioSrc = audioSrc;
      this.audioContext.src = audioSrc;
    }

    this.setData({
      isAudioStarting: true,
    });
    this.audioContext.play();
  },

  handleDownloadTap() {
    const { id, audioSrc } = this.data;

    createRewardedVideoAd(this, () => {
      this.prepareAudioFileForShare({
        id,
        src: audioSrc,
      });
    });

    showRewardedVideoAd(this);
  },

  closeAudioShareDialog() {
    this.setData({
      isAudioShareDialogVisible: false,
    });
  },

  noop() {},

  handleSharePreparedAudioTap() {
    wx.shareFileMessage({
      filePath: this.readyAudioShareFilePath,
      fileName: this.readyAudioShareFileName,
      success: () => {
        this.closeAudioShareDialog();
      },
    });
  },

  prepareAudioFileForShare(audio) {
    prepareAudioFileForShare(audio, AUDIO_DETAIL_TEXT.fileNamePrefix, ({ fileName, filePath }) => {
      this.readyAudioShareFilePath = filePath;
      this.readyAudioShareFileName = fileName;
      this.setData({
        isAudioShareDialogVisible: true,
      });
    });
  },

  initAudioContext() {
    if (this.audioContext) {
      return;
    }

    this.currentAudioSrc = "";
    this.audioContext = wx.createInnerAudioContext();
    this.audioContext.obeyMuteSwitch = false;
    this.audioContext.loop = true;
    this.audioContext.onPlay(() => {
      this.setData({
        isAudioPlaying: true,
        isAudioStarting: false,
      });
    });
    this.audioContext.onPause(() => {
      this.setData({
        isAudioPlaying: false,
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
      this.setData({
        isAudioPlaying: false,
        isAudioStarting: false,
      });
    });
  },

  stopAudio() {
    if (!this.audioContext) {
      return;
    }

    this.audioContext.stop();
  },

  destroyAudioContext() {
    if (!this.audioContext) {
      return;
    }

    this.audioContext.stop();
    this.audioContext.destroy();
    this.audioContext = null;
    this.currentAudioSrc = "";
    this.setData({
      isAudioPlaying: false,
      isAudioStarting: false,
    });
  },
});
