import { DictionaryState } from "@/types/state";
import { defineStore } from "pinia";
import { dictionaryEntries } from "@/data/dictionary";
import { DictionaryEntryId } from "@/types/dictionary";

export type DictionaryStore = ReturnType<typeof useDictionaryStore>;

export const useDictionaryStore = defineStore("dictionary", {
  state: (): DictionaryState => ({
    entries: [],
  }),
  // persist: true,
  actions: {
    addEntry(id: DictionaryEntryId) {
      if (this.entries.every((e) => e.id !== id)) {
        this.entries.push(dictionaryEntries[id]);
        this.entries.sort((a, b) => a.id.localeCompare(b.id));
      }
    },
  },
});
