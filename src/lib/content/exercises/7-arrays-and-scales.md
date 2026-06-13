---
title: Arrays and Scales
---

## Arrays

Up to now each variable has held a single value. But data usually comes in **collections** - five radii, a column of populations, a list of names. An **array** (also called a _list_) stores many values in one variable. We write the values inside square brackets `[ ]`, separated by commas:

```js
/// file: An array of numbers
let radiusList = [15, 25, 10, 30, 20];
```

That one variable now holds all five numbers, in order.

Each item sits at a numbered position called its **index**. Counting starts at **0**, not 1 - so the _first_ item is `radiusList[0]`. Write the array name followed by the index in square brackets and you get that one value back:

```js
/// file: Accessing items by index
let radiusList = [15, 25, 10, 30, 20];

radiusList[0]; // 15  -> the first item
radiusList[1]; // 25  -> the second item
radiusList[4]; // 20  -> the fifth (and last) item
```

<br><br>

**Exercise:** the scatter plot is back in the workspace, and every circle still has a hard-coded `r="15"`. In the `<script>`, create a `radiusList` with a radius for each of the five circles, then replace each `r` with the matching item from the list:

```svelte
<script>
	let radiusList = [15, 25, 10, 30, 20];
</script>

/// file: One radius per circle, read from the list
<svg class="chart" width="700" height="400">
	<circle cx="40%" cy="75%" r={radiusList[0]} fill="steelblue" />
	<!-- ... and so on ... -->
</svg>
```

Each circle now pulls its size from a different slot in the list. Change a number in `radiusList` and only that one circle resizes.

> [!TIP]
> An array can hold more than numbers - text works too, like `['Asia', 'Europe', 'Africa']`. For charts, though, we'll mostly reach for lists of numbers.

---

## Scales with scaleLinear

Now we want our circles to represent **real data** instead of nice round percentages. Say each point is a country, and we want its horizontal position to come from that country's **population**.

There's a problem. A population might be `38000000`, but our SVG is only `700` pixels wide. We obviously can't write `cx="38000000"` - the dot would land kilometres off-screen. We need a way to **shrink** big data numbers down to fit the pixels we actually have.

That job belongs to a **scale**. A scale is a helper that takes a value from one number range (your _data_) and converts it into another range (your _pixels_). D3 gives us `scaleLinear` for straight-line conversions:

```js
/// file: A linear scale
import { scaleLinear } from 'd3';

let xScale = scaleLinear()
	.domain([0, 40000000]) // the data:   smallest -> largest value
	.range([0, 700]); // the pixels: left edge -> right edge
```

Two settings do all the work:

- **`domain`** - the `[min, max]` of your _data_ (the input).
- **`range`** - the `[min, max]` of the _pixels_ you want it mapped onto (the output).

Once it's set up, you map values using the following format:

```js
/// file: Calling the scale
xScale(0); //        0   -> a population of 0 sits at the left edge
xScale(20000000); // 350 -> half the population, halfway across
xScale(40000000); // 700 -> the largest population, at the right edge
```

<br><br>

**Exercise:** two arrays of real-ish data are waiting in the workspace - `populationList` (people per country) and `povertyPercentage` (% living in poverty). Build a scale for each axis, then position every circle with them:

```svelte
<script>
	import { scaleLinear } from 'd3';

	let populationList = [38000000, 25000000, 14000000, 9000000, 3000000];
	let povertyPercentage = [9, 21, 11, 17, 4];

	let xScale = scaleLinear().domain([0, 40000000]).range([0, 700]);
	let yScale = scaleLinear().domain([0, 25]).range([0, 400]);
</script>

/// file: Positioning circles from data
<svg class="chart" width="700" height="400">
	<circle
		cx={xScale(populationList[0])}
		cy={yScale(povertyPercentage[0])}
		r="15"
		fill="steelblue"
	/>
	<!-- ... remaining circles ... -->
</svg>
```

Each circle's `cx` now comes from a population run through `xScale`, and its `cy` from a poverty percentage run through `yScale`. The raw numbers stay huge and meaningful in the data, while the scales quietly fold them into the 700 × 400 box on screen.

> [!NOTE]
> Try changing the `xScale` range to `[0, 350]` and watch every point squeeze into the left half of the chart - the data never changed, only the pixels we mapped it onto.
