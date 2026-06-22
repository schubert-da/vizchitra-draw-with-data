<script>
	import data from '$assets/data/spotify-2010s.csv';
	import { CELL, cellPosition, gridSize } from './grid.js';
	import { scaleLinear } from 'd3';

	// Map popularity (0-100) onto a radius that fits a cell. The low end stays at
	// 0, so the least popular songs shrink to nothing - honest to the data.
	const radius = scaleLinear().domain([0, 100]).range([0, 70]);

	const size = gridSize(data.length);
</script>

<!-- Output-only end result: every song as a cell, circle sized by popularity. -->
<svg
	class="chart h-auto w-full"
	viewBox="0 0 {size.width} {size.height}"
	role="img"
	aria-label="A grid of all 139 songs, each drawn as a circle sized by popularity"
>
	{#each data as row, i}
		<g transform={cellPosition(i)}>
			<rect x="0" y="0" width={CELL} height={CELL} fill="none" stroke="#ddd" />
			<circle cx="100" cy="85" r={radius(row.popularity)} fill="#351D13" />
			<circle
				cx="100"
				cy="85"
				r={radius(row.popularity) * 0.3}
				fill="#fff"
				stroke="#fff"
				stroke-width="4"
			/>
			<text x="100" y="158" text-anchor="middle" font-size="14" font-weight="bold" fill="#222">
				{row.title}
			</text>
			<text x="100" y="178" text-anchor="middle" font-size="11" fill="#666">
				{row.artist}
			</text>
		</g>
	{/each}
</svg>
