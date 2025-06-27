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
  bottom: 20px;
  left: 50%;
  transform: translateX(-50%);
  background-color: #333;
  color: white;
  padding: 12px 24px;
  border-radius: 4px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.3);
  z-index: 1000;
  animation: fade-in-out 5s ease;
}

@keyframes fade-in-out {
  0% {
    opacity: 0;
    transform: translateX(-50%) translateY(20px);
  }
  10%,
  90% {
    opacity: 1;
    transform: translateX(-50%) translateY(0);
  }
  100% {
    opacity: 0;
    transform: translateX(-50%) translateY(20px);
  }
}
</style>
