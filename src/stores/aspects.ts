import { Aspect, AspectId } from "@/types/aspect";
import { defineStore } from "pinia";
import { ref } from "vue";

export const useAspectStore = defineStore("aspect", () => {
  const activeAspects = ref<Aspect[]>([]);

  function addAspect(aspect: Omit<Aspect, "scenesRemaining">) {
    const existing = activeAspects.value.find((a) => a.id === aspect.id);
    if (!existing) {
      activeAspects.value.push({
        ...aspect,
        scenesRemaining: aspect.durationScenes,
      });
    }
  }

  function removeAspect(id: AspectId) {
    activeAspects.value = activeAspects.value.filter((a) => a.id !== id);
  }

  function hasAspect(id: AspectId): boolean {
    return activeAspects.value.some((a) => a.id === id);
  }

  function decrementDurations() {
    activeAspects.value.forEach((a) => a.scenesRemaining--);
    activeAspects.value = activeAspects.value.filter(
      (a) => a.scenesRemaining > 0
    );
  }

  return {
    activeAspects,
    addAspect,
    removeAspect,
    hasAspect,
    decrementDurations,
  };
});
