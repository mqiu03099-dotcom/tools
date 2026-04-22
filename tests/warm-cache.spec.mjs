import test from "node:test";
import assert from "node:assert/strict";
import { mkdtemp, mkdir, writeFile } from "node:fs/promises";
import { join } from "node:path";
import { tmpdir } from "node:os";

import {
  collectCacheableAssets,
  createWarmCacheUrls,
  warmCacheUrls,
} from "../scripts/warm-cache.mjs";

test("collectCacheableAssets includes static resources and excludes html and payload data", async () => {
  const publicDir = await mkdtemp(join(tmpdir(), "warm-cache-"));
  await mkdir(join(publicDir, "_nuxt"), { recursive: true });
  await mkdir(join(publicDir, "audio"), { recursive: true });
  await writeFile(join(publicDir, "2.mp3"), "");
  await writeFile(join(publicDir, "avatar.json"), "");
  await writeFile(join(publicDir, "logo.png"), "");
  await writeFile(join(publicDir, "_nuxt", "entry.abc123.js"), "");
  await writeFile(join(publicDir, "_nuxt", "index.abc123.css"), "");
  await writeFile(join(publicDir, "audio", "_payload.json"), "");
  await writeFile(join(publicDir, "audio", "index.html"), "");
  await writeFile(join(publicDir, "_headers"), "");

  const assets = await collectCacheableAssets(publicDir);

  assert.deepEqual(
    new Set(assets),
    new Set([
      "/2.mp3",
      "/_nuxt/entry.abc123.js",
      "/_nuxt/index.abc123.css",
      "/avatar.json",
      "/logo.png",
    ]),
  );
});

test("createWarmCacheUrls builds absolute urls from asset paths", () => {
  assert.deepEqual(createWarmCacheUrls("https://toolsbox.vip/", ["/2.mp3", "/_nuxt/app.js"]), [
    "https://toolsbox.vip/2.mp3",
    "https://toolsbox.vip/_nuxt/app.js",
  ]);
});

test("warmCacheUrls sends HEAD requests with bounded concurrency", async () => {
  const calls = [];
  const activeCounts = [];
  let active = 0;
  const fetcher = async (url, init) => {
    active += 1;
    activeCounts.push(active);
    calls.push([url, init.method]);
    await new Promise((resolve) => setTimeout(resolve, 10));
    active -= 1;
    return { ok: true, status: 200, headers: new Map([["cf-cache-status", "HIT"]]) };
  };

  const result = await warmCacheUrls(["https://a.test/1.mp3", "https://a.test/2.mp4"], {
    concurrency: 1,
    fetcher,
  });

  assert.deepEqual(calls, [
    ["https://a.test/1.mp3", "HEAD"],
    ["https://a.test/2.mp4", "HEAD"],
  ]);
  assert.equal(Math.max(...activeCounts), 1);
  assert.equal(result.ok, 2);
  assert.equal(result.failed, 0);
});
