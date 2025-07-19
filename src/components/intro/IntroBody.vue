<template>
  <div class="col">
    <div class="eyes">
      <img class="eye" :src="eyeIsOpened ? EyeOpen : EyeClosed" />
      <img class="eye flipped" :src="eyeIsOpened ? EyeOpen : EyeClosed" />
    </div>
    <div class="animated-text">
      <span
        v-for="(char, index) in letters"
        :key="`${index}-intro`"
        class="intro-text"
        :style="
          animationSkipped
            ? { animation: 'none', opacity: 1 }
            : { animationDelay: `${index * 0.25}s`, opacity: 0 }
        "
      >
        {{ char }}
      </span>
    </div>
  </div>
</template>

<script setup lang="ts">
import EyeClosed from "@/assets/images/backgrounds/closed-eye.png";
import EyeOpen from "@/assets/images/backgrounds/open-eye.png";

const props = defineProps<{
  letters: string[];
  animationSkipped: boolean;
  eyeIsOpened: boolean;
}>();
</script>

<style scoped>
.col {
  display: flex;
  flex-direction: column;
  align-items: center;
}

.eyes {
  display: flex;
  gap: 1vw;
}

.eye {
  width: 30vw;
  height: auto;
}

.flipped {
  transform: scaleX(-1);
}

.animated-text {
  font-size: 2vw;
  font-weight: 500;
  font-weight: bold;
  color: white;
  display: inline-block;
}

.intro-text {
  opacity: 0;
  animation: fadeIn 2s forwards;
  font-style: italic;
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
