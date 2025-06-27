<template>
  <MiniGameTreeChase v-if="miniGameId == 'tree-chase'"></MiniGameTreeChase>
</template>

<script setup lang="ts">
import MiniGameTreeChase from "./MiniGameTreeChase.vue";

const props = defineProps<{
  miniGameId: string;
}>();
</script>
