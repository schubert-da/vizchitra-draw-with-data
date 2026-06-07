<!-- 5. Drawing Shapes -->

<!-- A 2 x 2 grid of 350 x 350 canvases. Fill each one 
 with a design, combining <rect>, <circle>, <line> and <path>. -->
<div class="design-grid">
	<svg class="chart" width="350" height="350">
		<!-- 1. blue squares in the bottom left and top right corners -->
		<rect x="175" y="0" width="175" height="175" fill="steelblue" />
		<rect x="0" y="175" width="175" height="175" fill="steelblue" />

		<!-- 2. concentric circles in the center -->
		<circle cx="175" cy="175" r="100" fill="white" stroke="steelblue" stroke-width="2" />
		<circle cx="175" cy="175" r="80" fill="steelblue" />

		<!-- 3. concentric circles in the top left and bottom right corners -->
		<circle cx="0" cy="0" r="115" fill="white" stroke="steelblue" stroke-width="2" />
		<circle cx="0" cy="0" r="95" fill="steelblue" />
		<circle cx="350" cy="350" r="115" fill="white" stroke="steelblue" stroke-width="2" />
		<circle cx="350" cy="350" r="95" fill="steelblue" />
	</svg>

	<svg class="chart" width="350" height="350">
		<!-- DESIGN 2 -->
	</svg>

	<svg class="chart" width="350" height="350">
		<!-- DESIGN 3 -->
	</svg>

	<svg class="chart" width="350" height="350">
		<!-- DESIGN 4 -->
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
