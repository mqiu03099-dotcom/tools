const test = require("node:test");
const assert = require("node:assert/strict");

const {
  normalizeMediaPages,
  buildMediaRenderState,
} = require("../utils/media-page");

test("normalizeMediaPages filters invalid values and keeps only non-empty string pages", () => {
  assert.deepEqual(normalizeMediaPages(null), []);
  assert.deepEqual(normalizeMediaPages(["https://x.jpg"]), []);
  assert.deepEqual(
    normalizeMediaPages([
      [{ url: "https://a.jpg", width: 100, height: 200 }, "", null, { url: "https://b.jpg", width: 300, height: 150 }],
      "invalid",
      [],
      [{ url: "https://c.jpg", width: 240, height: 320 }],
    ]),
    [
      [
        { url: "https://a.jpg", width: 100, height: 200 },
        { url: "https://b.jpg", width: 300, height: 150 },
      ],
      [{ url: "https://c.jpg", width: 240, height: 320 }],
    ],
  );
});

test("normalizeMediaPages accepts object items with url and dimensions", () => {
  assert.deepEqual(
    normalizeMediaPages([
      [
        { url: "https://a.jpg", width: 100, height: 200 },
        { url: "", width: 1, height: 1 },
        { url: "https://b.jpg", width: 300, height: 300 },
        { url: "https://c.jpg", width: 0, height: 20 },
      ],
    ]),
    [[
      { url: "https://a.jpg", width: 100, height: 200 },
      { url: "https://b.jpg", width: 300, height: 300 },
    ]],
  );
});

test("buildMediaRenderState only expands the requested number of pages", () => {
  const state = buildMediaRenderState(
    [
      [
        { url: "https://1.jpg", width: 100, height: 120 },
        { url: "https://2.jpg", width: 100, height: 120 },
      ],
      [{ url: "https://3.jpg", width: 100, height: 120 }],
      [{ url: "https://4.jpg", width: 100, height: 120 }],
    ],
    2,
  );

  assert.equal(state.loadedPageCount, 2);
  assert.equal(state.hasMorePages, true);
  assert.deepEqual(
    state.items.map((item) => item.image),
    ["https://1.jpg", "https://2.jpg", "https://3.jpg"],
  );
});

test("buildMediaRenderState splits visible items into left and right columns by index", () => {
  const state = buildMediaRenderState(
    [[
      { url: "https://1.jpg", width: 100, height: 100 },
      { url: "https://2.jpg", width: 100, height: 100 },
      { url: "https://3.jpg", width: 100, height: 100 },
      { url: "https://4.jpg", width: 100, height: 100 },
    ]],
    1,
  );

  assert.deepEqual(
    state.leftItems.map((item) => item.image),
    ["https://1.jpg", "https://3.jpg"],
  );
  assert.deepEqual(
    state.rightItems.map((item) => item.image),
    ["https://2.jpg", "https://4.jpg"],
  );
  assert.deepEqual(
    state.items.map((item) => item.key),
    ["media-0-0", "media-0-1", "media-0-2", "media-0-3"],
  );
});

test("buildMediaRenderState computes paddingTop from image dimensions", () => {
  const state = buildMediaRenderState(
    [[
      { url: "https://1.jpg", width: 200, height: 400 },
      { url: "https://2.jpg", width: 300, height: 450 },
    ]],
    1,
  );

  assert.equal(state.items[0].image, "https://1.jpg");
  assert.equal(state.items[0].paddingTop, "200%");
  assert.equal(state.items[1].paddingTop, "150%");
  assert.equal(state.items[1].width, 300);
  assert.equal(state.items[1].height, 450);
});

test("buildMediaRenderState preserves loaded image state for existing items when appending pages", () => {
  const state = buildMediaRenderState(
    [
      [{ url: "https://1.jpg", width: 100, height: 120 }],
      [{ url: "https://2.jpg", width: 100, height: 120 }],
    ],
    2,
    {
      "media-0-0": false,
    },
  );

  assert.equal(state.items[0].key, "media-0-0");
  assert.equal(state.items[0].isImageLoading, false);
  assert.equal(state.items[1].key, "media-1-0");
  assert.equal(state.items[1].isImageLoading, true);
});
