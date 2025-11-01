<template>
  <transition name="slide">
    <div
      v-if="drawer.isDrawerOpen"
      class="drawer"
      @click.self="drawer.toggleDrawer"
    >
      <DrawerMenu v-if="drawer.drawerView === 'main'"> </DrawerMenu>
      <DrawerSelectedItem v-else-if="drawer.selectedItem"> </DrawerSelectedItem>
      <DrawerSelectedDictionaryEntry v-else-if="drawer.selectedDictionaryEntry">
      </DrawerSelectedDictionaryEntry>
      <Bag v-else-if="drawer.drawerView === 'bag'"> </Bag>
      <Phone v-else-if="drawer.drawerView === 'phone'"> </Phone>
      <Dictionary v-else-if="drawer.drawerView === 'dictionary'"></Dictionary>
      <Stats v-else-if="drawer.drawerView === 'stats'"> </Stats>
      <Scenes v-else-if="drawer.drawerView === 'scenes'"> </Scenes>
    </div>
  </transition>
</template>

<script setup lang="ts">
import { watch } from "vue";
import DrawerMenu from "./DrawerMenu.vue";
import DrawerSelectedItem from "./DrawerSelectedItem.vue";
import DrawerSelectedDictionaryEntry from "./DrawerSelectedDictionaryEntry.vue";
import Bag from "./Bag.vue";
import Dictionary from "./Dictionary.vue";
import Phone from "./Phone.vue";
import Stats from "./Stats.vue";
import Scenes from "./Scenes.vue";

import { useDrawerStore } from "./../../stores/drawer";

const drawer = useDrawerStore();

watch(
  () => drawer.isDrawerOpen,
  () => {
    if (!drawer.isDrawerOpen) {
      drawer.clearItem();
      drawer.setDrawerView("main");
    }
  }
);
</script>

<style scoped>
.icon {
  width: 3vw;
  height: auto;
  color: #9f3a27;
  cursor: pointer;
}

.icon:hover {
  color: #b56d3c;
}

.slide-enter-active,
.slide-leave-active {
  transition: transform 0.3s ease;
}
.slide-enter-from,
.slide-leave-to {
  transform: translateX(-100%);
}

.drawer {
  position: fixed;
  top: 0;
  left: 0;
  width: 20vw;
  height: 100vh;
  background: white;
  z-index: 1001;
  box-shadow: 2px 0 8px rgba(0, 0, 0, 0.3);
  padding-top: 1.2vw;
  overflow-y: auto; /* enables vertical scrolling */
}
</style>
