import { defaultItems, itemCatalog } from "@/data/items";
import { CharacterState } from "@/types/state";
import { defineStore } from "pinia";
import { useSnackbarStore } from "./snackbar";
import { ItemId } from "@/types/item";
import { SceneId } from "@/data/story/story";
import { useGameStore } from "./game";
import { FlagId, FlagValues } from "@/types/flag";
import { Stat, StatId } from "@/types/stat";
import { Manners } from "@/types/manners";
import { useAudioStore } from "./audio";
import pickUpItemSound from "@/assets/audio/story/sounds/pick-up-item.mp3";
import { useEffectsStore } from "./effects";

export type CharacterStore = ReturnType<typeof useCharacterStore>;

export const useCharacterStore = defineStore("character", {
  state: (): CharacterState => ({
    name: "Adventurer",
    health: 100,
    blueMagic: {
      id: "blueMagic",
      value: 0,
      scenesGained: [],
      scenesLost: [],
    },
    will: {
      id: "will",
      value: 0,
      scenesGained: [],
      scenesLost: [],
    },
    shitheadedness: {
      id: "shitheadedness",
      value: 0,
      scenesGained: [],
      scenesLost: [],
    },
    athletics: {
      id: "athletics",
      value: 0,
      scenesGained: [],
      scenesLost: [],
    },
    inventory: [...defaultItems],
    flags: {},
    manners: undefined,
  }),
  // persist: true,
  actions: {
    takeDamage(amount: number) {
      this.health = Math.max(this.health - amount, 0);
    },

    gainStat(stat: StatId, value: number, sceneId: SceneId) {
      //remove any stats previously gained on the scene
      if (this.blueMagic.scenesGained.includes(sceneId)) {
        this.blueMagic.value -= 1;
      }
      if (this.will.scenesGained.includes(sceneId)) {
        this.will.value -= 1;
      }
      if (this.shitheadedness.scenesGained.includes(sceneId)) {
        this.shitheadedness.value -= 1;
      }
      if (this.athletics.scenesGained.includes(sceneId)) {
        this.athletics.value -= 1;
      }

      const statObj = this[stat] as Stat;
      statObj.value += value;
      statObj.scenesGained.push(sceneId);
    },

    loseStat(stat: StatId, value: number, sceneId: SceneId) {
      //restore any stats previously lost on the scene
      if (this.blueMagic.scenesLost.includes(sceneId)) {
        this.blueMagic.value += 1;
      }
      if (this.will.scenesLost.includes(sceneId)) {
        this.will.value += 1;
      }
      if (this.shitheadedness.scenesLost.includes(sceneId)) {
        this.shitheadedness.value += 1;
      }
      if (this.athletics.scenesLost.includes(sceneId)) {
        this.athletics.value += 1;
      }

      const statObj = this[stat] as Stat;
      statObj.value -= value;
      statObj.scenesLost.push(sceneId);
    },

    setFlag<K extends FlagId>(key: K, value: FlagValues[K]) {
      this.flags[key] = value;
    },

    addToInventory(id: ItemId, pageAcquired: SceneId) {
      const audioStore = useAudioStore();
      audioStore.playGenericSound(pickUpItemSound);
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
      const effects = useEffectsStore();
      const snackbar = useSnackbarStore();

      switch (id) {
        case "mushroom": {
          effects.startPsychedelicEffect();
          break;
        }

        case "self-help-book": {
          const hasTranslator = this.hasItem("translator");

          if (hasTranslator) {
            //TODO: translated book;
          } else {
            snackbar.show("You aren't fluent enough in Finnish to read this.");
          }
        }

        default:
          break;
      }

      if (itemCatalog[id].type == "consumable") {
        this.removeFromInventory(id, false);
      }
    },

    hasItem(id: ItemId): boolean {
      return this.inventory.some((item) => item.id == id);
    },

    setManners(value: Manners) {
      this.manners = value;
    },
  },
});
