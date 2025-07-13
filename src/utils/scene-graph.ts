import { story, SceneId } from "@/data/story/story";
import { MiniGameId } from "@/types/mini-game";
import { SceneRouteStat } from "@/types/story";

type SceneLink = {
  from: SceneId | MiniGameId | "drawer";
  to: SceneId | MiniGameId | "drawer";
  label?: string;
  aspect?: string;
  manners?: string;
  stat?: SceneRouteStat;
};

export function getSceneGraph(): {
  links: SceneLink[];
  sectionMap: Record<string, SceneId[]>;
} {
  const links: SceneLink[] = [];

  const sectionMap: Record<string, SceneId[]> = {};

  for (const [id, sceneFn] of Object.entries(story)) {
    const scene = sceneFn();

    if (scene.metadata) {
      if (scene.metadata.routes) {
        for (const route of scene.metadata.routes) {
          links.push({
            from: id as SceneId,
            to: route.redirect,
            label: route.label,
            aspect: route.aspect,
            manners: route.manners,
            stat: route.stat,
          });
        }
      }

      if (!sectionMap[scene.metadata.sectionId])
        sectionMap[scene.metadata.sectionId] = [];
      sectionMap[scene.metadata.sectionId].push(id as SceneId);
    }
  }

  return { links, sectionMap };
}
