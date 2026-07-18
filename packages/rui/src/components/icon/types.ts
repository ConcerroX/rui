/** Props for the {@link RIcon} component. */
export type RIconProps = {
    /** SVG path data for the icon. */
    icon: string
    /** Controls the icon size. Numbers map to pixels, while strings pass through directly. */
    size?: string | number
    /** Forces the icon to be decorative and hidden from assistive technology. */
    decorative?: boolean
    /** Sets the accessible name announced for a non-decorative icon. */
    label?: string
}
