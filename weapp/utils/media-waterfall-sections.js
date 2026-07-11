function splitColumns(items) {
  return {
    leftItems: items.filter((_, index) => index % 2 === 0),
    rightItems: items.filter((_, index) => index % 2 === 1),
  };
}

function createMediaSection(sectionIndex, items) {
  return {
    key: `media-${sectionIndex}`,
    isAd: false,
    ...splitColumns(items),
  };
}

function createAdSection(item, sectionIndex) {
  return {
    key: item.key || `ad-${sectionIndex}`,
    isAd: true,
    type: item.type,
  };
}

function buildMediaWaterfallSections(items) {
  const list = Array.isArray(items) ? items : [];
  const ads = list.filter((item) => item?.isAd);
  const mediaItems = list.filter((item) => item && !item.isAd);

  if (!ads.length) {
    return mediaItems.length ? [createMediaSection(0, mediaItems)] : [];
  }

  if (ads.length === 1) {
    return mediaItems.length
      ? [createAdSection(ads[0], 0), createMediaSection(1, mediaItems)]
      : [createAdSection(ads[0], 0)];
  }

  const sections = [];
  const mediaGroupCount = ads.length - 1;
  const groupSize = Math.ceil(mediaItems.length / mediaGroupCount);

  ads.forEach((ad, index) => {
    sections.push(createAdSection(ad, sections.length));

    if (index >= mediaGroupCount) {
      return;
    }

    const groupItems = mediaItems.slice(index * groupSize, (index + 1) * groupSize);

    if (groupItems.length) {
      sections.push(createMediaSection(sections.length, groupItems));
    }
  });

  return sections;
}

module.exports = {
  buildMediaWaterfallSections,
};
