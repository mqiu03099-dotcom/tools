import { randomBytes } from "node:crypto";
import { access, mkdir, readFile, writeFile } from "node:fs/promises";
import path from "node:path";

const REMOTE_BASE_URL = "https://toolsbox.vip";
const PUBLIC_DIR = path.resolve(process.cwd(), "public");
const ASSET_JSON_FILE_MAP = {
  avatar: "avatar.json",
  audio: "audio.json",
  emojis: "emojis.json",
  wallpaper: "wallpaper.json",
};

const CONTENT_TYPE_EXTENSION_MAP = {
  "image/gif": ".gif",
  "image/jpeg": ".jpg",
  "image/jpg": ".jpg",
  "image/png": ".png",
  "image/webp": ".webp",
  "audio/aac": ".aac",
  "audio/m4a": ".m4a",
  "audio/mp3": ".mp3",
  "audio/mpeg": ".mp3",
  "audio/ogg": ".ogg",
  "audio/wav": ".wav",
  "audio/webm": ".webm",
  "audio/x-m4a": ".m4a",
  "audio/x-wav": ".wav",
};

export function getPublicDir() {
  return PUBLIC_DIR;
}

export function getAssetJsonFileName(kind) {
  const fileName = ASSET_JSON_FILE_MAP[kind];

  if (!fileName) {
    throw new Error("不支持的素材类型");
  }

  return fileName;
}

export function getAssetJsonPath(kind) {
  return path.join(PUBLIC_DIR, getAssetJsonFileName(kind));
}

export function getAvatarJsonPath() {
  return getAssetJsonPath("avatar");
}

export function getRemoteUrl(fileName) {
  return `${REMOTE_BASE_URL}/${fileName}`;
}

export function getExtensionFromFileName(fileName = "") {
  const extension = path.extname(fileName).toLowerCase();
  return extension || "";
}

export function getExtensionFromContentType(contentType = "") {
  const normalizedType = contentType.split(";")[0].trim().toLowerCase();
  return CONTENT_TYPE_EXTENSION_MAP[normalizedType] || "";
}

export function validateImageContentType(contentType = "") {
  return Boolean(getExtensionFromContentType(contentType));
}

export function validateMediaContentType(contentType = "", mediaKind = "image") {
  const normalizedType = contentType.split(";")[0].trim().toLowerCase();

  if (!normalizedType) {
    return false;
  }

  if (mediaKind === "audio") {
    return normalizedType.startsWith("audio/") && Boolean(getExtensionFromContentType(normalizedType));
  }

  return normalizedType.startsWith("image/") && Boolean(getExtensionFromContentType(normalizedType));
}

export function createTimestampFileName(timestamp, extension) {
  return `${timestamp}${extension}`;
}

export function validateJsonText(content) {
  JSON.parse(content);
}

export async function readAssetJsonText(kind) {
  return readFile(getAssetJsonPath(kind), "utf8");
}

export async function readAvatarJsonText() {
  return readAssetJsonText("avatar");
}

export async function saveAssetJsonText(kind, content) {
  validateJsonText(content);
  await writeFile(getAssetJsonPath(kind), `${content.trim()}\n`, "utf8");
}

export async function saveAvatarJsonText(content) {
  await saveAssetJsonText("avatar", content);
}

export function createRandomSuffix() {
  return randomBytes(2).toString("hex");
}

export async function fileExists(filePath) {
  try {
    await access(filePath);
    return true;
  } catch {
    return false;
  }
}

export async function ensureUniqueFileName(fileName, exists = defaultExists, suffix = createRandomSuffix()) {
  if (!(await exists(fileName))) {
    return fileName;
  }

  const extension = path.extname(fileName);
  const baseName = path.basename(fileName, extension);
  return `${baseName}-${suffix}${extension}`;
}

async function defaultExists(fileName) {
  return fileExists(path.join(PUBLIC_DIR, fileName));
}

export async function ensurePublicDir() {
  await mkdir(PUBLIC_DIR, { recursive: true });
}

export function resolveMediaExtension({ fileName = "", contentType = "", mediaKind = "image" }) {
  const fileNameExtension = getExtensionFromFileName(fileName);
  if (fileNameExtension) {
    return fileNameExtension;
  }

  const contentTypeExtension = getExtensionFromContentType(contentType);
  if (contentTypeExtension) {
    return contentTypeExtension;
  }

  throw new Error(mediaKind === "audio" ? "无法识别音频扩展名" : "无法识别图片扩展名");
}

export function resolveImageExtension({ fileName = "", contentType = "" }) {
  return resolveMediaExtension({ fileName, contentType, mediaKind: "image" });
}

export async function saveMediaBuffer({
  buffer,
  fileName = "",
  contentType = "",
  mediaKind = "image",
}) {
  if (!buffer || buffer.length === 0) {
    throw new Error(mediaKind === "audio" ? "音频内容为空" : "图片内容为空");
  }

  const extension = resolveMediaExtension({ fileName, contentType, mediaKind });
  const timestampName = createTimestampFileName(Date.now(), extension);
  const uniqueName = await ensureUniqueFileName(timestampName);
  const targetPath = path.join(PUBLIC_DIR, uniqueName);

  await ensurePublicDir();
  await writeFile(targetPath, buffer);

  return {
    fileName: uniqueName,
    filePath: targetPath,
    url: getRemoteUrl(uniqueName),
  };
}

export async function saveImageBuffer({ buffer, fileName = "", contentType = "" }) {
  return saveMediaBuffer({ buffer, fileName, contentType, mediaKind: "image" });
}
