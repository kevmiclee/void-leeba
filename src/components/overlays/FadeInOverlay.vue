<template>
  <transition name="fade" appear>
    <div v-if="showOverlay" class="black-overlay" />
  </transition>
</template>

<script setup lang="ts">
import { useEffectsStore } from "@/stores/effects";
import { computed } from "vue";
const effects = useEffectsStore();
const showOverlay = computed(() => effects.showOverlay);
</script>

<style scoped>
.black-overlay {
  position: absolute;
  inset: 0;
  background: black;
  z-index: 999;
  pointer-events: none;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 1;
}
.fade-enter-to,
.fade-leave-from {
  opacity: 0;
}
.fade-enter-active,
.fade-leave-active {
  transition: opacity 2s ease;
}
</style>
