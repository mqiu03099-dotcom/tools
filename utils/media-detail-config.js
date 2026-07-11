const MEDIA_DETAIL_CONFIG = {
  avatar: {
    mediaName: "头像",
    pageTitle: "头像详情",
    shareTitle: "奶呱头像高清可保存",
    photoAlbumDeniedContent: "你已关闭保存到相册权限，请在设置中重新开启后再保存头像。",
  },
  emojis: {
    mediaName: "表情包",
    pageTitle: "表情包详情",
    shareTitle: "奶呱表情包聊天搞笑可保存",
    photoAlbumDeniedContent: "你已关闭保存到相册权限，请在设置中重新开启后再保存表情包。",
  },
  wallpaper: {
    mediaName: "壁纸",
    pageTitle: "壁纸详情",
    shareTitle: "奶呱壁纸高清可保存",
    photoAlbumDeniedContent: "你已关闭保存到相册权限，请在设置中重新开启后再保存壁纸。",
  },
};

const MEDIA_DETAIL_INTRO = {
  title: "奶呱素材详情",
  text: "精选头像、表情包和壁纸素材，支持预览后分享保存或看视频保存，适合日常聊天和社交平台使用。",
  tags: ["高清素材", "预览保存", "分享下载"],
};

const MEDIA_DETAIL_PAGE_PATH = "/pages/media-detail/media-detail";

function buildMediaDetailPageUrl(imageUrl, category) {
  return `${MEDIA_DETAIL_PAGE_PATH}?url=${encodeURIComponent(imageUrl)}&category=${category}`;
}

function getMediaDetailConfig(category) {
  return MEDIA_DETAIL_CONFIG[category] || null;
}

function getMediaDetailIntro() {
  return MEDIA_DETAIL_INTRO;
}

module.exports = {
  buildMediaDetailPageUrl,
  getMediaDetailConfig,
  getMediaDetailIntro,
};
