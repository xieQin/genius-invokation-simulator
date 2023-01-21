import replace from "@rollup/plugin-replace";
import legacy from "@vitejs/plugin-legacy";
import react from "@vitejs/plugin-react";
import { fileURLToPath } from "url";
import { defineConfig, loadEnv, PluginOption } from "vite";
import { VitePWA } from "vite-plugin-pwa";

import { PWAConfig, replaceOptions } from "./src/configs/pwa";

// https://vitejs.dev/config/
export default ({ mode }: { mode: string }) => {
  process.env = { ...process.env, ...loadEnv(mode, process.cwd()) };

  return defineConfig({
    build: {
      sourcemap: process.env.SOURCE_MAP === "true",
    },
    plugins: [
      legacy(),
      react(),
      VitePWA(PWAConfig),
      replace(replaceOptions) as PluginOption,
    ],
    resolve: {
      alias: {
        // for TypeScript path alias import like : @/x/y/z
        "@": fileURLToPath(new URL("./src", import.meta.url)),
      },
    },
    server: {
      proxy: {
        "/api": {
          target: "http://localhost:8080",
          secure: false,
          rewrite: path => path.replace(/^\/api/, ""),
        },
      },
    },
  });
};
