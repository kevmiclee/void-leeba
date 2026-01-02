<template>
  <Avatar
    v-if="showInput"
    :showUserAvatar="true"
    :hasDialog="false"
    :dialogClicked="false"
  ></Avatar>
  <transition name="slide-in-left">
    <div v-if="showInput" class="input-wrapper">
      <label for="name">Enter your name: </label>
      <input
        class="input"
        id="name"
        v-model="name"
        type="text"
        @keyup.enter="handleEnter"
      />
    </div>
  </transition>
</template>

<script setup lang="ts">
import { useCharacterStore } from "@/stores/character";
import { useEffectsStore } from "@/stores/effects";
import { useGameStore } from "@/stores/game";
import { storeToRefs } from "pinia";
import { computed } from "vue";
import Avatar from "./Avatar.vue";

const game = useGameStore();
const character = useCharacterStore();
const effects = useEffectsStore();

const { name } = storeToRefs(character);
const currentScene = computed(() =>
  game.currentScene(game.currentScenePayload)
);
const hasInput = computed(() => {
  return currentScene.value.hasInput;
});

const showInput = computed(() => effects.showChoices && hasInput.value);

function handleEnter() {
  currentScene.value.onInputEntered!();
}
</script>

<style scoped>
.input-wrapper {
  position: absolute;
  bottom: 2vw;
  align-self: center;
  background-color: var(--background-color);
  border-radius: 16px;
  padding: 1.2vw;
  outline: 1px solid var(--primary-color);
  outline-offset: -0.3vw;
  max-width: 45vw;
  font-size: 1.5vw;
  font-weight: bold;
}

.input {
  border: 1px solid var(--secondary-color);
  padding: 0.5vw;
  border-radius: 8px;
  font-size: 1.5vw;
  font-weight: bold;
  outline: none;
  font-family: "Times";
}

input:focus {
  border: 2px solid var(--primary-color);
  outline: none;
  margin: -1px;
}
</style>
