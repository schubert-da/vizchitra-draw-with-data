<script>
	// Solution — Exercise 5 (styled): the same grid, now coloured by genre. A
	// `genreColors` object maps each genre to a colour; look one up with square
	// brackets — genreColors[row.genre] — to fill the cell and the record label.
	import data from '$assets/data/spotify-2010s.csv';
	import { cellPosition, gridSize } from '$components/chapters/2-drawing-with-data/grid.js';
	import { scaleLinear } from 'd3';

	const numColumns = 5;
	const tileWidth = 200;

	const size = gridSize(data.length, numColumns, tileWidth);
	const radius = scaleLinear().domain([0, 100]).range([0, 95]);

	let genreColors = {
		'Dance pop': '#E75B2B',
		Pop: '#DB1E24',
		'Hip-hop/R&B': '#F9B806',
		'Acoustic/Folk': '#3091B9',
		Other: '#E032A3',
		EDM: '#53DC41'
	};
</script>

<svg class="chart h-auto w-full" viewBox="0 0 {size.width} {size.height}">
	{#each data as row, i}
		<g transform={cellPosition(i, numColumns, tileWidth)}>
			<rect
				x="0"
				y="0"
				width={tileWidth}
				height={tileWidth}
				fill={genreColors[row.genre]}
				stroke="#ddd"
			/>

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
				stroke-width="3"
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
				stroke-width="3"
				paint-order="stroke"
			>
				{row.artist}
			</text>
		</g>
	{/each}
</svg>
