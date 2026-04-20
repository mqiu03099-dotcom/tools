import { getRouterParam } from "h3";

import { readAssetJsonText } from "../../../utils/avatar-storage.mjs";

export default defineEventHandler(async (event) => {
  const kind = getRouterParam(event, "kind");

  if (!kind) {
    throw createError({
      statusCode: 400,
      statusMessage: "素材类型不能为空",
    });
  }

  try {
    const content = await readAssetJsonText(kind);

    return {
      content,
    };
  } catch (error) {
    throw createError({
      statusCode: 400,
      statusMessage: error instanceof Error ? error.message : "读取 JSON 失败",
    });
  }
});
