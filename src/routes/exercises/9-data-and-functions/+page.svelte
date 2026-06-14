<!-- 9. Data and Functions -->

<script>
	import * as d3 from 'd3';
	import penguins from '$assets/data/palmer-penguins.csv';

	let width = 700;
	let height = 400;

	// Scales map a measurement onto a position in the width x height chart.
	// (yScale's range goes high -> low so bigger flippers sit higher up.)
	let xScale = d3
		.scaleLinear()
		.domain(d3.extent(penguins, (d) => +d.bill_length))
		.range([40, width - 40]);
	let yScale = d3
		.scaleLinear()
		.domain(d3.extent(penguins, (d) => +d.flipper_length))
		.range([height - 40, 40]);
</script>

<svg class="chart" {width} {height}>
	<!-- Part 1: loop over `penguins` with {#each} and draw a <circle> for each one -->
</svg>

<style>
	.chart {
		background: #ffffff; /* white background */
		border: 1px solid #222; /* thin grey border */
	}
</style>
