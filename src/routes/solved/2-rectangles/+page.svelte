<!-- 2. Rectangles — solved -->

<!-- Horizontal bar chart: same x and height, step y down, width = 700 * (pct / 100) -->
<svg class="chart" width="700" height="400">
	<rect
		x="0"
		y="20"
		width={(700 * 50) / 100}
		height="80"
		fill="var(--color-palette-orange)"
		stroke="var(--color-palette-orange-dark)"
		stroke-width="3"
	/>
	<text
		x="10"
		y="60"
		fill="#fff"
		font-size="52px"
		font-weight="semibold"
		text-anchor="start"
		alignment-baseline="middle"
	>
		50%
	</text>

	<!-- 75% -->
	<rect
		x="0"
		y="110"
		width={(700 * 75) / 100}
		height="80"
		fill="var(--color-palette-orange)"
		stroke="var(--color-palette-orange-dark)"
		stroke-width="3"
	/>
	<text
		x="10"
		y="160"
		fill="#fff"
		font-size="52px"
		font-weight="semibold"
		text-anchor="start"
		alignment-baseline="middle"
	>
		75%
	</text>

	<!-- 33% -->
	<rect
		x="0"
		y="200"
		width={(700 * 33) / 100}
		height="80"
		fill="var(--color-palette-orange)"
		stroke="var(--color-palette-orange-dark)"
		stroke-width="3"
	/>
	<text
		x="10"
		y="250"
		fill="#fff"
		font-size="52px"
		font-weight="semibold"
		text-anchor="start"
		alignment-baseline="middle"
	>
		33%
	</text>

	<!-- 20% -->
	<rect
		x="0"
		y="290"
		width={(700 * 20) / 100}
		height="80"
		fill="var(--color-palette-orange)"
		stroke="var(--color-palette-orange-dark)"
		stroke-width="3"
	/>
	<text
		x="10"
		y="340"
		fill="#fff"
		font-size="52px"
		font-weight="semibold"
		text-anchor="start"
		alignment-baseline="middle"
	>
		20%
	</text>
</svg>

<style>
	/* CLASSES: if you add the attribute class="chart" to the
	SVG element, it would get the following styling */
	.chart {
		background: #ffffff; /* light grey background */
		border: 1px solid #222; /* thin grey border */
	}
</style>
