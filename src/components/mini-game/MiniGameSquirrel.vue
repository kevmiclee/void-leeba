<template>
  <div
    class="background"
    @mousemove="updateCursor"
    :style="{ backgroundImage: `url(${bgImage})` }"
    @click="changeCursorTemporarily"
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

const audioStore = useAudioStore();

function handleImageClick(event: MouseEvent) {
  const character = characters["squirrel"];
  audioStore.playCharacterSound(character.sound!);

  changeCursorTemporarily();
  freezeCursor(800);
}

let timeoutId: number | null = null;

function changeCursorTemporarily() {
  document.body.style.cursor = `url(${handClosedCursor}) 16 16, auto`;
  if (timeoutId) clearTimeout(timeoutId);
  timeoutId = window.setTimeout(() => {
    document.body.style.cursor = `url(${handOpenCursor}) 16 16, auto`;
    timeoutId = null;
  }, 800);
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
  /* background-color: white; */
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
  width: 100px; /* Stripe width */
  height: 100vh;
  background: rgba(255, 0, 0, 0.2); /* Visible red stripe */
  pointer-events: none; /* So it doesn't block clicks */
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
