import type { Directive } from "vue"

import { createRippleController } from "./engine.ts"
import { normalizeRippleOptions, type RippleDirectiveValue } from "./types.ts"

const controllers = new WeakMap<HTMLElement, ReturnType<typeof createRippleController>>()

/** Adds a Material-style ripple interaction layer to a host element. */
export const vRipple: Directive<HTMLElement, RippleDirectiveValue> = {
    mounted(el, binding) {
        const controller = createRippleController(el, normalizeRippleOptions(binding.value, binding.modifiers))
        controllers.set(el, controller)
    },
    updated(el, binding) {
        const controller = controllers.get(el)
        if (!controller) {
            return
        }

        controller.update(normalizeRippleOptions(binding.value, binding.modifiers))
    },
    unmounted(el) {
        const controller = controllers.get(el)
        if (!controller) {
            return
        }

        controller.destroy()
        controllers.delete(el)
    },
    getSSRProps() {
        return {}
    },
}
