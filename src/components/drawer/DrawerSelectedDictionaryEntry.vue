<template>
  <div class="sub-menu-header" @click.stop="drawer.clearDictionaryEntry">
    < {{ drawer.selectedDictionaryEntry!.name }}
  </div>
  <p class="item-desc">
    <template v-for="(chunk, index) in parsedDescription" :key="index">
      <span
        v-if="chunk.entry"
        class="clickable-term"
        @click="
          drawer.updateSelectedDictionaryEntry(chunk.entry);
          dictionary.addEntry(chunk.entry.id);
        "
      >
        {{ chunk.text }}
      </span>
      <span v-else v-html="chunk.text"> </span>
    </template>
  </p>
</template>

<script setup lang="ts">
import { dictionaryEntries } from "@/data/dictionary";
import { useDictionaryStore } from "@/stores/dictionary";
import { useDrawerStore } from "@/stores/drawer";
import { DictionaryEntry, DictionaryEntryId } from "@/types/dictionary";
import { computed } from "vue";

const drawer = useDrawerStore();
const dictionary = useDictionaryStore();
const rawDescription = computed(
  () => drawer.selectedDictionaryEntry!.description
);

const parsedDescription = computed(() => {
  const regex = /{([^}]+)}/g;
  const result: { text: string; entry?: DictionaryEntry }[] = [];
  let lastIndex = 0;
  let match;

  while ((match = regex.exec(rawDescription.value)) !== null) {
    if (match.index > lastIndex) {
      result.push({
        text: rawDescription.value.slice(lastIndex, match.index),
      });
    }

    const dictionaryEntryId = match[1] as DictionaryEntryId;
    const entry = dictionaryEntries[dictionaryEntryId];

    result.push({ text: entry.name, entry: entry });
    lastIndex = regex.lastIndex;
  }

  if (lastIndex < rawDescription.value.length) {
    result.push({
      text: rawDescription.value.slice(lastIndex),
    });
  }

  return result;
});
</script>

<style scoped>
.item-desc {
  margin: 1vw;
  padding-bottom: 2vw;
}

.clickable-term {
  font-weight: 900;
  cursor: pointer !important;
  pointer-events: auto !important;
  color: var(--primary-color);
  transition:
    text-shadow,
    200ms ease,
    color 200ms ease;
}

.clickable-term:hover {
  color: var(--secondary-color);
  text-shadow: 1px 2px 1.5px rgba(0, 0, 0, 0.1);
}
</style>
