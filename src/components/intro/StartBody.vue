<template>
  <div class="col">
    <img :src="logoImg" alt="Game Logo" class="centered-logo" />
    <div class="text">
      <span
        v-for="(char, index) in letters"
        :key="`${index}-start-base`"
        class="letter"
        :style="
          animationSkipped
            ? { animation: 'none', opacity: 1 }
            : { animationDelay: `${index * 0.15}s`, opacity: 0 }
        "
        v-html="char === ' ' ? '&nbsp;' : char"
      />
    </div>
  </div>
</template>

<script setup lang="ts">
import logoImg from "@/assets/images/logos/void-leeba-logo.png";

const props = defineProps<{
  letters: string[];
  animationSkipped: boolean;
}>();
</script>

<style scoped>
.col {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 2.5vw;
}

.stack {
  position: relative;
  display: flex;
  justify-content: center;
  align-items: center;
}

.centered-logo {
  margin-top: 5vw;
  max-width: 22vw;
  max-height: auto;
}

.text {
  font-size: 2vw;
  font-weight: bold;
}

.letter {
  display: inline-block;
  opacity: 0;
  animation: spiralIn 4s ease-in-out forwards;
}

@keyframes spiralIn {
  0% {
    transform: translate(5vw, 5vh) rotate(0deg);
    opacity: 0;
  }
  50% {
    transform: translate(-15vw, 5vh) rotate(270deg) rotateY(180deg);
    opacity: 0.6;
  }
  75% {
    transform: translate(1vw, -2vh) rotate(350deg);
    opacity: 0.8;
  }
  100% {
    transform: translate(0, 0) rotate(360deg) rotateY(0);
    opacity: 1;
  }
}
</style>
