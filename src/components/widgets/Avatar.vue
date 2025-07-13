<template>
  <transition name="slide-up">
    <div v-if="showUserAvatar" class="avatar-wrapper">
      <img
        :src="userAvatar"
        alt="User avatar"
        class="avatar"
        :class="{ grow: effects.stretchAvatar }"
      />
    </div>
    <div
      v-else-if="hasDialog && currentCharacter"
      class="avatar-wrapper"
      :key="currentCharacter.id"
      @click.stop="onAvatarClicked"
    >
      <div class="stack">
        <img :src="currentCharacter.avatar" alt="" class="avatar base" />
        <img :src="currentCharacter.avatar" alt="" class="avatar wobble" />
      </div>
    </div>
  </transition>

  <transition name="slide-up">
    <div v-if="dialogClicked" class="avatar-wrapper-right">
      <img :src="userAvatar" alt="User avatar" class="avatar-right" />
    </div>
  </transition>
</template>

<script setup lang="ts">
import userAvatar from "@/assets/images/avatars/player.png";
import { useEffectsStore } from "@/stores/effects";
import { Character } from "@/types/character";

const props = defineProps<{
  showUserAvatar: boolean;
  currentCharacter: Character | null;
  hasDialog: boolean;
  dialogClicked: boolean;
  onAvatarClicked: () => void;
}>();

const effects = useEffectsStore();
</script>

<style scoped>
.avatar-wrapper {
  position: absolute;
  bottom: 0;
  left: -3vw;
  width: 100vw;
  display: flex;
  justify-content: flex-start;
  align-items: flex-end;
  cursor: pointer;
}

.avatar-wrapper-right {
  position: absolute;
  bottom: 0;
  right: -3vw;
  width: 100vw;
  display: flex;
  justify-content: flex-end;
  align-items: flex-start;
  pointer-events: none;
}

.avatar {
  height: 26vw;
  width: auto;
  display: block;
  transition: height 10s ease;
}

.avatar.grow {
  height: 100vw;
  width: 26vw !important;
}

.avatar-right {
  height: 26vw;
  width: auto;
  display: block;
  transform: scaleX(-1);
}

.slide-up-enter-from {
  transform: translateY(100%);
  opacity: 0;
}
.slide-up-enter-to {
  transform: translateY(0);
  opacity: 1;
}
.slide-up-enter-active {
  transition:
    transform 200ms ease,
    opacity 200ms ease;
}

.stack {
  position: relative;
  display: inline-block;
}

.base {
  position: relative;
  z-index: 1;
}

.wobble {
  position: absolute;
  top: 0;
  left: 0;
  z-index: 2;
  animation: wobble 4s infinite ease-in-out;
  filter: grayscale(15%);
}

@keyframes wobble {
  0% {
    transform: translate(0px, 0px);
    opacity: 1;
    filter: grayscale(15%);
  }
  25% {
    transform: translate(-0.8px, 0.8px);
    opacity: 0.95;
    filter: grayscale(0%);
  }
  50% {
    transform: translate(0.8px, -0.8px);
    opacity: 0.92;
    filter: grayscale(15%);
  }
  75% {
    transform: translate(-0.8px, 1.3px);
    opacity: 0.95;
    filter: grayscale(30%);
  }
  100% {
    transform: translate(0px, 0px);
    opacity: 1;
    filter: grayscale(15%);
  }
}

@keyframes shift {
  0% {
    opacity: 0.5;
    transform: translateX(0);
  }

  50% {
    opacity: 1;
    transform: translate(2.5px, 2.5px);
  }

  100% {
    opacity: 0.5;
    transform: translateX(0);
  }
}
</style>
