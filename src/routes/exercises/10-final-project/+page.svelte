<!-- 10. Final Project: Small Multiples -->

<script>
	import data from '$assets/data/country-metrics.csv';

	let tileWidth = 300; // size of one country's tile
	let tilesPerRow = 4; // how many tiles before wrapping to a new row
</script>

<svg
	class="chart"
	width={tileWidth * tilesPerRow}
	height={tileWidth * Math.ceil(data.length / tilesPerRow)}
>
	{#each data as country, index}
		<!-- translate(0, 0) for now - we'll use `index` to place each tile on the grid next -->
		<g transform="translate(0, 0)">
			<rect x="0" y="0" width={tileWidth} height={tileWidth} fill="#fff" stroke="#ccc" />
			<text x={tileWidth / 2} y={tileWidth - 12} text-anchor="middle">{country.Entity}</text>

			<!-- your chosen shapes for each metric go here -->
		</g>
	{/each}
</svg>

<style>
	.chart {
		background: #ffffff; /* white background */
		border: 1px solid #222; /* thin grey border */
	}
</style>