function normalizeMediaItem(rawItem) {
  if (!rawItem || typeof rawItem !== "object") {
    return null;
  }

  const url = typeof rawItem.url === "string" && rawItem.url.trim() ? rawItem.url.trim() : "";
  const width = Number(rawItem.width) || 0;
  const height = Number(rawItem.height) || 0;

  if (!url || width <= 0 || height <= 0) {
    return null;
  }

  return {
    url,
    width,
    height,
  };
}

function normalizeMediaPages(rawPages) {
  if (!Array.isArray(rawPages)) {
    return [];
  }

  return rawPages
    .filter((page) => Array.isArray(page))
    .map((page) => page.map(normalizeMediaItem).filter(Boolean))
    .filter((page) => page.length > 0);
}

function getPaddingTop(width, height) {
  return `${(height / width) * 100}%`;
}

function buildMediaRenderState(rawPages, requestedPageCount = 1, previousLoadingStateByKey = {}) {
  const pages = normalizeMediaPages(rawPages);
  const loadedPageCount = Math.min(Math.max(requestedPageCount, 1), pages.length || 1);
  const visiblePages = pages.slice(0, loadedPageCount);
  const items = visiblePages.flatMap((page, pageIndex) =>
    page.map((item, itemIndex) => {
      const key = `media-${pageIndex}-${itemIndex}`;
      const hasPreviousLoadingState = Object.prototype.hasOwnProperty.call(previousLoadingStateByKey, key);

      return {
        key,
        image: item.url,
        width: item.width,
        height: item.height,
        paddingTop: getPaddingTop(item.width, item.height),
        isImageLoading: hasPreviousLoadingState ? previousLoadingStateByKey[key] : true,
      };
    }),
  );
  const leftItems = items.filter((_, index) => index % 2 === 0);
  const rightItems = items.filter((_, index) => index % 2 === 1);

  return {
    pages,
    items,
    leftItems,
    rightItems,
    loadedPageCount: pages.length > 0 ? loadedPageCount : 0,
    hasMorePages: loadedPageCount < pages.length,
  };
}

function requestMediaPages(url, timeout = 6000) {
  return new Promise((resolve, reject) => {
    if (!url) {
      reject(new Error("Missing media JSON url"));
      return;
    }

    wx.request({
      url,
      timeout,
      success: (response) => {
        if (response.statusCode >= 200 && response.statusCode < 300) {
          resolve(normalizeMediaPages(response.data));
          return;
        }

        reject(new Error(`Request failed with status ${response.statusCode}`));
      },
      fail: reject,
    });
  });
}

module.exports = {
  normalizeMediaPages,
  buildMediaRenderState,
  requestMediaPages,
};
