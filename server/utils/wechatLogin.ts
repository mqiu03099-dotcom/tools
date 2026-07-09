import { useRuntimeConfig } from "#imports";
import { getWechatOpenidByFetcher } from "./wechatCodeSession";

export async function getWechatOpenid(code: string) {
  const config = useRuntimeConfig();

  return getWechatOpenidByFetcher({
    code,
    appid: config.wechatAppId,
    secret: config.wechatAppSecret,
    fetcher: $fetch
  });
}
