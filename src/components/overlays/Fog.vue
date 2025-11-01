<template>
  <div class="fog-layer" :style="{ backgroundImage: `url(${fogImage})` }"></div>
</template>

<script setup>
import fogImage from "@/assets/images/backgrounds/fog.png";
</script>

<style scoped>
.fog-layer {
  position: absolute;
  inset: 0;
  pointer-events: none;
  background-repeat: repeat;
  background-size: cover;
  mix-blend-mode: lighten;
  opacity: 0.4;
  animation: moveFog 60s linear infinite;
  z-index: 10;
}

@keyframes moveFog {
  from {
    background-position: 0 0;
  }
  to {
    background-position: 1000px 0;
  }
}
</style>
