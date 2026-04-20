import test from "node:test";
import assert from "node:assert/strict";

import {
  createTimestampFileName,
  ensureUniqueFileName,
  getExtensionFromContentType,
  getExtensionFromFileName,
  validateJsonText,
} from "../server/utils/avatar-storage.mjs";

test("getExtensionFromFileName returns lower-case extension with dot", () => {
  assert.equal(getExtensionFromFileName("demo.JPG"), ".jpg");
  assert.equal(getExtensionFromFileName("avatar.webp"), ".webp");
});

test("getExtensionFromContentType maps common image types", () => {
  assert.equal(getExtensionFromContentType("image/jpeg"), ".jpg");
  assert.equal(getExtensionFromContentType("image/png; charset=utf-8"), ".png");
  assert.equal(getExtensionFromContentType("image/webp"), ".webp");
});

test("createTimestampFileName uses timestamp and extension", () => {
  assert.equal(createTimestampFileName(1713612345678, ".png"), "1713612345678.png");
});

test("ensureUniqueFileName appends suffix when collision exists", async () => {
  const exists = async (name) => name === "1713612345678.jpg";

  const fileName = await ensureUniqueFileName("1713612345678.jpg", exists, "abcd");

  assert.equal(fileName, "1713612345678-abcd.jpg");
});

test("validateJsonText accepts valid JSON and rejects invalid JSON", () => {
  assert.doesNotThrow(() => validateJsonText('[{"title":"test","items":[]}]'));
  assert.throws(() => validateJsonText('{"title": }'), /Unexpected token/);
});
