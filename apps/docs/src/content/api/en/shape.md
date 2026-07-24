---
title: Shape API
routeSlug: shape
locale: en
docs: /en/components/shape/spec
designOrder: 135
developOrder: 35
---

## CSS variables

### Categories

- `--rui-sys-shape-small-family`
- `--rui-sys-shape-small-start-start`
- `--rui-sys-shape-small-start-end`
- `--rui-sys-shape-small-end-end`
- `--rui-sys-shape-small-end-start`

Repeat the same structure for `medium`, `large`, and `full`.

### Families

- `round` for rounded corners
- `bevel` for cut-corner rendering through `corner-shape`

## Runtime theme types

```ts
type RShapeFamily = "rounded" | "cut"

type RThemeShapeCategory = {
  family?: RShapeFamily
  corners?: string | number | [string | number] | [string | number, string | number] | [string | number, string | number, string | number] | [string | number, string | number, string | number, string | number]
  startStart?: string | number
  startEnd?: string | number
  endEnd?: string | number
  endStart?: string | number
}

type RThemeShapes = {
  small?: RThemeShapeCategory
  medium?: RThemeShapeCategory
  large?: RThemeShapeCategory
  full?: RThemeShapeCategory
}
```

## Notes

- Logical corners are `start-start`, `start-end`, `end-end`, and `end-start`.
- `corners` accepts 1 to 4 values and expands like CSS corner shorthand.
- `cut` currently maps to `bevel` for `corner-shape`.
