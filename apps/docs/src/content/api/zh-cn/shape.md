---
title: Shape API
routeSlug: shape
locale: zh-cn
docs: /zh-cn/components/shape/spec
designOrder: 135
developOrder: 35
---

## CSS 变量

### 类别

- `--rui-sys-shape-small-family`
- `--rui-sys-shape-small-start-start`
- `--rui-sys-shape-small-start-end`
- `--rui-sys-shape-small-end-end`
- `--rui-sys-shape-small-end-start`

`medium`、`large`、`full` 也使用同样的结构。

### 角族

- `round`：标准圆角
- `bevel`：通过 `corner-shape` 实现切角

## 运行时主题类型

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

## 说明

- 逻辑角顺序是 `start-start`、`start-end`、`end-end`、`end-start`。
- `corners` 支持 1 到 4 个值，并按 CSS 角简写规则展开。
- `cut` 目前会映射为 `corner-shape` 的 `bevel`。
