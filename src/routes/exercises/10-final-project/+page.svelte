<!-- 10. Final Project: Small Multiples -->

<script>
	import data from '$assets/data/country-metrics.csv';

	let tileSize = 300; // size of one country's tile
	let tilesPerRow = 4; // how many tiles before wrapping to a new row

	// the whole grid's dimensions, derived from the tile size and how many rows we need
	let width = tileSize * tilesPerRow;
	let height = tileSize * Math.ceil(data.length / tilesPerRow);
</script>

<svg class="chart" {width} {height}>
	{#each data as country, index}
		<!-- translate(0, 0) for now - we'll use `index` to place each tile on the grid next -->
		<g transform="translate(0, 0)">
			<rect x="0" y="0" width={tileSize} height={tileSize} fill="#fff" stroke="#ccc" />
			<text x={tileSize / 2} y={tileSize - 12} text-anchor="middle">{country.Entity}</text>

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
