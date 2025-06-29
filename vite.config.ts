import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import * as path from "path";
import { fileURLToPath } from "url";

// https://vite.dev/config/
export default defineConfig({
    plugins: [react()],
    resolve: {
        alias: {
            "@": path.resolve(__dirname, "src"),
        }
    },
    root: __dirname,
    build: {
        outDir: path.resolve(__dirname, "dist"),
        emptyOutDir: true,
    },
    server: {
        fs: {
            strict: true,
            deny: ["**/.*"],
        },
    },
});
