<template>
  <transition name="slide">
    <div v-if="drawer.isDrawerOpen" class="drawer">
      <img
        class="drawer-bg"
        :src="drawerBg"
        alt=""
        @click.self="drawer.toggleDrawer"
      />
      <div class="drawer-content">
        <DrawerMenu v-if="drawer.drawerView === 'main'" />
        <DrawerSelectedItem v-else-if="drawer.selectedItem" />
        <DrawerSelectedDictionaryEntry
          v-else-if="drawer.selectedDictionaryEntry"
        />
        <Items v-else-if="drawer.drawerView === 'bag'" />
        <Phone v-else-if="drawer.drawerView === 'phone'" />
        <Dictionary v-else-if="drawer.drawerView === 'dictionary'" />
        <Stats v-else-if="drawer.drawerView === 'stats'" />
        <Scenes v-else-if="drawer.drawerView === 'scenes'" />
      </div>
    </div>
  </transition>
</template>

<script setup lang="ts">
import { watch } from "vue";
import DrawerMenu from "./DrawerMenu.vue";
import DrawerSelectedItem from "./DrawerSelectedItem.vue";
import DrawerSelectedDictionaryEntry from "./DrawerSelectedDictionaryEntry.vue";
import Items from "./Items.vue";
import Dictionary from "./Dictionary.vue";
import Phone from "./Phone.vue";
import Stats from "./Stats.vue";
import Scenes from "./Scenes.vue";
import drawerBg from "@/assets/images/items/bag.png";

import { useDrawerStore } from "./../../stores/drawer";

const drawer = useDrawerStore();

watch(
  () => drawer.isDrawerOpen,
  () => {
    if (!drawer.isDrawerOpen) {
      drawer.clearItem();
      drawer.setDrawerView("main");
    }
  },
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

.drawer::before {
  content: "";
  position: absolute;
  inset: 0;
  background-image: var(--drawer-bg);
  background-repeat: no-repeat;
  background-position: center;
  background-size: cover;
  z-index: 0;
}

.drawer > * {
  position: relative;
  z-index: 1;
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
  width: 100vw;
  height: auto;
  z-index: 1001;
  padding-top: 1.2vw;
  overflow-y: hidden;
}

.drawer-bg {
  display: block;
  height: auto;
  width: 100vw;
}

.drawer-content {
  position: absolute;
  height: 22vw;
  overflow-y: scroll;
  scrollbar-gutter: stable;
  overscroll-behavior: contain;
  left: 19vw;
  top: 25vw;
  width: 31vw;
  margin-top: 1.7vw;
}

.drawer-content > * {
  position: relative;
  z-index: 1;
  margin: 0 0 0.6em;
  font-size: clamp(16px, 1.6vw, 24px);
}
</style>
