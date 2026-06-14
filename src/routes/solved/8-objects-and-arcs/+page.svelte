<!-- 8. Objects and Arcs — solved -->

<script>
	import * as d3 from 'd3';

	let width = 700;
	let height = 600;

	// Part 1 - today's stats as an object
	let dailyStats = { sleepHours: 6.5, dailySteps: 6000, waterGlasses: 5 };

	// Part 2 - the goal for each stat
	let goals = { sleepHours: 8, dailySteps: 10000, waterGlasses: 8 };

	let full = 2 * Math.PI;

	// Steps ring (outer): a faint full track + a value arc that stops at value / goal
	let stepsTrack = d3.arc().innerRadius(190).outerRadius(240).startAngle(0).endAngle(full);
	let stepsValue = d3
		.arc()
		.innerRadius(190)
		.outerRadius(240)
		.startAngle(0)
		.endAngle((dailyStats.dailySteps / goals.dailySteps) * full)
		.cornerRadius(10);

	// Sleep ring (middle): radius reduced
	let sleepTrack = d3.arc().innerRadius(155).outerRadius(185).startAngle(0).endAngle(full);
	let sleepValue = d3
		.arc()
		.innerRadius(155)
		.outerRadius(185)
		.startAngle(0)
		.endAngle((dailyStats.sleepHours / goals.sleepHours) * full)
		.cornerRadius(10);

	// Water ring (inner): radius reduced again
	let waterTrack = d3.arc().innerRadius(120).outerRadius(150).startAngle(0).endAngle(full);
	let waterValue = d3
		.arc()
		.innerRadius(120)
		.outerRadius(150)
		.startAngle(0)
		.endAngle((dailyStats.waterGlasses / goals.waterGlasses) * full)
		.cornerRadius(10);
</script>

<svg class="chart" {width} {height}>
	<!-- The rings and the labels share one centre, in the middle of the chart -->
	<g transform="translate({width / 2}, {height / 2})">
		<!-- Part 2: the three rings -->
		<path d={stepsTrack()} fill="var(--color-palette-yellow)" opacity="0.15" />
		<path d={stepsValue()} fill="var(--color-palette-yellow)" />

		<path d={sleepTrack()} fill="var(--color-palette-purple-dark)" opacity="0.15" />
		<path d={sleepValue()} fill="var(--color-palette-purple-dark)" />

		<path d={waterTrack()} fill="var(--color-palette-blue)" opacity="0.15" />
		<path d={waterValue()} fill="var(--color-palette-blue)" />

		<!-- Part 1: labels stacked in the centre, drawn on top of the rings -->
		<text text-anchor="middle" dominant-baseline="middle" y="-30" fill="var(--color-palette-yellow)"
			>Steps: {dailyStats.dailySteps}</text
		>
		<text
			text-anchor="middle"
			dominant-baseline="middle"
			y="0"
			fill="var(--color-palette-purple-dark)">Sleep: {dailyStats.sleepHours} hrs</text
		>
		<text text-anchor="middle" dominant-baseline="middle" y="30" fill="var(--color-palette-blue)"
			>Water: {dailyStats.waterGlasses} glasses</text
		>
	</g>
</svg>

<style>
	.chart {
		background: #333; /* white background */
		border: 1px solid #222; /* thin grey border */
	}

	text {
		font-size: 24px;
		font-weight: 600;
	}
</style>
