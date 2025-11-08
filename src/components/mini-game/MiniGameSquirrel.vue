<template>
  <div
    class="background"
    @mousemove="updateCursor"
    :style="{ backgroundImage: `url(${bgImage})` }"
    @click="changeCursorTemporarily(false)"
  >
    <div
      ref="fakeCursor"
      class="fake-cursor"
      :style="{
        backgroundImage: `url(${handClosedCursor})`,
        visibility: isFrozen ? 'visible' : 'hidden',
      }"
    ></div>
  </div>
  <img
    ref="bouncer"
    class="bouncer"
    :src="squirrelImg"
    @click.stop="handleImageClick"
  />
</template>

<script setup lang="ts">
import squirrelImg from "@/assets/images/avatars/squirrel.png";
import bgImage from "@/assets/images/backgrounds/in-the-trees.png";
import handOpenCursor from "@/assets/images/icons/hand-left-open.png";
import handClosedCursor from "@/assets/images/icons/hand-left-closed.png";

import { onMounted, ref, nextTick } from "vue";
import { useAudioStore } from "@/stores/audio";
import { characters } from "@/data/characters";
import { useGameStore } from "@/stores/game";
import { useCharacterStore } from "@/stores/character";
import { fateContest } from "@/data/story/helper-functions/roll-helper-functions";
import { getCatchSquirrelOutcome } from "@/data/story/helper-functions/outcome-helper-functions";

const audioStore = useAudioStore();
const game = useGameStore();
const character = useCharacterStore();

const attempts = ref(0);

function handleImageClick(event: MouseEvent) {
  const character = characters["squirrel"];
  audioStore.playCharacterSound(character.sound!);

  changeCursorTemporarily(true);
  freezeCursor(800);
}

let timeoutId: number | null = null;

function changeCursorTemporarily(success: boolean) {
  attempts.value = attempts.value + 1;
  document.body.style.cursor = `url(${handClosedCursor}) 16 16, auto`;
  if (timeoutId) clearTimeout(timeoutId);
  timeoutId = window.setTimeout(() => {
    document.body.style.cursor = `url(${handOpenCursor}) 16 16, auto`;
    timeoutId = null;
    if (success || attempts.value > 3) {
      document.body.style.cursor = "default";
      goToScene(success);
    }
  }, 800);
}

function goToScene(success: boolean) {
  const squirrelAthletics = success ? 0 : 2;

  const roll = fateContest(character.athletics.value, squirrelAthletics);

  if (roll <= 0) {
    character.setFlag("fell-from-tree", true, "dream-squirrel-game");
  } else {
    character.setFlag("fell-from-tree", false, "dream-squirrel-game");
  }

  const outcome = getCatchSquirrelOutcome(roll);

  console.log(outcome.text);

  if (outcome.success) {
    character.setFlag("caught-squirrel", true, "dream-squirrel-game");
    game.goToScene("dream-squirrel4-success", {
      text: outcome.text,
    });
  } else {
    character.setFlag("caught-squirrel", false, "dream-squirrel-game");
    game.goToScene("dream-squirrel4-fail", { text: outcome.text });
  }
}

const fakeCursor = ref<HTMLElement | null>(null);
const isFrozen = ref(false);

function updateCursor(e: MouseEvent) {
  if (isFrozen.value || !fakeCursor.value) return;

  fakeCursor.value.style.left = `${e.clientX}px`;
  fakeCursor.value.style.top = `${e.clientY}px`;
}

function freezeCursor(duration = 1000) {
  isFrozen.value = true;
  document.body.style.cursor = `none`;

  setTimeout(() => {
    isFrozen.value = false;
    document.body.style.cursor = `url(${handOpenCursor}) 16 16, auto`;
  }, duration);
}

const bouncer = ref<HTMLImageElement | null>(null);

onMounted(async () => {
  document.body.style.cursor = `url(${handOpenCursor}) 16 16, auto`;

  await nextTick();

  const image = bouncer.value;

  if (!image) return;

  if (!image.complete) {
    await new Promise((resolve) => {
      image.onload = resolve;
    });
  }

  const speed = 10;
  let x = Math.random() * (window.innerWidth - image.offsetWidth);
  let y = Math.random() * (window.innerHeight - image.offsetHeight);
  let dx = speed * (Math.random() < 0.5 ? -1 : 1);
  let dy = speed * (Math.random() < 0.5 ? -1 : 1);

  let paused = false;

  function move() {
    if (image && !paused) {
      const imgWidth = image.offsetWidth;
      const imgHeight = image.offsetHeight;

      x += dx;
      y += dy;

      if (x <= 0 || x + imgWidth >= window.innerWidth) dx *= -1;
      if (y <= 0 || y + imgHeight >= window.innerHeight) dy *= -1;

      image.style.left = `${x}px`;
      image.style.top = `${y}px`;

      requestAnimationFrame(move);
    }
  }

  image.addEventListener("click", () => {
    paused = true;

    setTimeout(() => {
      paused = false;
      move();
    }, 800);
  });

  move();
});
</script>

<style>
.background {
  max-height: 100vh;
  width: 100vw;
  background-size: 100%;
  background-position: center !important;
  display: flex;
  flex-direction: column;
  aspect-ratio: 16/9;
  margin: 0;
  position: relative;
  background-repeat: no-repeat;
}

.bouncer {
  position: absolute;
  width: 10vw;
}

.wrapper {
  background-color: transparent;
  padding: 1vw;
}

#stripe {
  position: fixed;
  top: 0;
  left: 50%;
  transform: translateX(-50%);
  width: 100px;
  height: 100vh;
  background: rgba(255, 0, 0, 0.2);
  pointer-events: none;
}

.fake-cursor {
  position: fixed;
  width: 128px;
  height: 128px;
  pointer-events: none;
  z-index: 9999;
  background-size: contain;
  background-repeat: no-repeat;
}

body.frozen-cursor {
  cursor: none;
}
</style>
