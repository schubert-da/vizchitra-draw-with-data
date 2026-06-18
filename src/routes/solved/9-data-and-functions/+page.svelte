<!-- 9. Data and Functions — solved -->

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

	// A colour decided from each penguin's species
	function speciesColor(species) {
		if (species === 'Adelie') return '#ff8c00';
		if (species === 'Chinstrap') return '#c65ccc';
		if (species === 'Gentoo') return '#0b9b8a';
	}
</script>

<svg class="chart" {width} {height}>
	{#each penguins as penguin}
		<circle
			cx={xScale(+penguin.bill_length)}
			cy={yScale(+penguin.flipper_length)}
			r="4"
			fill={speciesColor(penguin.species)}
			opacity="0.7"
		/>
	{/each}
</svg>

<style>
	.chart {
		background: #ffffff; /* white background */
		border: 1px solid #222; /* thin grey border */
	}
</style>
