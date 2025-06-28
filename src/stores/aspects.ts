import { Aspect, AspectId } from "@/types/aspect";
import { AspectState } from "@/types/state";
import { defineStore } from "pinia";

export type AspectStore = ReturnType<typeof useAspectStore>;

export const useAspectStore = defineStore("aspects", {
  state: (): AspectState => ({
    aspects: [],
  }),
  // persist: true,
  actions: {
    addAspect(aspect: Omit<Aspect, "scenesRemaining">) {
      const existing = this.aspects.find((a) => a.id === aspect.id);
      if (!existing) {
        this.aspects.push({
          ...aspect,
          scenesRemaining: aspect.durationScenes,
        });
      }
    },

    removeAspect(id: AspectId) {
      this.aspects = this.aspects.filter((a) => a.id !== id);
    },

    hasAspect(id: AspectId): boolean {
      return this.aspects.some((a) => a.id === id);
    },

    decrementDurations() {
      this.aspects.forEach((a) => {
        if (a.durationScenes > -1) {
          a.scenesRemaining--;
        }
      });
      this.aspects = this.aspects.filter(
        (a) => a.durationScenes < 0 || a.scenesRemaining > 0
      );
    },
  },
});
