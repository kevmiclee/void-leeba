import { story, SceneId } from "@/data/story/story";
import { MiniGameId } from "@/types/minigame";

type SceneLink = {
  from: SceneId | MiniGameId;
  to: SceneId | MiniGameId;
  label?: string;
};

export function getSceneGraph(): SceneLink[] {
  const links: SceneLink[] = [];

  for (const [id, sceneFn] of Object.entries(story)) {
    const scene = sceneFn();

    if (scene.metadata) {
      if (scene.metadata.routes) {
        for (const route of scene.metadata.routes) {
          links.push({
            from: id as SceneId,
            to: route.redirect,
            label: route.label,
          });
        }
      }
    }
  }

  return links;
}
