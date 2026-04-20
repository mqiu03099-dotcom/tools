import { saveAvatarJsonText } from "../../utils/avatar-storage.mjs";

export default defineEventHandler(async (event) => {
  const body = await readBody<{ content?: string }>(event);
  const content = body?.content?.trim();

  if (!content) {
    throw createError({
      statusCode: 400,
      statusMessage: "JSON 内容不能为空",
    });
  }

  try {
    await saveAvatarJsonText(content);
  } catch (error) {
    throw createError({
      statusCode: 400,
      statusMessage: error instanceof Error ? error.message : "JSON 保存失败",
    });
  }

  return {
    success: true,
  };
});
