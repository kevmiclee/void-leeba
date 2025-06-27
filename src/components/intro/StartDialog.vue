<template>
  <div v-if="show" class="overlay">
    <div class="box">
      <p class="message">This game uses sound. Please click “Play” to begin.</p>
      <button @click="startGame">Play</button>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from "vue";
import { useGameStore } from "@/stores/game";
import { useAudioStore } from "@/stores/audio";

const show = ref(true);
const game = useGameStore();
const { playBackgroundAudio } = useAudioStore();

function startGame() {
  playBackgroundAudio("src/assets/audio/story/intro.mp3");
  show.value = false;
  game.start();
}
</script>

<style scoped>
.overlay {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: black;
  color: white;
  display: flex;
  align-items: center;
  justify-content: center;
}

.box {
  background-color: #fff;
  padding: 20px;
  border-radius: 2px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
  text-align: center;
  max-width: 50vw;
  width: 80%;
}

.message {
  font-size: 18px;
  color: #333;
  margin-bottom: 20px;
}
</style>
