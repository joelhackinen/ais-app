import path from "path";
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// https://vitejs.dev/config/
export default defineConfig(({ command }) =>
  command === "serve"
    ? {
        plugins: [react()],
        resolve: {
          alias: {
            "@": path.resolve(__dirname, "./src"),
          },
        },
        server: {
          watch: {
            usePolling: true,
          },
          host: true,
          port: 3000,
          strictPort: true,
        },
      }
    : {
        plugins: [react()],
        resolve: {
          alias: {
            "@": path.resolve(__dirname, "./src"),
          },
        },
        server: {
          port: 80,
          strictPort: true,
        },
        build: {
          assetsDir: ".",
        },
      },
);