export function shouldRenderTouchTarget(density?: number) {
    return (density ?? 0) === 0
}
