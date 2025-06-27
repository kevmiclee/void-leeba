import { phoneItems } from "@/data/phone";
import { PhoneItem } from "@/types/phone";
import { defineStore } from "pinia";
import { useGameStore } from "./game";

export type PhoneStore = ReturnType<typeof usePhoneStore>;

export const usePhoneStore = defineStore("phone", {
  state: (): PhoneItem[] => phoneItems,
  // persist: true,
  actions: {
    markAsRead() {
      const game = useGameStore();
      const scenes = Array.from(new Set(game.scenes));
      const N = Math.floor(scenes.length / 4);
      for (let i = 0; i < phoneItems.length; i++) {
        if (i < N) {
          phoneItems[i].isRead = true;
        }
      }
    },
  },
});
