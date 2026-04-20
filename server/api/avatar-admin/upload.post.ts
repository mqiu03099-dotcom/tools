import { saveMediaBuffer, validateMediaContentType } from "../../utils/avatar-storage.mjs";

export default defineEventHandler(async (event) => {
  const formData = await readMultipartFormData(event);
  const file = formData?.find((item) => item.name === "file");
  const mediaKind = formData?.find((item) => item.name === "mediaKind")?.data?.toString() || "image";

  if (!file?.data?.length) {
    throw createError({
      statusCode: 400,
      statusMessage: mediaKind === "audio" ? "请先选择音频文件" : "请先选择图片文件",
    });
  }

  if (!validateMediaContentType(file.type || "", mediaKind)) {
    throw createError({
      statusCode: 400,
      statusMessage: mediaKind === "audio" ? "仅支持音频文件上传" : "仅支持图片文件上传",
    });
  }

  try {
    return await saveMediaBuffer({
      buffer: file.data,
      fileName: file.filename || "",
      contentType: file.type || "",
      mediaKind,
    });
  } catch (error) {
    throw createError({
      statusCode: 400,
      statusMessage: error instanceof Error ? error.message : "文件上传失败",
    });
  }
});
