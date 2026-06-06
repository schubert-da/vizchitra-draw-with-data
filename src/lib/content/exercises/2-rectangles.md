---
title: Rectangles
---

## Rectangles

Rectangles are used all over the place in dataviz - bar charts, heatmaps and
treemaps are all just rectangles in disguise. Here's how you can create one:

```svelte
/// file: A single rectangle
<svg class="chart" width="800" height="400">
	<rect x="20" y="20" width="160" height="80" fill="tomato" rx="6" />
</svg>
```

Every attribute it understands:

- **`x` / `y`** - the position of the rectangle's _top-left corner_.
- **`width` / `height`** - how wide and tall the rectangle is, in pixels.
- **`fill`** - the colour painted inside.
- **`stroke`** - the colour of the border.
- **`stroke-width`** - the thickness of that border.
- **`rx`** - the corner radii, for rounded corners.

> [!NOTE]
> Since `x` / `y` mark the _top-left_ corner of the rectangle, we start with calculating where the top-left corner will fall and then extend it outwards with the width and height.

---

## Exercise: Horizontal bar chart

A bar chart is just stack of rectangles that all share the **same left edge**.
Give every bar the same `x` (so they line up on the left) and the same `height`, then step `y` down for each row and vary the `width` to encode a value.

```svelte
/// file: Your first bar chart
<svg class="chart" width="700" height="400">
	<rect x="0" y="0" width="320" height="50" fill="tomato" />
	<rect x="0" y="70" width="500" height="50" fill="tomato" />
	<rect x="0" y="140" width="180" height="50" fill="tomato" />

	<!-- more bars ... -->
</svg>
```

To get a hang of varying the widths to create bars, pretend that our data contains percentage values (0-100%). I want you to draw:

- The first bar with value = 50%. (_hint: this will be 50% or half of the chart width. So 700 x (50/100) = 350_)
- Second bar = 75%.
- Third bar = 33%.
- Fourth bar = 20%.
