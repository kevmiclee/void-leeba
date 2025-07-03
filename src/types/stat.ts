import { SceneId } from "@/data/story/story";

export type StatId =
  | "health"
  | "blueMagic"
  | "will"
  | "shitheadedness"
  | "athletics";

export type Stat = {
  id: StatId;
  value: number;
  scenesGained: SceneId[];
  scenesLost: SceneId[];
};
