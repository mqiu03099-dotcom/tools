const ADMIN_STATIC_BASE_URL = "http://127.0.0.1:3004";

function trimEndSlash(value) {
  return value.replace(/\/+$/, "");
}

function normalizeStaticPath(path) {
  if (!path) {
    return "";
  }

  if (/^https?:\/\//.test(path)) {
    return path;
  }

  return path.startsWith("/") ? path : `/${path}`;
}

function buildStaticResourceUrl(path) {
  const normalizedPath = normalizeStaticPath(path);

  if (!normalizedPath || /^https?:\/\//.test(normalizedPath)) {
    return normalizedPath;
  }

  return `${trimEndSlash(ADMIN_STATIC_BASE_URL)}${normalizedPath}`;
}

function buildStaticJsonUrl(fileName) {
  return buildStaticResourceUrl(`/json/${fileName}`);
}

module.exports = {
  ADMIN_STATIC_BASE_URL,
  buildStaticJsonUrl,
  buildStaticResourceUrl,
};
