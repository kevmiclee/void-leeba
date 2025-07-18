import { DrawerState } from "@/types/state";
import { defineStore } from "pinia";
import { Item } from "@/types/item";
import { usePhoneStore } from "./phone";
import { DictionaryEntry } from "@/types/dictionary";
import { DrawerView } from "@/types/drawer-view";
import { useAudioStore } from "./audio";
import { useGameStore } from "./game";

export type DrawerStore = ReturnType<typeof useDrawerStore>;

export const useDrawerStore = defineStore("drawer", {
  state: (): DrawerState => ({
    isDrawerOpen: false,
    notificationCount: 0,
    didViewPhone: false,
    drawerView: "main",
    selectedItem: null,
    selectedDictionaryEntry: null,
    phoneIsCrazy: false,
  }),
  actions: {
    toggleDrawer() {
      this.isDrawerOpen = !this.isDrawerOpen;
      if (this.didViewPhone && !this.isDrawerOpen) {
        const phone = usePhoneStore();
        phone.markAsRead();
        this.didViewPhone = false;
      }
      if (this.phoneIsCrazy && !this.isDrawerOpen) {
        this.phoneIsCrazy = false;
        const game = useGameStore();
        game.goToScene("black-dog-viral1");
      }
    },

    updateNotificationCount(value: number) {
      this.notificationCount = value;
    },

    closeDrawer() {
      this.selectedItem = null;
      this.selectedDictionaryEntry = null;
      this.drawerView = "main";
      this.toggleDrawer();
    },

    resetDrawerView() {
      const audioStore = useAudioStore();
      audioStore.click();
      if (this.drawerView == "phone") {
        const phone = usePhoneStore();
        phone.markAsRead();
      }
      this.drawerView = "main";
    },

    clearItem() {
      this.selectedItem = null;
    },

    setDrawerView(value: DrawerView) {
      this.drawerView = value;
      if (value == "phone") {
        this.didViewPhone = true;
        this.notificationCount = 0;
      }
    },

    updateSelectedItem(value: Item) {
      this.selectedItem = value;
    },

    updateSelectedDictionaryEntry(value: DictionaryEntry) {
      this.selectedDictionaryEntry = value;
    },

    clearDictionaryEntry() {
      this.selectedDictionaryEntry = null;
    },

    togglePhoneIsCrazy() {
      this.phoneIsCrazy = !this.phoneIsCrazy;
    },
  },
});
