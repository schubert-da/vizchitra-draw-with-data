<script>
	import data from '$assets/data/country-metrics.csv';
	import * as d3 from 'd3';

	const tileWidth = 300;
	const TILES_PER_ROW = 4;

	// Which data column drives each design slot, and how to size it:
	//   mode: 'rank'  → size driven by world ranking (rank 1 = biggest, evenly spaced)
	//   mode: 'value' → size driven by the raw value (min value = smallest, max = biggest)
	// Each column must have a matching `<column>_rank` column in the CSV
	// (see scripts/add-ranks.mjs).
	const metrics = {
		topLeft: { column: 'life_expectancy', mode: 'value' }, // nested squares + star
		topRight: { column: 'co2_emissions', mode: 'rank' }, // concentric arcs
		bottomLeft: { column: 'population', mode: 'value' }, // circle + cross
		bottomRight: { column: 'gdp_per_capita', mode: 'value' } // 2x2 grid of squares
	};

	// Column the tiles are ordered by (rank 1 placed first).
	const sortBy = 'population';

	const num = (row, column) => (row[column] === '' ? NaN : +row[column]);

	// In rank mode, every metric shares one inverted scale (rank 1 → max size).
	const rankScale = d3
		.scaleLinear()
		.domain([1, data.length])
		.range([tileWidth / 2, 0]);

	// In value mode, each metric needs its own domain (raw values aren't comparable).
	const valueScales = Object.fromEntries(
		[...new Set(Object.values(metrics).map((m) => m.column))].map((column) => [
			column,
			d3
				.scaleLinear()
				.domain(d3.extent(data, (d) => num(d, column)))
				.range([0, tileWidth / 2])
		])
	);

	// Scaled size for a slot in its configured mode. Missing values render as 0.
	const size = (row, { column, mode }) => {
		if (mode === 'rank') return rankScale(+row[`${column}_rank`]);
		const value = num(row, column);
		return Number.isNaN(value) ? 0 : valueScales[column](value);
	};

	const sorted = [...data].sort((a, b) => +a[`${sortBy}_rank`] - +b[`${sortBy}_rank`]);

	function getArc(innerRadius, outerRadius, startAngle, endAngle) {
		return d3.arc()({
			innerRadius: innerRadius,
			outerRadius: outerRadius,
			startAngle: startAngle,
			endAngle: endAngle
		});
	}
</script>

<div class="grid-container flex w-screen justify-center p-10">
	<svg
		class="bg-white"
		width={tileWidth * TILES_PER_ROW}
		height={tileWidth * Math.ceil(data.length / TILES_PER_ROW)}
	>
		{#each sorted as row, index}
			{@const tileX = (index % TILES_PER_ROW) * tileWidth}
			{@const tileY = Math.floor(index / TILES_PER_ROW) * tileWidth}
			{@const center = tileWidth / 2}
			{@const tl = size(row, metrics.topLeft)}
			{@const tr = size(row, metrics.topRight)}
			{@const bl = size(row, metrics.bottomLeft)}
			{@const br = size(row, metrics.bottomRight)}
			{@const starCenterX = center - tl * 0.4}
			{@const starCenterY = center - tl * 0.4}
			{@const starSize = tl * 0.5}
			<g class="country-{row.Entity}" transform="translate({tileX}, {tileY})">
				<rect x={0} y={0} width={tileWidth} height={tileWidth} fill="#fff" stroke="#aaa" />

				<!-- TOP LEFT: nested squares + star -->
				<rect
					x={center - tl}
					y={center - tl}
					width={tl}
					height={tl}
					fill="#3F3F78"
					data-value={row[metrics.topLeft.column]}
				/>

				<rect
					x={center - tl * 0.85}
					y={center - tl * 0.85}
					width={tl * 0.85 - 2}
					height={tl * 0.85 - 2}
					fill="white"
					data-value={row[metrics.topLeft.column]}
				/>

				<rect
					x={starCenterX - starSize / 2}
					y={starCenterY - starSize / 2}
					width={starSize}
					height={starSize}
					fill="#E3BA35"
					data-value={row[metrics.topLeft.column]}
				/>
				<rect
					x={starCenterX - starSize / 2}
					y={starCenterY - starSize / 2}
					width={starSize}
					height={starSize}
					fill="#E3BA35"
					data-value={row[metrics.topLeft.column]}
					transform={`rotate(45, ${starCenterX}, ${starCenterY})`}
				/>

				<!-- TOP RIGHT: concentric arcs -->
				<path
					d={getArc(tr * 0.8, tr, 0, Math.PI / 2)}
					fill="#3F3F78"
					transform={`translate(${center}, ${center})`}
					data-value={row[metrics.topRight.column]}
				/>

				<path
					d={getArc(tr * 0.7, tr * 0.5, 0, Math.PI / 2)}
					fill="#6176B8"
					transform={`translate(${center}, ${center})`}
					data-value={row[metrics.topRight.column]}
				/>

				<path
					d={getArc(tr * 0.4, tr * 0.25, 0, Math.PI / 2)}
					stroke="#6176B8"
					stroke-width="2"
					fill="white"
					transform={`translate(${center}, ${center})`}
					data-value={row[metrics.topRight.column]}
				/>

				<!-- BOTTOM LEFT: circle + cross -->
				<circle
					cx={center - tileWidth / 4}
					cy={center + tileWidth / 4}
					r={bl / 2.25}
					fill="#3F3F78"
					data-value={row[metrics.bottomLeft.column]}
				/>

				<line
					x1={center / 2}
					y1={center}
					x2={center / 2}
					y2={tileWidth}
					stroke="white"
					stroke-width={bl / (25 * 0.65)}
				/>
				<line
					x1={0}
					y1={center * 1.5}
					x2={center}
					y2={center * 1.5}
					stroke="white"
					stroke-width={bl / (25 * 0.65)}
				/>
				<circle
					cx={center - tileWidth / 4}
					cy={center + tileWidth / 4}
					r={bl / (2 * 2.75)}
					fill="#E3BA35"
					stroke="white"
					stroke-width={bl / (25 * 0.65)}
					data-value={row[metrics.bottomLeft.column]}
				/>

				<!-- BOTTOM RIGHT: 2x2 grid of squares -->
				<rect
					x={center}
					y={center}
					width={br}
					height={br}
					fill="#3F3F78"
					data-value={row[metrics.bottomRight.column]}
				/>

				<rect
					x={center + br * 0.075}
					y={center + br * 0.075}
					width={br * 0.4}
					height={br * 0.4}
					fill="#6176B8"
					data-value={row[metrics.bottomRight.column]}
				/>
				<rect
					x={center + br * 0.115}
					y={center + br * 0.115}
					width={br * 0.32}
					height={br * 0.32}
					fill="white"
				/>

				<rect
					x={center + br * 0.525}
					y={center + br * 0.075}
					width={br * 0.4}
					height={br * 0.4}
					fill="#6176B8"
					data-value={row[metrics.bottomRight.column]}
				/>
				<rect
					x={center + br * 0.565}
					y={center + br * 0.115}
					width={br * 0.32}
					height={br * 0.32}
					fill="white"
				/>

				<rect
					x={center + br * 0.525}
					y={center + br * 0.525}
					width={br * 0.4}
					height={br * 0.4}
					fill="#6176B8"
					data-value={row[metrics.bottomRight.column]}
				/>
				<rect
					x={center + br * 0.565}
					y={center + br * 0.565}
					width={br * 0.32}
					height={br * 0.32}
					fill="white"
				/>

				<rect
					x={center + br * 0.075}
					y={center + br * 0.525}
					width={br * 0.4}
					height={br * 0.4}
					fill="#6176B8"
					data-value={row[metrics.bottomRight.column]}
				/>
				<rect
					x={center + br * 0.115}
					y={center + br * 0.565}
					width={br * 0.32}
					height={br * 0.32}
					fill="white"
				/>

				<!-- <line x1={center} y1={0} x2={center} y2={tileWidth} stroke-width="1" stroke="#ddd" />
				<line x1={0} y1={center} x2={tileWidth} y2={center} stroke-width="1" stroke="#ddd" /> -->
				<text font-size="20" font-weight="bold" x={center} y={tileWidth - 10} text-anchor="middle"
					>{row.Entity}</text
				>
			</g>
		{/each}
	</svg>
</div>
