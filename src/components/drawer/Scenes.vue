<template>
  <ul class="menu-list">
    <div class="sub-menu-header" @click.stop="drawer.resetDrawerView">
      < Scenes
    </div>
    <li
      v-for="(sceneFn, key) in story"
      :key="key"
      @click.stop="onSceneClicked(key)"
    >
      {{ key }}
    </li>
  </ul>
</template>

<script setup lang="ts">
import { useGameStore } from "@/stores/game";
import { SceneId, story } from "@/data/story/story";
import { useDrawerStore } from "@/stores/drawer";

const game = useGameStore();
const drawer = useDrawerStore();

function onSceneClicked(key: SceneId) {
  game.goToScene(key);
  drawer.resetDrawerView();
  drawer.closeDrawer();
}
</script>

<style scoped></style>
