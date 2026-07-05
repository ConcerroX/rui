import type { CollectionEntry } from "astro:content"

export const locales = ["en", "zh-cn"] as const
export type Locale = (typeof locales)[number]
export type ReadingMode = "design" | "develop"
export type DocSection = "specs" | "guidelines" | "implementation"

type OrderedEntry = {
    data: {
        designOrder: number
        developOrder: number
    }
}

type NavGroup = {
    group: string
    items: CollectionEntry<"docs">[]
}

export function isLocale(value: string): value is Locale {
    return locales.includes(value as Locale)
}

export function getReadingMode(url: URL): ReadingMode {
    const mode = url.searchParams.get("mode")
    return mode === "develop" ? "develop" : "design"
}

export function sortByMode<T extends OrderedEntry>(items: T[], mode: ReadingMode) {
    const key = mode === "develop" ? "developOrder" : "designOrder"
    return [...items].sort((a, b) => a.data[key] - b.data[key])
}

export function getDefaultSection<T extends { data: { defaultTab: Record<ReadingMode, DocSection> } }>(
    item: T,
    mode: ReadingMode,
) {
    return item.data.defaultTab[mode]
}

export function getModeUrl(url: URL, mode: ReadingMode) {
    const next = new URL(url)
    next.searchParams.set("mode", mode)
    return `${next.pathname}${next.search}`
}

export function getLocaleUrl(url: URL, locale: Locale) {
    const next = new URL(url)
    const segments = next.pathname.split("/").filter(Boolean)

    if (segments.length > 0 && isLocale(segments[0])) {
        segments[0] = locale
    } else {
        segments.unshift(locale)
    }

    next.pathname = `/${segments.join("/")}`
    return `${next.pathname}${next.search}`
}

function getDocsGroup(routeSlug: string) {
    if (routeSlug === "getting-started") return "Getting started"
    if (routeSlug.startsWith("components/")) return "Components"
    return "Guides"
}

export function groupDocs(entries: CollectionEntry<"docs">[], locale: string, mode: ReadingMode): NavGroup[] {
    const grouped = new Map<string, CollectionEntry<"docs">[]>()
    const localized = sortByMode(entries.filter((item) => item.data.locale === locale), mode)

    for (const entry of localized) {
        const group = getDocsGroup(entry.data.routeSlug)
        const bucket = grouped.get(group) ?? []
        bucket.push(entry)
        grouped.set(group, bucket)
    }

    return [...grouped.entries()].map(([group, items]) => ({ group, items }))
}

export function groupApi(entries: CollectionEntry<"api">[], locale: string, mode: ReadingMode) {
    return sortByMode(entries.filter((item) => item.data.locale === locale), mode)
}
