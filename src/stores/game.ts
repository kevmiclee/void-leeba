import { defineStore } from "pinia";
import { useCharacterStore } from "./character";
import { Choice, ScenePayload } from "@/types/story";
import { SceneId, story } from "@/data/story/story";
import { GameState } from "@/types/state";
import { useSnackbarStore } from "./snackbar";
import { useAspectStore } from "./aspects";

export const NON_ROUTING_PAGES: SceneId[] = [
  "intro",
  "intro1",
  "start",
  "credits",
  "preamble",
];

export const useGameStore = defineStore("game", {
  state: (): GameState => ({
    currentSceneId: "preamble",
    currentScenePayload: undefined as ScenePayload | undefined,
    started: false,
    showChoices: false,
    animationSkipped: false,
    showOverlay: true,
    scenes: [],
    showDisappearingItem: false,
    isPsychedelic: false,
    psychedelicScenesRemaining: 0,
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
        this.showDisappearingItem = false;
        this.currentSceneId = sceneId;
        if (payload) {
          this.currentScenePayload = payload;
        }

        if (!this.scenes.includes(sceneId)) {
          const aspectStore = useAspectStore();
          aspectStore.decrementDurations();
        }

        if (this.psychedelicScenesRemaining > 0) {
          this.psychedelicScenesRemaining--;
          if (this.psychedelicScenesRemaining <= 0) {
            this.isPsychedelic = false;
          }
        }
      } else {
        const snackbar = useSnackbarStore();
        snackbar.show("This path has not been built yet");
      }
    },
    goBack() {
      const index = this.scenes.lastIndexOf(this.currentSceneId);
      const newIndex = index - 1;

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
      const index = this.scenes.indexOf(this.currentSceneId);
      const newIndex = index + 1;
      const newScene = this.scenes[newIndex];
      this.goToScene(newScene);
    },
    addSceneToHistory() {
      if (
        !NON_ROUTING_PAGES.includes(this.currentSceneId) &&
        !this.scenes.includes(this.currentSceneId)
      ) {
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
    updateShowChoices(value: boolean) {
      this.showChoices = value;
    },
    updateAnimationSkipped(value: boolean) {
      this.animationSkipped = value;
    },
    updateShowOverlay(value: boolean) {
      this.showOverlay = value;
    },
    updateShowDisappearingItem(value: boolean) {
      this.showDisappearingItem = value;
    },
    startPsychedelicEffect(sceneCount = 3) {
      this.isPsychedelic = true;
      this.psychedelicScenesRemaining = sceneCount;
    },
  },
});
