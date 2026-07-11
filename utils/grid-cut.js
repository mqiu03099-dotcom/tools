function normalizeDecimal(value) {
  return Math.round((Number(value) || 0) * 100) / 100;
}

function createDefaultSquareCrop(imageWidth, imageHeight) {
  const normalizedWidth = Number(imageWidth) || 0;
  const normalizedHeight = Number(imageHeight) || 0;
  const cropSize = Math.max(0, Math.min(normalizedWidth, normalizedHeight));
  const offsetX = Math.max(0, Math.floor((normalizedWidth - cropSize) / 2));
  const offsetY = Math.max(0, Math.floor((normalizedHeight - cropSize) / 2));

  return {
    imageWidth: normalizedWidth,
    imageHeight: normalizedHeight,
    cropSize,
    offsetX,
    offsetY,
  };
}

function getCropSizeRange(cropState) {
  const imageWidth = Number(cropState?.imageWidth) || 0;
  const imageHeight = Number(cropState?.imageHeight) || 0;
  const maxZoom = Math.max(1, Number(cropState?.maxZoom) || 4);
  const maxCropSize = Math.max(0, Math.min(imageWidth, imageHeight));
  const minCropSize = maxCropSize > 0 ? Math.max(1, maxCropSize / maxZoom) : 0;

  return {
    minCropSize: normalizeDecimal(minCropSize),
    maxCropSize: normalizeDecimal(maxCropSize),
  };
}

function clampCropSize(cropState, nextCropSize) {
  const { minCropSize, maxCropSize } = getCropSizeRange(cropState);

  return normalizeDecimal(Math.min(Math.max(Number(nextCropSize) || 0, minCropSize), maxCropSize));
}

function clampCropOffset(cropState, nextOffsetX, nextOffsetY) {
  const imageWidth = Number(cropState?.imageWidth) || 0;
  const imageHeight = Number(cropState?.imageHeight) || 0;
  const cropSize = Number(cropState?.cropSize) || 0;
  const maxOffsetX = Math.max(0, imageWidth - cropSize);
  const maxOffsetY = Math.max(0, imageHeight - cropSize);

  return {
    offsetX: normalizeDecimal(Math.min(Math.max(0, Number(nextOffsetX) || 0), maxOffsetX)),
    offsetY: normalizeDecimal(Math.min(Math.max(0, Number(nextOffsetY) || 0), maxOffsetY)),
  };
}

function getCropStateAfterScale(cropState, scaleOptions) {
  const cropSize = Number(cropState?.cropSize) || 0;
  const offsetX = Number(cropState?.offsetX) || 0;
  const offsetY = Number(cropState?.offsetY) || 0;
  const viewportSize = Number(scaleOptions?.viewportSize) || 0;
  const centerX = Number(scaleOptions?.centerX) || 0;
  const centerY = Number(scaleOptions?.centerY) || 0;
  const nextCropSize = clampCropSize(cropState, scaleOptions?.nextCropSize);

  if (!cropSize || !viewportSize || !nextCropSize) {
    return {
      cropSize: nextCropSize,
      offsetX,
      offsetY,
    };
  }

  const normalizedCenterX = Math.min(Math.max(centerX, 0), viewportSize);
  const normalizedCenterY = Math.min(Math.max(centerY, 0), viewportSize);
  const centerRatioX = normalizedCenterX / viewportSize;
  const centerRatioY = normalizedCenterY / viewportSize;
  const sourceCenterX = offsetX + cropSize * centerRatioX;
  const sourceCenterY = offsetY + cropSize * centerRatioY;
  const nextOffset = clampCropOffset(
    {
      imageWidth: cropState?.imageWidth,
      imageHeight: cropState?.imageHeight,
      cropSize: nextCropSize,
    },
    sourceCenterX - nextCropSize * centerRatioX,
    sourceCenterY - nextCropSize * centerRatioY,
  );

  return {
    cropSize: nextCropSize,
    offsetX: nextOffset.offsetX,
    offsetY: nextOffset.offsetY,
  };
}

function buildNineGridSlices(cropState) {
  const cropSize = Number(cropState?.cropSize) || 0;
  const offsetX = Number(cropState?.offsetX) || 0;
  const offsetY = Number(cropState?.offsetY) || 0;
  const sourceSize = cropSize / 3;

  return Array.from({ length: 9 }, (_, index) => {
    const row = Math.floor(index / 3);
    const column = index % 3;

    return {
      index,
      row,
      column,
      sourceX: offsetX + column * sourceSize,
      sourceY: offsetY + row * sourceSize,
      sourceSize,
    };
  });
}

module.exports = {
  clampCropOffset,
  clampCropSize,
  createDefaultSquareCrop,
  buildNineGridSlices,
  getCropSizeRange,
  getCropStateAfterScale,
};
