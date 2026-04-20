import { saveImageBuffer, validateImageContentType } from "../../utils/avatar-storage.mjs";

export default defineEventHandler(async (event) => {
  const body = await readBody<{ url?: string }>(event);
  const sourceUrl = body?.url?.trim();

  if (!sourceUrl) {
    throw createError({
      statusCode: 400,
      statusMessage: "图片链接不能为空",
    });
  }

  let response: Response;

  try {
    response = await fetch(sourceUrl);
  } catch (error) {
    throw createError({
      statusCode: 400,
      statusMessage: error instanceof Error ? error.message : "图片下载失败",
    });
  }

  if (!response.ok) {
    throw createError({
      statusCode: 400,
      statusMessage: `图片下载失败：HTTP ${response.status}`,
    });
  }

  const contentType = response.headers.get("content-type") || "";
  if (!validateImageContentType(contentType)) {
    throw createError({
      statusCode: 400,
      statusMessage: "远程链接不是可识别的图片类型",
    });
  }

  try {
    const arrayBuffer = await response.arrayBuffer();

    return await saveImageBuffer({
      buffer: Buffer.from(arrayBuffer),
      fileName: new URL(sourceUrl).pathname,
      contentType,
    });
  } catch (error) {
    throw createError({
      statusCode: 400,
      statusMessage: error instanceof Error ? error.message : "远程图片保存失败",
    });
  }
});
