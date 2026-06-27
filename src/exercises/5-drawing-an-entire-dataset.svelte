<script>
	import data from '$assets/data/spotify-2010s.csv';
	import { CELL, cellPosition, gridSize } from '$components/chapters/2-drawing-with-data/grid.js';
	import { scaleLinear } from 'd3';

	// A SCALE maps popularity (0-100) onto a radius that fits a cell.
	// (More on this in the sidebar.) Use it as: radius(row.popularity)
	const radius = scaleLinear().domain([0, 100]).range([0, 95]);

	// A colour for each genre - like a dictionary, look one up with
	// genreColors[someGenre]. Use it as: genreColors[row.genre]
	const genreColors = {
		'Dance pop': '#E75B2B',
		Pop: '#DB1E24',
		'Hip-hop/R&B': '#F9B806',
		'Acoustic/Folk': '#3091B9',
		Other: '#E032A3',
		EDM: '#53DC41'
	};

	// Start with the first 6 songs. Once it works, change `data.slice(0, 6)`
	// below to just `data` to draw all 139.
	const rows = data.slice(0, 6);
	const size = gridSize(rows.length);
</script>

<svg class="chart h-auto w-full" viewBox="0 0 {size.width} {size.height}">
	<!-- {#each} repeats the markup once per song. `row` is the song, `i` its index. -->
	{#each rows as row, i}
		<!-- the helper positions each cell in the grid from its index -->
		<g transform={cellPosition(i)}>
			<!-- the cell's square border -->
			<!-- TODO: colour the cell by genre -> fill={genreColors[row.genre]} -->
			<rect x="0" y="0" width={CELL} height={CELL} fill="none" stroke="#ddd" />

			<!-- the record: a dark disc with a small light label, like a vinyl -->
			<!-- TODO: size the disc by popularity -> r={radius(row.popularity)} -->
			<circle cx="100" cy="100" r="40" fill="#351D13" />

			<!-- TODO: size the label (r={radius(row.popularity) * 0.3}) and colour it (fill={genreColors[row.genre]}) -->
			<circle cx="100" cy="100" r="12" fill="#fff" stroke="#fff" stroke-width="4" />

			<!-- TODO: replace TITLE and ARTIST with {row.title} and {row.artist} -->
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
				TITLE
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
				ARTIST
			</text>
		</g>
	{/each}
</svg>
