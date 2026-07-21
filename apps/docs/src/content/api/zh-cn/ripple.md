---
title: Ripple API
routeSlug: ripple
locale: zh-cn
docs: /zh-cn/components/ripple/spec
designOrder: 160
developOrder: 60
---

## 导入

```ts
import { vRipple } from "@ripple-design/rui"
```

## 绑定值

```ts
type RippleOptions = {
  disabled?: boolean
  unbounded?: boolean
  color?: string | null
}
```

- `v-ripple` 启用默认的 bounded ripple
- `v-ripple="false"` 关闭效果
- 键盘触发的 ripple 会自动从中心扩散
- `v-ripple.unbounded` 允许波纹超出宿主边界
- `:focus-visible` 会使用 `--rui-ripple-focus-opacity` 显示焦点状态层
