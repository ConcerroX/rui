import type { App, InjectionKey, Plugin, Ref } from "vue"

import { inject, ref } from "vue"

export type RThemeColors = {
    primary?: string
    onSurfaceHigh?: string
    onSurfaceMedium?: string
}

export type RTheme = {
    color?: RThemeColors
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

    return vars
}

/** Applies a runtime theme by writing CSS variables onto the target element. */
export function applyTheme(theme: RTheme, target: HTMLElement = document.documentElement) {
    const vars = themeToCSSVars(theme)

    console.log("[RUI] Applying theme:", theme, target, vars)
    for (const [name, value] of Object.entries(vars)) {
        target.style.setProperty(name, value)
    }
}

const themeKey: InjectionKey<RThemeController> = Symbol("ruiTheme")

function mergeTheme(base: RTheme, nextTheme: Partial<RTheme>): RTheme {
    return {
        color: {
            ...base.color,
            ...nextTheme.color,
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
            theme.value = mergeTheme(theme.value, nextTheme)
            applyTheme(theme.value, target)
        },
        resetTheme() {
            theme.value = defaultTheme
            applyTheme(defaultTheme, target)
        },
    }
}

export const themePlugin: Plugin = {
    install(app: App, options: RThemePluginOptions = {}) {
        const controller = createThemeController(options.theme ?? {}, options.target ?? document.documentElement)
        console.log("[RUI] Installing theme plugin:", controller)
        app.provide(themeKey, controller)
        app.config.globalProperties.$ruiTheme = controller
    },
}

export function useTheme() {
    const controller = inject(themeKey)
    if (!controller) throw new Error("[RUI] useTheme must be used after installing themePlugin")
    return controller
}
