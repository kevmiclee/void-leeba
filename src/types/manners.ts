// The cumulative of these determines the player's presenting personality

import { SceneId } from "@/data/story/story";

export type MannersId = "rude" | "depressing" | "polite" | "weird";

export type Manners = {
  id: MannersId;
  value: number;
  scenesGained: SceneId[];
  scenesLost: SceneId[];
};

export const MANNERS_KEYS = [
  "rude",
  "depressing",
  "polite",
  "weird",
] as const satisfies readonly MannersId[];
