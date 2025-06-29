<template>
  <div id="game" ref="gameRef">
    <!-- <div class="hit-counter">Hits: {{ hitCount }}</div>
    <div class="hit-counter">Time: {{ elapsedTime }}</div> -->

    <div id="flash" class="flash"></div>
    <img id="player" :src="playerImg" ref="playerRef" alt="Player" />
  </div>
  <img
    class="pine-needles"
    :style="{ height: `${hitCount * 1.5}vw` }"
    :src="pineNeedlesImg"
  />
</template>

<script setup lang="ts">
import { ref, onMounted } from "vue";
import playerImg from "@/assets/images/avatars/player.png";
import pineNeedlesImg from "@/assets/images/backgrounds/pine-needles.jpg";

import { useGameStore } from "../../stores/game";
import { useCharacterStore } from "../../stores/character";
import { useAspectStore } from "@/stores/aspects";
import { allYourBonesAreBroken, jackBeNimble } from "@/data/aspects";

const gameRef = ref<HTMLDivElement | null>(null);
const playerRef = ref<HTMLDivElement | null>(null);
const hitCount = ref(0);
const elapsedTime = ref(0);
let timerInterval: number = 0;

const character = useCharacterStore();
const game = useGameStore();
const itemWeight = character.inventory.reduce(
  (sum, item) => sum + item.weight,
  0
);

const agility = 40 - itemWeight * 5;

function createTree() {
  const tree = document.createElement("div");
  tree.textContent = "🌲";
  tree.classList.add("tree");

  const gameEl = document.getElementById("game");

  const laneWidth = (gameEl?.offsetWidth ?? 0) / 20;
  const randomLane = Math.floor(Math.random() * 20);
  const left = randomLane * laneWidth;

  tree.style.left = `${left}px`;
  gameRef.value?.appendChild(tree);

  const player = document.getElementById("player");
  const speed = Math.random() * 30 + 15;
  let top = 0;

  const fallInterval = setInterval(() => {
    top += speed;
    tree.style.top = `${top}px`;

    if (isCollision(tree, player)) {
      flashScreen();
      clearInterval(fallInterval);
      gameRef.value?.removeChild(tree);

      hitCount.value = hitCount.value + 1;
      if (hitCount.value > 3) {
        clearInterval(timerInterval);
        const aspects = useAspectStore();
        aspects.addAspect(allYourBonesAreBroken);
        game.goToScene("dream-tree-chase-game-lose");
      }
    } else if (top > window.innerHeight) {
      clearInterval(fallInterval);
      gameRef.value?.removeChild(tree);
    }
  }, 50);
}

function isCollision(tree: HTMLElement | null, player: HTMLElement | null) {
  const treeRect = tree?.getBoundingClientRect();
  const playerRect = player?.getBoundingClientRect();

  if (!treeRect || !playerRect) {
    return false;
  }

  return (
    treeRect.right >= playerRect.left + agility &&
    treeRect.left <= playerRect.right - agility &&
    treeRect.bottom >= playerRect.top &&
    treeRect.top <= playerRect.bottom
  );
}

function startTreeSpawner() {
  const randomDelay = Math.random() * 300;
  setTimeout(() => {
    createTree();
    startTreeSpawner();
  }, randomDelay);
}

function flashScreen() {
  const flash = document.getElementById("flash");
  const player = document.getElementById("player");
  if (!flash) return;
  flash.style.opacity = "0.6";
  setTimeout(() => {
    flash.style.opacity = "0";
  }, 200);
  if (player) {
    player.style.filter = "sepia(1) saturate(10) hue-rotate(-50deg)";
    setTimeout(() => {
      player.style.filter = "";
    }, 200);
  }
}

onMounted(() => {
  const gameEl = document.getElementById("game");
  const player = document.getElementById("player");
  gameEl?.addEventListener("mousemove", (e) => {
    const rect = gameEl.getBoundingClientRect();
    let x = e.clientX - rect.left;

    x = Math.min(Math.max(0, x), rect.width);

    if (player) {
      const playerWidth = player.offsetWidth;

      player.style.left = `${x - playerWidth / 2}px`;
    }
  });

  startTreeSpawner();

  timerInterval = setInterval(() => {
    elapsedTime.value++;
    if (elapsedTime.value == 30) {
      clearInterval(timerInterval);
      const aspects = useAspectStore();
      aspects.addAspect(jackBeNimble);
      game.goToScene("dream-tree-chase-game-win");
    }
  }, 1000);
});
</script>

<style>
#game {
  position: relative;
  height: 100vh;
  width: 100vw;
  cursor: none;
  overflow: hidden;
  background-color: saddlebrown;
}

#player {
  position: absolute;
  width: auto;
  height: 15vh;
  bottom: 0;
}

.tree {
  position: absolute;
  top: 0;
  font-size: 80px;
  position: absolute;
  top: 0;
  width: auto;
  height: 8vh;
  font-size: 8vh;
  text-align: center;
}

.flash {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: red;
  opacity: 0;
  pointer-events: none;
  z-index: 10;
  transition: opacity 0.2s ease;
}

.hit-counter {
  width: 104px;
  height: 40px;
  background-color: lightgray;
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 1.2rem;
}

.player-wrapper {
  /* position: relative; */
  display: inline-block;
}

.pine-needles {
  position: absolute;
  bottom: 0;
  left: 0;
  width: 100%;
  object-fit: cover;
  z-index: 1;
  pointer-events: none;
}
</style>
