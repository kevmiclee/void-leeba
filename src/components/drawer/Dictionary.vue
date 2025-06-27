<template>
  <ul class="menu-list">
    <div class="sub-menu-header" @click.stop="drawer.resetDrawerView">
      < Dictionary
    </div>
    <li
      class="sub"
      v-for="(entry, index) in dictionary.entries"
      :key="entry.id"
      @click.stop="drawer.updateSelectedDictionaryEntry(entry)"
    >
      <div>• {{ entry.name }}</div>
    </li>
  </ul>
</template>

<script setup lang="ts">
import { useDrawerStore } from "@/stores/drawer";
import { useDictionaryStore } from "@/stores/dictionary";

const drawer = useDrawerStore();
const dictionary = useDictionaryStore();
</script>

<style scoped>
.sub:hover {
  background-color: var(--secondary-color);
  color: white;
}
</style>
