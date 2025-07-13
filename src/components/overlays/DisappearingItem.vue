<template>
  <transition name="fade-out" @after-leave="onAfterLeave">
    <img v-if="showFadeDiv" class="fade-message" :src="itemImg" />
  </transition>
</template>

<script setup lang="ts">
import { ref, watch } from "vue";
import itemImg from "@/assets/images/items/plant-matter-lock-of-hair.png";
import { useEffectsStore } from "@/stores/effects";

const effects = useEffectsStore();
const showFadeDiv = ref(false);

watch(
  () => effects.showDisappearingItem,
  () => {
    if (effects.showDisappearingItem) {
      showFadeDiv.value = true;
      setTimeout(() => {
        showFadeDiv.value = false;
      }, 4000);
    }
  }
);

function onAfterLeave() {
  effects.toggleDisappearingItem();
}
</script>

<style scoped>
.fade-message {
  background-color: rgba(0, 0, 0, 0.8);
  color: white;
  padding: 1rem;
  border-radius: 6px;
  text-align: center;
  max-width: 300px;
  margin: 1rem auto;
}

/* transition fade */

.fade-out-leave-active {
  transition: opacity 8s ease;
}
.fade-out-enter-from,
.fade-out-leave-to {
  opacity: 0;
}
.fade-out-enter-to,
.fade-out-leave-from {
  opacity: 1;
}
</style>
