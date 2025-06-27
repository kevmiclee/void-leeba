// stores/snackbar.ts
import { defineStore } from "pinia";

let timeoutId: number;

export const useSnackbarStore = defineStore("snackbar", {
  state: () => ({
    visible: false,
    message: "",
    timeout: 5000,
  }),
  actions: {
    async show(message: string) {
      this.message = message;
      this.visible = true;
      await new Promise((resolve) => {
        timeoutId = setTimeout(resolve, this.timeout);
      });
      if (timeoutId && timeoutId != 0) {
        this.visible = false;
      }
    },
    dismiss() {
      clearTimeout(timeoutId);
      timeoutId = 0;
      this.visible = false;
    },
  },
});
