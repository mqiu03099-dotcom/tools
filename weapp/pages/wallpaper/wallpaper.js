Page({
  onShareAppMessage() {
    return this.selectComponent("#imageMediaListPage").buildShareAppMessage();
  },

  onShareTimeline() {
    return this.selectComponent("#imageMediaListPage").buildShareTimelineMessage();
  },
});
