import { CharacterId } from "@/types/character";
import { ref } from "vue";

let intervalId: number;
let intervalTime: number = 0;

const characterCooldowns = new Map<CharacterId, number>();
const COOLDOWN_MS = 15000;

const currentBgAudio = ref<HTMLAudioElement | null>(null);
const fadeDuration = 1000; //

export function useAudioStore() {
  function playCharacterSound(src: string, speakerKey: CharacterId) {
    const now = Date.now();
    const lastPlay = characterCooldowns.get(speakerKey) || 0;

    if (now - lastPlay < COOLDOWN_MS) return;

    characterCooldowns.set(speakerKey, now);

    const audio = new Audio(src);
    audio.play().catch((e) => {
      console.warn("Audio playback failed:", e);
    });
  }

  function playBackgroundAudio(src: string | undefined) {
    if (!src) {
      if (currentBgAudio.value) {
        fadeOutAndRemove(currentBgAudio.value);
        currentBgAudio.value = null;
      }
      return;
    }

    if (currentBgAudio.value?.src.includes(src)) {
      return;
    }

    const newAudio = new Audio(src);
    fadeOutAndReplace(newAudio, currentBgAudio.value);
  }

  function fadeOutAndReplace(
    newAudio: HTMLAudioElement,
    oldAudio: HTMLAudioElement | null
  ) {
    if (oldAudio) {
      currentBgAudio.value = newAudio;
      const step = oldAudio.volume / (fadeDuration / 50);
      const fadeOut = setInterval(() => {
        if (oldAudio.volume > 0.05) {
          oldAudio.volume -= step;
        } else {
          clearInterval(fadeOut);
          oldAudio.pause();
          fadeInAudio(newAudio);
        }
      }, 50);
    } else {
      currentBgAudio.value = newAudio;
      currentBgAudio.value.volume = 0;
      fadeInAudio(currentBgAudio.value);
    }

    currentBgAudio.value?.addEventListener("loadedmetadata", () => {
      updateInterval();
    });
  }

  function fadeOutAndRemove(audio: HTMLAudioElement) {
    const step = audio.volume / (fadeDuration / 50);
    const fadeOut = setInterval(() => {
      if (audio.volume > 0.05) {
        audio.volume -= step;
      } else {
        clearInterval(fadeOut);
        audio.pause();
      }
    }, 50);
  }

  function fadeInAudio(audio: HTMLAudioElement) {
    audio.play();
    const step = 1 / (fadeDuration / 50);
    const fadeIn = setInterval(() => {
      if (audio.volume < 0.95) {
        audio.volume += step;
      } else {
        audio.volume = 1;
        clearInterval(fadeIn);
      }
    }, 50);
  }

  return {
    playBackgroundAudio,
    playCharacterSound,
  };
}

function updateInterval() {
  const audio = currentBgAudio.value;
  clearInterval(intervalId);
  if (!audio) return;
  intervalTime = audio.duration - audio.currentTime;
  intervalId = setInterval(() => {
    if (!audio.paused && !audio.ended) {
      audio.currentTime = 0;
      updateInterval();
    }
  }, intervalTime * 1000);
}
