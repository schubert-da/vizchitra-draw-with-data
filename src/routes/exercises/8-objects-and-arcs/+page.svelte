<!-- 8. Objects and Arcs -->

<script>
	import * as d3 from 'd3';

	// Part 1 - today's stats as an object
	let dailyStats = { sleepHours: 6.5, dailySteps: 6000, waterGlasses: 5 };

	// Part 2 - the goal for each stat
	let goals = { sleepHours: 8, dailySteps: 10000, waterGlasses: 8 };

	// Part 2 - build an arc generator for each ring here
	// let stepsTrack = d3.arc().innerRadius(100).outerRadius(120).startAngle(0).endAngle(2 * Math.PI);
</script>

<svg class="chart" width="700" height="400">
	<!-- Part 1: fill in each label's text using dot notation, e.g. Steps: {dailyStats.dailySteps} -->
	<text x="24" y="44" fill="#fa114f"></text>
	<text x="24" y="70" fill="#7ac70c"></text>
	<text x="24" y="96" fill="#00b9ff"></text>

	<!-- Part 2: draw the track + value arcs inside this centered group -->
	<g transform="translate(500, 200)"></g>
</svg>

<style>
	.chart {
		background: #ffffff; /* white background */
		border: 1px solid #222; /* thin grey border */
	}

	text {
		font-size: 16px;
		font-weight: 600;
	}
</style>