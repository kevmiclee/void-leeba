// Vite will turn these into URLs at build time
export function getAssetUrls(): string[] {
  // Adjust extensions to match your project
  const modules = import.meta.glob(
    [
      // images
      "/src/assets/**/*.{png,jpg,jpeg,webp,gif,svg,avif}",
      // audio
      "/src/assets/**/*.{mp3,wav,ogg,m4a,aac,flac}",
    ],
    {
      eager: true,
      as: "url", // ✅ gives you a URL string for each asset
    }
  ) as Record<string, string>;

  return Object.values(modules);
}
