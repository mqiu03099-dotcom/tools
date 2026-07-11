const { MEDIA_RESOURCE_TYPE } = require("../../utils/media-resource-types.js");
const { RESOURCE_LINKS } = require("../../utils/resource-links.js");
const { buildStaticResourceUrl } = require("../../utils/static-resource-config.js");

function parseTags(tags) {
  return (tags || "")
    .split(",")
    .map((tag) => tag.trim())
    .filter(Boolean);
}

function normalizeMediaItems(items) {
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

      return {
        key,
        id: item.id,
        url: buildStaticResourceUrl(item.url),
        cover: buildStaticResourceUrl(item.cover),
        type: item.type,
        isAd: false,
      };
    });
}

function getFirstMediaCover(items, defaultImageUrl) {
  const firstMedia = (items || []).find((item) => !item.isAd);

  return firstMedia?.cover || defaultImageUrl;
}

Component({
  properties: {
    jsonPath: {
      type: String,
      value: "",
    },
    title: {
      type: String,
      value: "",
    },
    description: {
      type: String,
      value: "",
    },
    tags: {
      type: String,
      value: "",
    },
    loadingText: {
      type: String,
      value: "",
    },
    detailPath: {
      type: String,
      value: "",
    },
    shareTitle: {
      type: String,
      value: "",
    },
    sharePath: {
      type: String,
      value: "",
    },
    shareImageUrl: {
      type: String,
      value: "",
    },
  },

  data: {
    loadingImageUrl: RESOURCE_LINKS.loadingImageUrl,
    headerTags: [],
    mediaItems: [],
    isMediaLoading: true,
  },

  lifetimes: {
    attached() {
      this.setData({
        headerTags: parseTags(this.properties.tags),
      });
      this.loadMediaItems();
    },
  },

  methods: {
    loadMediaItems() {
      this.setData({
        isMediaLoading: true,
      });

      wx.request({
        url: buildStaticResourceUrl(this.properties.jsonPath),
        success: (res) => {
          this.setData({
            mediaItems: normalizeMediaItems(res.data),
            isMediaLoading: false,
          });
        },
      });
    },

    handleWaterfallItemTap(event) {
      const id = event.detail?.item?.id;

      if (!id) {
        return;
      }

      wx.navigateTo({
        url: `${this.properties.detailPath}?id=${encodeURIComponent(id)}`,
      });
    },

    buildShareAppMessage() {
      return {
        title: this.properties.shareTitle,
        path: this.properties.sharePath,
        imageUrl: getFirstMediaCover(this.data.mediaItems, this.properties.shareImageUrl),
      };
    },

    buildShareTimelineMessage() {
      return {
        title: this.properties.shareTitle,
        query: "",
        imageUrl: getFirstMediaCover(this.data.mediaItems, this.properties.shareImageUrl),
      };
    },
  },
});
