import test from "node:test";
import assert from "node:assert/strict";

import { appendRemoteUrlToTitle, getAssetTitleOptions } from "../utils/asset-json.mjs";

test("getAssetTitleOptions returns every object title from JSON array", () => {
  const options = getAssetTitleOptions(
    JSON.stringify([
      { title: "精选头像", items: [] },
      { title: "其它", items: [] },
      { name: "缺少 title" },
    ]),
  );

  assert.deepEqual(options, ["精选头像", "其它"]);
});

test("appendRemoteUrlToTitle inserts remote url at the beginning of selected title items", () => {
  const nextJson = appendRemoteUrlToTitle({
    jsonText: JSON.stringify([
      { title: "精选头像", items: ["https://toolsbox.vip/a.jpg"] },
      { title: "其它", items: ["https://toolsbox.vip/old.jpg"] },
    ]),
    selectedTitle: "其它",
    remoteUrl: "https://toolsbox.vip/new.jpg",
  });

  assert.deepEqual(JSON.parse(nextJson), [
    { title: "精选头像", items: ["https://toolsbox.vip/a.jpg"] },
    { title: "其它", items: ["https://toolsbox.vip/new.jpg", "https://toolsbox.vip/old.jpg"] },
  ]);
});

test("appendRemoteUrlToTitle creates items for audio-style objects", () => {
  const nextJson = appendRemoteUrlToTitle({
    jsonText: JSON.stringify([
      {
        avatar: "https://toolsbox.vip/a.jpg",
        audioSrc: "https://toolsbox.vip/a.mp3",
        title: "哈哈哈哈",
        description: "哈哈哈哈",
      },
    ]),
    selectedTitle: "哈哈哈哈",
    remoteUrl: "https://toolsbox.vip/new.mp3",
  });

  assert.deepEqual(JSON.parse(nextJson), [
    {
      avatar: "https://toolsbox.vip/a.jpg",
      audioSrc: "https://toolsbox.vip/a.mp3",
      title: "哈哈哈哈",
      description: "哈哈哈哈",
      items: ["https://toolsbox.vip/new.mp3"],
    },
  ]);
});
