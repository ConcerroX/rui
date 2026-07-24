import type { App, InjectionKey, Plugin, Ref } from "vue"

import { inject, ref } from "vue"

export type RThemeColors = {
    primary?: string
    onSurfaceHigh?: string
    onSurfaceMedium?: string
}

export type RShapeFamily = "rounded" | "cut"
export type RThemeShapeCorner = string | number
export type RThemeShapeCorners =
    | RThemeShapeCorner
    | [RThemeShapeCorner]
    | [RThemeShapeCorner, RThemeShapeCorner]
    | [RThemeShapeCorner, RThemeShapeCorner, RThemeShapeCorner]
    | [RThemeShapeCorner, RThemeShapeCorner, RThemeShapeCorner, RThemeShapeCorner]

export type RThemeShapeCategory = {
    family?: RShapeFamily
    corners?: RThemeShapeCorners
    startStart?: RThemeShapeCorner
    startEnd?: RThemeShapeCorner
    endEnd?: RThemeShapeCorner
    endStart?: RThemeShapeCorner
}

export type RThemeShapes = {
    small?: RThemeShapeCategory
    medium?: RThemeShapeCategory
    large?: RThemeShapeCategory
    full?: RThemeShapeCategory
}

export type RTheme = {
    color?: RThemeColors
    shape?: RThemeShapes
}

export type RThemeController = {
    theme: Ref<RTheme>
    setTheme: (nextTheme: Partial<RTheme>) => void
    resetTheme: () => void
}

export type RThemePluginOptions = {
    theme?: RTheme
    target?: HTMLElement
}

function shapeFamilyToCSS(family: RShapeFamily) {
    return family === "cut" ? "bevel" : "round"
}

function shapeCornerToCSS(value: RThemeShapeCorner) {
    return typeof value === "number" ? `${value}px` : value
}

function expandShapeCorners(corners: RThemeShapeCorners) {
    if (Array.isArray(corners)) {
        if (corners.length === 1) {
            return [corners[0], corners[0], corners[0], corners[0]] as const
        }

        if (corners.length === 2) {
            return [corners[0], corners[1], corners[0], corners[1]] as const
        }

        if (corners.length === 3) {
            return [corners[0], corners[1], corners[2], corners[1]] as const
        }

        if (corners.length === 4) {
            return [corners[0], corners[1], corners[2], corners[3]] as const
        }

        throw new Error("[RUI] Shape corners must contain between 1 and 4 values")
    }

    return [corners, corners, corners, corners] as const
}

function resolveShapeCategory(shape: RThemeShapeCategory) {
    const expanded = shape.corners ? expandShapeCorners(shape.corners) : undefined

    return {
        family: shape.family ? shapeFamilyToCSS(shape.family) : undefined,
        startStart: shape.startStart != null ? shapeCornerToCSS(shape.startStart) : expanded?.[0] != null ? shapeCornerToCSS(expanded[0]) : undefined,
        startEnd: shape.startEnd != null ? shapeCornerToCSS(shape.startEnd) : expanded?.[1] != null ? shapeCornerToCSS(expanded[1]) : undefined,
        endEnd: shape.endEnd != null ? shapeCornerToCSS(shape.endEnd) : expanded?.[2] != null ? shapeCornerToCSS(expanded[2]) : undefined,
        endStart: shape.endStart != null ? shapeCornerToCSS(shape.endStart) : expanded?.[3] != null ? shapeCornerToCSS(expanded[3]) : undefined,
    }
}

/** Converts a runtime theme object into CSS variable key-value pairs. */
export function themeToCSSVars(theme: RTheme) {
    const vars: Record<string, string> = {}

    if (theme.color?.primary) {
        vars["--rui-sys-color-primary"] = theme.color.primary
    }

    if (theme.color?.onSurfaceHigh) {
        vars["--rui-sys-color-on-surface-high"] = theme.color.onSurfaceHigh
    }

    if (theme.color?.onSurfaceMedium) {
        vars["--rui-sys-color-on-surface-medium"] = theme.color.onSurfaceMedium
    }

    const categories = ["small", "medium", "large", "full"] as const

    for (const category of categories) {
        const shape = theme.shape?.[category]
        if (!shape) continue

        const resolved = resolveShapeCategory(shape)
        const prefix = `--rui-sys-shape-${category}`

        if (resolved.family) {
            vars[`${prefix}-family`] = resolved.family
        }

        if (resolved.startStart) {
            vars[`${prefix}-start-start`] = resolved.startStart
        }

        if (resolved.startEnd) {
            vars[`${prefix}-start-end`] = resolved.startEnd
        }

        if (resolved.endEnd) {
            vars[`${prefix}-end-end`] = resolved.endEnd
        }

        if (resolved.endStart) {
            vars[`${prefix}-end-start`] = resolved.endStart
        }
    }

    return vars
}

function clearTheme(theme: RTheme, target: HTMLElement) {
    const vars = themeToCSSVars(theme)

    for (const name of Object.keys(vars)) {
        target.style.removeProperty(name)
    }
}

/** Applies a runtime theme by writing CSS variables onto the target element. */
export function applyTheme(theme: RTheme, target: HTMLElement = document.documentElement) {
    const vars = themeToCSSVars(theme)

    for (const [name, value] of Object.entries(vars)) {
        target.style.setProperty(name, value)
    }
}

const themeKey: InjectionKey<RThemeController> = Symbol("ruiTheme")

function mergeShapeCategory(base?: RThemeShapeCategory, next?: RThemeShapeCategory) {
    if (!base && !next) return undefined

    return {
        ...base,
        ...next,
    }
}

function mergeTheme(base: RTheme, nextTheme: Partial<RTheme>): RTheme {
    return {
        color: {
            ...base.color,
            ...nextTheme.color,
        },
        shape: {
            small: mergeShapeCategory(base.shape?.small, nextTheme.shape?.small),
            medium: mergeShapeCategory(base.shape?.medium, nextTheme.shape?.medium),
            large: mergeShapeCategory(base.shape?.large, nextTheme.shape?.large),
            full: mergeShapeCategory(base.shape?.full, nextTheme.shape?.full),
        },
    }
}

function createThemeController(
    initialTheme: RTheme = {},
    target: HTMLElement = document.documentElement,
): RThemeController {
    const theme = ref<RTheme>(initialTheme)
    const defaultTheme = initialTheme

    applyTheme(initialTheme, target)

    return {
        theme,
        setTheme(nextTheme) {
            const merged = mergeTheme(theme.value, nextTheme)
            clearTheme(theme.value, target)
            theme.value = merged
            applyTheme(theme.value, target)
        },
        resetTheme() {
            clearTheme(theme.value, target)
            theme.value = defaultTheme
            applyTheme(defaultTheme, target)
        },
    }
}

export const themePlugin: Plugin = {
    install(app: App, options: RThemePluginOptions = {}) {
        const controller = createThemeController(options.theme ?? {}, options.target ?? document.documentElement)
        app.provide(themeKey, controller)
        app.config.globalProperties.$ruiTheme = controller
    },
}

export function useTheme() {
    const controller = inject(themeKey)
    if (!controller) throw new Error("[RUI] useTheme must be used after installing themePlugin")
    return controller
}
