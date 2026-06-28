<script>
	import data from '$assets/data/spotify-2010s.csv';
	import { CELL, cellPosition, gridSize } from '$components/chapters/2-drawing-with-data/grid.js';
	import { genreColors } from '$components/chapters/2-drawing-with-data/genre-colors.js';
	import { scaleLinear, arc as d3Arc } from 'd3';

	// Disc size comes from popularity for now.
	const scale = scaleLinear().domain([0, 100]).range([0, 95]);
	function arc({ startAngle, endAngle, innerRadius = 0, outerRadius }) {
		const toRadians = (deg) => (deg * Math.PI) / 180;
		return d3Arc()
			.innerRadius(innerRadius)
			.outerRadius(outerRadius)
			.startAngle(toRadians(startAngle))
			.endAngle(toRadians(endAngle))();
	}

	const size = gridSize(data.length);
</script>

<svg
	class="chart h-auto w-full"
	viewBox="0 0 {size.width} {size.height}"
	role="img"
	aria-label="A grid of every song as a record disc"
>
	{#each data as row, i (row["title"] + row["artist"] + row["year"])}
		<g transform={cellPosition(i)}>
			<rect
				x="0"
				y="0"
				width={CELL}
				height={CELL}
				fill={genreColors[row["genre"]]}
				stroke="#fff"
				stroke-width="2"
			/>

			<circle cx="100" cy="100" r={scale(row["popularity"])} fill="#351D13" />
			<circle
				cx="100"
				cy="100"
				r={scale(row["popularity"]) * 0.3}
				fill={genreColors[row["genre"]]}
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
				{row["title"]}
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
				{row["artist"]}
			</text>
		</g>
	{/each}
</svg>
