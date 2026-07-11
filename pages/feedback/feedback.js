const { RESOURCE_LINKS } = require("../../utils/resource-links.js");

Page({
  data: {
    nativeTemplateAdUnitId: RESOURCE_LINKS.nativeTemplateAdUnitId,
    feedbackContent: "",
  },

  handleFeedbackInput(event) {
    this.setData({
      feedbackContent: event.detail.value || "",
    });
  },

  submitFeedback() {
    const feedbackContent = (this.data.feedbackContent || "").trim();

    if (!feedbackContent) {
      wx.showToast({
        title: "请输入反馈内容",
        icon: "none",
      });
      return;
    }

    if (wx.reportEvent) {
      wx.reportEvent("msg", {
        content: feedbackContent,
      });
    }

    this.setData({
      feedbackContent: "",
    });
    wx.showToast({
      title: "反馈成功",
      icon: "none",
    });
  },
});
