import { saveImageBuffer, validateImageContentType } from "../../utils/avatar-storage.mjs";

export default defineEventHandler(async (event) => {
  const formData = await readMultipartFormData(event);
  const file = formData?.find((item) => item.name === "file");

  if (!file?.data?.length) {
    throw createError({
      statusCode: 400,
      statusMessage: "请先选择图片文件",
    });
  }

  if (!validateImageContentType(file.type || "")) {
    throw createError({
      statusCode: 400,
      statusMessage: "仅支持图片文件上传",
    });
  }

  try {
    return await saveImageBuffer({
      buffer: file.data,
      fileName: file.filename || "",
      contentType: file.type || "",
    });
  } catch (error) {
    throw createError({
      statusCode: 400,
      statusMessage: error instanceof Error ? error.message : "图片上传失败",
    });
  }
});
