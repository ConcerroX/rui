---
title: Shape
docSlug: components/shape
tab: guidelines
locale: zh-cn
designOrder: 35
developOrder: 35
api: /zh-cn/api/shape
---

## 使用建议

把 shape token 当成 foundation 使用，而不是给每个组件开放随意的 radius 调节项。

### 类别

- `small`：紧凑控件和较小 surface
- `medium`：默认的 surface 类容器
- `large`：应当保持更平直观感的大块区域
- `full`：胶囊或完全圆润的形状

### 角族

- `rounded`：标准圆角
- `cut`：通过 `corner-shape` 产生切角，同时保留相同的逻辑角尺寸

### 角值

角值使用逻辑方向：
- `start-start`
- `start-end`
- `end-end`
- `end-start`

优先修改类别 token 或运行时 theme 值，而不是引入组件级 radius prop。
