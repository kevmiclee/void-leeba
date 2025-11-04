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
          (e) => e.pageAcquired != newScene
        );
        character.inventory = removedItems;
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
      if (choice.next || choice.onChoose) {
        this.currentScenePayload = choice.payload || undefined;

        if (choice.onChoose) {
          choice.onChoose();
        }
        if (choice.next) {
          this.goToScene(choice.next);
        }
      } else {
        const snackbar = useSnackbarStore();
        snackbar.show("This path has not been built yet");
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
