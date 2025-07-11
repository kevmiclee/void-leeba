<template>
  <MiniGame v-if="miniGameId" :miniGameId="miniGameId"></MiniGame>
  <SceneGraph v-else-if="game.showSceneGraph"></SceneGraph>
  <div
    v-else
    class="scene-wrapper"
    :class="{ psychedelic: game.isPsychedelic, 'zoom-out': game.isZoomedOut }"
    :style="[backgroundStyle, alignmentStyle, backgroundColorFilter]"
    @click="finishAnimation"
  >
    <FadeInOverlay />

    <Sidebar v-if="isScene" />

    <button @click.stop="audioStore.mute" class="mute-btn">
      <span v-if="isMuted">🔇</span>
      <span v-else>🔊</span>
    </button>

    <StartBody
      v-if="game.currentSceneId === 'start'"
      :key="game.currentSceneId"
      :letters="letters"
      :animationSkipped="animationSkipped"
    />

    <Credits v-if="game.currentSceneId === 'credits'"></Credits>

    <IntroBody
      v-if="game.currentSceneId == 'intro' || game.currentSceneId == 'intro1'"
      :key="game.currentSceneId"
      :letters="letters"
      :animationSkipped="animationSkipped"
      :eyeIsOpened="game.currentSceneId == 'intro1'"
    />

    <SceneBody
      v-if="isScene && letters.length > 0"
      :key="game.currentSceneId"
      :animationSkipped="animationSkipped"
      :letters="letters"
    />

    <DisappearingItem></DisappearingItem>

    <Choices />
  </div>
</template>

<script setup lang="ts">
import { NON_ROUTING_PAGES, useGameStore } from "@/stores/game";
import { useTimeoutStore } from "@/stores/timeout";
import { useAudioStore } from "@/stores/audio";
import { useSceneHelpers } from "@/helper-functions/scene-helpers";
import { computed, onMounted, ref, watch } from "vue";
import StartBody from "@/components/intro/StartBody.vue";
import Credits from "@/components/intro/Credits.vue";
import IntroBody from "@/components/intro/IntroBody.vue";
import SceneBody from "@/components/SceneBody.vue";
import SceneGraph from "@/components/SceneGraph.vue";
import Choices from "@/components/widgets/Choices.vue";
import FadeInOverlay from "@/components/overlays/FadeInOverlay.vue";
import Sidebar from "@/components/widgets/Sidebar.vue";
import { Scene } from "@/types/story";
import DisappearingItem from "./overlays/DisappearingItem.vue";
import MiniGame from "./mini-game/MiniGame.vue";

const timeoutStore = useTimeoutStore();
const game = useGameStore();
const audioStore = useAudioStore();
const { finishAnimation, triggerFade, onSceneChanged } = useSceneHelpers();

const background = computed(() => game.currentScene().background);
const backgroundStyle = computed(() =>
  background.value
    ? {
        backgroundImage: `url(${background.value})`,
      }
    : ""
);
const text = computed(() => {
  return game.currentScene(game.currentScenePayload).text;
});
const letters = computed(() => text.value.split(""));
const animationRate = computed(
  () => game.currentScene(game.currentScenePayload).animationRate ?? 30
);
const animationDurationMs = computed(
  () => 900 + (letters.value.length - 1) * animationRate.value
);
const animationSkipped = computed(() => game.animationSkipped);
const isScene = computed(
  () => !NON_ROUTING_PAGES.includes(game.currentSceneId)
);
const miniGameId = computed(
  () => game.currentScene(game.currentScenePayload).miniGameId
);
const alignmentStyle = computed(() =>
  isScene.value ? "" : { alignItems: "center", justifyContent: "center" }
);
const backgroundColorFilter = computed(() =>
  game.currentScene(game.currentScenePayload).backgroundFilter
    ? {
        filter: game.currentScene(game.currentScenePayload).backgroundFilter,
      }
    : ""
);
const isMuted = computed(() => audioStore.isMuted.value);

onMounted(() => {
  triggerFade();
  timeoutStore.set(
    game.currentSceneId,
    () => {
      game.updateShowChoices(true);
    },
    animationDurationMs.value
  );
});

watch(
  () => game.currentSceneId,
  async () => {
    await onSceneChanged(animationDurationMs.value);
  }
);

watch(
  () => game.currentScene(game.currentScenePayload),
  (scene: Scene) => {
    audioStore.playBackgroundAudio(scene.audio);
    if (scene.onPageLoad) {
      scene.onPageLoad();
    }
  }
);
</script>

<style scoped>
.scene-wrapper {
  height: 100vh;
  width: 100vw;
  background-size: 100%;
  background-position: center !important;
  display: flex;
  flex-direction: column;
  aspect-ratio: 16/9;
  margin: 0;
  position: relative;
  background-repeat: no-repeat;

  transition: background-size 15s ease-in-out;
}

.scene-wrapper.zoom-out {
  background-size: 0.1%;
}

.psychedelic {
  animation:
    pulse 4s infinite ease-in-out,
    hue 4s infinite linear;
  filter: contrast(150%) saturate(250%) blur(1px);
  will-change: transform, filter;
}

@keyframes pulse {
  0% {
    transform: scale(1) rotate(-1deg);
  }
  50% {
    transform: scale(1.05) rotate(1deg);
  }
  100% {
    transform: scale(1) rotate(-1deg);
  }
}

@keyframes hue {
  0% {
    filter: hue-rotate(0deg);
  }
  100% {
    filter: hue-rotate(360deg);
  }
}

.mute-btn {
  top: 1vw;
  position: absolute;
  z-index: 1000;
  right: 1vw;
  gap: 0.7vw;
}
</style>
