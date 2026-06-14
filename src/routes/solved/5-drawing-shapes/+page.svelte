<!-- 5. Drawing Shapes — solved -->

<!-- A 2 x 2 grid of 350 x 350 canvases, each one an example design built from
 <rect>, <circle>, <line> and <path>. This exercise is open-ended — these are
 just four examples to show the toolkit combined. -->
<div class="design-grid">
	<!-- 1. corner squares + concentric circles -->
	<svg class="chart" width="350" height="350">
		<rect x="175" y="0" width="175" height="175" fill="steelblue" />
		<rect x="0" y="175" width="175" height="175" fill="steelblue" />

		<circle cx="175" cy="175" r="100" fill="white" stroke="steelblue" stroke-width="2" />
		<circle cx="175" cy="175" r="80" fill="steelblue" />

		<circle cx="0" cy="0" r="115" fill="white" stroke="steelblue" stroke-width="2" />
		<circle cx="0" cy="0" r="95" fill="steelblue" />
		<circle cx="350" cy="350" r="115" fill="white" stroke="steelblue" stroke-width="2" />
		<circle cx="350" cy="350" r="95" fill="steelblue" />
	</svg>

	<!-- 2. nested squares -->
	<svg class="chart" width="350" height="350">
		<rect x="25" y="25" width="300" height="300" fill="steelblue" />
		<rect x="75" y="75" width="200" height="200" fill="white" />
		<rect x="125" y="125" width="100" height="100" fill="steelblue" />
	</svg>

	<!-- 3. circle and cross -->
	<svg class="chart" width="350" height="350">
		<circle cx="175" cy="175" r="120" fill="white" stroke="steelblue" stroke-width="3" />
		<line x1="175" y1="55" x2="175" y2="295" stroke="steelblue" stroke-width="3" />
		<line x1="55" y1="175" x2="295" y2="175" stroke="steelblue" stroke-width="3" />
		<circle cx="175" cy="175" r="30" fill="steelblue" />
	</svg>

	<!-- 4. checkerboard grid of squares -->
	<svg class="chart" width="350" height="350">
		<rect x="25" y="25" width="90" height="90" fill="steelblue" />
		<rect x="135" y="25" width="90" height="90" fill="white" stroke="steelblue" stroke-width="2" />
		<rect x="245" y="25" width="90" height="90" fill="steelblue" />

		<rect x="25" y="135" width="90" height="90" fill="white" stroke="steelblue" stroke-width="2" />
		<rect x="135" y="135" width="90" height="90" fill="steelblue" />
		<rect x="245" y="135" width="90" height="90" fill="white" stroke="steelblue" stroke-width="2" />

		<rect x="25" y="245" width="90" height="90" fill="steelblue" />
		<rect x="135" y="245" width="90" height="90" fill="white" stroke="steelblue" stroke-width="2" />
		<rect x="245" y="245" width="90" height="90" fill="steelblue" />
	</svg>
</div>

<style>
	/* a bit of styling to have the SVGs display nicely in a grid */
	.design-grid {
		display: grid;
		grid-template-columns: repeat(2, 350px); /* create 2 columns of 350px each */
		gap: 20px;
		padding: 24px;
		max-width: 100%;
		max-height: 100%;
		overflow: auto;
	}

	.chart {
		background: #ffffff; /* white background */
		border: 1px solid #222; /* thin grey border */
	}
</style>
