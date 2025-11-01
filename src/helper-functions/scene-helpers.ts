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
    const currentSceneId = game.currentSceneId;

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

    const lastSceneId = game.scenes[game.scenes.length - 1];

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
