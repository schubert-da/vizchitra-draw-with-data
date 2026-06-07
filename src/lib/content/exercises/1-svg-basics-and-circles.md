---
title: SVG Basics and Circles
---

## Drawing with SVG

**SVG** (Scalable Vector Graphics) is an image format you can write as HTML markup. Instead of storing pixels like in raster images, you _describe_ shapes, and because they're vectors, they stay
crisp at any size.

Here's the simplest possible drawing - a rectangle inside an SVG (_ignore the rectangle code for now, we will cover this in later sections_):

```svelte
/// file: Basic SVG
<svg class="chart" width="700" height="400">
	<rect" x="20" y="20" width="160" height="80" fill="tomato" />
</svg>
```

Each attribute is doing a specific job:

- **`width`**: the width of the SVG in pixels.
- **`height`**: the height of the SVG in pixels.
- **`class`**: the CSS class `chart` is a reusable style we wish to apply to all charts.

> [!NOTE]
> SVG's coordinate system starts at the **top-left** corner, `(0, 0)`. `x` increases to the right and `y` increases _downward_ - so `y="20"` is 20px _down_ from the top, not up from the bottom.

---

## Circles

Circles are postitioned from the center outwards - we first decide its x and y postition with `cx` and `cy`, and _then_ we set the radius

```svelte
/// file: SVG with a circle
<svg width="700" height="400">
	<circle cx="100" cy="60" r="40" fill="steelblue" stroke="black" stroke-width="1" />
</svg>
```

Its attributes are:

- **`cx` / `cy`** - the coordinates of the circle's _centre_.
- **`r`** - the radius, in pixels.
- **`fill`** - the colour filled inside the circle.
- **`stroke`** - the colour of the circle border(the "stroke")
- **`stroke-width`** - the width of the circle border.

Try nudging `cx` and `cy` around, then change `r`, to feel how the circle is anchored from the middle outward. In fact, lets try creating a scatter plot where we have dots for the following points:

- coordinates (x = 40%, y = 25%)
- coordinates (x = 25%, y = 25%)
- coordinates (x = 50%, y = 50%)
- coordinates (x = 10%, y = 33%)
- coordinates (x = 80%, y = 70%)
