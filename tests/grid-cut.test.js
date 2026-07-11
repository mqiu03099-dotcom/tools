const test = require("node:test");
const assert = require("node:assert/strict");

const {
  clampCropOffset,
  clampCropSize,
  createDefaultSquareCrop,
  buildNineGridSlices,
  getCropStateAfterScale,
} = require("../utils/grid-cut");

test("createDefaultSquareCrop uses the shorter side as square size", () => {
  assert.deepEqual(
    createDefaultSquareCrop(1080, 1350),
    {
      imageWidth: 1080,
      imageHeight: 1350,
      cropSize: 1080,
      offsetX: 0,
      offsetY: 135,
    },
  );

  assert.deepEqual(
    createDefaultSquareCrop(1600, 900),
    {
      imageWidth: 1600,
      imageHeight: 900,
      cropSize: 900,
      offsetX: 350,
      offsetY: 0,
    },
  );
});

test("clampCropOffset keeps crop offsets within image bounds", () => {
  assert.deepEqual(
    clampCropOffset(
      {
        imageWidth: 1600,
        imageHeight: 900,
        cropSize: 900,
      },
      -20,
      80,
    ),
    {
      offsetX: 0,
      offsetY: 0,
    },
  );

  assert.deepEqual(
    clampCropOffset(
      {
        imageWidth: 1600,
        imageHeight: 900,
        cropSize: 900,
      },
      999,
      120,
    ),
    {
      offsetX: 700,
      offsetY: 0,
    },
  );
});

test("buildNineGridSlices splits the cropped square into 9 equal slices", () => {
  const slices = buildNineGridSlices({
    cropSize: 900,
    offsetX: 150,
    offsetY: 60,
  });

  assert.equal(slices.length, 9);
  assert.deepEqual(slices[0], {
    index: 0,
    row: 0,
    column: 0,
    sourceX: 150,
    sourceY: 60,
    sourceSize: 300,
  });
  assert.deepEqual(slices[4], {
    index: 4,
    row: 1,
    column: 1,
    sourceX: 450,
    sourceY: 360,
    sourceSize: 300,
  });
  assert.deepEqual(slices[8], {
    index: 8,
    row: 2,
    column: 2,
    sourceX: 750,
    sourceY: 660,
    sourceSize: 300,
  });
});

test("clampCropSize limits visible crop size within zoom range", () => {
  assert.equal(
    clampCropSize(
      {
        imageWidth: 1600,
        imageHeight: 900,
      },
      1200,
    ),
    900,
  );

  assert.equal(
    clampCropSize(
      {
        imageWidth: 1600,
        imageHeight: 900,
        maxZoom: 4,
      },
      120,
    ),
    225,
  );
});

test("getCropStateAfterScale keeps the pinch center stable while zooming", () => {
  const nextState = getCropStateAfterScale(
    {
      imageWidth: 1600,
      imageHeight: 900,
      cropSize: 900,
      offsetX: 350,
      offsetY: 0,
      maxZoom: 4,
    },
    {
      viewportSize: 300,
      centerX: 150,
      centerY: 150,
      nextCropSize: 450,
    },
  );

  assert.deepEqual(nextState, {
    cropSize: 450,
    offsetX: 575,
    offsetY: 225,
  });
});
