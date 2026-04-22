import { readdir, stat } from "node:fs/promises";
import { resolve, relative, sep } from "node:path";
import { fileURLToPath } from "node:url";

const CACHEABLE_EXTENSIONS = new Set([
  ".css",
  ".gif",
  ".ico",
  ".jpeg",
  ".jpg",
  ".json",
  ".js",
  ".mp3",
  ".mp4",
  ".png",
  ".svg",
  ".ttf",
  ".webp",
  ".woff",
  ".woff2",
]);

const DEFAULT_PUBLIC_DIR = ".output/public";
const DEFAULT_CONCURRENCY = 8;

function normalizeAssetPath(filePath, publicDir) {
  return `/${relative(publicDir, filePath).split(sep).join("/")}`;
}

function isCacheableAsset(assetPath) {
  const lowerPath = assetPath.toLowerCase();

  if (lowerPath.endsWith("/_payload.json") || lowerPath.startsWith("/_nuxt/builds/")) {
    return false;
  }

  const lastDot = lowerPath.lastIndexOf(".");

  if (lastDot === -1) {
    return false;
  }

  return CACHEABLE_EXTENSIONS.has(lowerPath.slice(lastDot));
}

export async function collectCacheableAssets(publicDir = DEFAULT_PUBLIC_DIR) {
  const absolutePublicDir = resolve(publicDir);
  const assets = [];

  async function walk(directory) {
    const entries = await readdir(directory, { withFileTypes: true });

    for (const entry of entries) {
      const fullPath = resolve(directory, entry.name);

      if (entry.isDirectory()) {
        await walk(fullPath);
        continue;
      }

      if (!entry.isFile()) {
        continue;
      }

      const assetPath = normalizeAssetPath(fullPath, absolutePublicDir);
      if (isCacheableAsset(assetPath)) {
        assets.push(assetPath);
      }
    }
  }

  await stat(absolutePublicDir);
  await walk(absolutePublicDir);

  return assets.sort((a, b) => a.localeCompare(b));
}

export function createWarmCacheUrls(origin, assetPaths) {
  const baseUrl = new URL(origin);

  return assetPaths.map((assetPath) => new URL(assetPath, baseUrl).toString());
}

function getHeader(headers, name) {
  if (!headers) {
    return "";
  }

  if (typeof headers.get === "function") {
    return headers.get(name) || "";
  }

  return headers[name] || headers[name.toLowerCase()] || "";
}

export async function warmCacheUrls(urls, options = {}) {
  const concurrency = Math.max(1, Number(options.concurrency || DEFAULT_CONCURRENCY));
  const fetcher = options.fetcher || fetch;
  const results = [];
  let nextIndex = 0;

  async function worker() {
    while (nextIndex < urls.length) {
      const currentIndex = nextIndex;
      nextIndex += 1;
      const url = urls[currentIndex];

      try {
        const response = await fetcher(url, {
          method: "HEAD",
          redirect: "follow",
        });

        results[currentIndex] = {
          cacheStatus: getHeader(response.headers, "cf-cache-status"),
          ok: response.ok,
          status: response.status,
          url,
        };
      } catch (error) {
        results[currentIndex] = {
          error: error instanceof Error ? error.message : String(error),
          ok: false,
          status: 0,
          url,
        };
      }
    }
  }

  const workers = Array.from({ length: Math.min(concurrency, urls.length) }, () => worker());
  await Promise.all(workers);

  const failedResults = results.filter((result) => !result.ok);

  return {
    failed: failedResults.length,
    failedResults,
    ok: results.length - failedResults.length,
    results,
    total: results.length,
  };
}

function parseArgs(argv) {
  const args = {
    concurrency: DEFAULT_CONCURRENCY,
    limit: 0,
    origin: "",
    publicDir: DEFAULT_PUBLIC_DIR,
  };

  for (let index = 0; index < argv.length; index += 1) {
    const arg = argv[index];

    if (arg === "--public-dir") {
      args.publicDir = argv[index + 1];
      index += 1;
      continue;
    }

    if (arg === "--concurrency") {
      args.concurrency = Number(argv[index + 1]);
      index += 1;
      continue;
    }

    if (arg === "--limit") {
      args.limit = Number(argv[index + 1]);
      index += 1;
      continue;
    }

    if (!args.origin) {
      args.origin = arg;
    }
  }

  return args;
}

async function main() {
  const args = parseArgs(process.argv.slice(2));

  if (!args.origin) {
    console.error("Usage: node scripts/warm-cache.mjs <origin> [--public-dir .output/public]");
    process.exitCode = 1;
    return;
  }

  const assetPaths = await collectCacheableAssets(args.publicDir);
  const limitedAssetPaths = args.limit > 0 ? assetPaths.slice(0, args.limit) : assetPaths;
  const urls = createWarmCacheUrls(args.origin, limitedAssetPaths);

  console.log(`Warming ${urls.length} cacheable assets from ${args.origin}`);

  const result = await warmCacheUrls(urls, {
    concurrency: args.concurrency,
  });

  const cacheSummary = result.results.reduce((summary, item) => {
    const key = item.cacheStatus || "UNKNOWN";
    summary[key] = (summary[key] || 0) + 1;
    return summary;
  }, {});

  console.log(`Warm cache finished: ${result.ok}/${result.total} requests succeeded`);
  console.log(`Cloudflare cache status: ${JSON.stringify(cacheSummary)}`);

  if (result.failed > 0) {
    console.error("Failed requests:");
    for (const failedResult of result.failedResults.slice(0, 10)) {
      console.error(
        `- ${failedResult.status} ${failedResult.url} ${failedResult.error || ""}`.trim(),
      );
    }
    process.exitCode = 1;
  }
}

const currentFilePath = fileURLToPath(import.meta.url);
if (process.argv[1] && resolve(process.argv[1]) === currentFilePath) {
  await main();
}
