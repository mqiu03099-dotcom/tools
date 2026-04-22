export function getAssetTitleOptions(jsonText) {
  const data = JSON.parse(jsonText);

  if (!Array.isArray(data)) {
    return [];
  }

  return data
    .map((item) => item?.title)
    .filter((title) => typeof title === "string" && title.trim())
    .map((title) => title.trim());
}

export function appendRemoteUrlToTitle({ jsonText, selectedTitle, remoteUrl }) {
  const data = JSON.parse(jsonText);

  if (!Array.isArray(data)) {
    throw new Error("JSON 顶层必须是数组");
  }

  if (!selectedTitle) {
    throw new Error("请先选择要追加的 title");
  }

  if (!remoteUrl) {
    throw new Error("请先生成远程 URL");
  }

  const target = data.find((item) => item?.title === selectedTitle);

  if (!target) {
    throw new Error("未找到选中的 title");
  }

  if (!Array.isArray(target.items)) {
    target.items = [];
  }

  target.items.unshift(remoteUrl);

  return JSON.stringify(data, null, 2);
}
