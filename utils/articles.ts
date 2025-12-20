import type { Menu } from "./type";
import robot from "../articles/robot.json";
import ai from "../articles/ai.json";

export const articles: Menu[] = [
  {
    name: "Articles",
    children: [robot, ai],
    icon: "icon-wanyouxi",
  },
];

