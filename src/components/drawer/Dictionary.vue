<template>
  <ul class="menu-list">
    <div class="sub-menu-header" @click.stop="drawer.resetDrawerView">
      < Dictionary
    </div>
    <li
      class="sub"
      v-for="(entry, index) in dictionary.entries"
      :key="entry.id"
      @click.stop="updateSelectedDictionaryEntry(entry)"
    >
      <div>• {{ entry.name.replaceAll("Player", character.name) }}</div>
    </li>
  </ul>
</template>

<script setup lang="ts">
import { useDrawerStore } from "@/stores/drawer";
import { useDictionaryStore } from "@/stores/dictionary";
import { useAudioStore } from "@/stores/audio";
import { DictionaryEntry } from "@/types/dictionary";
import { useCharacterStore } from "@/stores/character";

const drawer = useDrawerStore();
const dictionary = useDictionaryStore();
const audioStore = useAudioStore();
const character = useCharacterStore();

function updateSelectedDictionaryEntry(entry: DictionaryEntry) {
  audioStore.click();
  drawer.updateSelectedDictionaryEntry(entry);
}
</script>

<style scoped>
.sub:hover {
  background-color: var(--secondary-color);
  color: white;
}
</style>
