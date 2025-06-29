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
        v-if="animatedCount > 0"
        class="notification-bubble"
        :class="{ 'phone-crazy': drawer.phoneIsCrazy }"
        :style="{
          position: 'absolute',
          top:
            scenes.length > 1 && currentSceneIndex > 0 && canGoForward
              ? `6.8vw`
              : `3.2vw`,
        }"
      >
        {{ animatedCount == 100 ? "∞" : animatedCount }}
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
import { computed, ref, watch, watchEffect } from "vue";
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

const animatedCount = ref(drawer.notificationCount);
let stop = false;

function animateToThousand(start: number, target = 100) {
  let current = start;

  const step = () => {
    if (stop || current >= target) return;

    current += 1;
    animatedCount.value = current;

    const progress = (current - start) / (target - start);
    const delay = 100 - progress * 45;

    setTimeout(step, delay);
  };

  step();
}

watch(
  () => drawer.phoneIsCrazy,
  (isCrazy) => {
    stop = false;

    if (isCrazy) {
      animateToThousand(animatedCount.value);
    } else {
      stop = true;
      animatedCount.value = drawer.notificationCount;
    }
  },
  { immediate: true }
);

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
