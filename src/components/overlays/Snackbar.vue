<!-- components/Snackbar.vue -->
<template>
  <div
    v-if="snackbar.visible"
    class="snackbar"
    @click.stop="snackbar.dismiss()"
  >
    {{ snackbar.message }}
  </div>
</template>

<script setup lang="ts">
import { useSnackbarStore } from "@/stores/snackbar";

const snackbar = useSnackbarStore();
</script>

<style scoped>
.snackbar {
  position: fixed;
  bottom: 1.2vw;
  left: 50%;
  transform: translateX(-50%);
  background-color: #333;
  color: white;
  padding: 0.8vw 1.4vw;
  border-radius: 0.3vw;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.3);
  z-index: 1000;
  animation: fade-in-out 5s ease;
}

@keyframes fade-in-out {
  0% {
    opacity: 0;
    transform: translateX(-50%) translateY(1.2vw);
  }
  10%,
  90% {
    opacity: 1;
    transform: translateX(-50%) translateY(0);
  }
  100% {
    opacity: 0;
    transform: translateX(-50%) translateY(1.2vw);
  }
}
</style>
