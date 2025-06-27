<template>
  <div class="sidebar">
    <button
      v-if="scenes.length > 1 && currentSceneIndex > 0"
      @click.stop="game.goBack()"
    >
      <
    </button>
    <button v-if="canGoForward" @click.stop="game.goForward()">></button>
    <button @click.stop="drawer.toggleDrawer">
      ☰
      <span
        v-if="drawer.notificationCount > 0"
        class="notification-bubble"
        :style="{
          position: 'absolute',
          top:
            scenes.length > 1 && currentSceneIndex > 0 && canGoForward
              ? `6.8vw`
              : `3.2vw`,
        }"
      >
        {{ drawer.notificationCount }}
      </span>
    </button>
  </div>

  <transition name="fade">
    <div
      v-if="drawer.isDrawerOpen"
      class="drawer-overlay"
      @click.self="drawer.toggleDrawer"
    ></div>
  </transition>
  <Drawer></Drawer>
</template>

<script setup lang="ts">
import { useGameStore } from "@/stores/game";
import { usePhoneStore } from "@/stores/phone";
import Drawer from "@/components/drawer/Drawer.vue";
import { computed, watch } from "vue";
import { useDrawerStore } from "@/stores/drawer";

const game = useGameStore();
const phone = usePhoneStore();
const drawer = useDrawerStore();

const scenes = computed(() => game.scenes);
const currentSceneIndex = computed(() =>
  scenes.value.indexOf(game.currentSceneId)
);
const canGoForward = computed(
  () => currentSceneIndex.value < scenes.value.length - 1
);
const numberOfPhoneItems = computed(() => {
  const distinctScenes = Array.from(new Set(scenes.value));
  return Math.floor(distinctScenes.length / 4);
});

watch(
  () => ({
    phone: phone.$state,
    scene: game.currentSceneId,
    isDrawerOpen: drawer.isDrawerOpen,
  }),
  () => {
    const newCount =
      numberOfPhoneItems.value - phone.$state.filter((e) => e.isRead).length;
    drawer.updateNotificationCount(newCount);
  },
  { deep: true }
);
</script>

<style scoped>
.sidebar {
  margin-top: 1vw;
  position: absolute;
  z-index: 1000;
  margin-left: 1vw;
  display: flex;
  flex-direction: column;
  gap: 0.7vw;
}

.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.3s ease;
}
.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}

.drawer-overlay {
  position: fixed;
  top: 0;
  left: 0;
  height: 100vh;
  width: 100vw;
  background: rgba(0, 0, 0, 0.3);
  z-index: 1000;
}
</style>
