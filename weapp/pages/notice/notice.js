const { RESOURCE_LINKS } = require("../../utils/resource-links.js");

function normalizeNoticeItems(rawList) {
  if (!Array.isArray(rawList)) {
    return [];
  }

  return rawList.map((item) => (typeof item === "string" ? item.trim() : "")).filter(Boolean);
}

Page({
  data: {
    nativeTemplateAdUnitId: RESOURCE_LINKS.nativeTemplateAdUnitId,
    loadingImageUrl: RESOURCE_LINKS.loadingImageUrl,
    isNoticeLoading: false,
    noticeItems: [],
  },

  onLoad() {
    this.loadRemoteNoticeItems();
  },

  loadRemoteNoticeItems() {
    if (this.data.isNoticeLoading) {
      return;
    }

    this.setData({
      isNoticeLoading: true,
      noticeItems: [],
    });

    wx.request({
      url: RESOURCE_LINKS.noticeJsonUrl,
      timeout: 6000,
      success: (response) => {
        if (response.statusCode < 200 || response.statusCode >= 300) {
          this.setData({
            isNoticeLoading: false,
          });
          return;
        }

        this.setData({
          isNoticeLoading: false,
          noticeItems: normalizeNoticeItems(response.data),
        });
      },
      fail: () => {
        this.setData({
          isNoticeLoading: false,
        });
      },
    });
  },
});
