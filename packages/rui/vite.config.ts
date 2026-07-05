import { fileURLToPath, URL } from "node:url"

import { defineConfig } from "vite"
import vue from "@vitejs/plugin-vue"
import dts from "vite-plugin-dts"

export default defineConfig({
    plugins: [
        vue(),
        dts({
            entryRoot: "src",
            outDirs: ["./dist"],
            tsconfigPath: "./tsconfig.json",
        }),
    ],
    resolve: {
        alias: {
            "@": fileURLToPath(new URL("./src", import.meta.url)),
        },
    },
    build: {
        lib: {
            entry: {
                index: fileURLToPath(new URL("./src/index.ts", import.meta.url)),
                "components/index": fileURLToPath(new URL("./src/components/index.ts", import.meta.url)),
            },
            formats: ["es"],
        },
        rolldownOptions: {
            external: ["vue"],
        },
    },
})
