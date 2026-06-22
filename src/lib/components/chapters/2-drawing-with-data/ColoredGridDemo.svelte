<script>
	import data from '$assets/data/spotify-2010s.csv';
	import { CELL, cellPosition, gridSize } from './grid.js';
	import { genreColors } from './genre-colors.js';
	import { scaleLinear } from 'd3';

	const radius = scaleLinear().domain([0, 100]).range([0, 95]);
	const size = gridSize(data.length);
</script>

<!-- Output-only end result: the grid, now coloured by each song's genre. -->
<svg
	class="chart h-auto w-full"
	viewBox="0 0 {size.width} {size.height}"
	role="img"
	aria-label="A grid of all 139 songs, each cell and record label coloured by genre"
>
	{#each data as row, i}
		<g transform={cellPosition(i)}>
			<rect x="0" y="0" width={CELL} height={CELL} fill={genreColors[row.genre]} stroke="#ddd" />
			<circle cx="100" cy="100" r={radius(row.popularity)} fill="#351D13" />
			<circle
				cx="100"
				cy="100"
				r={radius(row.popularity) * 0.3}
				fill={genreColors[row.genre]}
				stroke="#fff"
				stroke-width="4"
			/>
			<text
				x="100"
				y="165"
				text-anchor="middle"
				font-size="14"
				font-weight="bold"
				fill="#222"
				stroke="#fff"
				stroke-width="2"
				paint-order="stroke"
			>
				{row.title}
			</text>
			<text
				x="100"
				y="178"
				text-anchor="middle"
				font-size="11"
				fill="#666"
				stroke="#fff"
				stroke-width="2"
				paint-order="stroke"
			>
				{row.artist}
			</text>
		</g>
	{/each}
</svg>
