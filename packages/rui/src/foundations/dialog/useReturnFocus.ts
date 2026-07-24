import { ref } from "vue"

export function useReturnFocus() {
    const previousFocus = ref<HTMLElement | null>(null)

    function capture() {
        previousFocus.value = document.activeElement instanceof HTMLElement ? document.activeElement : null
    }

    function restore(enabled: boolean) {
        if (!enabled) return
        previousFocus.value?.focus()
        previousFocus.value = null
    }

    return {
        capture,
        restore,
    }
}
