---
title: SVG Coordinates
---

## The coordinate system

SVG's origin `(0, 0)` sits at the **top-left** corner. `x` grows to the right and `y` grows
_downward_ — the opposite of the maths convention you might expect.

```svelte
/// file: Grid.svelte
<svg viewBox="0 0 200 100">
	<circle cx="0" cy="0" r="4" />
	<circle cx="200" cy="0" r="4" />
	<circle cx="0" cy="100" r="4" />
	<circle cx="200" cy="100" r="4" />
</svg>
```

The four circles above sit at the corners of the `viewBox`.

> [!WARNING]
> Because `y` increases downward, a higher data value usually needs a _smaller_ `y`. This flip
> is the most common source of upside-down charts.

> [!NOTE]
> A scale function (we'll meet `d3.scaleLinear` soon) is just a tidy way to map data values
> into these pixel coordinates.
