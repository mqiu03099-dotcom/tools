const { RESOURCE_LINKS } = require("./resource-links.js");

const HOME_TOOL_ACTIONS = [
  {
    id: "gridCut",
    label: "九宫格切图",
    icon: RESOURCE_LINKS.wechartImageUrl,
    pageUrl: "/pages/grid-cut/grid-cut",
  },
  {
    id: "shapeCut",
    label: "图片裁剪",
    icon: RESOURCE_LINKS.shapeCutImageUrl,
    pageUrl: "/pages/shape-cut/shape-cut",
  },
  {
    id: "feedback",
    label: "反馈",
    icon: RESOURCE_LINKS.msgImageUrl,
    pageUrl: "/pages/feedback/feedback",
  },
  {
    id: "notice",
    label: "公告",
    icon: RESOURCE_LINKS.noticeImageUrl,
    pageUrl: "/pages/notice/notice",
  },
];

module.exports = {
  HOME_TOOL_ACTIONS,
};
