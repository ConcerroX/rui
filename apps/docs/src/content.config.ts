import { defineCollection, z } from "astro:content"
import { glob } from "astro/loaders"

const localeSchema = z.enum(["en", "zh-cn"])
const sectionSchema = z.enum(["specs", "guidelines", "implementation"])

const docs = defineCollection({
    loader: glob({
        pattern: "**/*.md",
        base: "./src/content/docs",
    }),
    schema: z.object({
        title: z.string(),
        routeSlug: z.string(),
        locale: localeSchema,
        designOrder: z.number(),
        developOrder: z.number(),
        defaultTab: z.object({
            design: sectionSchema,
            develop: sectionSchema,
        }),
        sections: z.array(sectionSchema).nonempty(),
        api: z.string(),
    }),
})

const api = defineCollection({
    loader: glob({
        pattern: "**/*.md",
        base: "./src/content/api",
    }),
    schema: z.object({
        title: z.string(),
        routeSlug: z.string(),
        locale: localeSchema,
        docs: z.string(),
        designOrder: z.number(),
        developOrder: z.number(),
    }),
})

export const collections = { docs, api }
