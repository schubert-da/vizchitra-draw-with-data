<script>
	import data from '$assets/data/spotify-2010s.csv';
	import { CELL, cellPosition, gridSize } from './grid.js';
	import { genreColors } from './genre-colors.js';
	import { scaleLinear } from 'd3';

	const radius = scaleLinear().domain([0, 100]).range([0, 95]);

	// The three controls, as plain variables the <select>s write into.
	let sizeMetric = 'popularity';
	let sortMetric = 'popularity';
	let selectedGenre = 'all';

	// The ONE list the grid loops over. Filter it, sort it - and because the chart
	// is just a drawing of this list, it redraws to match. That's the whole idea.
	$: modifiedData = data
		.filter((row) => selectedGenre === 'all' || row.genre === selectedGenre)
		.sort((a, b) => b[sortMetric] - a[sortMetric]);

	// The canvas stays sized to the full dataset, so filtering leaves empty space
	// rather than resizing the whole grid as songs come and go.
	const size = gridSize(data.length);
</script>

<div class="mb-4 flex flex-wrap items-center gap-5 text-sm">
	<label class="flex items-center gap-2 font-medium">
		Size by
		<select bind:value={sizeMetric} class="rounded border border-gray-300 px-2 py-1">
			<option value="popularity">Popularity</option>
			<option value="energy">Energy</option>
			<option value="danceability">Danceability</option>
		</select>
	</label>
	<label class="flex items-center gap-2 font-medium">
		Sort by
		<select bind:value={sortMetric} class="rounded border border-gray-300 px-2 py-1">
			<option value="popularity">Popularity</option>
			<option value="energy">Energy</option>
			<option value="danceability">Danceability</option>
		</select>
	</label>
	<label class="flex items-center gap-2 font-medium">
		Genre
		<select bind:value={selectedGenre} class="rounded border border-gray-300 px-2 py-1">
			<option value="all">All genres</option>
			<option value="Dance pop">Dance pop</option>
			<option value="Pop">Pop</option>
			<option value="Hip-hop/R&amp;B">Hip-hop/R&amp;B</option>
			<option value="Acoustic/Folk">Acoustic/Folk</option>
			<option value="EDM">EDM</option>
			<option value="Other">Other</option>
		</select>
	</label>
</div>

<svg
	class="chart h-auto w-full"
	viewBox="0 0 {size.width} {size.height}"
	role="img"
	aria-label="A grid of songs that re-sorts and filters as you change the controls"
>
	{#each modifiedData as row, i (row.title + row.artist + row.year)}
		<g class="tile" transform={cellPosition(i)}>
			<g class="tile-inner">
				<rect x="0" y="0" width={CELL} height={CELL} fill={genreColors[row.genre]} stroke="#ddd" />
				<circle cx="100" cy="100" r={radius(row[sizeMetric])} fill="#351D13" />
				<circle
					cx="100"
					cy="100"
					r={radius(row[sizeMetric]) * 0.3}
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
		</g>
	{/each}
</svg>

<style>
	/* Two transitions smooth the jumps: `transform` for the move (Chrome & Firefox
	   treat the SVG transform attribute as the CSS property), `r` for the resize. */
	.tile {
		transition: transform 0.5s cubic-bezier(0.22, 1, 0.36, 1);
	}
	circle {
		transition: r 0.5s cubic-bezier(0.68, -0.6, 0.32, 1.6);
	}
	/* A separate inner group handles the hover lift, so it doesn't fight the
	   positioning transform on the outer group. */
	.tile-inner {
		transform-box: fill-box;
		transform-origin: center;
		transition: transform 0.18s ease;
	}
	.tile:hover .tile-inner {
		transform: scale(1.08);
	}
</style>
