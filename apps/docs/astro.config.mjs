import { defineConfig } from "astro/config"
import vue from "@astrojs/vue"
import { fileURLToPath } from "node:url"
import { dirname, resolve } from "node:path"

const __dirname = dirname(fileURLToPath(import.meta.url))
const workspaceRoot = resolve(__dirname, "../..")
const ruiSourceRoot = resolve(workspaceRoot, "packages/rui/src")
const ruiDevAlias = [
    {
        find: /^rui\/components$/,
        replacement: resolve(ruiSourceRoot, "components/index.ts"),
    },
    {
        find: /^rui\/components\/(.*)$/,
        replacement: `${resolve(ruiSourceRoot, "components")}/$1`,
    },
]

export default defineConfig({
    integrations: [vue()],
    i18n: {
        locales: ["en", "zh-cn"],
        defaultLocale: "en",
    },
    vite: {
        resolve: {
            alias: ruiDevAlias,
        },
        server: {
            fs: {
                allow: [workspaceRoot],
            },
        },
    },
})
