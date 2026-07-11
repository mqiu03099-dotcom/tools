const TAB_MEDIA_DETAIL_PAGE_PATHS = {
  audio: "/pages/audio-detail/audio-detail",
};

function buildTabMediaDetailPageUrl(id, category) {
  return `${TAB_MEDIA_DETAIL_PAGE_PATHS[category]}?id=${encodeURIComponent(id)}`;
}

module.exports = {
  buildTabMediaDetailPageUrl,
};
