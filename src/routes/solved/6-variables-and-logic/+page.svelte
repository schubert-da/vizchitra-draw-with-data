<!-- 6. Variables and Logic — solved -->

<script>
	let title = 'Scatter plot';
	let width = 700;
	let height = 400;
	let radius = 15;
	let opacity = 1;

	if (width < 500) {
		radius = 40;
		opacity = 0.6;
	}
</script>

<!-- Hard-coded values swapped for variables -->
<h2 class="chart-title">{title}</h2>

<svg class="chart" {width} {height}>
	<circle
		cx="40%"
		cy="75%"
		r={radius}
		{opacity}
		fill="var(--color-palette-yellow)"
		stroke-width="6"
		stroke="var(--color-palette-purple)"
	/>
	<circle
		cx="25%"
		cy="75%"
		r={radius}
		{opacity}
		fill="var(--color-palette-yellow)"
		stroke-width="6"
		stroke="var(--color-palette-purple)"
	/>
	<circle
		cx="50%"
		cy="50%"
		r={radius * 2.5}
		{opacity}
		fill="var(--color-palette-yellow)"
		stroke-width="6"
		stroke="var(--color-palette-purple)"
	/>
	<circle
		cx="10%"
		cy="67%"
		r={radius}
		{opacity}
		fill="var(--color-palette-yellow)"
		stroke-width="6"
		stroke="var(--color-palette-purple)"
	/>
	<circle
		cx="80%"
		cy="30%"
		r={radius}
		{opacity}
		fill="var(--color-palette-yellow)"
		stroke-width="6"
		stroke="var(--color-palette-purple)"
	/>
</svg>

<style>
	/* Styling for chart title */
	.chart-title {
		font-size: 28px; /* set the font size to 20px */
		font-weight: 600; /* make the title semibold */
		margin-bottom: 20px; /* add 20px of space below the title */
	}

	.chart {
		background: #ffffff; /* white background */
		border: 1px solid #222; /* thin grey border */
	}
</style>
