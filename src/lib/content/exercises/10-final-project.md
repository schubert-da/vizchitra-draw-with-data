---
title: 'Final Project: Small Multiples'
---

## Bringing it all together

Let's combine everything we learnt into one real visualisation - a **small multiples** chart.

"Small multiples" just means lots of little copies of the same design, one per item, laid out in a grid so they're easy to compare at a glance. Ours will draw one tile **per country**, using the `country-metrics.csv` dataset (population, GDP, life expectancy, CO₂ emissions and more for every country).

Each tile is a tiny piece of custom art whose **shapes are sized by that country's data**. Take a look at the designs on the slides and pick which shapes you'll use to represent each metric. There's no right answer here, just whatever you find interesting _or draw your own._

## Your shape toolkit

Everything on those tiles is built from the handful of shapes you've already met. Here's the whole kit in one place:

```svelte
/// file: Your shape toolkit
<!-- Rectangle - bars, tiles, nested squares -->
<rect x="10" y="10" width="80" height="50" fill="tomato" />

<!-- Circle - scatter dots, bubbles, rings -->
<circle cx="50" cy="50" r="30" fill="steelblue" />

<!-- Line - axes, connectors, crosses -->
<line x1="0" y1="0" x2="100" y2="100" stroke="black" stroke-width="2" />

<!-- Path - any custom shape; with d3.arc() it becomes rings & gauges -->
<path
	d="M10,50 a40,40 0 1 0 80,0 a40,40 0 1 0 -80,0 Z M25,50 a25,25 0 1 1 50,0 a25,25 0 1 1 -50,0 Z"
	fill="purple"
/>
```

Mix and layer these - remember shapes drawn later sit on top - and you can build any of the tile designs on the slides, or invent your own.

And two helpers for turning data into sizes and shapes:

```js
// scaleLinear - map a data range onto a pixel range
// usage: <circle r={radius(20000)} ...>
const radius = d3.scaleLinear().domain([0, 1_400_000_000]).range([0, 120]);

// arc - build a ring/gauge path string
// usage: <path d={ring} ...>
const ring = d3
	.arc()
	.innerRadius(25)
	.outerRadius(40)
	.startAngle(0)
	.endAngle(2 * Math.PI);
```

## Building the grid

Before we can decorate a single tile, we need the **grid** to hold them all: one cell per country, wrapping onto a new row every few tiles. Let's lay that frame down.

<br><br>

**Exercise:** import the data, pick a tile size and how many fit per row, then draw an SVG big enough for the whole grid. Loop over the countries and give each one its own `<g>` group, grabbing the loop's `index` so we can position each tile next.

```svelte
<script>
	import data from '$assets/data/country-metrics.csv';

	let tileSize = 300; // size of one country's tile
	let tilesPerRow = 4; // how many tiles before wrapping to a new row
</script>

/// file: A grid of small multiples
<svg
	class="chart"
	width={tileSize * tilesPerRow}
	height={tileSize * Math.ceil(data.length / tilesPerRow)}
>
	{#each data as country, index}
		<!-- TODO: use index to correctly position the tiles -->
		<g transform="translate(0, 0)">
			<rect x="0" y="0" width={tileSize} height={tileSize} fill="#fff" stroke="#ccc" />
			<text x={tileSize / 2} y={tileSize - 12} text-anchor="middle">{country.Entity}</text>

			<!-- your chosen shapes for each metric go here -->
		</g>
	{/each}
</svg>
```

Every tile is its own `<g>` group, so moving the group moves everything inside it together. Right now they're all stacked at `(0, 0)` - next we'll turn that `index` into a row and column to spread them across the grid.

We will break down how this math plays out, but even still this is one of the trickier math sections to understand. If I'm making no sense please just copy paste the code from the next section as is:

```svelte
/// file: Positioning each tile
<g transform="translate({(index % tilesPerRow) * tileSize}, {Math.floor(index / tilesPerRow) * tileSize})">
```
