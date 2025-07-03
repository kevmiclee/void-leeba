<template>
  <ul class="menu-list">
    <div class="sub-menu-header" @click.stop="drawer.resetDrawerView">
      < Bag
    </div>
    <li
      class="sub"
      v-for="({ item, count }, index) in items"
      :key="item.id"
      @click.stop="updateSelectedItem(item)"
    >
      <div>
        • {{ item.label }} <span v-if="count > 1">x{{ count }}</span>
      </div>
    </li>
  </ul>
</template>

<script setup lang="ts">
import { useAudioStore } from "@/stores/audio";
import { useCharacterStore } from "../../stores/character";
import { useDrawerStore } from "../../stores/drawer";
import { computed } from "vue";
import { Item } from "@/types/item";

const drawer = useDrawerStore();
const character = useCharacterStore();
const audioStore = useAudioStore();

function updateSelectedItem(item: Item) {
  audioStore.click();
  drawer.updateSelectedItem(item);
}

const items = computed(() => {
  const map = new Map<
    string,
    { item: (typeof character.inventory)[0]; count: number }
  >();

  for (const item of character.inventory) {
    const entry = map.get(item.id);
    if (entry) {
      entry.count++;
    } else {
      map.set(item.id, { item, count: 1 });
    }
  }

  return Array.from(map.values());
});
</script>

<style scoped>
.sub:hover {
  background-color: var(--secondary-color);
  color: white;
}
</style>
