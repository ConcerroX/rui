---
title: Shape
docSlug: components/shape
tab: spec
locale: zh-cn
designOrder: 35
developOrder: 35
api: /zh-cn/api/shape
---

## 概述

Shape 是一个共享的角形基础层，用来统一组件的角处理方式。

系统定义了 `small`、`medium`、`large`、`full` 四个类别。每个类别同时包含：
- 一个角族（`rounded` 或 `cut`）
- 四个逻辑角尺寸

这样既能保持 MD2 风格的默认值，也能支持不对称角和切角。
