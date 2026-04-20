import { getRouterParam } from "h3";

import { saveAssetJsonText } from "../../../utils/avatar-storage.mjs";

export default defineEventHandler(async (event) => {
  const kind = getRouterParam(event, "kind");
  const body = await readBody<{ content?: string }>(event);
  const content = body?.content?.trim();

  if (!kind) {
    throw createError({
      statusCode: 400,
      statusMessage: "素材类型不能为空",
    });
  }

  if (!content) {
    throw createError({
      statusCode: 400,
      statusMessage: "JSON 内容不能为空",
    });
  }

  try {
    await saveAssetJsonText(kind, content);
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
