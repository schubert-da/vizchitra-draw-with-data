<script>
	import data from '$assets/data/spotify-2010s.csv';
	import { genreColors } from '$components/chapters/2-drawing-with-data/genre-colors.js';
	import * as d3 from 'd3';

	const W = 960;
	const cream = '#EFEEE5';
	const dark = '#351D13';

	// Each metric maps to a fraction of a leaf's radius, so every disc shows that
	// song's profile scaled to its own size. All four wedges radiate from the centre.
	const frac = (key) =>
		d3
			.scaleLinear()
			.domain(d3.extent(data, (d) => d[key]))
			.range([0.52, 0.96]);
	const popFrac = frac('popularity');
	const tempoFrac = frac('bpm');
	const energyFrac = frac('energy');
	const danceFrac = frac('danceability');

	// d3.group nests the data into Map(genre -> Map(artist -> [songs])); this walks
	// that structure for d3.hierarchy.
	function getChildren(d) {
		if (d instanceof Map) return [...d];
		if (Array.isArray(d)) {
			const v = d[1];
			if (v instanceof Map) return [...v];
			if (Array.isArray(v)) return v;
		}
		return null;
	}

	const grouped = d3.group(
		data,
		(d) => d.genre,
		(d) => d.artist
	);
	const root = d3
		.hierarchy(grouped, getChildren)
		// leaf value = popularity (+ a floor so a 0 still shows); sizes the leaves.
		.sum((d) => (d && !(d instanceof Map) && !Array.isArray(d) ? d.popularity + 8 : 0))
		.sort((a, b) => b.value - a.value);

	d3.pack().size([W, W]).padding(4)(root);

	const nodes = root.descendants();
	console.log(nodes);

	const PAD = 0.06; // angular gap so the four wedges read as separate quadrants

	function arc(startAngle, endAngle, innerRadius, outerRadius) {
		return d3
			.arc()
			.innerRadius(innerRadius)
			.outerRadius(outerRadius)
			.startAngle(startAngle)
			.endAngle(endAngle)();
	}
</script>

<svg
	class="block h-auto w-full"
	viewBox="0 0 {W} {W}"
	role="img"
	aria-label="Songs packed into circles, grouped by genre then artist; each leaf is a vinyl disc sized by popularity"
>
	{#each nodes as node}
		{#if node.depth === 1}
			<!-- genre group: tinted region -->
			<circle
				cx={node.x}
				cy={node.y}
				r={node.r}
				fill={genreColors[node.data[0]]}
				fill-opacity="0.12"
				stroke={genreColors[node.data[0]]}
				stroke-opacity="0.45"
			/>
		{:else if node.depth === 2}
			<!-- artist group: faint outline -->
			<circle cx={node.x} cy={node.y} r={node.r} fill="none" stroke="#999" stroke-opacity="0.3" />
		{:else if node.depth === 3}
			{@const s = node.data}
			{@const R = node.r}
			{@const inner = 0.4 * R}
			<!-- leaf: the vinyl disc - cream wedges radiate from the centre, around a genre hub -->
			<g transform={`translate(${node.x}, ${node.y})`}>
				<circle r={R} fill={dark} />
				{#if R > 7}
					<path
						d={arc(1.5 * Math.PI + PAD, 2 * Math.PI - PAD, inner, popFrac(s.popularity) * R)}
						fill={cream}
					/>
					<path
						d={arc(0 + PAD, 0.5 * Math.PI - PAD, inner, energyFrac(s.energy) * R)}
						fill={cream}
					/>
					<path
						d={arc(0.5 * Math.PI + PAD, Math.PI - PAD, inner, tempoFrac(s.bpm) * R)}
						fill={cream}
					/>
					<path
						d={arc(Math.PI + PAD, 1.5 * Math.PI - PAD, inner, danceFrac(s.danceability) * R)}
						fill={cream}
					/>
					<circle r={0.28 * R} fill={genreColors[s.genre]} />
				{/if}
			</g>
		{/if}
	{/each}

	<!-- artist labels: only for groups with more than 5 songs, centred in the group -->
	{#each nodes.filter((n) => n.depth === 2 && n.children.length > 4) as a}
		<text
			x={a.x}
			y={a.y}
			text-anchor="middle"
			dominant-baseline="central"
			font-size={Math.max(11, Math.min(16, a.r * 0.22))}
			font-weight="bold"
			fill={dark}
			stroke="#fff"
			stroke-width="3"
			paint-order="stroke"
		>
			{a.data[0]}
		</text>
	{/each}

	<!-- genre labels on top -->
	{#each nodes.filter((n) => n.depth === 1) as g}
		<text
			x={g.x}
			y={g.y - g.r + 24}
			text-anchor="middle"
			font-size="18"
			font-weight="bold"
			fill={genreColors[g.data[0]]}
			stroke="#fff"
			stroke-width="3.5"
			paint-order="stroke"
		>
			{g.data[0]}
		</text>
	{/each}
</svg>
