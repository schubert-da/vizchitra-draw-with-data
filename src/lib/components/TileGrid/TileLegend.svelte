<script>
	import * as d3 from 'd3';

	// A compact "how to read a tile" key: one example tile on the left, drawn like
	// TileGrid, with a text key and the full genre palette on the right.

	const T = 150; // example tile size
	const C = T / 2; // tile centre
	const cream = '#EFEEE5';
	const dark = '#351D13';
	const exColor = '#E75B2B'; // an example genre colour (Dance pop)

	// Example metric sizes, picked to look balanced (not from a real row).
	const ex = { popularity: 54, tempo: 44, energy: 70, dance: 62 };

	function drawArc(startAngle, endAngle, innerRadius = 0, outerRadius = T * 0.5) {
		return d3
			.arc()
			.innerRadius(innerRadius)
			.outerRadius(outerRadius)
			.startAngle(startAngle)
			.endAngle(endAngle)();
	}

	// Right-hand key. `kind` says which quarter of the mini-icon to highlight,
	// matching where the metric lives on a tile.
	const quad = { tl: [0, 0], tr: [11, 0], br: [11, 11], bl: [0, 11] };
	const metricRows = [
		{ kind: 'tl', color: cream, title: 'Popularity', desc: 'centre arc · top-left' },
		{ kind: 'br', color: cream, title: 'Tempo (BPM)', desc: 'centre arc · bottom-right' },
		{ kind: 'tr', color: exColor, title: 'Energy', desc: 'corner wedge · top-right' },
		{ kind: 'bl', color: exColor, title: 'Danceability', desc: 'corner wedge · bottom-left' }
	];

	const genres = [
		['Dance pop', '#E75B2B'],
		['Pop', '#DB1E24'],
		['Hip-hop/R&B', '#F9B806'],
		['Acoustic/Folk', '#3091B9'],
		['Other', '#E032A3'],
		['EDM', '#53DC41']
	];
</script>

<svg
	class="mx-auto block w-full max-w-150"
	viewBox="0 0 560 210"
	role="img"
	aria-label="Legend explaining how to read each song tile"
>
	<text x="14" y="22" font-size="17" font-weight="bold" fill={dark}>How to read a tile</text>
	<text x="14" y="40" font-size="11" fill="#666">
		Each tile is one song · a bigger arc or wedge means a higher value.
	</text>

	<!-- Example tile, drawn like one cell of the grid -->
	<g transform="translate(14, 52)">
		<rect width={T} height={T} fill={exColor} stroke="#fff" stroke-width="3" />
		<circle cx={C} cy={C} r={0.45 * T} fill={dark} />

		<path
			d={drawArc(1.5 * Math.PI, 2 * Math.PI, 0, ex.popularity)}
			fill={cream}
			stroke={cream}
			stroke-width="3"
			transform={`translate(${C}, ${C})`}
		/>
		<path
			d={drawArc(0.5 * Math.PI, 1 * Math.PI, 0, ex.tempo)}
			fill={cream}
			stroke={cream}
			stroke-width="3"
			transform={`translate(${C}, ${C})`}
		/>

		<line x1="0" y1={C} x2={T} y2={C} stroke={cream} stroke-width="3" />
		<line x1={C} y1="0" x2={C} y2={T} stroke={cream} stroke-width="3" />

		<rect x={C} y="0" width={C} height={C} fill={dark} stroke={cream} stroke-width="3" />
		<rect x="0" y={C} width={C} height={C} fill={dark} stroke={cream} stroke-width="3" />

		<path d={drawArc(0, 0.5 * Math.PI, 0, ex.dance)} fill={cream} transform={`translate(0, ${T})`} />
		<path
			d={drawArc(0, 0.5 * Math.PI, 0, ex.dance * 0.6)}
			fill={exColor}
			transform={`translate(0, ${T})`}
		/>

		<path
			d={drawArc(Math.PI, 1.5 * Math.PI, 0, ex.energy)}
			fill={cream}
			transform={`translate(${T}, 0)`}
		/>
		<path
			d={drawArc(Math.PI, 1.5 * Math.PI, 0, ex.energy * 0.6)}
			fill={exColor}
			transform={`translate(${T}, 0)`}
		/>

		<circle cx={C} cy={C} r="18" fill={exColor} stroke={cream} stroke-width="3" />

		<text
			x={C}
			y={T - 30}
			text-anchor="middle"
			font-size="14"
			font-weight="bold"
			fill={dark}
			stroke="#fff"
			stroke-width="1.25"
			paint-order="stroke">Song title</text
		>
		<text
			x={C}
			y={T - 12}
			text-anchor="middle"
			font-size="11"
			font-weight="bold"
			fill={dark}
			stroke="#fff"
			stroke-width="1.25"
			paint-order="stroke">Artist</text
		>
	</g>

	<!-- Metric key -->
	<g transform="translate(190, 58)">
		{#each metricRows as row, i}
			<g transform={`translate(0, ${i * 33})`}>
				<rect width="22" height="22" fill="#f7f6f1" stroke="#cfcabc" stroke-width="1.5" />
				<rect x={quad[row.kind][0]} y={quad[row.kind][1]} width="11" height="11" fill={row.color} />
				<text x="30" y="11" font-size="13" font-weight="bold" fill={dark}>{row.title}</text>
				<text x="30" y="25" font-size="10.5" fill="#666">{row.desc}</text>
			</g>
		{/each}
	</g>

	<!-- Full genre palette -->
	<g transform="translate(390, 58)">
		<text x="0" y="6" font-size="13" font-weight="bold" fill={dark}>Genre = tile colour</text>
		{#each genres as [name, color], i}
			<g transform={`translate(0, ${20 + i * 21})`}>
				<rect width="13" height="13" rx="2" fill={color} />
				<text x="20" y="11" font-size="11" fill="#444">{name}</text>
			</g>
		{/each}
	</g>
</svg>
