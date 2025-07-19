import { story } from "@/data/story/story";
import { useEffectsStore } from "@/stores/effects";
import { useGameStore } from "@/stores/game";
import { useTimeoutStore } from "@/stores/timeout";
import { nextTick } from "vue";

export function useSceneHelpers() {
  const game = useGameStore();
  const effects = useEffectsStore();
  const timeoutStore = useTimeoutStore();

  function finishAnimation() {
    const animationSkipped = effects.animationSkipped;
    const currentSceneId = game.currentSceneId;
    const isIntroScene = ["intro", "intro1"].includes(game.currentSceneId);

    if (animationSkipped && isIntroScene) {
      timeoutStore.clearAll();
      game.goToScene(currentSceneId === "intro" ? "intro1" : "home");
    }
    effects.updateAnimationSkipped(true);
    effects.updateShowChoices(true);
    timeoutStore.clear(currentSceneId, true);
  }

  function triggerFade() {
    effects.updateShowOverlay(true);
    requestAnimationFrame(() => {
      effects.updateShowOverlay(false);
    });
  }

  async function onSceneChanged(animationDuration: number) {
    const isNewScene = !game.scenes.includes(game.currentSceneId);
    const isIntroScene = ["intro", "intro1"].includes(game.currentSceneId);

    const lastSceneId = game.scenes[game.scenes.length - 2];

    let isNewBackground = game.scenes.length < 1;

    if (lastSceneId) {
      const lastSceneBackground = story[lastSceneId]().background;
      const thisSceneBackground = story[game.currentSceneId]().background;
      isNewBackground = lastSceneBackground != thisSceneBackground;
    }

    if (isNewScene) {
      effects.updateAnimationSkipped(false);
      effects.updateShowChoices(false);
    }

    await nextTick();
    game.addSceneToHistory();

    if (isNewBackground) {
      triggerFade();
    }

    timeoutStore.set(
      game.currentSceneId,
      async () => {
        if (isIntroScene) {
          introSequence();
        }
        effects.updateShowChoices(true);
        effects.updateAnimationSkipped(true);
      },
      animationDuration
    );
  }

  return {
    finishAnimation,
    triggerFade,
    onSceneChanged,
  };
}

function introSequence() {
  const game = useGameStore();
  const effects = useEffectsStore();
  const timeoutStore = useTimeoutStore();
  const nextScene = game.currentSceneId == "intro" ? "intro1" : "home";

  timeoutStore.set(
    `${game.currentSceneId}-overlay`,
    () => {
      effects.updateShowOverlay(true);
      timeoutStore.set(
        `${game.currentSceneId}-scene`,
        () => {
          game.goToScene(nextScene);
        },
        2000
      );
    },
    2000
  );
}
