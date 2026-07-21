export type RippleOptions = {
    disabled?: boolean
    unbounded?: boolean
    color?: string | null
}

export type RippleDirectiveValue = boolean | RippleOptions | null | undefined

export type RippleDirectiveModifiers = Partial<Record<"unbounded", boolean>>

export type NormalizedRippleOptions = {
    disabled: boolean
    unbounded: boolean
    color: string | null
}

export function normalizeRippleOptions(
    value: RippleDirectiveValue,
    modifiers: RippleDirectiveModifiers = {},
): NormalizedRippleOptions {
    if (value === false) {
        return {
            disabled: true,
            unbounded: !!modifiers.unbounded,
            color: null,
        }
    }

    const options = typeof value === "object" && value ? value : {}

    return {
        disabled: !!options.disabled,
        unbounded: !!(modifiers.unbounded || options.unbounded),
        color: options.color ?? null,
    }
}
