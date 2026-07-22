export type RippleContrast = "low" | "high"

export type RippleOptions = {
    disabled?: boolean
    unbounded?: boolean
    color?: string | null
    contrast?: RippleContrast
}

export type RippleDirectiveValue = RippleOptions | null | undefined

export type RippleDirectiveModifiers = Partial<Record<"unbounded", boolean>>

export type NormalizedRippleOptions = {
    disabled: boolean
    unbounded: boolean
    color: string | null
    contrast: RippleContrast
}

export function normalizeRippleOptions(
    value: RippleDirectiveValue,
    modifiers: RippleDirectiveModifiers = {},
): NormalizedRippleOptions {
    const options = value ?? {}

    return {
        disabled: !!options.disabled,
        unbounded: !!(modifiers.unbounded || options.unbounded),
        color: options.color ?? null,
        contrast: options.contrast ?? "low",
    }
}
