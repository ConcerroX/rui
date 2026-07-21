---
title: Ripple API
routeSlug: ripple
locale: en
docs: /en/components/ripple/spec
designOrder: 160
developOrder: 60
---

## Import

```ts
import { vRipple } from "@ripple-design/rui"
```

## Binding

```ts
type RippleOptions = {
  disabled?: boolean
  unbounded?: boolean
  color?: string | null
}
```

- `v-ripple` enables bounded pointer-origin ripple
- `v-ripple="false"` disables the effect
- keyboard-triggered ripples launch from the center automatically
- `v-ripple.unbounded` allows the ripple to extend beyond the host bounds
- `:focus-visible` applies a focus state layer using `--rui-ripple-focus-opacity`
