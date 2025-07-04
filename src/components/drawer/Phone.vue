<template>
  <div v-if="isViral">VIRAL DOG KICKER</div>
  <ul v-else class="list">
    <div class="sub-menu-header" @click.stop="drawer.resetDrawerView">
      < Phone
    </div>
    <li
      v-for="(item, index) in items"
      :key="index"
      :class="{ highlight: !item.isRead }"
    >
      {{ item.title }}
    </li>
  </ul>
</template>

<script setup lang="ts">
import { computed } from "vue";
import { useGameStore } from "@/stores/game";
import { phoneItems } from "@/data/phone";
import { useDrawerStore } from "@/stores/drawer";

const game = useGameStore();
const drawer = useDrawerStore();

const scenes = computed(() => game.scenes);

const numberOfPhoneItems = computed(() => {
  const distinctScenes = Array.from(new Set(scenes.value));
  return Math.floor(distinctScenes.length / 4);
});

const items = computed(() => {
  return phoneItems.length <= numberOfPhoneItems.value
    ? phoneItems
    : phoneItems.slice(0, numberOfPhoneItems.value);
});

const isViral = computed(() => {
  return drawer.phoneIsCrazy;
});
</script>

<style scoped>
.list {
  list-style: none;
  padding: 0;
  margin: 0;
}

.list li {
  justify-content: space-between;
  align-items: center;
  padding: 0.75rem 0.75rem;
  font-weight: 600;
  padding: 1vw 2vw;
  cursor: default;
}

li::before {
  content: "•";
  position: relative;
  left: -1vw;
  margin-right: -0.5em;
  justify-items: center;
  color: black;
  font-size: 1em;
}

li.highlight {
  background-color: rgba(181, 109, 60, 0.33);
  color: black;
}
</style>
