import { CharacterId } from "@/types/character";
import { ref } from "vue";
import clickSound from "@/assets/audio/story/sounds/click.mp3";

const characterCooldowns = new Map<CharacterId, number>();
const COOLDOWN_MS = 15000;

const isMuted = ref<boolean>(false);
const fadeDuration = 1000;

const audioCtx = new (window.AudioContext ||
  (window as any).webkitAudioContext)();
const masterGain = audioCtx.createGain();
masterGain.connect(audioCtx.destination);
masterGain.gain.value = 1;

type LoopHandle = {
  src: string;
  source: AudioBufferSourceNode;
  gain: GainNode;
  buffer: AudioBuffer;
};

let currentLoop: LoopHandle | null = null;
const bufferCache = new Map<string, AudioBuffer>();

function ensureContext() {
  if (audioCtx.state === "suspended") {
    audioCtx.resume().catch(() => {});
  }
}

async function loadBuffer(url: string): Promise<AudioBuffer> {
  const cached = bufferCache.get(url);
  if (cached) return cached;
  const res = await fetch(url);
  const arr = await res.arrayBuffer();
  const buf = await audioCtx.decodeAudioData(arr);
  bufferCache.set(url, buf);
  return buf;
}

function startLoop(
  buffer: AudioBuffer,
  fadeMs = fadeDuration,
  loopStart = 0,
  loopEnd = buffer.duration
) {
  const src = audioCtx.createBufferSource();
  src.buffer = buffer;
  src.loop = true;
  src.loopStart = loopStart;
  src.loopEnd = loopEnd;

  const gain = audioCtx.createGain();
  gain.gain.setValueAtTime(0, audioCtx.currentTime);

  src.connect(gain).connect(masterGain);
  src.start();

  const now = audioCtx.currentTime;
  gain.gain.cancelScheduledValues(now);
  gain.gain.setValueAtTime(0, now);
  gain.gain.linearRampToValueAtTime(1, now + fadeMs / 1000);

  return { source: src, gain };
}

function crossfadeTo(
  buffer: AudioBuffer,
  srcUrl: string,
  fadeMs = fadeDuration
) {
  const next = startLoop(buffer, fadeMs);
  const now = audioCtx.currentTime;
  const fadeS = fadeMs / 1000;

  if (currentLoop) {
    currentLoop.gain.gain.cancelScheduledValues(now);
    currentLoop.gain.gain.setValueAtTime(currentLoop.gain.gain.value, now);
    currentLoop.gain.gain.linearRampToValueAtTime(0, now + fadeS);
    currentLoop.source.stop(now + fadeS);
  }

  currentLoop = { src: srcUrl, buffer, ...next };

  if (isMuted.value) {
    masterGain.gain.setValueAtTime(0, now);
  }
}

const currentGenericAudio = ref<HTMLAudioElement | null>(null);

export function useAudioStore() {
  function playCharacterSound(
    src: string,
    speakerKey: CharacterId | undefined = undefined
  ) {
    if (!isMuted.value) {
      if (speakerKey) {
        const now = Date.now();
        const last = characterCooldowns.get(speakerKey) || 0;
        if (now - last < COOLDOWN_MS) return;
        characterCooldowns.set(speakerKey, now);
      }
      const audio = new Audio(src);
      audio.preload = "auto";
      audio.play().catch((e) => console.warn("Audio playback failed:", e));
    }
  }

  function playGenericSound(src: string) {
    if (!isMuted.value) {
      currentGenericAudio.value = new Audio(src);
      currentGenericAudio.value.preload = "auto";
      currentGenericAudio.value
        .play()
        .catch((e) => console.warn("Audio playback failed:", e));
    }
  }

  async function playBackgroundAudio(src: string | undefined) {
    ensureContext();

    if (!src) {
      if (currentLoop) {
        const now = audioCtx.currentTime;
        const fadeS = fadeDuration / 1000;
        currentLoop.gain.gain.cancelScheduledValues(now);
        currentLoop.gain.gain.setValueAtTime(currentLoop.gain.gain.value, now);
        currentLoop.gain.gain.linearRampToValueAtTime(0, now + fadeS);
        currentLoop.source.stop(now + fadeS);
        currentLoop = null;
      }
      return;
    }

    // same track already playing
    if (currentLoop?.src === src) return;

    // decode & crossfade
    const buffer = await loadBuffer(src);
    // Optional: set seamless loop region if your file has non-zero padding
    // const loopStart = 0; // seconds
    // const loopEnd = buffer.duration; // or a trimmed value you detect/know
    crossfadeTo(buffer, src, fadeDuration);
    // If you want to enforce a loop segment:
    // const next = startLoop(buffer, fadeDuration, loopStart, loopEnd); (and handle crossfade manually)
  }

  function click() {
    playGenericSound(clickSound);
  }

  function mute() {
    isMuted.value = !isMuted.value;

    const now = audioCtx.currentTime;
    masterGain.gain.cancelScheduledValues(now);
    masterGain.gain.setValueAtTime(masterGain.gain.value, now);
    masterGain.gain.linearRampToValueAtTime(isMuted.value ? 0 : 1, now + 0.15); // small ramp to avoid clicks

    if (currentGenericAudio.value) {
      currentGenericAudio.value.muted = isMuted.value;
    }
  }

  return {
    playBackgroundAudio,
    playCharacterSound,
    playGenericSound,
    click,
    mute,
    isMuted,
  };
}
