---
title: SVG Basics
---

## Drawing with SVG

Most of the charts we'll build are drawn with **SVG** — a vector image format you write as
markup, right inside your HTML. The basic building blocks are `<rect>`, `<circle>`, `<line>`
and `<path>`.

Every drawing lives inside an `<svg>` element with a `viewBox` that defines its coordinate space:

```svelte
/// file: Shapes.svelte
<svg viewBox="0 0 100 100">
	<circle cx="50" cy="50" r="40" fill="tomato" />
	<rect x="10" y="10" width="30" height="30" fill="steelblue" />
</svg>
```

> [!NOTE]
> The `viewBox` is `min-x min-y width height`. It sets the _internal_ coordinate system,
> independent of the pixel size the SVG actually renders at.

Try changing the `r` (radius) and `fill` values to see how the circle responds.

> [!TIP]
> Shapes drawn later in the markup appear _on top_ of earlier ones — SVG has no `z-index`.
