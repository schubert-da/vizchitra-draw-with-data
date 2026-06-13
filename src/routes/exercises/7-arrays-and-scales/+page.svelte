<!-- 7. Arrays and Scales -->

<script>
	// import { scaleLinear } from 'd3'; // Part 2: uncomment to use scales

	// Part 1 - a radius for each circle
	let radiusList = [];

	// Part 2 - real data for each point
	let populationList = [38000000, 25000000, 14000000, 9000000, 3000000]; // people per country
	let povertyPercentage = [9, 21, 11, 17, 4]; // % living in poverty
</script>

<!-- Part 1: replace each r="15" with a value from radiusList -->
<svg class="chart" width="700" height="400">
	<circle cx="40%" cy="75%" r="15" fill="steelblue" />
	<circle cx="25%" cy="75%" r="15" fill="steelblue" />
	<circle cx="50%" cy="50%" r="15" fill="steelblue" />
	<circle cx="10%" cy="67%" r="15" fill="steelblue" />
	<circle cx="80%" cy="30%" r="15" fill="steelblue" />
</svg>

<style>
	.chart {
		background: #ffffff; /* white background */
		border: 1px solid #222; /* thin grey border */
	}
</style>
