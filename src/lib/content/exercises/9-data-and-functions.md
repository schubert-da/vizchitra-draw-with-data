---
title: Data and Functions
---

## Arrays of objects

Putting both arrays and objects from previous exercises together - an **array of objects** - and you have the shape of almost all real data: a table, where every _row_ is an object and the whole _dataset_ is the array.

```js
/// file: What a dataset looks like
let penguins = [
	{ species: 'Adelie', bill_length: 39.1, flipper_length: 181 },
	{ species: 'Adelie', bill_length: 39.5, flipper_length: 186 },
	{ species: 'Gentoo', bill_length: 46.1, flipper_length: 211 }
	// ... hundreds more rows ...
];
```

Until now we've typed our data by hand. Real datasets are far too big for that, so we **import** them from a file instead. We've added the classic _Palmer Penguins_ dataset to the project - 300-odd penguins, each with a species, a few body measurements and unfortunately no names.

```js
/// file: Importing a dataset
import penguins from '$assets/data/palmer-penguins.csv';
```

That one line hands us the whole array. It behaves exactly like the arrays and objects you already know:

```js
/// file: It's just an array of objects
penguins.length; // 334  -> how many rows
penguins[0]; // { species: 'Adelie', bill_length: '39.1', ... }  -> the first row
penguins[0].species; // 'Adelie'  -> a field on that row
```

### Looping with `{#each}`

We don't want to write 334 `<circle>` elements by hand - we want to draw **one per row**. Svelte's `{#each}` block loops over an array and repeats the markup inside it once for every item:

```svelte
/// file: The shape of an each block
{#each penguins as penguin}
	<!-- this runs once per penguin -->
	<circle ... />
{/each}
```

Inside the loop, `penguin` is the current row's object, so `penguin.bill_length` reads that one penguin's bill length.

<br><br>

**Exercise:** the workspace has the data imported and two scales ready (recall scales from Lesson 7). Loop over `penguins` and draw a circle for each, using the scales to turn its measurements into x/y positions:

```svelte
<script>
	import * as d3 from 'd3';
	import penguins from '$assets/data/palmer-penguins.csv';

	let xScale = d3
		.scaleLinear()
		.domain(d3.extent(penguins, (d) => +d.bill_length))
		.range([40, 660]);
	let yScale = d3
		.scaleLinear()
		.domain(d3.extent(penguins, (d) => +d.flipper_length))
		.range([360, 40]);
</script>

/// file: One circle per penguin
<svg class="chart" width="700" height="400">
	{#each penguins as penguin}
		<circle
			cx={xScale(+penguin.bill_length)}
			cy={yScale(+penguin.flipper_length)}
			r="4"
			fill="steelblue"
			opacity="0.7"
		/>
	{/each}
</svg>
```

One small detail: data imported from a file always arrives as **text**, so `bill_length` is the string `'39.1'`, not the number `39.1`. The `+` in `+penguin.bill_length` converts that text into a number the scale can use.

> [!TIP]
> The `yScale` range is `[360, 40]` - the larger number first. That flips the axis so bigger flippers sit higher up the chart, the way we expect a chart to read.

---

## Functions

You've already _called_ functions - `d3.scaleLinear()`, `xScale(39.1)`, `track()`. Now let's write our own. A **function** is a reusable block of code that takes an input (a **parameter**), does some work, and hands back a result with `return`:

```js
/// file: A function with a parameter and a return value
function double(n) {
	return n * 2;
}

double(5); // 10
double(8); // 16
```

Here `n` is the **parameter** - a placeholder for whatever value you pass in. `return n * 2` is the **return value** - the answer the function gives back. Call `double(5)` and `n` becomes `5`, so it returns `10`.

Functions shine when a value should be **decided** from an input. Our circles are all one colour; let's write a function that picks a colour from a penguin's species. We check each species with an `if`, and `return` the moment we find a match - because `return` exits the function immediately, we don't need any `else`:

```js
/// file: A value decided by the input
function speciesColor(species) {
	if (species == 'Adelie') return '#ff8c00';
	if (species == 'Chinstrap') return '#c65ccc';
	if (species == 'Gentoo') return '#0b9b8a';
}

speciesColor('Gentoo'); // '#0b9b8a'
```

(`==` means "is equal to" - we're asking whether `species` is the same as that word.)

<br><br>

**Exercise:** add the `speciesColor` function, then call it in the loop to set each circle's `fill` from its own species:

```svelte
<script>
	// ... previous content
	function speciesColor(species) {
		if (species === 'Adelie') return '#ff8c00';
		if (species === 'Chinstrap') return '#c65ccc';
		if (species === 'Gentoo') return '#0b9b8a';
	}
</script>

/// file: Colour by species
<svg class="chart" width="700" height="400">
	{#each penguins as penguin}
		<circle
			cx={xScale(+penguin.bill_length)}
			cy={yScale(+penguin.flipper_length)}
			r="4"
			fill={speciesColor(penguin.species)}
			opacity="0.7"
		/>
	{/each}
</svg>
```
