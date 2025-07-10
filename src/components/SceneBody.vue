<template>
  <div class="wrapper">
    <div class="animated-text">
      <template v-for="(chunk, index) in chunks" :key="index">
        <span
          v-if="chunk.type === 'text'"
          class="text"
          :style="
            animationSkipped
              ? { animation: 'none', opacity: 1 }
              : { animationDelay: `${index * 0.03}s`, opacity: 0 }
          "
        >
          {{ chunk.value }}
        </span>

        <span
          v-if="chunk.type === 'italic'"
          class="text"
          style="font-style: italic"
          :style="
            animationSkipped
              ? { animation: 'none', opacity: 1 }
              : { animationDelay: `${index * 0.03}s`, opacity: 0 }
          "
        >
          {{ chunk.value }}
        </span>

        <br v-else-if="chunk.type === 'br'" />

        <span
          v-else-if="
            chunk.type === 'button' && !hideButtons.includes(chunk.index)
          "
          class="text-button"
          @click.stop="handleButtonClick(chunk.index)"
          :style="
            animationSkipped
              ? { animation: 'none', opacity: 1 }
              : { animationDelay: `${index * 0.03}s`, opacity: 0 }
          "
        >
          {{ chunk.value }}
        </span>
      </template>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed, Ref, ref, watch } from "vue";
import { useGameStore } from "@/stores/game";
import { useDrawerStore } from "@/stores/drawer";
import { useDictionaryStore } from "@/stores/dictionary";
import { dictionaryEntries } from "@/data/dictionary";
import { useAudioStore } from "@/stores/audio";
import { useSceneHelpers } from "@/helper-functions/scene-helpers";

const props = defineProps<{
  letters: string[];
  animationSkipped: boolean;
}>();

type Chunk =
  | { type: "text"; value: string }
  | { type: "italic"; value: string }
  | { type: "br" }
  | { type: "button"; value: string; index: number };

const chunks = computed(() => {
  const result: Chunk[] = [];
  const regex = /(\^)|(\{[^}]+\})|(<i>.*?<\/i>)|([^<{^]+)/g;
  const fullText = props.letters.join("");
  const matches = [...fullText.matchAll(regex)];

  let buttonIndex = 0;

  for (const match of matches) {
    if (match[1]) {
      result.push({ type: "br" });
    } else if (match[2]) {
      result.push({
        type: "button",
        value: match[2].slice(1, -1),
        index: buttonIndex,
      });
      buttonIndex++;
    } else if (match[3]) {
      result.push({
        type: "italic",
        value: match[3].slice(3, -4),
      });
    } else if (match[4]) {
      for (const char of match[4]) {
        result.push({
          type: "text",
          value: char,
        });
      }
    }
  }

  return result;
});

const game = useGameStore();
const { finishAnimation } = useSceneHelpers();
const buttonActions = game.currentScene(game.currentScenePayload).buttonActions
  ? game.currentScene(game.currentScenePayload).buttonActions!()
  : [];
const animationSkipped = computed(() => game.animationSkipped);

const hideButtons: Ref<number[], number[]> = ref([]);

function handleButtonClick(index: number) {
  if (animationSkipped.value) {
    const buttonAction = buttonActions[index];

    if (buttonAction) {
      if (buttonAction.action) {
        buttonAction.action();
      }
      if (buttonAction.isItem) {
        hideButtons.value.push(index);
      } else {
        const audioStore = useAudioStore();
        audioStore.click();
      }
      if (buttonAction.dictionaryEntryId) {
        const drawer = useDrawerStore();
        const dictionary = useDictionaryStore();
        dictionary.addEntry(buttonAction.dictionaryEntryId);
        drawer.toggleDrawer();
        drawer.setDrawerView("dictionary");
        drawer.updateSelectedDictionaryEntry(
          dictionaryEntries[buttonAction.dictionaryEntryId]
        );
      }
    }
  } else {
    finishAnimation();
  }
}

watch(
  () => game.currentSceneId,
  async () => {
    hideButtons.value = [];
  }
);
</script>

<style scoped>
.animated-text {
  left: 0;
  top: 0;
  font-size: 2vw;
  font-weight: bold;
}

.text {
  font-size: 1.6vw;
  line-height: 1.2;
  opacity: 0;
  animation: fadeIn 2s forwards;
}

.wrapper {
  margin: 1vw 10vw;
  position: relative;
  font-weight: 500;
  width: fit-content;
  background-color: var(--background-color);
  border-radius: 4px;
  padding: 16px;
  outline: 1px solid #9f3a27;
  outline-offset: -4px;
  z-index: 1;
}

.text-button {
  font-size: 1.6vw;
  line-height: 1.2;
  color: var(--primary-color);
  cursor: pointer;
  animation: fadeIn 2s forwards;
  transition:
    text-shadow,
    200ms ease,
    color 200ms ease;
}

.text-button:hover {
  color: var(--secondary-color);
  text-shadow: 1px 2px 1.5px rgba(0, 0, 0, 0.1);

  cursor: pointer;
}

@keyframes fadeIn {
  from {
    opacity: 0;
  }
  to {
    opacity: 1;
  }
}
</style>
