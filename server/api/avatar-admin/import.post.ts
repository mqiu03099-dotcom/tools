import { saveMediaBuffer, validateMediaContentType } from "../../utils/avatar-storage.mjs";

export default defineEventHandler(async (event) => {
  const body = await readBody<{ url?: string; mediaKind?: string }>(event);
  const sourceUrl = body?.url?.trim();
  const mediaKind = body?.mediaKind || "image";

  if (!sourceUrl) {
    throw createError({
      statusCode: 400,
      statusMessage: mediaKind === "audio" ? "音频链接不能为空" : "图片链接不能为空",
    });
  }

  let response: Response;

  try {
    response = await fetch(sourceUrl);
  } catch (error) {
    throw createError({
      statusCode: 400,
      statusMessage: error instanceof Error ? error.message : "文件下载失败",
    });
  }

  if (!response.ok) {
    throw createError({
      statusCode: 400,
      statusMessage: `文件下载失败：HTTP ${response.status}`,
    });
  }

  const contentType = response.headers.get("content-type") || "";
  if (!validateMediaContentType(contentType, mediaKind)) {
    throw createError({
      statusCode: 400,
      statusMessage: mediaKind === "audio" ? "远程链接不是可识别的音频类型" : "远程链接不是可识别的图片类型",
    });
  }

  try {
    const arrayBuffer = await response.arrayBuffer();

    return await saveMediaBuffer({
      buffer: Buffer.from(arrayBuffer),
      fileName: new URL(sourceUrl).pathname,
      contentType,
      mediaKind,
    });
  } catch (error) {
    throw createError({
      statusCode: 400,
      statusMessage: error instanceof Error ? error.message : "远程文件保存失败",
    });
  }
});
