<template>
  <button class="back-button" @click.stop="game.goToScene('start')"><</button>
  <div style="color: white">CREDITS</div>
</template>

<script setup lang="ts">
import { useGameStore } from "../../stores/game";

const game = useGameStore();
</script>

<style scoped>
.back-button {
  position: absolute;
  top: 0;
  left: 0;
  margin: 1vw;
}
</style>
