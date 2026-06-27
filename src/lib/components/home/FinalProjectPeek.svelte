<script>
	import data from '$assets/data/spotify-2010s.csv';
	import * as d3 from 'd3';

	// A small, faithful slice of the final Music Chart used as a homepage teaser.
	// The per-tile drawing mirrors TileGrid.svelte exactly (same scales, same
	// geometry) so what you see here is literally the chart you build - we just
	// render the first few songs and let the SVG viewBox scale them to fit.
	const tileSize = 250;
	const numCols = 3;
	const numRows = 2;
	const rows = data.slice(0, numCols * numRows);

	const cream = '#EFEEE5';
	const dark = '#351D13';

	const genreColors = {
		'Dance pop': '#E75B2B',
		Pop: '#DB1E24',
		'Hip-hop/R&B': '#F9B806',
		'Acoustic/Folk': '#3091B9',
		Other: '#E032A3',
		EDM: '#53DC41'
	};

	// Scales are taken over the full dataset (not just the slice) so the arcs are
	// sized on the same footing as the real chart.
	const popularityScale = d3
		.scaleLinear()
		.domain(d3.extent(data, (d) => d.popularity))
		.range([30, 90]);
	const danceScale = d3
		.scaleLinear()
		.domain(d3.extent(data, (d) => d.danceability))
		.range([30, 90]);
	const energyScale = d3
		.scaleLinear()
		.domain(d3.extent(data, (d) => d.energy))
		.range([30, 90]);
	const bpmScale = d3
		.scaleLinear()
		.domain(d3.extent(data, (d) => d.bpm))
		.range([30, 90]);

	function drawArc(startAngle, endAngle, innerRadius = 0, outerRadius = tileSize * 0.5) {
		return d3
			.arc()
			.innerRadius(innerRadius)
			.outerRadius(outerRadius)
			.startAngle(startAngle)
			.endAngle(endAngle)();
	}
</script>

<svg
	class="block w-full"
	viewBox={`0 0 ${tileSize * numCols} ${tileSize * numRows}`}
	role="img"
	aria-label="A preview of the final music chart: songs drawn as small record tiles"
>
	{#each rows as row, i}
		<g transform={`translate(${(i % numCols) * tileSize}, ${Math.floor(i / numCols) * tileSize})`}>
			<rect
				width={tileSize}
				height={tileSize}
				fill={genreColors[row.genre]}
				stroke="#fff"
				stroke-width="4"
			/>
			<circle cx={tileSize / 2} cy={tileSize / 2} r={(tileSize * 0.9) / 2} fill={dark} />
			<path
				d={drawArc(1.5 * Math.PI, 2 * Math.PI, 0, popularityScale(row.popularity))}
				fill={cream}
				stroke={cream}
				stroke-width="4"
				transform={`translate(${tileSize / 2}, ${tileSize / 2})`}
			/>
			<path
				d={drawArc(0.5 * Math.PI, 1 * Math.PI, 0, bpmScale(row.bpm))}
				fill={cream}
				stroke={cream}
				stroke-width="4"
				transform={`translate(${tileSize / 2}, ${tileSize / 2})`}
			/>
			<line x1={0} y1={tileSize / 2} x2={tileSize} y2={tileSize / 2} stroke={cream} stroke-width="4" />
			<line x1={tileSize / 2} y1={0} x2={tileSize / 2} y2={tileSize} stroke={cream} stroke-width="4" />

			<rect
				x={tileSize / 2}
				y={0}
				width={tileSize / 2}
				height={tileSize / 2}
				fill={dark}
				stroke={cream}
				stroke-width="4"
			/>
			<rect
				x={0}
				y={tileSize / 2}
				width={tileSize / 2}
				height={tileSize / 2}
				fill={dark}
				stroke={cream}
				stroke-width="4"
			/>

			<path
				d={drawArc(0, 0.5 * Math.PI, 0, danceScale(row.danceability))}
				fill={cream}
				transform={`translate(${0}, ${tileSize})`}
			/>
			<path
				d={drawArc(0, 0.5 * Math.PI, 0, danceScale(row.danceability) * 0.6)}
				fill={genreColors[row.genre]}
				transform={`translate(${0}, ${tileSize})`}
			/>

			<path
				d={drawArc(Math.PI, 1.5 * Math.PI, 0, energyScale(row.energy))}
				fill={cream}
				transform={`translate(${tileSize}, 0)`}
			/>
			<path
				d={drawArc(Math.PI, 1.5 * Math.PI, 0, energyScale(row.energy) * 0.6)}
				fill={genreColors[row.genre]}
				transform={`translate(${tileSize}, 0)`}
			/>

			<circle
				cx={tileSize / 2}
				cy={tileSize / 2}
				r={30}
				fill={genreColors[row.genre]}
				stroke={cream}
				stroke-width="4"
			/>

			<text
				class="font-display"
				x={tileSize / 2}
				y={tileSize - 53}
				text-anchor="middle"
				font-size="22"
				font-weight="bold"
				fill={dark}
				stroke="#fff"
				stroke-width="1.5"
				paint-order="stroke"
			>
				{row.title.length > 20 ? row.title.slice(0, 20) + '…' : row.title}
			</text>

			<text
				class="font-body"
				x={tileSize / 2}
				y={tileSize - 25}
				text-anchor="middle"
				font-size="18"
				font-weight="bold"
				fill={dark}
				stroke="#fff"
				stroke-width="1.5"
				paint-order="stroke"
			>
				{row.artist}
			</text>
		</g>
	{/each}
</svg>
