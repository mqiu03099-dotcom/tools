import type { Menu } from "./type";
import robot from "../articles/robot.json";
import ai from "../articles/ai.json";
import json from "../articles/json.json";

export const articles: Menu[] = [
  {
    name: "Articles",
    children: [json, robot, ai],
    icon: "📚",
  },
];
