import { randomBytes } from "node:crypto";
import { access, mkdir, readFile, writeFile } from "node:fs/promises";
import path from "node:path";

const REMOTE_BASE_URL = "https://toolsbox.vip";
const PUBLIC_DIR = path.resolve(process.cwd(), "public");
const AVATAR_JSON_PATH = path.join(PUBLIC_DIR, "avatar.json");

const CONTENT_TYPE_EXTENSION_MAP = {
  "image/gif": ".gif",
  "image/jpeg": ".jpg",
  "image/jpg": ".jpg",
  "image/png": ".png",
  "image/webp": ".webp",
};

export function getPublicDir() {
  return PUBLIC_DIR;
}

export function getAvatarJsonPath() {
  return AVATAR_JSON_PATH;
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

export function createTimestampFileName(timestamp, extension) {
  return `${timestamp}${extension}`;
}

export function validateJsonText(content) {
  JSON.parse(content);
}

export async function readAvatarJsonText() {
  return readFile(AVATAR_JSON_PATH, "utf8");
}

export async function saveAvatarJsonText(content) {
  validateJsonText(content);
  await writeFile(AVATAR_JSON_PATH, `${content.trim()}\n`, "utf8");
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

export function resolveImageExtension({ fileName = "", contentType = "" }) {
  const fileNameExtension = getExtensionFromFileName(fileName);
  if (fileNameExtension) {
    return fileNameExtension;
  }

  const contentTypeExtension = getExtensionFromContentType(contentType);
  if (contentTypeExtension) {
    return contentTypeExtension;
  }

  throw new Error("无法识别图片扩展名");
}

export async function saveImageBuffer({ buffer, fileName = "", contentType = "" }) {
  if (!buffer || buffer.length === 0) {
    throw new Error("图片内容为空");
  }

  const extension = resolveImageExtension({ fileName, contentType });
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
