const { RESOURCE_LINKS } = require("../../utils/resource-links.js");
const { requestStaticMediaDetail } = require("../../utils/static-media-detail.js");

const PAGE_PATH = "/pages/home-detail/home-detail";
const SHARE_TITLE = "奶呱视频魔性搞笑可保存";
const PHOTO_ALBUM_DENIED_CONTENT = "你已关闭保存到相册权限，请在设置中重新开启后再保存视频封面。";

Page({
  data: {
    headerTags: ["首页视频", "视频封面", "预览保存"],
    photoAlbumDeniedContent: PHOTO_ALBUM_DENIED_CONTENT,
    id: "",
    imageUrl: "",
  },

  onLoad(options) {
    const id = options.id;

    this.setData({
      id,
    });
    this.loadHomeDetail(id);
  },

  onShareAppMessage() {
    return {
      title: SHARE_TITLE,
      path: PAGE_PATH + "?id=" + encodeURIComponent(this.data.id),
      imageUrl: this.data.imageUrl,
    };
  },

  loadHomeDetail(id) {
    requestStaticMediaDetail(RESOURCE_LINKS.playbackModesJsonUrl, id, "cover", (imageUrl) => {
      this.setData({
        imageUrl,
      });
    });
  },
});
