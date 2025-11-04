<template>
  <ul class="menu-list">
    <li @click.stop="closeDrawer">< {{ character.name }}'s SmartBag®</li>

    <li
      v-if="!game.currentSceneId.includes('intro')"
      @click.stop="setDrawerView('bag')"
    >
      Items
    </li>
    <li
      v-if="!game.currentSceneId.includes('intro')"
      @click.stop="setDrawerView('phone')"
    >
      Notifications
      <span
        v-if="drawer.notificationCount > 0 || drawer.phoneIsCrazy"
        class="notification-bubble"
        :class="{ 'phone-crazy': drawer.phoneIsCrazy }"
        >{{ drawer.phoneIsCrazy ? "∞" : drawer.notificationCount }}</span
      >
    </li>
    <li @click.stop="setDrawerView('dictionary')">Dictionary</li>
    <li
      v-if="!game.currentSceneId.includes('intro')"
      @click.stop="setDrawerView('stats')"
    >
      Stats
    </li>
    <li @click.stop="setDrawerView('scenes')">Scenes</li>
    <li @click.stop="goToSceneGraph">Scene Graph</li>
    <li @click.stop="restart">Restart</li>
    <!--@click="
        game.$reset();
        character.$reset();
        timeoutStore.$reset(); -->
  </ul>
  <img
    :src="survtekLogo"
    style="
      height: 5vw;
      position: absolute;
      left: calc(50% - 2.5vw);
      top: calc(50% - 2.5vw);
    "
  />

  <span style="bottom: 5vw; left: 0vw; position: absolute"
    >Current scene: {{ game.currentSceneId }}</span
  >
</template>

<script setup lang="ts">
import { useAudioStore } from "@/stores/audio";
import { useDrawerStore } from "@/stores/drawer";
import { useGameStore } from "@/stores/game";
import { DrawerView } from "@/types/drawer-view";
import survtekLogo from "@/assets/images/logos/survtek.png";
import { useCharacterStore } from "@/stores/character";

const game = useGameStore();
const drawer = useDrawerStore();
const audioStore = useAudioStore();
const character = useCharacterStore();

function restart() {
  window.location.reload();
}

function goToSceneGraph() {
  drawer.closeDrawer();
  game.toggleShowSceneGraph();
}

function setDrawerView(view: DrawerView) {
  audioStore.click();
  drawer.setDrawerView(view);
}

function closeDrawer() {
  audioStore.click();
  drawer.closeDrawer();
}
</script>

<style scoped>
.phone-crazy {
  animation: pulse 0.5s infinite alternate;
}

@keyframes pulse {
  from {
    transform: scale(1);
  }
  to {
    transform: scale(1.3);
  }
}
</style>
