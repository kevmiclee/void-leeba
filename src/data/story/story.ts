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
import { neighborhoodScenes } from "./scenes/neighborhood";
import { snowPileScenes } from "./scenes/snow-pile";
import { Scene, ScenePayload } from "@/types/story";
import { voidScenes } from "./scenes/void";
import { paintScenes } from "./scenes/paint";

type AllScenes = typeof introScenes &
  typeof homeScenes &
  typeof parkScenes &
  typeof blackDogScenes &
  typeof neighborhoodScenes &
  typeof snowPileScenes &
  typeof voidScenes &
  typeof paintScenes &
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
  ...neighborhoodScenes,
  ...snowPileScenes,
  ...voidScenes,
  ...paintScenes,
  ...dreamScenes,
  ...dreamSquirrelScenes,
  ...dreamFaeriesScenes,
  ...dreamTreeChaseScenes,
  ...partyScenes,
  ...hypnoScenes,
};

export type SceneId = keyof AllScenes;

export const sceneKeys = Object.keys(story) as SceneId[];

type SceneFactory<T extends string> = (
  this: { id: T },
  payload?: ScenePayload
) => Scene;

export function defineScene<T extends string>(
  id: T,
  factory: SceneFactory<T>
): (payload?: ScenePayload) => Scene {
  return function (payload?: ScenePayload) {
    return factory.call({ id }, payload);
  };
}
