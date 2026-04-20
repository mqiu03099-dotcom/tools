import { readAvatarJsonText } from "../../utils/avatar-storage.mjs";

export default defineEventHandler(async () => {
  const content = await readAvatarJsonText();

  return {
    content,
  };
});
