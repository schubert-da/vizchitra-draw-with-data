---
title: Variables and Logic
---

## Variables

Everything we've drawn so far has been hard-coded - numbers typed straight into the markup.
**JavaScript** lets us give a value a name (a _variable_) and reuse it. In Svelte we write JavaScript inside a `<script>` block at the top of the component and we can use them in HTML using curly braces `{ variable_name }`:

```svelte
<script>
	// javascript goes in the script block
	let title = 'Totally the First Scatter Plot';
</script>

/// file: Declaring and using a variable
<!-- Header element that will now display "Totally the First Scatter Plot" -->
<h2>{title}</h2>

<!-- followed by our previous SVG code -->
```

`let title = 'Totally ...'` _declares_ a variable called `title` and _assigns_ it a value.
Then `{title}` drops that value into the header element in our page. Change the text in the `<script>` and the heading follows.

Variables work inside **attributes** too - just use the braces in place of the quotes:

```svelte
<script>
	let width = 700;
	let height = 400;
	let radius = 10;
</script>

/// file: A variable in an attribute
<svg {width} {height}>
	<circle x="100" y="200" fill="steelblue" {radius}> </circle>
</svg>
```

<br><br>

**Exercise:** the scatter plot is back in the workspace. Give it a `<script>` and declare four variables - a `title`, the SVG `width` and `height`, and the circle `radius` - then swap the hard-coded numbers for your variables and add the title above the chart:

```svelte
<script>
	let title = 'Scatter plot';
	let width = 700;
	let height = 400;
	let radius = 15;
</script>

/// file: The scatter plot, driven by variables
<h2>{title}</h2>
<svg class="chart" {width} {height}>
	<circle cx="40%" cy="75%" r={radius} fill="steelblue" />
	...
</svg>
```

Now changing `radius` once at the top resizes _every_ circle at once - that's the payoff of naming values.

> [!TIP]
> If the variable between the `{}` is a number, we can also do math operations on it. For example if we have a concentric circle which must have a smaller radius, then we can write this as `r = {radius * 0.9}`.

---

## If statements

Often a value should depend on a **condition**. An `if` statement runs a block of code only when its condition is true:

```js
/// file: The shape of an if statement
if (condition) {
	// runs only when the condition is true
}
```

Let's use it to tie two of our variables together: when the chart is narrow, shrink the dots so they don't crowd it. The condition `width < 400` is either true or false; when it's true, we give `radius` a smaller value:

```svelte
<script>
	let width = 300;
	let radius = 15;

	if (width < 400) {
		radius = 8;
	}
</script>

/// file: Smaller chart, smaller dots
<svg class="chart" {width} height="300">
	<circle cx="50%" cy="50%" r={radius} fill="steelblue" />
</svg>
```

Change the value of width to 700 and notice the difference:

- With `width` set to `300` the condition is true, so `radius` becomes `8`.
- Change `width` to `700` and the `if` is skipped - `radius` stays `15`.
