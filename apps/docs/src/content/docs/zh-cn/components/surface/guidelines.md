---
title: Surface
docSlug: components/surface
tab: guidelines
locale: zh-cn
designOrder: 45
developOrder: 45
api: /zh-cn/api/surface
---

## 使用建议

Surface 只负责把相关内容放在一起，不承担按钮、卡片或布局行为。

### 适合的场景

- 面板式内容块
- 设置分组
- 需要轻微边界强调的容器

### 布局和间距分开处理

Surface 故意保持简洁。内部间距和排版请交给子包装器以及 `RStack`、`RRow`、`RColumn` 或 `RGrid` 来处理。
