import type { RollupReplaceOptions } from "@rollup/plugin-replace";
import type { ManifestOptions, VitePWAOptions } from "vite-plugin-pwa";

import assets from "./assets.json";

const includeAssets = assets;

export const PWAConfig: Partial<VitePWAOptions> = {
  includeAssets,
  manifest: {
    name: "Genius Invokation TCG",
    short_name: "GI TCG",
    description: "Genius Invokation TCG Simulator",
    theme_color: "#fff",
    start_url: "index.html",
    scope: "/",
    icons: [
      {
        src: "icon-48x48.png",
        sizes: "48x48",
        type: "image/png",
      },
      {
        src: "icon-72x72.png",
        sizes: "72x72",
        type: "image/png",
      },
      {
        src: "icon-96x96.png",
        sizes: "96x96",
        type: "image/png",
      },
      {
        src: "icon-128x128.png",
        sizes: "128x128",
        type: "image/png",
      },
      {
        src: "icon-144x144.png",
        sizes: "144x144",
        type: "image/png",
      },
      {
        src: "icon-152x152.png",
        sizes: "152x152",
        type: "image/png",
      },
      {
        src: "icon-192x192.png",
        sizes: "192x192",
        type: "image/png",
      },
      {
        src: "icon-384x384.png",
        sizes: "284x284",
        type: "image/png",
      },
      {
        src: "icon-512x512.png",
        sizes: "512x512",
        type: "image/png",
      },
    ],
    // display: "standalone",
    // orientation: "landscape",
  },
  devOptions: {
    // enabled: process.env.SW_DEV === "true",
    enabled: true,
    /* when using generateSW the PWA plugin will switch to classic */
    type: "module",
  },
  workbox: {
    sourcemap: true,
    // globPatterns: ["**/*.{js,css,html}", "**/*.{svg,png,jpg,gif}"],
  },
};

export const replaceOptions: Partial<RollupReplaceOptions> = {
  __DATE__: new Date().toISOString(),
};
const claims = process.env.CLAIMS === "true";
const reload = process.env.RELOAD_SW === "true";
const selfDestroying = process.env.SW_DESTROY === "true";

if (process.env.SW === "true") {
  PWAConfig.srcDir = "src";
  PWAConfig.filename = claims ? "claims-sw.ts" : "prompt-sw.ts";
  PWAConfig.strategies = "injectManifest";
  (PWAConfig.manifest as Partial<ManifestOptions>).name = "PWA Inject Manifest";
  (PWAConfig.manifest as Partial<ManifestOptions>).short_name = "PWA Inject";
}

if (claims) PWAConfig.registerType = "autoUpdate";

if (reload) {
  replaceOptions.__RELOAD_SW__ = "true";
}

if (selfDestroying) PWAConfig.selfDestroying = selfDestroying;
