<template>
  <MiniGameTreeChase v-if="miniGameId == 'tree-chase'"></MiniGameTreeChase>
  <MiniGameSquirrel v-if="miniGameId == 'squirrel'"></MiniGameSquirrel>
</template>

<script setup lang="ts">
import MiniGameSquirrel from "./MiniGameSquirrel.vue";
import MiniGameTreeChase from "./MiniGameTreeChase.vue";

const props = defineProps<{
  miniGameId: string;
}>();
</script>
