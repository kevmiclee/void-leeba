<template>
  <ul class="menu-list">
    <li @click.stop="drawer.closeDrawer"><</li>

    <li @click.stop="drawer.setDrawerView('bag')">Bag</li>
    <li @click.stop="drawer.setDrawerView('phone')">
      Phone
      <span
        v-if="drawer.notificationCount > 0 || drawer.phoneIsCrazy"
        class="notification-bubble"
        :class="{ 'phone-crazy': drawer.phoneIsCrazy }"
        >{{ drawer.phoneIsCrazy ? "∞" : drawer.notificationCount }}</span
      >
    </li>
    <li @click.stop="drawer.setDrawerView('dictionary')">Dictionary</li>
    <li @click.stop="drawer.setDrawerView('stats')">Stats</li>
    <li @click.stop="drawer.setDrawerView('scenes')">Scenes</li>
    <li @click.stop="game.toggleShowSceneGraph">Scene Graph</li>
    <li @click.stop="restart">Restart</li>
    <!--@click="
        game.$reset();
        character.$reset();
        timeoutStore.$reset(); -->
  </ul>
  <span style="bottom: 100px; position: absolute"
    >Current scene: {{ game.currentSceneId }}</span
  >
</template>

<script setup lang="ts">
import { useDrawerStore } from "@/stores/drawer";
import { useGameStore } from "@/stores/game";

const game = useGameStore();
const drawer = useDrawerStore();

function restart() {
  window.location.reload();
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
