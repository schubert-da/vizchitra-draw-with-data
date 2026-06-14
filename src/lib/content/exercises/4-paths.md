---
title: Draw anything with Paths
---

## Paths

The `<path>` is the most powerful shape in SVG - with it you can draw _anything_: straight
lines, curves, rectangles and arcs. The whole shape is described by a single attribute, `d`.

```svelte
/// file: A path that draws a triangle
<svg class="chart" width="700" height="400">
	<path d="M 100 300 L 250 80 L 400 300 Z" fill="tomato" />
</svg>
```

Its attributes are:

- **`d`** - the _path data_: the list of drawing commands that define the shape.
- **`fill`** - the colour filling the enclosed area (set it to `none` for an outline only).
- **`stroke`** - the colour of the outline.
- **`stroke-width`** - the thickness of the outline.

<br><br>

## The `d` attribute

The `d` string is a little language of its own - single-letter commands, each followed by coordinates telling you where to move the pen that draws your path:

- **`M x y`** - _move_ the pen to `(x, y)` without drawing. Every path begins with an `M`.
- **`L x y`** - draw a straight _line_ to `(x, y)`.
- **`Z`** - _close_ the path with a straight line back to where it started.
- **`C ...`** - draw a _curve_ (we'll meet this at the end).

So the triangle above reads: _move_ to `(100, 300)`, _line_ to `(250, 80)`, _line_ to
`(400, 300)`, then _close_.

> [!IMPORTANT]
> You'll almost never write a `d` string by hand. In real projects a library like D3
> (`d3.arc()`, `d3.area()`) turns your data straight into the `d` string - we're doing it manually here only to see it works under the hood.

---

## Exercise: an area chart

Let's bring back the scatter points again to create an **area chart** - a filled region under the line. A path does this neatly: trace the points along the top, drop straight down to the base of the chart, run back along the base, and close.

The points are already given to you as pixel coordinates (so there's no percentage math to do) - just read each circle's `cx`/`cy` straight into the path's `d`:

```svelte
/// file: An area chart through the points
<svg class="chart" width="700" height="400">
	<path
		d="M 70 268 L 175 300 ... and so on ... Z"
		fill="rgba(70, 130, 180, 0.4)"
		stroke="steelblue"
		stroke-width="2"
	/>

	<circle cx="70" cy="268" r="6" fill="steelblue" />
	<circle cx="175" cy="300" r="6" fill="steelblue" />
	<circle cx="280" cy="300" r="6" fill="steelblue" />
	<circle cx="350" cy="200" r="6" fill="steelblue" />
	<circle cx="560" cy="120" r="6" fill="steelblue" />
</svg>
```

Reading the `d`: `M` to the first point, five `L`s through the points left to right (ordered by `x`: `70, 175, 280, 350, 560`), then `L 560 400` and `L 70 400` drop to the base and run back along it, and `Z` closes the shape.

---

## Example: Curved paths

Straight lines are only the start. The **`C`** command draws a cubic Bézier curve: two _control points_ that pull the line into a smooth bend, followed by the end point. Chain a few together and you can draw curved shapes - the basis of radar charts, donut segments and smoothed areas.

```svelte
/// file: A smooth B-spline area (eases past the points)
<path
	d="M 70 268 L 88 273 C 105 279, 140 289, 175 295 C 210 300, 245 300, 274 283 C 303 267, 327 233, 373 203 C 420 173, 490 147, 525 133 L 560 120 L 560 400 L 70 400 Z"
	fill="rgba(70, 130, 180, 0.4)"
	stroke="steelblue"
	stroke-width="2"
/>
```
