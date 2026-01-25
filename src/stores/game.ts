import { defineStore } from "pinia";
import { useCharacterStore } from "./character";
import { Choice, ScenePayload } from "@/types/story";
import { SceneId, story } from "@/data/story/story";
import { GameState } from "@/types/state";
import { useSnackbarStore } from "./snackbar";
import { useAspectStore } from "./aspects";
import { useEffectsStore } from "./effects";

export const NON_ROUTING_PAGES: SceneId[] = ["start", "credits", "preamble"];

export const useGameStore = defineStore("game", {
  state: (): GameState => ({
    currentSceneId: "preamble",
    currentScenePayload: undefined as ScenePayload | undefined,
    currentSceneIndex: -1,
    started: false,
    scenes: [],
    showSceneGraph: false,
    persistAvatar: false,
  }),
  // persist: true,
  getters: {
    currentScene(state) {
      return story[state.currentSceneId];
    },
  },
  actions: {
    start() {
      this.currentSceneId = "start";
      this.started = true;
    },

    goToScene(sceneId: SceneId, payload?: ScenePayload) {
      if (story[sceneId]) {
        this.currentSceneId = sceneId;
        if (payload) {
          this.currentScenePayload = payload;
        }

        if (!this.scenes.includes(sceneId)) {
          const aspectStore = useAspectStore();
          aspectStore.decrementDurations();

          const effects = useEffectsStore();
          effects.decrementPsychedelicDuration();
        }
      }
    },

    goBack() {
      const newIndex = this.currentSceneIndex - 1;
      this.currentSceneIndex = newIndex;

      if (newIndex > -1) {
        const newScene = this.scenes[newIndex];
        const character = useCharacterStore();
        const removedItems = character.inventory.filter(
          (e) => e.pageAcquired != newScene,
        );
        character.inventory = removedItems;
        character.undoLastStep();
        this.goToScene(newScene);
      }
    },

    goForward() {
      const newIndex = this.currentSceneIndex + 1;
      this.currentSceneIndex = newIndex;
      const newScene = this.scenes[newIndex];
      this.goToScene(newScene);

      const effects = useEffectsStore();
      effects.clearEffects();
    },

    addSceneToHistory() {
      if (
        !NON_ROUTING_PAGES.includes(this.currentSceneId) &&
        !this.scenes.includes(this.currentSceneId)
      ) {
        this.currentSceneIndex = this.currentSceneIndex + 1;
        this.scenes.push(this.currentSceneId);
      }
    },

    chooseOption(choice: Choice) {
      this.currentScenePayload = choice.payload || undefined;

      if (choice.onChoose) {
        choice.onChoose();
      }
      if (choice.stats) {
        const character = useCharacterStore();
        choice.stats.forEach(({ id, amount, isLost }) => {
          if (isLost) {
            character.loseStat(id, amount, this.currentSceneId);
          } else {
            character.gainStat(id, amount, this.currentSceneId);
          }
        });
      }
      if (choice.manners) {
        const character = useCharacterStore();
        choice.manners.forEach(({ id, amount }) => {
          character.gainManners(id, amount, this.currentSceneId);
        });
      }
      if (choice.flags) {
        const character = useCharacterStore();
        choice.flags.forEach(({ id, value }) => {
          character.setFlag(id, value, this.currentSceneId);
        });
      }
      if (choice.aspect) {
        const aspectStore = useAspectStore();
        aspectStore.addAspect(choice.aspect);
      }
      if (choice.items) {
        const character = useCharacterStore();
        choice.items.forEach(({ id, amount, isLost, showSnackbar }) => {
          if (isLost) {
            character.removeFromInventory(id, showSnackbar);
          } else {
            character.addToInventory(id, this.currentSceneId, amount);
          }
        });
      }
      if (choice.next) {
        this.goToScene(choice.next);
      }
    },

    toggleShowSceneGraph() {
      this.showSceneGraph = !this.showSceneGraph;
    },

    setPersistAvatar(val: boolean) {
      this.persistAvatar = val;
    },
  },
});
