<template>
  <div class="sub-menu-header" @click.stop="drawer.clearItem">
    < {{ drawer.selectedItem!.label }}
  </div>
  <p class="item-desc">{{ drawer.selectedItem!.description }}</p>
  <div class="button-wrapper">
    <button @click.stop="useItem">Use</button
    ><button v-if="!drawer.selectedItem!.permanent" @click.stop="dropItem">
      Drop
    </button>
  </div>
</template>

<script setup lang="ts">
import { useSnackbarStore } from "@/stores/snackbar";
import { useCharacterStore } from "@/stores/character";
import { useDrawerStore } from "@/stores/drawer";
import { useAudioStore } from "@/stores/audio";

const snackbar = useSnackbarStore();
const character = useCharacterStore();
const drawer = useDrawerStore();
const audioStore = useAudioStore();

async function useItem() {
  audioStore.click();
  const item = drawer.selectedItem!;
  drawer.closeDrawer();
  await snackbar.show(item.actionText ?? "Nothing happened.");
  character.useItem(item.id);
}

function dropItem() {
  audioStore.click();
  character.removeFromInventory(drawer.selectedItem!.id);
  snackbar.show(`-1 ${drawer.selectedItem!.label}`);
  drawer.clearItem();
}
</script>

<style scoped>
.item-desc {
  margin: 1vw;
}

.button-wrapper {
  justify-content: center;
  display: flex;
  gap: 1vw;
}
</style>
