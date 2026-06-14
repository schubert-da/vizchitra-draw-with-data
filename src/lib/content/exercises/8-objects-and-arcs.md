---
title: Objects and Arcs
---

## Objects

An array (last lesson) stores values by **position** - `list[0]`, `list[1]`. That's perfect when every item is the same kind of thing. But often a single thing has several _named_ properties: a day's stats has sleep, steps, water - all different. For that we use an **object**.

An object wraps a set of `key: value` pairs in curly braces `{ }`:

```js
/// file: An object
let dailyStats = {
	sleepHours: 6.5,
	dailySteps: 6000,
	waterGlasses: 5
};
```

Each `key` (like `sleepHours`) is the _name_ of a value, and the bit after the colon is the value itself.

To read a value back, use **dot notation** - the object name, a dot, then the key:

```js
/// file: Reading values with a dot
dailyStats.sleepHours; // 6.5
dailyStats.dailySteps; // 6000

console.log(dailyStats.waterGlasses); // logs 5 to the console
```

Where an array asks "what's at position 2?", an object asks "what's the `sleepHours`?". You reach for whichever fits your data.

<br><br>

**Exercise:** the workspace has `dailyStats` ready, and three empty `<text>` elements are already placed in the top-left of the chart - one per stat. Your job is just to **fill in each label's content**, pulling the value out of the object with dot notation:

```svelte
<script>
	let dailyStats = {
		sleepHours: 6.5,
		dailySteps: 6000,
		waterGlasses: 5
	};
</script>

/// file: Labels pulled from the object
<svg class="chart" width="700" height="400">
	<text x="24" y="44" fill="#fa114f">Steps: {dailyStats.dailySteps}</text>
	<!-- ... remaining stats ... -->
</svg>
```

A `<text>` element draws words at its `x`/`y` point - that placement is done for you - and `{dailyStats.dailySteps}` drops the live value in. Change a number in the object and the label updates with it. These three lines will become the key for the rings we draw next.

> [!TIP]
> A `key` can hold _any_ value - a number, text, even another object or array. Objects and arrays are the two containers you'll use to hold almost all of your data.

---

## Arcs with d3.arc()

Time to visualise `dailyStats` as three concentric rings, each one filling up toward its goal. A ring is really just a slice of a donut - an **arc** - and D3 has a tool that builds the exact SVG path for one: `d3.arc()`.

### Building one ring

`d3.arc()` gives you a little generator you configure with four numbers, then call to get an SVG path string:

```js
/// file: One arc generator
import * as d3 from 'd3';

let ring = d3
	.arc()
	.innerRadius(60) // the hole in the middle
	.outerRadius(80) // the outer edge (so the ring is 20px thick)
	.startAngle(0) // 0 = the 12 o'clock position
	.endAngle(2 * Math.PI); // sweep all the way around

ring(); // returns an SVG path string: "M0,-80A80,80,0,..."
```

> [!NOTE]
> **A quick word on radians.** Notice that `startAngle` and `endAngle` aren't in degrees. To draw an arc we have to say _how far around_ the circle to sweep, and computers measure that angle in **radians**, not degrees. Only one number to remember: a **full circle** is `2 * Math.PI` = `2 * 3.14` (about `6.28`).
>
> Everything else is a fraction of that - half a circle is `Math.PI`, a quarter is `Math.PI / 2`. So to fill **60%** of a ring you sweep 60% of the way around: `0.6 * 2 * Math.PI`.

Arcs are always drawn around the point `(0, 0)`, so we wrap them in a group `<g>` and use `transform="translate(x, y)"` to move that centre wherever we want:

```svelte
/// file: A faint track + a value arc
<svg class="chart" width="700" height="400">
	<g transform="translate(150, 150)">
		<path d={track()} fill="#eee" />
		<path d={value()} fill="steelblue" />
	</g>
</svg>
```

The trick to the gauge look is **two arcs per ring**: a faint `track` that sweeps the full `2 * Math.PI`, and a coloured `value` arc on top that only sweeps as far as the data has progressed.

<br><br>

**Exercise:** a `goals` object is waiting alongside `dailyStats`. For each stat, the fraction `value / goal` is how full its ring should be (e.g. `6000 / 10000` = 60%), and multiplying that fraction by `2 * Math.PI` turns it into an end angle. Build three rings from the inside out:

```svelte
<script>
	import * as d3 from 'd3';

	let width = 700;
	let height = 400;

	let dailyStats = { sleepHours: 6.5, dailySteps: 6000, waterGlasses: 5 };
	let goals = { sleepHours: 8, dailySteps: 10000, waterGlasses: 8 };

	let full = 2 * Math.PI;

	// Steps ring (outer): a faint full track + a value arc
	let stepsTrack = d3.arc().innerRadius(100).outerRadius(120).startAngle(0).endAngle(full);
	let stepsValue = d3
		.arc()
		.innerRadius(100)
		.outerRadius(120)
		.startAngle(0)
		.endAngle((dailyStats.dailySteps / goals.dailySteps) * full);

	// ... Same for the other rings. Remember to reduce the radius here ...
</script>

/// file: Three rings from one object
<svg class="chart" {width} {height}>
	<!-- ... labels from earlier ... -->

	<!-- all three rings share one centre -->
	<g transform="translate(500, 200)">
		<path d={stepsTrack()} fill="#fa114f" opacity="0.15" />
		<path d={stepsValue()} fill="#fa114f" />

		<!-- ... same for other rings ... -->
	</g>
</svg>
```

Each value arc stops partway around exactly because its stat hasn't hit its goal yet. Bump a number in `dailyStats` up to its goal and watch that ring close into a full circle.

> [!TIP]
> That `(value / goal) * full` is just a scale in disguise - the same idea as last lesson. You could write `d3.scaleLinear().domain([0, goals.dailySteps]).range([0, full])` and feed it `dailyStats.dailySteps` to get the very same angle.

> [!NOTE]
> Want the rounded ends of a real Apple Watch ring? Add `.cornerRadius(10)` to each `value` arc generator and the tips curve to match.
