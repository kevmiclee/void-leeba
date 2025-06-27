<template>
  <div class="sub-menu-header" @click.stop="drawer.resetDrawerView">< Stats</div>
  <p v-if="aspects.activeAspects.length > 0" class="stat-header">
    Aspects
    <p v-for="(aspect, index) in aspects.activeAspects" class="stat">
      {{ aspect.name }}
      Duration: {{ aspect.durationScenes }}
      Scenes remaining: {{ aspect.scenesRemaining }}
      <!-- TODO: Description -->
    </p>
</p>
  <p v-if="Object.keys(character.flags).length > 0" class="stat-header">
    Flags
    <p v-for="(value, key) in character.flags" class="stat">
    {{ key }}: {{ value }}
    </p>
</p>
</template>

<script setup lang="ts">
import { useAspectStore } from "@/stores/aspects";
import { useCharacterStore } from "@/stores/character";
import { useDrawerStore } from "@/stores/drawer";

const drawer = useDrawerStore();
const character = useCharacterStore();
const aspects = useAspectStore();

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
