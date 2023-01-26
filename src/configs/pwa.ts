import type { RollupReplaceOptions } from "@rollup/plugin-replace";
import type { ManifestOptions, VitePWAOptions } from "vite-plugin-pwa";

import assets from "./assets.json";
import manifest from "./manifest.json";

const includeAssets = assets;

export const PWAConfig: Partial<VitePWAOptions> = {
  includeAssets,
  manifest: manifest as unknown as ManifestOptions,
  devOptions: {
    // enabled: process.env.SW_DEV === "true",
    enabled: true,
    /* when using generateSW the PWA plugin will switch to classic */
    type: "module",
  },
  workbox: {
    sourcemap: true,
    skipWaiting: true,
    navigateFallback: "/",
    cleanupOutdatedCaches: true,
    globPatterns: ["**/*.{js,css,html}", "**/*.{svg,png,jpg,gif}"],
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
