<template>
  <div
    :class="['black-overlay', { 'fade-out': !showOverlay }]"
    :style="{ transition: `opacity ${fadeDuration / 1000}s ease` }"
    :key="game.currentSceneId"
  />
</template>

<script setup lang="ts">
import { useEffectsStore } from "@/stores/effects";
import { useGameStore } from "@/stores/game";
import { computed, ref } from "vue";

const effects = useEffectsStore();
const game = useGameStore();

const showOverlay = computed(() => effects.showOverlay);
const fadeDuration = ref(2000);
</script>

<style scoped>
.black-overlay {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: black;
  z-index: 999;
  opacity: 1;
  pointer-events: none;
}

.fade-out {
  opacity: 0;
}
</style>
