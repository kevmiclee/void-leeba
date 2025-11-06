<template>
  <StartDialog />
  <Scene v-if="game.started" />
  <Snackbar />
</template>

/

<script setup lang="ts">
import StartDialog from "@/components/intro/StartDialog.vue";
import Scene from "@/components/Scene.vue";
import Snackbar from "@/components/overlays/Snackbar.vue";

import { useGameStore } from "@/stores/game";

const game = useGameStore();
</script>

<style>
:root {
  --primary-color: #9f3a27;
  --secondary-color: #b56d3c;
  --tertiary-color: #e2abc0;
  --background-color: rgba(220, 225, 225, 0.6);
  --text-color: #333;
}

html,
body {
  font-family: "Courier New";
  margin: 0;
  padding: 0;
  overflow-x: hidden;
  overflow-y: auto;
  background-color: black;
  height: 100%;
}

button {
  height: 2.8vw;
  font-size: 1.5vw;
  font-family: "Courier New";
  font-weight: 700;
  border: 0.15vw solid black;
  border-radius: 0.3vw;
  padding: 0.6vw;
  display: inline-flex;
  justify-content: center;
  align-items: center;
  background-color: var(--background-color);
  transition:
    background-color 0.3s ease,
    color 0.3s ease,
    border 0.3s ease;
}

button:hover {
  background-color: var(--secondary-color);
  border: 0.15vw solid var(--primary-color);
  color: white;
  cursor: pointer;
}

button:focus {
  outline: none;
}

.menu-list {
  list-style: none;
  padding: 0;
  margin: 0;
}

.menu-list li {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0.75rem 0.75rem;
  cursor: pointer;
  font-weight: 600;
  font-size: 1.8vw;
}

.menu-list li:hover {
  background-color: var(--tertiary-color);
  color: var(--primary-color);
}

.sub-menu-header {
  padding: 0.75rem 0.75rem;
  font-weight: 600;
  background-color: var(--tertiary-color);
  color: var(--primary-color);
  cursor: pointer;
}

.notification-bubble {
  top: 3.2vw;
  right: -0.7vw;
  background-color: var(--primary-color);
  color: white;
  border-radius: 50%;
  padding: 0.2vw 0.5vw;
  font-size: 1.2vw;
  line-height: 1;
}
</style>
