<script>
	import data from '$assets/data/spotify-2010s.csv';
	import { Pi } from '@lucide/svelte';
	import * as d3 from 'd3';
	import TileLegend from './TileLegend.svelte';

	console.log(data);

	let popularityScale = d3
		.scaleLinear()
		.domain(d3.extent(data, (d) => d.popularity))
		.range([30, 90]);
	let danceScale = d3
		.scaleLinear()
		.domain(d3.extent(data, (d) => d.danceability))
		.range([30, 90]);
	let speechScale = d3
		.scaleLinear()
		.domain(d3.extent(data, (d) => d.speechiness))
		.range([30, 90]);
	let energyScale = d3
		.scaleLinear()
		.domain(d3.extent(data, (d) => d.energy))
		.range([30, 90]);
	let bpmScale = d3
		.scaleLinear()
		.domain(d3.extent(data, (d) => d.bpm))
		.range([30, 90]);

	const genreColors = {
		'Dance pop': '#E75B2B',
		Pop: '#DB1E24',
		'Hip-hop/R&B': '#F9B806',
		'Acoustic/Folk': '#3091B9',
		Other: '#E032A3',
		EDM: '#53DC41'
	};

	const tileSize = 250;
	const numCols = 5;

	function drawArc(startAngle, endAngle, innerRadius = 0, outerRadius = tileSize * 0.5) {
		const arc = d3
			.arc()
			.innerRadius(innerRadius)
			.outerRadius(outerRadius)
			.startAngle(startAngle)
			.endAngle(endAngle);

		return arc();
	}
</script>

<div class="mx-auto w-full max-w-250 pt-10">
	<TileLegend />
</div>
<div class="content dis w-full p-10">
	<svg
		class="mx-auto"
		width={tileSize * numCols}
		height={tileSize * Math.ceil(data.length / numCols)}
	>
		{#each data as row, i}
			<g
				transform={`translate(${(i % numCols) * tileSize}, ${Math.floor(i / numCols) * tileSize})`}
			>
				<rect
					width={tileSize}
					height={tileSize}
					fill={genreColors[row.genre]}
					stroke="#fff"
					stroke-width="4"
				/>
				<circle cx={tileSize / 2} cy={tileSize / 2} r={(tileSize * 0.9) / 2} fill="#351D13" />
				<path
					d={drawArc(1.5 * Math.PI, 2 * Math.PI, 0, popularityScale(row.popularity))}
					fill="#EFEEE5"
					stroke="#EFEEE5"
					stroke-width="4"
					transform={`translate(${tileSize / 2}, ${tileSize / 2})`}
				/>
				<path
					d={drawArc(0.5 * Math.PI, 1 * Math.PI, 0, bpmScale(row.bpm))}
					fill="#EFEEE5"
					stroke="#EFEEE5"
					stroke-width="4"
					transform={`translate(${tileSize / 2}, ${tileSize / 2})`}
				/>
				<line
					x1={0}
					y1={tileSize / 2}
					x2={tileSize}
					y2={tileSize / 2}
					stroke="#EFEEE5"
					stroke-width="4"
				/>
				<line
					x1={tileSize / 2}
					y1={0}
					x2={tileSize / 2}
					y2={tileSize}
					stroke="#EFEEE5"
					stroke-width="4"
				/>

				<rect
					x={tileSize / 2}
					y={0}
					width={tileSize / 2}
					height={tileSize / 2}
					fill="#351D13"
					stroke="#EFEEE5"
					stroke-width="4"
				/>
				<rect
					x={0}
					y={tileSize / 2}
					width={tileSize / 2}
					height={tileSize / 2}
					fill="#351D13"
					stroke="#EFEEE5"
					stroke-width="4"
				/>

				<path
					d={drawArc(0, 0.5 * Math.PI, 0, danceScale(row.danceability))}
					fill="#EFEEE5"
					transform={`translate(${0}, ${tileSize})`}
				/>
				<path
					d={drawArc(0, 0.5 * Math.PI, 0, danceScale(row.danceability) * 0.6)}
					fill={genreColors[row.genre]}
					transform={`translate(${0}, ${tileSize})`}
				/>

				<path
					d={drawArc(Math.PI, 1.5 * Math.PI, 0, energyScale(row.energy))}
					fill="#EFEEE5"
					transform={`translate(${tileSize}, 0)`}
				></path>
				<path
					d={drawArc(Math.PI, 1.5 * Math.PI, 0, energyScale(row.energy) * 0.6)}
					fill={genreColors[row.genre]}
					transform={`translate(${tileSize}, 0)`}
				></path>

				<circle
					cx={tileSize / 2}
					cy={tileSize / 2}
					r={30}
					fill={genreColors[row.genre]}
					stroke="#EFEEE5"
					stroke-width="4"
				/>

				<text
					class="font-display"
					x={tileSize / 2}
					y={tileSize - 53}
					text-anchor="middle"
					font-size="22"
					font-weight="bold"
					fill="#351D13"
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
					fill="#351D13"
					stroke="#fff"
					stroke-width="1.5"
					paint-order="stroke"
				>
					{row.artist}
				</text>
			</g>
		{/each}
	</svg>
</div>
