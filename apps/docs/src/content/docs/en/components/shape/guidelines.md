---
title: Shape
docSlug: components/shape
tab: guidelines
locale: en
designOrder: 35
developOrder: 35
api: /en/api/shape
---

## Usage

Use shape tokens as a foundation, not as ad hoc per-component styling knobs.

### Categories

- `small`: compact controls and smaller surfaces
- `medium`: default surface-like containers
- `large`: large blocks that should stay visually flat
- `full`: pill or fully rounded shapes

### Families

- `rounded` keeps standard rounded corners
- `cut` uses `corner-shape` to produce cut corners while preserving the same logical corner sizes

### Corner values

Corner values are logical and independent:
- `start-start`
- `start-end`
- `end-end`
- `end-start`

Prefer changing category tokens or runtime theme values over introducing component-specific radius props.
