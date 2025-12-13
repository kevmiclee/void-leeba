// src/preload/preloadAll.ts

type ProgressCb = (info: {
  loaded: number;
  total: number;
  url?: string;
}) => void;

function isImage(url: string) {
  return /\.(png|jpe?g|webp|gif|svg|avif)(\?.*)?$/i.test(url);
}

function isAudio(url: string) {
  return /\.(mp3|wav|ogg|m4a|aac|flac)(\?.*)?$/i.test(url);
}

function preloadImage(url: string) {
  return new Promise<void>((resolve, reject) => {
    const img = new Image();
    img.onload = () => resolve();
    img.onerror = () => reject(new Error(`Image failed: ${url}`));
    img.src = url;
  });
}

function preloadAudio(url: string) {
  return new Promise<void>((resolve, reject) => {
    const audio = new Audio();
    audio.preload = "auto";

    const done = () => resolve();
    const fail = () => reject(new Error(`Audio failed: ${url}`));

    audio.addEventListener("canplaythrough", done, { once: true });
    audio.addEventListener("error", fail, { once: true });

    audio.src = url;
    audio.load();
  });
}

export async function preloadAllAssets(
  urls: string[],
  onProgress?: ProgressCb
) {
  const total = urls.length;
  let loaded = 0;

  const tick = (url?: string) => onProgress?.({ loaded, total, url });

  const tasks = urls.map(async (url) => {
    try {
      if (isImage(url)) await preloadImage(url);
      else if (isAudio(url)) await preloadAudio(url);
      // else: ignore other file types
    } finally {
      loaded += 1;
      tick(url);
    }
  });

  // Don’t hard-fail startup because 1 asset is missing:
  await Promise.allSettled(tasks);
  return { loaded, total };
}
