// composables/sceneHelpers.ts
import { useGameStore } from "@/stores/game";
import { useTimeoutStore } from "@/stores/timeout";
import { nextTick } from "vue";

export function useSceneHelpers() {
  const game = useGameStore();
  const timeoutStore = useTimeoutStore();

  function finishAnimation() {
    const animationSkipped = game.animationSkipped;
    const currentSceneId = game.currentSceneId;

    if (
      (animationSkipped && currentSceneId == "intro") ||
      currentSceneId == "intro1"
    ) {
      timeoutStore.clearAll();
      game.goToScene(currentSceneId === "intro" ? "intro1" : "home");
    }
    game.updateAnimationSkipped(true);
    game.updateShowChoices(true);
    timeoutStore.clear(currentSceneId, true);
  }

  function triggerFade() {
    game.updateShowOverlay(true);
    requestAnimationFrame(() => {
      game.updateShowOverlay(false);
    });
  }

  async function onSceneChanged(animationDuration: number) {
    if (!game.scenes.includes(game.currentSceneId)) {
      game.updateAnimationSkipped(false);
      game.updateShowChoices(false);
    }
    game.addSceneToHistory();
    await nextTick();
    triggerFade();
    timeoutStore.set(
      game.currentSceneId,
      async () => {
        if (game.currentSceneId == "intro" || game.currentSceneId == "intro1") {
          timeoutStore.set(
            `${game.currentSceneId}-overlay`,
            () => {
              game.updateShowOverlay(true);
              timeoutStore.set(
                `${game.currentSceneId}-scene`,
                () => {
                  game.goToScene(
                    game.currentSceneId == "intro" ? "intro1" : "home"
                  );
                },
                2000
              );
            },
            2000
          );
        }
        game.updateShowChoices(true);
        game.updateAnimationSkipped(true);
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
