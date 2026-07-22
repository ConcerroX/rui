import mdx from "@astrojs/mdx"
import vue from "@astrojs/vue"
import { defineConfig } from "astro/config"
import path from "node:path"
import { fileURLToPath } from "node:url"

const docsSrc = fileURLToPath(new URL("./src", import.meta.url))
const ruiRoot = fileURLToPath(new URL("../../packages/rui", import.meta.url))
const ruiSrc = fileURLToPath(new URL("../../packages/rui/src", import.meta.url))

export default defineConfig({
    integrations: [vue(), mdx()],
    i18n: {
        locales: ["en", "zh-cn"],
        defaultLocale: "en",
    },
    vite: {
        resolve: {
            alias: {
                "@docs": docsSrc,
                "@ripple-design/rui/styles.css": path.join(ruiSrc, "styles/index.scss"),
                "@ripple-design/rui/components": path.join(ruiSrc, "components/index.ts"),
                "@ripple-design/rui/rui": path.join(ruiRoot, "rui.scss"),
                "@ripple-design/rui/rui.scss": path.join(ruiRoot, "rui.scss"),
                "@ripple-design/rui": path.join(ruiSrc, "index.ts"),
            },
        },
    },
})
