import { defaultItems, itemCatalog } from "@/data/items";
import { CharacterState, FlagId, Stat } from "@/types/state";
import { defineStore } from "pinia";
import { useSnackbarStore } from "./snackbar";
import { ItemId } from "@/types/item";
import { SceneId } from "@/data/story/story";
import { useGameStore } from "./game";

export type CharacterStore = ReturnType<typeof useCharacterStore>;

export const useCharacterStore = defineStore("character", {
  state: (): CharacterState => ({
    name: "Adventurer",
    health: 100,
    blueMagic: 0,
    will: 0,
    shitheadedness: 0,
    athletics: 0,
    inventory: [...defaultItems],
    flags: {} as Record<FlagId, string | undefined>,
  }),
  // persist: true,
  actions: {
    takeDamage(amount: number) {
      this.health = Math.max(this.health - amount, 0);
    },
    gainStat(stat: Stat, value: number) {
      if (this[stat] !== undefined) this[stat] += value;
    },
    loseStat(stat: Stat, value: number) {
      if (this[stat] !== undefined) this[stat] -= value;
    },
    setFlag(key: FlagId, value: string | undefined) {
      this.flags[key] = value;
    },
    addToInventory(id: ItemId, pageAcquired: SceneId) {
      const item = itemCatalog[id];
      item.pageAcquired = pageAcquired;
      this.inventory.push(item);
      const snackbar = useSnackbarStore();
      snackbar.show(`+1 ${item.label}`);
    },
    removeFromInventory(id: ItemId, showSnackbar: boolean = true) {
      const index = this.inventory.findIndex((item) => item.id === id);

      if (index !== -1) {
        const item = itemCatalog[id];
        this.inventory.splice(index, 1);
        const snackbar = useSnackbarStore();
        if (showSnackbar) {
          snackbar.show(`-1 ${item.label}`);
        }
      }
    },

    async useItem(id: ItemId) {
      if (id == "mushroom") {
        const game = useGameStore();
        game.startPsychedelicEffect();
      }
      if (itemCatalog[id].type == "consumable") {
        this.removeFromInventory(id, false);
      }
    },

    hasItem(id: ItemId): boolean {
      return this.inventory.some((item) => item.id == id);
    },
  },
});
