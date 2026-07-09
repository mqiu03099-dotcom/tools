import { getQuery } from "h3";
import { getUserProfileById } from "../../services/userProfile";
import { defineApiHandler } from "../../utils/apiHandler";
import { apiSuccess } from "../../utils/apiResponse";
import { withDbClient } from "../../utils/db";

export default defineApiHandler(async (event) => {
  const query = getQuery(event);
  const userId = Number(query.userId);
  const user = await withDbClient((client) => getUserProfileById({
    client,
    userId
  }));

  return apiSuccess(user, "获取用户信息成功");
});
