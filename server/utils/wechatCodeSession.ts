interface WechatCodeSessionResponse {
  openid?: string;
  errcode?: number;
  errmsg?: string;
}

interface WechatCodeSessionOptions {
  code: string;
  appid: string;
  secret: string;
  fetcher: <T>(url: string, options: object) => Promise<T>;
}

function parseWechatCodeSessionResponse(result: unknown): WechatCodeSessionResponse {
  if (typeof result !== "string") {
    return result as WechatCodeSessionResponse;
  }

  try {
    return JSON.parse(result) as WechatCodeSessionResponse;
  } catch {
    return {};
  }
}

function createWechatLoginError(result: WechatCodeSessionResponse) {
  if (result.errmsg && result.errcode) {
    return new Error(`微信登录失败：${result.errmsg}（${result.errcode}）`);
  }

  if (result.errmsg) {
    return new Error(`微信登录失败：${result.errmsg}`);
  }

  if (result.errcode) {
    return new Error(`微信登录失败：${result.errcode}`);
  }

  return new Error("微信登录失败");
}

export async function getWechatOpenidByFetcher(options: WechatCodeSessionOptions) {
  const fetchResult = await options.fetcher<WechatCodeSessionResponse | string>(
    "https://api.weixin.qq.com/sns/jscode2session",
    {
      query: {
        appid: options.appid,
        secret: options.secret,
        js_code: options.code,
        grant_type: "authorization_code"
      }
    }
  );
  const result = parseWechatCodeSessionResponse(fetchResult);

  if (!result.openid) {
    throw createWechatLoginError(result);
  }

  return result.openid;
}
