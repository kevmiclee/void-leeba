import { itemCatalog } from "@/data/items";
import { CharacterState } from "@/types/state";
import { defineStore } from "pinia";
import { useSnackbarStore } from "./snackbar";
import { ItemId } from "@/types/item";
import { SceneId } from "@/data/story/story";
import { FlagId, Flags, FlagValues } from "@/types/flag";
import { Stat, StatId } from "@/types/stat";
import { useAudioStore } from "./audio";
import pickUpItemSound from "@/assets/audio/story/sounds/pick-up-item.mp3";
import { useEffectsStore } from "./effects";
import { Manners, MANNERS_KEYS, MannersId } from "@/types/manners";

export type CharacterStore = ReturnType<typeof useCharacterStore>;

export const useCharacterStore = defineStore("character", {
  state: (): CharacterState => ({
    name: "",
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
    inventory: [],
    flags: {},
    flagHistory: [],
    currentSceneId: undefined,
    rude: {
      id: "rude",
      value: 0,
      scenesGained: [],
      scenesLost: [],
    },
    depressing: {
      id: "depressing",
      value: 0,
      scenesGained: [],
      scenesLost: [],
    },
    polite: {
      id: "polite",
      value: 0,
      scenesGained: [],
      scenesLost: [],
    },
    weird: {
      id: "weird",
      value: 0,
      scenesGained: [],
      scenesLost: [],
    },
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

    addToInventory(
      id: ItemId,
      pageAcquired: SceneId,
      amount?: number | undefined,
    ) {
      const audioStore = useAudioStore();
      audioStore.playGenericSound(pickUpItemSound);
      const item = itemCatalog[id];
      item.pageAcquired = pageAcquired;
      for (let i = 0; i < (amount ?? 1); i++) {
        this.inventory.push(item);
      }
      const snackbar = useSnackbarStore();
      snackbar.show(`+${amount ?? 1} ${item.label}`);
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

    async useItem(id: ItemId, sceneId: SceneId) {
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
            //TODO: STORY - translated book;
          } else {
            snackbar.show("You aren't fluent enough in Finnish to read this.");
          }
        }

        default:
          break;
      }

      if (
        itemCatalog[id].type == "consumable" &&
        itemCatalog[id].useScenes?.includes(sceneId)
      ) {
        this.removeFromInventory(id, false);
      }
    },

    hasItem(id: ItemId): boolean {
      return this.inventory.some((item) => item.id == id);
    },

    gainManners(manners: MannersId, value: number, sceneId: SceneId) {
      //remove any stats previously gained on the scene
      if (this.rude.scenesGained.includes(sceneId)) {
        this.rude.value -= 1;
      }
      if (this.depressing.scenesGained.includes(sceneId)) {
        this.depressing.value -= 1;
      }
      if (this.polite.scenesGained.includes(sceneId)) {
        this.shitheadedness.value -= 1;
      }
      if (this.polite.scenesGained.includes(sceneId)) {
        this.athletics.value -= 1;
      }

      const mannersObj = this[manners] as Manners;
      mannersObj.value += value;
      mannersObj.scenesGained.push(sceneId);
    },

    loseManners(manners: MannersId, value: number, sceneId: SceneId) {
      //restore any stats previously lost on the scene
      if (this.rude.scenesLost.includes(sceneId)) {
        this.rude.value += 1;
      }
      if (this.depressing.scenesLost.includes(sceneId)) {
        this.depressing.value += 1;
      }
      if (this.polite.scenesLost.includes(sceneId)) {
        this.polite.value += 1;
      }
      if (this.weird.scenesLost.includes(sceneId)) {
        this.weird.value += 1;
      }

      const mannersObj = this[manners] as Manners;
      mannersObj.value -= value;
      mannersObj.scenesLost.push(sceneId);
    },

    getManners() {
      const max = Math.max(...MANNERS_KEYS.map((k) => this[k].value));
      return MANNERS_KEYS.find((k) => this[k].value === max)!;
    },

    beginStep(sceneId: SceneId) {
      if (this.currentSceneId === sceneId) return;
      this.currentSceneId = sceneId;
      this.flagHistory.push({ stepId: sceneId, changes: new Map() });
    },

    setFlag<K extends FlagId>(key: K, value: FlagValues[K], sceneId: SceneId) {
      if (!this.flagHistory.length) this.beginStep(sceneId);
      const frame = this.flagHistory[this.flagHistory.length - 1];

      if (!frame.changes.has(key)) {
        frame.changes.set(key, {
          key,
          prev: this.flags[key] as Flags[K] | undefined,
          next: value,
        });
      } else {
        frame.changes.get(key)!.next = value;
      }

      this.flags[key] = value;
    },

    undoLastStep() {
      const frame = this.flagHistory.pop();
      if (!frame) return;

      for (const { key, prev } of frame.changes.values()) {
        if (prev === undefined) {
          delete this.flags[key];
        } else {
          (this.flags as any)[key] = prev;
        }
      }

      this.currentSceneId = this.flagHistory.length
        ? this.flagHistory[this.flagHistory.length - 1].stepId
        : undefined;
    },
  },
});
