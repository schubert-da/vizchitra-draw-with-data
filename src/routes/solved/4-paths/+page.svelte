<!-- 4. Draw anything with Paths — solved -->

<!-- Area chart: trace the points left to right, drop to the base, run back, close (Z). -->
<svg class="chart" width="700" height="400">
	<path
		d="M 70 268 L 175 300 L 280 300 L 350 200 L 560 120 L 560 0 L 70 0 Z"
		fill="var(--color-palette-orange)"
		stroke="var(--color-palette-orange-dark)"
		stroke-width="6"
	/>
	<path
		d="M 70 268 L 175 300 L 280 300 L 350 200 L 560 120 L 560 400 L 70 400 Z"
		fill="var(--color-palette-purple)"
		stroke="var(--color-palette-purple-dark)"
		stroke-width="6"
	/>

	<circle cx="70" cy="268" r="0" fill="steelblue" />
	<circle cx="175" cy="300" r="0" fill="steelblue" />
	<circle cx="280" cy="300" r="0" fill="steelblue" />
	<circle cx="350" cy="200" r="0" fill="steelblue" />
	<circle cx="560" cy="120" r="0" fill="steelblue" />
</svg>

<style>
	/* CLASSES: if you add the attribute class="chart" to the
	SVG element, it would get the following styling */
	.chart {
		background: #ffffff; /* white background */
		border: 1px solid #222; /* thin grey border */
	}
</style>
