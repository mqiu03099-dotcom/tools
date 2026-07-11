const { buildStaticResourceUrl } = require("./static-resource-config.js");

function requestStaticMediaDetail(jsonUrl, id, imageField, onLoaded) {
  wx.request({
    url: jsonUrl,
    success: (res) => {
      const item = res.data.find((mediaItem) => mediaItem.open === true && mediaItem.type === "media" && mediaItem.id === id);

      onLoaded(buildStaticResourceUrl(item[imageField]));
    },
  });
}

function requestStaticAudioDetail(jsonUrl, id, onLoaded) {
  wx.request({
    url: jsonUrl,
    success: (res) => {
      const item = res.data.find((mediaItem) => mediaItem.open === true && mediaItem.type === "media" && mediaItem.id === id);

      onLoaded({
        audioSrc: buildStaticResourceUrl(item.url),
        cover: buildStaticResourceUrl(item.cover),
      });
    },
  });
}

module.exports = {
  requestStaticAudioDetail,
  requestStaticMediaDetail,
};
