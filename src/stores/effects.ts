import { defineStore } from "pinia";
import { EffectsState } from "@/types/state";

export const useEffectsStore = defineStore("effects", {
  state: (): EffectsState => ({
    showDisappearingItem: false,
    isPsychedelic: false,
    psychedelicScenesRemaining: 0,
    isZoomedOut: false,
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

    toggleDisappearingItem() {
      this.showDisappearingItem = !this.showDisappearingItem;
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

    toggleIsZoomedOut() {
      this.isZoomedOut = !this.isZoomedOut;
    },

    toggleBlurChoices() {
      this.blurChoices = !this.blurChoices;
    },

    toggleStretchAvatar() {
      this.stretchAvatar = !this.stretchAvatar;
    },
  },
});
