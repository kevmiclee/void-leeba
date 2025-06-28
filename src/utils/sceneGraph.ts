import { story, SceneId } from "@/data/story/story";

type SceneLink = {
  from: SceneId;
  to: SceneId;
  label?: string;
};

export function getSceneGraph(): SceneLink[] {
  const links: SceneLink[] = [];

  for (const [id, sceneFn] of Object.entries(story)) {
    const scene = sceneFn();

    if (scene.choices) {
      for (const choice of scene.choices()) {
        if (choice.next) {
          links.push({
            from: id as SceneId,
            to: choice.next as SceneId,
            label: choice.text,
          });
        }
        if (choice.onChoose) {
          const fnStr = choice.onChoose.toString();
          const matches = [
            ...fnStr.matchAll(/goToScene\s*\(\s*['"`]([^'"`]+)['"`]/g),
          ];
          const destinations = matches.map((m) => m[1]) as SceneId[];

          for (const d of destinations) {
            links.push({
              from: id as SceneId,
              to: d,
              label: "choice-action",
            });
          }
        }
      }
    }

    if (scene.buttonActions) {
      for (const buttonAction of scene.buttonActions) {
        const fnStr = buttonAction?.action?.toString?.() ?? "";

        const matches = [
          ...fnStr.matchAll(/goToScene\s*\(\s*['"`]([^'"`]+)['"`]/g),
        ];
        const destinations = matches.map((m) => m[1]) as SceneId[];

        for (const d of destinations) {
          links.push({
            from: id as SceneId,
            to: d,
            label: "button-action",
          });
        }
      }
    }

    if (scene.dialogSequence) {
      const fnStr = scene.dialogSequence.toString();
      const matches = [
        ...fnStr.matchAll(/goToScene\s*\(\s*['"`]([^'"`]+)['"`]/g),
      ];
      const destinations = matches.map((m) => m[1]) as SceneId[];

      for (const d of destinations) {
        links.push({
          from: id as SceneId,
          to: d,
          label: "dialog-action",
        });
      }
    }
  }

  return links;
}
