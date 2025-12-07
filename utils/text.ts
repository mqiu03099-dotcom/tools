const wordSeparator = /[-_]+/g;

const capitalize = (value: string) => {
  if (!value) return "";
  return value.charAt(0).toUpperCase() + value.slice(1);
};

export const slugToTitle = (value?: string) => {
  if (!value) return "";
  return value
    .replace(wordSeparator, " ")
    .split(" ")
    .filter(Boolean)
    .map((word) => capitalize(word.toLowerCase()))
    .join(" ");
};

export const listPreview = (items: string[] = [], max = 3) => {
  const preview = items.filter(Boolean).slice(0, max);
  return preview.join(", ");
};

