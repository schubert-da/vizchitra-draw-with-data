<script>
	import data from '$assets/data/spotify-2010s.csv';
	import { cellPosition, gridSize } from '$components/chapters/2-drawing-with-data/grid.js';
	import { scaleLinear } from 'd3';

	const numColumns = 5;
	const tileWidth = 200;

	const size = gridSize(data.length, numColumns, tileWidth);
</script>

<svg class="chart h-auto w-full" viewBox="0 0 {size.width} {size.height}">
	<!-- <g transform={cellPosition(i, numColumns, tileWidth)}> -->
	<rect x="0" y="0" width={tileWidth} height={tileWidth} fill="none" stroke="#ddd" />

	<circle cx="100" cy="100" r="40" fill="#351D13" />
	<circle cx="100" cy="100" r="12" fill="#fff" stroke="#fff" stroke-width="4" />

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
	<!-- </g> -->
</svg>
