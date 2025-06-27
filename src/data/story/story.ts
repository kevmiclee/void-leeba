import { introScenes } from "./scenes/intro";
import { homeScenes } from "./scenes/home";
import { parkScenes } from "./scenes/park";
import { blackDogScenes } from "./scenes/black-dog";
import { dreamScenes } from "./scenes/dream";
import { dreamSquirrelScenes } from "./scenes/dream-squirrel";
import { dreamFaeriesScenes } from "./scenes/dream-faeries";
import { partyScenes } from "./scenes/party";
import { dreamTreeChaseScenes } from "./scenes/dream-tree-chase";
import { hypnoScenes } from "./scenes/hypno";

type AllScenes = typeof introScenes &
  typeof homeScenes &
  typeof parkScenes &
  typeof blackDogScenes &
  typeof dreamScenes &
  typeof dreamSquirrelScenes &
  typeof dreamFaeriesScenes &
  typeof dreamTreeChaseScenes &
  typeof partyScenes &
  typeof hypnoScenes;

export const story: AllScenes = {
  ...introScenes,
  ...homeScenes,
  ...parkScenes,
  ...blackDogScenes,
  ...dreamScenes,
  ...dreamSquirrelScenes,
  ...dreamFaeriesScenes,
  ...dreamTreeChaseScenes,
  ...partyScenes,
  ...hypnoScenes,
};

export type SceneId = keyof AllScenes;

export const sceneKeys = Object.keys(story) as SceneId[];
