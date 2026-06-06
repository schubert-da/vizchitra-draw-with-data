---
title: Lines
---

## Lines

The most straightforward SVG shape - you give it a start point and an end point, and it draws a straight line between the two.

```svelte
/// file: Line syntax
<svg class="chart" width="700" height="400">
	<line x1="50" y1="50" x2="400" y2="300" stroke="black" stroke-width="2" />
</svg>
```

Its attributes are:

- **`x1` / `y1`** - the coordinates of the line's _start_ point.
- **`x2` / `y2`** - the coordinates of the line's _end_ point.
- **`stroke`** - the colour of the line.
- **`stroke-width`** - the thickness of the line, in pixels.

> [!IMPORTANT]
> A `<line>` has no _fill_, only a _stroke_. If you forget the `stroke` attribute the line is still there but invisible.

---

## Exercise: connect the dots

Here we scatter plot you built in the first exercise. The goal now is to turn it into a **line chart** by drawing lines between each neighbouring pair of points, working left to right.

```svelte
/// file: Connecting the first two points
<svg class="chart" width="700" height="400">
	<line x1="10%" y1="66%" x2="25%" y2="75%" stroke="steelblue" stroke-width="2" />

	<circle cx="40%" cy="75%" r="15" fill="steelblue" />
	<circle cx="25%" cy="75%" r="15" fill="steelblue" />
	<circle cx="50%" cy="50%" r="15" fill="steelblue" />
	<circle cx="10%" cy="66%" r="15" fill="steelblue" />
	<circle cx="80%" cy="30%" r="15" fill="steelblue" />
</svg>
```
