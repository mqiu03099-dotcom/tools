const {
  buildStaticJsonUrl,
  buildStaticResourceUrl,
} = require("./static-resource-config.js");

// 统一维护项目里会复用的资源链接。
const RESOURCE_LINKS = {
  // 分享卡片 logo 链接。
  logoImageUrl: buildStaticResourceUrl("/wallpapers/1.jpg"),
  // 语音列表 JSON 链接。
  audioItemsJsonUrl: buildStaticJsonUrl("audio-clips.json"),
  // 分类图片链接。
  directoryImageUrl: "/assets/directory.png",
  // 禁止喧哗图片链接。
  disabledImageUrl: "/assets/disabled.png",
  // 循环播放图片链接。
  loopImageUrl: "/assets/loop.png",
  // 加载中图片链接。
  loadingImageUrl: "/assets/loading.png",
  // 公告按钮图片链接。
  noticeImageUrl: "/assets/notice.png",
  // 公告 JSON 链接。
  noticeJsonUrl: buildStaticJsonUrl("announcements.json"),
  // 原生模板广告位 ID。
  nativeTemplateAdUnitId: "adunit-07d67250772c2f4d",
  // 反馈按钮图片链接。
  msgImageUrl: "/assets/msg.png",
  // 九宫格切图图标链接。
  wechartImageUrl: "/assets/wechart.png",
  // 播放模式 JSON 链接。
  playbackModesJsonUrl: buildStaticJsonUrl("home-videos.json"),
  // 播放按钮图片链接。
  playImageUrl: "/assets/play.png",
  // 分享按钮图片链接。
  shareImageUrl: "/assets/share.png",
  // 图片形状裁剪图标链接。
  shapeCutImageUrl: "/assets/shap.png",
  // 停止播放按钮图片链接。
  stopPlayImageUrl: "/assets/stopPlay.png",
};

module.exports = {
  RESOURCE_LINKS,
};
