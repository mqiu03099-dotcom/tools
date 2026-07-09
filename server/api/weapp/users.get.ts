import { getQuery } from "h3";
import { getUserProfilePage } from "../../services/userProfile";
import { defineApiHandler } from "../../utils/apiHandler";
import { apiSuccess } from "../../utils/apiResponse";
import { withDbClient } from "../../utils/db";

export default defineApiHandler(async (event) => {
  const query = getQuery(event);
  const userId = Number(query.userId);
  const page = Number(query.page);
  const pageSize = Number(query.pageSize);
  const result = await withDbClient((client) => getUserProfilePage({
    client,
    userId,
    page,
    pageSize
  }));

  return apiSuccess(result.data, "获取用户信息成功", result.page);
});
