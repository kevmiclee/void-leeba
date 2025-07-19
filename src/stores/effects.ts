import { defineStore } from "pinia";
import { EffectsState } from "@/types/state";

export const useEffectsStore = defineStore("effects", {
  state: (): EffectsState => ({
    showDisappearingItem: false,
    isPsychedelic: false,
    psychedelicScenesRemaining: 0,
    isZoomedOut: false,
    isSpinning: false,
    blurChoices: false,
    stretchAvatar: false,
    showChoices: false,
    animationSkipped: false,
    showOverlay: true,
  }),
  // persist: true,
  actions: {
    updateShowChoices(value: boolean) {
      this.showChoices = value;
    },

    updateAnimationSkipped(value: boolean) {
      this.animationSkipped = value;
    },

    updateShowOverlay(value: boolean) {
      this.showOverlay = value;
    },

    toggleDisappearingItem(value: boolean) {
      this.showDisappearingItem = value;
    },

    startPsychedelicEffect(sceneCount = 3) {
      this.isPsychedelic = true;
      this.psychedelicScenesRemaining = sceneCount;
    },

    decrementPsychedelicDuration() {
      if (this.psychedelicScenesRemaining > 0) {
        this.psychedelicScenesRemaining--;
        if (this.psychedelicScenesRemaining <= 0) {
          this.isPsychedelic = false;
        }
      }
    },

    toggleIsZoomedOut(value: boolean) {
      this.isZoomedOut = value;
    },

    toggleIsSpinning(value: boolean) {
      this.isSpinning = value;
    },

    toggleBlurChoices(value: boolean) {
      this.blurChoices = value;
    },

    toggleStretchAvatar(value: boolean) {
      this.stretchAvatar = value;
    },

    clearEffects() {
      if (this.blurChoices) {
        this.blurChoices = false;
      }
    },
  },
});
