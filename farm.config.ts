import { defineConfig } from "@farmfe/core";
import farmPostcssPlugin from "@farmfe/js-plugin-postcss";
import path from "path";

export default defineConfig({
    plugins: ["@farmfe/plugin-react", farmPostcssPlugin()],
    compilation: {
        resolve: {
            alias: {
                "@": path.resolve(__dirname, "./src"),
            },
        },
    },
    server: {
        proxy: {
            "/api": { target: "http://localhost:3001", changeOrigin: true },
        },
    },
});
