import { readBody } from "h3";
import { loginByWechatCode } from "../../services/weappLogin";
import { defineApiHandler } from "../../utils/apiHandler";
import { apiSuccess } from "../../utils/apiResponse";
import { withDbClient } from "../../utils/db";
import { getWechatOpenid } from "../../utils/wechatLogin";

interface WeappLoginBody {
  code?: string;
}

export default defineApiHandler(async (event) => {
  const body = await readBody<WeappLoginBody>(event);
  const user = await withDbClient((client) => loginByWechatCode({
    code: body.code ?? "",
    client,
    getOpenid: getWechatOpenid
  }));

  return apiSuccess(user, "登录成功");
});
