<template>
  <div class="sub-menu-header" @click.stop="drawer.resetDrawerView">
    < Stats
  </div>
  <div v-if="aspects.length > 0" class="stat-header">
    Aspects
    <p v-for="(aspect, index) in aspects" class="stat">
      {{ aspect.name }}
      <br />
      Duration: {{ aspect.durationScenes }}
      <br />
      Scenes remaining: {{ aspect.scenesRemaining }}
      <br />
      Description: {{ aspect.description }}
    </p>
  </div>
  <div v-if="Object.keys(character.flags).length > 0" class="stat-header">
    Flags
    <p v-for="(value, key) in character.flags" class="stat">
      {{ key }}: {{ value }}
    </p>
  </div>
  <div v-if="character.manners" class="stat-header">
    Manners
    <p class="stat">
      {{ character.manners }}
    </p>
  </div>
</template>

<script setup lang="ts">
import { useAspectStore } from "@/stores/aspects";
import { useCharacterStore } from "@/stores/character";
import { useDrawerStore } from "@/stores/drawer";
import { computed } from "vue";

const drawer = useDrawerStore();
const character = useCharacterStore();
const aspectsStore = useAspectStore();

const aspects = computed(() => aspectsStore.aspects);
</script>

<style scoped>
.stat-header {
  font-weight: 600;
  margin-left: 1vw;
}

.stat {
  margin-top: 0.5vw;
  font-weight: 400;
  font-size: 1vw;
}
</style>
