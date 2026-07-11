const { RESOURCE_LINKS } = require("../../utils/resource-links.js");
const { MEDIA_RESOURCE_TYPE } = require("../../utils/media-resource-types.js");
const { buildStaticResourceUrl } = require("../../utils/static-resource-config.js");
const {
  AUDIO_PAGE_HEADER,
  AUDIO_PAGE_TEXT,
} = require("../../utils/audio-page-config.js");
const { buildTabMediaDetailPageUrl } = require("../../utils/tab-media-detail-config.js");

function normalizeAudioItems(items) {
  if (!Array.isArray(items)) {
    return [];
  }

  return items
    .filter((item) => item && item.open === true && item.id && item.type)
    .map((item, index) => {
      const key = `${item.id}-${index}`;

      if (item.type !== MEDIA_RESOURCE_TYPE) {
        return {
          key,
          type: item.type,
          isAd: true,
        };
      }

      if (!item.url || !item.cover) {
        return null;
      }

      return {
        key,
        id: item.id,
        url: buildStaticResourceUrl(item.url),
        cover: buildStaticResourceUrl(item.cover),
        type: item.type,
        isAd: false,
      };
    })
    .filter(Boolean);
}

function getFirstAudioImage(items) {
  const firstMedia = (items || []).find((item) => !item.isAd);

  return firstMedia?.cover || "";
}

Page({
  data: {
    loadingImageUrl: RESOURCE_LINKS.loadingImageUrl,
    pageHeader: AUDIO_PAGE_HEADER,
    audioItems: [],
    audioText: AUDIO_PAGE_TEXT,
    isAudioLoading: true,
  },

  onLoad() {
    this.initializeAudioItems();
  },

  onShareAppMessage() {
    const shareImageUrl = this.pendingShareAudioCover || getFirstAudioImage(this.data.audioItems);
    const sharePayload = {
      title: AUDIO_PAGE_TEXT.shareTitle,
      path: AUDIO_PAGE_TEXT.sharePath,
    };

    if (shareImageUrl) {
      sharePayload.imageUrl = shareImageUrl;
    }

    return sharePayload;
  },

  onShareTimeline() {
    const shareImageUrl = this.pendingShareAudioCover || getFirstAudioImage(this.data.audioItems);
    const sharePayload = {
      title: AUDIO_PAGE_TEXT.shareTitle,
      query: "",
    };

    if (shareImageUrl) {
      sharePayload.imageUrl = shareImageUrl;
    }

    return sharePayload;
  },

  handleWaterfallItemTap(event) {
    const id = event.detail?.item?.id;

    if (!id) {
      return;
    }

    wx.navigateTo({
      url: buildTabMediaDetailPageUrl(id, "audio"),
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
        this.setData({
          audioItems: normalizeAudioItems(res.data),
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
});
