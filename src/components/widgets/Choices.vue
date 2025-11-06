<template>
  <Avatar
    :showUserAvatar="
      (isScene &&
        showChoices &&
        visibleChoices.length > 0 &&
        !dialogClicked &&
        !isIntro) ||
      effects.stretchAvatar
    "
    :currentCharacter="currentCharacter"
    :hasDialog="hasDialog ?? false"
    :dialogClicked="dialogClicked ?? false"
    :onAvatarClicked="onAvatarClicked"
    :persist="game.persistAvatar"
  ></Avatar>

  <transition name="slide-in-left">
    <div v-if="showChoices && visibleChoices.length" class="choices-wrapper">
      <div v-for="(choice, index) in visibleChoices" :key="index">
        <div
          v-html="`• ${choice.text}`"
          class="choice"
          :class="{ 'blurry-text': effects.blurChoices }"
          @click.stop="onChoiceClicked(choice)"
        ></div>
      </div>
    </div>
  </transition>

  <Dialog
    :hasDialog="hasDialog ?? false"
    :dialogClicked="dialogClicked"
    :dialog="currentDialog"
    :dialogIndex="dialogIndex"
    :name="currentCharacter?.name ?? ''"
    :rotationDeg="rotationDeg"
    @update-dialog-clicked="updateDialogClicked"
    @update-dialog-index="updateDialogIndex"
  ></Dialog>
</template>

<script setup lang="ts">
import { useGameStore } from "@/stores/game";
import { useAudioStore } from "@/stores/audio";
import { characters } from "@/data/characters";
import { computed, ref, watch } from "vue";
import Avatar from "./Avatar.vue";
import Dialog from "./Dialog.vue";
import { CharacterId } from "@/types/character";
import { useDrawerStore } from "@/stores/drawer";
import { DrawerView } from "@/types/drawer-view";
import { Choice } from "@/types/story";
import { useEffectsStore } from "@/stores/effects";
import { useCharacterStore } from "@/stores/character";

const game = useGameStore();
const audioStore = useAudioStore();
const drawer = useDrawerStore();
const effects = useEffectsStore();
const characterStore = useCharacterStore();

const dialogIndex = ref(0);
const dialogClicked = ref(false);

const hasDialog = computed(() => {
  const dialogs = game.currentScene(game.currentScenePayload).dialogSequence;

  if (typeof dialogs == "function") {
    const length = dialogs().length ?? 0;
    return !!length && dialogIndex.value < length && effects.animationSkipped;
  }
});
const currentDialog = computed(() => {
  const dialogs = game.currentScene(game.currentScenePayload).dialogSequence;
  if (typeof dialogs === "function") {
    return dialogs()[dialogIndex.value];
  }
});
const currentCharacter = computed(() =>
  currentDialog.value ? characters[currentDialog.value.characterId] : null
);

const showChoices = computed(() => {
  return (
    (!hasDialog.value ||
      dialogClicked.value ||
      dialogIndex.value >=
        game.currentScene(game.currentScenePayload).dialogSequence!().length) &&
    effects.showChoices
  );
});
const visibleChoices = computed(() => {
  const currentScene = game.currentScene(game.currentScenePayload);
  const inventory = characterStore.inventory;
  const itemsForScene = inventory
    .filter((i) => i.pageAcquired == currentScene.id)
    .map((i) => i.id);
  if (currentScene.choices) {
    return currentScene
      .choices()
      .filter((ch) => !ch.itemId || !itemsForScene.includes(ch.itemId));
  }
  return [];
});
const isScene = computed(() => game.currentSceneId !== "start");

const isIntro = computed(() => game.currentSceneId === "intro");

function playSpeakerSound(characterId: CharacterId) {
  const character = characters[characterId];
  if (character?.sound) {
    audioStore.playCharacterSound(character.sound, character.id);
  }
}

function updateDialogClicked(value: boolean) {
  dialogClicked.value = value;
}

function updateDialogIndex(value: number) {
  dialogIndex.value = value;
}

function onAvatarClicked() {
  if (currentDialog.value?.onClick) {
    currentDialog.value?.onClick();
  } else if (!currentDialog.value?.popUp) {
    if (hasDialog.value) {
      updateDialogIndex(dialogIndex.value + 1);
    } else {
      effects.updateShowChoices(true);
    }
  }

  if (currentDialog.value?.popUp) {
    updateDialogClicked(true);
    effects.updateShowChoices(true);
  }
}

function openDrawerToView(value: DrawerView) {
  drawer.toggleDrawer();
  drawer.setDrawerView(value);
}

function onChoiceClicked(choice: Choice) {
  audioStore.click();
  if (choice.drawerView) {
    openDrawerToView(choice.drawerView);
  }
  if (choice.next || choice.onChoose) {
    game.chooseOption(choice);
  }
  updateDialogIndex(0);
}

const rotationDeg = ref("0");

watch(
  () => ({ currentDialog, hasDialog }),
  () => {
    rotationDeg.value = (Math.random() * 2 - 1).toFixed(2);

    if (currentDialog.value?.characterId && hasDialog.value) {
      dialogClicked.value = false;
      playSpeakerSound(currentDialog.value!.characterId);
    }
  },
  { deep: true }
);

watch(
  () => game.currentSceneId,
  () => {
    dialogIndex.value = 0;
    dialogClicked.value = false;
  }
);
</script>

<style scoped>
.choices-wrapper {
  position: absolute;
  bottom: 2vw;
  align-self: center;
  background-color: var(--background-color);
  border-radius: 16px;
  padding: 1.2vw;
  outline: 1px solid var(--primary-color);
  outline-offset: -0.3vw;
  max-width: 45vw;
}

.choice {
  list-style: none;
  padding: 0;
  font-size: 1.6vw;
  font-weight: 900;
  cursor: pointer !important;
  pointer-events: auto !important;
  text-decoration: none;
  padding: 0;
  margin: 0;
  color: var(--primary-color);
  word-wrap: break-word;
  overflow-wrap: break-word;
  max-width: 62vw;
  display: inline-block;
  line-height: 1.4;
  transition:
    text-shadow,
    200ms ease,
    color 200ms ease;
}

.choice:hover {
  color: var(--secondary-color);
  text-shadow: 1px 2px 1.5px rgba(0, 0, 0, 0.1);
}

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

.blurry-text {
  filter: blur(4px);
  transition:
    filter 0.6s ease,
    opacity 0.6s ease;
  opacity: 0.6;
  cursor: pointer;
}

.blurry-text:hover {
  filter: blur(0);
  opacity: 1;
}
</style>
