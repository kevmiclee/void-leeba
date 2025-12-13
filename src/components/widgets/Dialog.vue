<template>
  <transition name="slide-in-left">
    <div
      v-if="hasDialog || dialogClicked"
      class="dialog-wrapper"
      :class="{ 'dialog-slide-up': dialogClicked }"
      @click.stop="onDialogClick"
    >
      <div class="dialog-header">
        <!-- :style="{ transform: `rotate(${rotationDeg}deg)` }" -->
        {{ name.toUpperCase() }}
      </div>

      <div class="dialog-foreground" v-html="dialog!.text"></div>
    </div>
  </transition>
</template>

<script setup lang="ts">
import { Dialog } from "@/types/story";
import { useEffectsStore } from "@/stores/effects";
import { useGameStore } from "@/stores/game";

const effects = useEffectsStore();

const props = defineProps<{
  hasDialog: boolean;
  dialogClicked: boolean;
  dialog: Dialog | undefined;
  dialogIndex: number;
  name: string;
  rotationDeg: string;
}>();

const emit = defineEmits<{
  (e: "update-dialog-clicked", newValue: boolean): void;
  (e: "update-dialog-index", newValue: number): void;
}>();

function advanceDialog() {
  if (props.hasDialog) {
    emit("update-dialog-index", props.dialogIndex + 1);
  } else {
    effects.updateShowChoices(true);
    emit("update-dialog-index", 0);
  }
}

function onDialogClick() {
  if (props.dialog?.onClick) {
    props.dialog?.onClick();
  }
  if (props.dialog?.next) {
    const game = useGameStore();
    game.goToScene(props.dialog.next, { filter: props.dialog.filter });
  }
  if (!props.dialog?.popUp) {
    advanceDialog();
  }
  if (props.dialog?.popUp) {
    emit("update-dialog-clicked", true);
    effects.updateShowChoices(true);
  }
}
</script>

<style scoped>
.slide-in-left-enter-active {
  animation: slideInLeft 200ms ease-out forwards;
}

@keyframes slideInLeft {
  from {
    opacity: 0;
    transform: translateX(-100%);
  }
  to {
    opacity: 1;
    transform: translateX(0);
  }
}

.dialog-header {
  position: relative;
  background-color: var(--primary-color);
  color: white;
  display: inline-block;
  width: fit-content;
  padding: 0.25em 0.5em;
  border-radius: 0.2vw;
  outline: 0.1vw solid white;
  outline-offset: -0.2vw;
  box-shadow: 2px 0 8px rgba(0, 0, 0, 0.3);
  left: -1vw;
  margin-bottom: 0.25vw;
  font-size: 1.5vw;
  z-index: 4;
  transform: rotate(-1.1deg);
}

.dialog-wrapper {
  position: absolute;
  bottom: 2vw;
  align-self: center;
  cursor: pointer;
  transform: translateY(0);
  transition: transform 200ms ease-in;
  z-index: 3;
}

.dialog-foreground {
  position: relative;
  border-radius: 0.3vw;
  padding: 1.2vw;
  width: fit-content;
  max-width: 42vw;
  animation:
    wobbleText 1.5s infinite ease-in-out,
    wobble 2.5s infinite ease-in-out;
  text-shadow: 0px 0px 2px var(--primary-color);
  font-size: 1.5vw;
  background-color: var(--background-color);
  color: black;
  z-index: 1;
}

.dialog-slide-up {
  transform: translateY(-20vw);
  cursor: default;
}

.dialog-foreground::after {
  content: "";
  position: absolute;
  inset: 0.3vw;
  border-radius: inherit;
  pointer-events: none;
  box-sizing: border-box;
  border: 0.15vw solid var(--secondary-color);
  animation: borderPulse 2.5s infinite ease-in-out;
  margin: 0vw 0vw;
}

@keyframes borderPulse {
  0% {
    margin: 0vw 0vw;
  }
  50% {
    margin: 0.05vw 0.05vw;
  }
  100% {
    margin: 0vw 0vw;
  }
}

@keyframes wobbleText {
  0%,
  100% {
    text-shadow: 0px 0px 2px var(--primary-color);
  }
  50% {
    text-shadow: 2px 2px 5px var(--primary-color);
  }
}

@keyframes wobble {
  0% {
    transform: translate(0.5px, 0.5px) rotate(0deg);
  }
  25% {
    transform: translate(0.8px, 0.3px) rotate(-0.2deg);
  }
  50% {
    transform: translate(0.5px, 0.8px) rotate(0.2deg);
  }
  75% {
    transform: translate(0.8px, 0.5px) rotate(-0.1deg);
  }
  100% {
    transform: translate(0.5px, 0.5px) rotate(0deg);
  }
}
</style>
