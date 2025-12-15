export default defineNuxtRouteMiddleware(async () => {
  if (!import.meta.server) return;
  const event = useRequestEvent();
  if (!event) return;
  const { siteName } = useRuntimeConfig().public;
  const redirectHost: string[] = [""]; // 需要被重定向的域名
  const { host, pathname } = useRequestURL();
  if (redirectHost.includes(host)) {
    event.node.res.writeHead(301, { Location: `https://${siteName}${pathname}` });
    event.node.res.end();
    return;
  }
});

