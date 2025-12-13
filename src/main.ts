import { createApp } from "vue";
import { createPinia } from "pinia";
import piniaPersistedState from "pinia-plugin-persistedstate";
import App from "./App.vue";

import { getAssetUrls } from "./preload/assets";
import { preloadAllAssets } from "./preload/preload-all";

function setBootProgress(pct: number) {
  const bar = document.getElementById("boot-progress");
  const text = document.getElementById("boot-progress-text");

  const clamped = Math.max(0, Math.min(100, pct));
  if (bar) bar.style.width = `${clamped}%`;
  if (text) text.textContent = `${Math.round(clamped)}%`;
}

function removeBootLoader() {
  const loader = document.getElementById("boot-loader");
  if (loader) loader.remove();
}

async function bootstrap() {
  const pinia = createPinia();
  pinia.use(piniaPersistedState);

  const urls = getAssetUrls();
  const total = urls.length || 1;

  setBootProgress(0);

  await preloadAllAssets(urls, ({ loaded }) => {
    setBootProgress((loaded / total) * 100);
  });

  // Ensure bar hits 100% before removing
  setBootProgress(100);
  removeBootLoader();

  createApp(App).use(pinia).mount("#app");
}

bootstrap();
