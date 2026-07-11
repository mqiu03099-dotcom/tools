const STORAGE_KEY = "share_download_global_limit_v1";
const DAILY_SHARE_DOWNLOAD_LIMIT = 3;

function formatToday() {
  const date = new Date();
  const year = date.getFullYear();
  const month = `${date.getMonth() + 1}`.padStart(2, "0");
  const day = `${date.getDate()}`.padStart(2, "0");
  return `${year}-${month}-${day}`;
}

function createDefaultState() {
  return {
    date: formatToday(),
    usedCount: 0,
  };
}

function readState() {
  const today = formatToday();

  try {
    const state = wx.getStorageSync(STORAGE_KEY);
    if (!state || typeof state !== "object" || state.date !== today) {
      return createDefaultState();
    }

    return {
      date: today,
      usedCount: Number(state.usedCount) || 0,
    };
  } catch (error) {
    return createDefaultState();
  }
}

function writeState(state) {
  try {
    wx.setStorageSync(STORAGE_KEY, state);
  } catch (error) {}
}

function getShareDownloadLimitState() {
  const state = readState();
  const usedCount = Number(state.usedCount) || 0;
  const remainingCount = Math.max(0, DAILY_SHARE_DOWNLOAD_LIMIT - usedCount);

  return {
    limit: DAILY_SHARE_DOWNLOAD_LIMIT,
    usedCount,
    remainingCount,
    isExhausted: remainingCount <= 0,
  };
}

function consumeShareDownloadChance() {
  const state = readState();
  const currentCount = Number(state.usedCount) || 0;

  if (currentCount >= DAILY_SHARE_DOWNLOAD_LIMIT) {
    return {
      allowed: false,
      ...getShareDownloadLimitState(),
    };
  }

  state.usedCount = currentCount + 1;
  writeState(state);

  return {
    allowed: true,
    ...getShareDownloadLimitState(),
  };
}

module.exports = {
  DAILY_SHARE_DOWNLOAD_LIMIT,
  consumeShareDownloadChance,
  getShareDownloadLimitState,
};
