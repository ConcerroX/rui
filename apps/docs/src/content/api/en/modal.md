---
title: Modal API
routeSlug: modal
locale: en
docs: /en/components/modal/spec
designOrder: 150
developOrder: 80
---

<!-- AUTO-GENERATED:START -->

## Import

```ts
import { RModal } from "@ripple-design/rui"
```

## Props

| Name | Type | Required | Description |
| --- | --- | --- | --- |
| `modelValue` | `boolean` | no | Controls whether the modal is open. |
| `closeOnEscape` | `boolean` | no | Allows the Escape key / native cancel event to close the modal. |
| `closeOnBackdrop` | `boolean` | no | Allows clicking the backdrop area to close the modal. |
| `returnFocus` | `boolean` | no | Restores focus to the previously focused element after close. |
| `initialFocus` | `string \| HTMLElement` | no | Moves focus to a specific element after the modal opens. |
| `ariaLabel` | `string` | no | Sets an accessible label when no visible title is present. |
| `ariaLabelledBy` | `string` | no | Points to the element that labels the modal. |
| `ariaDescribedBy` | `string` | no | Points to the element that describes the modal. |
| `role` | `"dialog" \| "alertdialog"` | no | Controls the dialog role announced to assistive technology. |

Generated from `packages/rui/src/components/modal/types.ts`.

<!-- AUTO-GENERATED:END -->
