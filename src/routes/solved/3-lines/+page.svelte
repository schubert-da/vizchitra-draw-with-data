<!-- 3. Lines — solved -->

<!-- Line chart: connect each neighbouring pair of points, left to right.
     Lines are drawn first so the circles sit on top. -->
<svg class="chart" width="700" height="400">
	<line
		x1="10%"
		y1="66%"
		x2="25%"
		y2="75%"
		stroke="var(--color-palette-purple-dark)"
		stroke-width="8"
	/>
	<line
		x1="25%"
		y1="75%"
		x2="40%"
		y2="75%"
		stroke="var(--color-palette-purple-dark)"
		stroke-width="8"
	/>
	<line
		x1="40%"
		y1="75%"
		x2="50%"
		y2="50%"
		stroke="var(--color-palette-purple-dark)"
		stroke-width="8"
	/>
	<line
		x1="50%"
		y1="50%"
		x2="80%"
		y2="30%"
		stroke="var(--color-palette-purple-dark)"
		stroke-width="8"
	/>

	<!-- CIRCLES FROM EXERCISE 1 -->
	<circle
		cx="40%"
		cy="75%"
		r="15"
		fill="#fff"
		stroke="var(--color-palette-purple-dark)"
		stroke-width="8"
	/>
	<circle
		cx="25%"
		cy="75%"
		r="10"
		fill="#fff"
		stroke="var(--color-palette-purple-dark)"
		stroke-width="5"
	/>
	<circle
		cx="50%"
		cy="50%"
		r="40"
		fill="#fff"
		stroke="var(--color-palette-purple-dark)"
		stroke-width="8"
	/>
	<circle
		cx="10%"
		cy="66%"
		r="12"
		fill="#fff"
		stroke="var(--color-palette-purple-dark)"
		stroke-width="3"
	/>
	<circle
		cx="80%"
		cy="30%"
		r="10"
		fill="#fff"
		stroke="var(--color-palette-purple-dark)"
		stroke-width="5"
	/>
</svg>

<style>
	/* CLASSES: if you add the attribute class="chart" to the
	SVG element, it would get the following styling */
	.chart {
		background: #ffffff; /* white background */
		border: 1px solid #222; /* thin grey border */
	}
</style>
