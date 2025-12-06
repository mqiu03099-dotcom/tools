export const useWebName = () => {
  const webName = useRuntimeConfig().public.webName;

  return webName;
};
