function toRpx(value, systemInfo = wx.getSystemInfoSync()) {
  const viewportWidth = systemInfo.windowWidth || systemInfo.screenWidth || 375;
  return Math.round(((Number(value) || 0) * 750 * 100) / viewportWidth) / 100;
}

module.exports = {
  toRpx,
};
