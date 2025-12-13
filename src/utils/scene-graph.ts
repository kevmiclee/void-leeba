import { characters } from "@/data/characters";
import { story, SceneId } from "@/data/story/story";
import { MiniGameId } from "@/types/mini-game";
import { StatAffect } from "@/types/story";

type SceneLink = {
  from: SceneId | MiniGameId | "drawer";
  to: SceneId | MiniGameId | "drawer";
  label?: string;
  aspect?: string;
  manners?: string[];
  stats?: StatAffect[];
};

export function getSceneGraph(): {
  links: SceneLink[];
  sectionMap: Record<string, SceneId[]>;
} {
  const links: SceneLink[] = [];

  const sectionMap: Record<string, SceneId[]> = {};

  for (const [id, sceneFn] of Object.entries(story)) {
    const scene = sceneFn();

    if (scene.metadata?.routes) {
      for (const route of scene.metadata.routes) {
        links.push({
          from: id as SceneId,
          to: route.next,
          label: route.text,
          aspect: route.aspect,
          //TODO: CHORE -
          // manners: route.manners,
          // stats: route.stats,
        });
      }
      continue;
    }

    if (scene.choices) {
      try {
        const choices = scene.choices();
        for (const choice of choices) {
          if (choice.next) {
            links.push({
              from: id as SceneId,
              to: choice.next,
              label: choice.text,
              aspect: choice.aspect,
              manners: choice.manners?.map((m) => m.id),
              stats: choice.stats,
            });
          }
        }
      } catch (e) {
        console.log(`error building graph from choices on scene ${id} `, e);
      }
    }

    if (scene.dialogSequence) {
      try {
        const dialogs = scene.dialogSequence();
        for (const dialog of dialogs) {
          if (dialog.next) {
            const character = characters[dialog.characterId];
            links.push({
              from: id as SceneId,
              to: dialog.next,
              label: `${character.name}: ${dialog.text.slice(0, 20)}`,
            });
          }
        }
      } catch (e) {
        console.log(`error building graph from dialog on scene ${id} `, e);
      }
    }

    if (scene.buttonActions) {
      const text = scene.text;
      const regex = /\{([^}]+)\}/g;
      const matches = [...text.matchAll(regex)];

      try {
        const actions = scene.buttonActions();
        for (let i = 0; i < actions.length; i++) {
          const action = actions[i];

          if (action.next) {
            links.push({
              from: id as SceneId,
              to: action.next,
              label: matches[i][1],
            });
          }
        }
      } catch (e) {
        console.log(
          `error building graph from button actions on scene ${id} `,
          e
        );
      }
    }

    if (scene.metadata) {
      if (!sectionMap[scene.metadata.sectionId])
        sectionMap[scene.metadata.sectionId] = [];
      sectionMap[scene.metadata.sectionId].push(id as SceneId);
    }
  }

  return { links, sectionMap };
}
