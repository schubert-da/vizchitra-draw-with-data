<script>
	import data from '$assets/data/spotify-2010s.csv';
	import { genreColors } from '$components/chapters/2-drawing-with-data/genre-colors.js';
	import * as d3 from 'd3';

	// One vinyl disc, centred at (0,0): a dark record with four cream wedges
	// radiating from the centre and a genre-coloured hub. `r` is the radius.
	let { r, song } = $props();

	const cream = '#EFEEE5';
	const dark = '#351D13';
	const PAD = 0.06; // angular gap so the four wedges read as separate quadrants

	const frac = (key) =>
		d3
			.scaleLinear()
			.domain(d3.extent(data, (d) => d[key]))
			.range([0.52, 0.96]);
	const popFrac = frac('popularity');
	const tempoFrac = frac('bpm');
	const energyFrac = frac('energy');
	const danceFrac = frac('danceability');

	function arc(startAngle, endAngle, innerRadius, outerRadius) {
		return d3
			.arc()
			.innerRadius(innerRadius)
			.outerRadius(outerRadius)
			.startAngle(startAngle)
			.endAngle(endAngle)();
	}
</script>

<circle {r} fill={dark} />
{#if r > 7}
	{@const inner = 0.4 * r}
	<path d={arc(1.5 * Math.PI + PAD, 2 * Math.PI - PAD, inner, popFrac(song.popularity) * r)} fill={cream} />
	<path d={arc(0 + PAD, 0.5 * Math.PI - PAD, inner, energyFrac(song.energy) * r)} fill={cream} />
	<path d={arc(0.5 * Math.PI + PAD, Math.PI - PAD, inner, tempoFrac(song.bpm) * r)} fill={cream} />
	<path d={arc(Math.PI + PAD, 1.5 * Math.PI - PAD, inner, danceFrac(song.danceability) * r)} fill={cream} />
	<circle r={0.28 * r} fill={genreColors[song.genre]} />
{/if}
