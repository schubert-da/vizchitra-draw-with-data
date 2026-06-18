<!-- 10. Final Project: Small Multiples — solved -->

<script>
	import * as d3 from 'd3';
	import data from '$assets/data/country-metrics.csv';

	let tileSize = 300; // size of one country's tile
	let tilesPerRow = 4; // how many tiles before wrapping to a new row

	// the whole grid's dimensions, derived from the tile size and how many rows we need
	let width = tileSize * tilesPerRow;
	let height = tileSize * Math.ceil(data.length / tilesPerRow);

	// Shared scales across ALL countries, so tiles are comparable at a glance.
	// scaleSqrt sizes circles by area (the honest way to encode a quantity in a circle).
	let popRadius = d3
		.scaleSqrt()
		.domain(d3.extent(data, (d) => +d.population))
		.range([6, 90]);

	// Life expectancy -> how far a ring sweeps around (0 - 90 years => 0 - full circle).
	let lifeAngle = d3
		.scaleLinear()
		.domain([0, 90])
		.range([0, 2 * Math.PI]);

	// A faint full track, plus a value ring built per-country from life expectancy.
	let lifeTrack = d3
		.arc()
		.innerRadius(96)
		.outerRadius(116)
		.startAngle(0)
		.endAngle(2 * Math.PI);
	function lifeRing(life) {
		return d3.arc().innerRadius(96).outerRadius(116).startAngle(0).endAngle(lifeAngle(+life))();
	}
</script>

<svg class="chart" {width} {height}>
	{#each data as country, index}
		<!-- index -> column (index % tilesPerRow) and row (Math.floor(index / tilesPerRow)) -->
		<g
			transform="translate({(index % tilesPerRow) * tileSize}, {Math.floor(index / tilesPerRow) *
				tileSize})"
		>
			<rect x="0" y="0" width={tileSize} height={tileSize} fill="#fff" stroke="#ccc" />

			<!-- population -> circle size, life expectancy -> ring, both centred in the tile -->
			<g transform="translate({tileSize / 2}, {tileSize / 2 - 10})">
				<circle r={popRadius(+country.population)} fill="steelblue" opacity="0.55" />
				<path d={lifeTrack()} fill="#000" opacity="0.08" />
				<path d={lifeRing(country.life_expectancy)} fill="#0b9b8a" />
			</g>

			<text x={tileSize / 2} y={tileSize - 12} text-anchor="middle">{country.Entity}</text>
		</g>
	{/each}
</svg>

<style>
	.chart {
		background: #ffffff; /* white background */
		border: 1px solid #222; /* thin grey border */
	}

	text {
		font-size: 14px;
		font-weight: 600;
	}
</style>
