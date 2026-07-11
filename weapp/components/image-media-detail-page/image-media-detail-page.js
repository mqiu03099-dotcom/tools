const { MEDIA_RESOURCE_TYPE } = require("../../utils/media-resource-types.js");
const { buildStaticResourceUrl } = require("../../utils/static-resource-config.js");

function parseTags(tags) {
  return (tags || "")
    .split(",")
    .map((tag) => tag.trim())
    .filter(Boolean);
}

function findMediaItem(items, id) {
  return (Array.isArray(items) ? items : []).find((item) => item.open === true && item.type === MEDIA_RESOURCE_TYPE && item.id === id);
}

Component({
  properties: {
    mediaId: {
      type: String,
      value: "",
    },
    jsonPath: {
      type: String,
      value: "",
    },
    imageField: {
      type: String,
      value: "url",
    },
    pagePath: {
      type: String,
      value: "",
    },
    shareTitle: {
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
    adUnitId: {
      type: String,
      value: "",
    },
    deniedModalContent: {
      type: String,
      value: "",
    },
  },

  data: {
    headerTags: [],
    imageUrl: "",
  },

  observers: {
    "mediaId, jsonPath": function () {
      this.loadMediaDetail();
    },
    tags(tags) {
      this.setData({
        headerTags: parseTags(tags),
      });
    },
  },

  methods: {
    loadMediaDetail() {
      const { mediaId, jsonPath, imageField } = this.properties;

      if (!mediaId || !jsonPath) {
        return;
      }

      wx.request({
        url: buildStaticResourceUrl(jsonPath),
        success: (res) => {
          const item = findMediaItem(res.data, mediaId);

          this.setData({
            imageUrl: buildStaticResourceUrl(item[imageField]),
          });
        },
      });
    },

    buildShareAppMessage() {
      return {
        title: this.properties.shareTitle,
        path: `${this.properties.pagePath}?id=${encodeURIComponent(this.properties.mediaId)}`,
        imageUrl: this.data.imageUrl,
      };
    },
  },
});
