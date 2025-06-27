import { defineStore } from "pinia";

type TimeoutEntry = {
  timeoutId: ReturnType<typeof setTimeout>;
  callback: () => void;
};

export const useTimeoutStore = defineStore("timeout", {
  state: () => ({
    timeouts: {} as Record<string, TimeoutEntry>,
  }),
  actions: {
    set(id: string, callback: () => void, delay: number) {
      this.clear(id, false);
      const timeoutId = setTimeout(() => {
        callback();
        delete this.timeouts[id];
      }, delay);
      this.timeouts[id] = { timeoutId, callback };
    },

    clear(id: string, runCallback: boolean) {
      const entry = this.timeouts[id];
      if (!entry) return;

      clearTimeout(entry.timeoutId);

      if (runCallback && entry.callback) {
        entry.callback();
      }

      delete this.timeouts[id];
    },

    clearAll() {
      for (const timeoutId in this.timeouts) {
        clearTimeout(this.timeouts[timeoutId].timeoutId);
      }
      this.timeouts = {};
    },
  },
});
