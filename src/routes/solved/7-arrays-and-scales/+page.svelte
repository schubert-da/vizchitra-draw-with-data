<!-- 7. Arrays and Scales — solved -->

<script>
	import * as d3 from 'd3';

	let width = 700;
	let height = 400;

	// Part 1 - a radius for each circle
	let radiusList = [15, 25, 10, 30, 20];

	// Part 2 - real data for each point
	let populationList = [38000000, 25000000, 14000000, 9000000, 3000000]; // people per country
	let povertyPercentage = [9, 21, 11, 17, 4]; // % living in poverty

	// Part 2 - scales fold big data numbers down into the width x height box
	let xScale = d3.scaleLinear().domain([0, 40000000]).range([0, width]);
	let yScale = d3.scaleLinear().domain([0, 25]).range([0, height]);
</script>

<!-- Each circle's position comes from the data via the scales, its size from radiusList. -->
<svg class="chart" {width} {height}>
	<circle
		cx={xScale(populationList[0])}
		cy={yScale(povertyPercentage[0])}
		r={radiusList[0]}
		fill="steelblue"
	/>
	<circle
		cx={xScale(populationList[1])}
		cy={yScale(povertyPercentage[1])}
		r={radiusList[1]}
		fill="steelblue"
	/>
	<circle
		cx={xScale(populationList[2])}
		cy={yScale(povertyPercentage[2])}
		r={radiusList[2]}
		fill="steelblue"
	/>
	<circle
		cx={xScale(populationList[3])}
		cy={yScale(povertyPercentage[3])}
		r={radiusList[3]}
		fill="steelblue"
	/>
	<circle
		cx={xScale(populationList[4])}
		cy={yScale(povertyPercentage[4])}
		r={radiusList[4]}
		fill="steelblue"
	/>
</svg>

<style>
	.chart {
		background: #ffffff; /* white background */
		border: 1px solid #222; /* thin grey border */
	}
</style>
