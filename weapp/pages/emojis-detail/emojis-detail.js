Page({
  data: {
    id: "",
  },

  onLoad(options) {
    this.setData({
      id: options.id,
    });
  },

  onShareAppMessage() {
    return this.selectComponent("#imageMediaDetailPage").buildShareAppMessage();
  },
});
