import type { Menu } from "./type";
import aiRobots from "../articles/ai-robots.json";
import aiTools from "../articles/ai.json";

export const articles: Menu[] = [
  {
    name: "Articles",
    children: [aiRobots, aiTools],
  },
];

