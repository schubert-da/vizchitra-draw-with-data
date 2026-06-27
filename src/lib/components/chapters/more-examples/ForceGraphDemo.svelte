<script>
	import data from '$assets/data/spotify-2010s.csv';
	import * as d3 from 'd3';
	import { onDestroy } from 'svelte';
	import Disc from './Disc.svelte';

	const W = 1400;
	const H = 900;
	const cx = W / 2;
	const cy = H / 2;
	const REPEL = 64; // radius of the mouse repeller (medium reach)
	const LABEL_R = 47; // only discs at least this big get a title (≈ top-quartile popularity)

	const rScale = d3
		.scaleSqrt()
		.domain([0, d3.max(data, (d) => d.popularity)])
		.range([6, 50]);

	// Master node list - positions persist as the slider count changes.
	const allNodes = data.map((d, i) => ({
		...d,
		id: i,
		r: rScale(d.popularity),
		x: cx + Math.cos(i) * 60,
		y: cy + Math.sin(i) * 60
	}));

	let count = $state(50);
	let nodes = $state([]);
	let mouse = $state({ x: null, y: null });

	/** @type {SVGSVGElement} */
	let svgEl;

	// Pull same-genre discs toward their shared centroid (no fixed anchors); paired
	// with charge repulsion below, the genres clump and push each other apart.
	function genreCluster(strength) {
		let ns;
		function force(alpha) {
			const c = new Map();
			for (const n of ns) {
				const g = c.get(n.genre) ?? { x: 0, y: 0, n: 0 };
				g.x += n.x;
				g.y += n.y;
				g.n++;
				c.set(n.genre, g);
			}
			for (const g of c.values()) {
				g.x /= g.n;
				g.y /= g.n;
			}
			const k = strength * alpha;
			for (const n of ns) {
				const g = c.get(n.genre);
				n.vx += (g.x - n.x) * k;
				n.vy += (g.y - n.y) * k;
			}
		}
		force.initialize = (n) => (ns = n);
		return force;
	}

	// A circle under the cursor that shoves nearby discs away. Not alpha-scaled, so
	// the gap holds for as long as the simulation is warm (i.e. while hovering).
	function mouseRepel() {
		let ns;
		function force() {
			if (mouse.x == null) return;
			for (const n of ns) {
				const dx = n.x - mouse.x;
				const dy = n.y - mouse.y;
				const dist = Math.hypot(dx, dy) || 0.001;
				const min = REPEL + n.r;
				if (dist < min) {
					const push = (min - dist) * 0.6;
					n.vx += (dx / dist) * push;
					n.vy += (dy / dist) * push;
				}
			}
		}
		force.initialize = (n) => (ns = n);
		return force;
	}

	const sim = d3
		.forceSimulation([])
		.velocityDecay(0.6) // extra friction so motion damps instead of thrashing
		.force('collide', d3.forceCollide((d) => d.r + 1.5).strength(0.9))
		.force('charge', d3.forceManyBody().strength(-8).distanceMax(180))
		.force('cluster', genreCluster(0.35))
		.force('x', d3.forceX(cx).strength(0.02))
		.force('y', d3.forceY(cy).strength(0.06))
		.force('mouse', mouseRepel())
		.on('tick', () => {
			nodes = sim.nodes().slice();
		});

	// Re-run whenever the slider count changes; kept-on nodes keep their positions.
	$effect(() => {
		sim.nodes(allNodes.slice(0, count));
		sim.alpha(0.7).restart();
	});

	onDestroy(() => sim.stop());

	function toViz(e) {
		const rect = svgEl.getBoundingClientRect();
		return {
			x: ((e.clientX - rect.left) / rect.width) * W,
			y: ((e.clientY - rect.top) / rect.height) * H
		};
	}
	function onMove(e) {
		mouse = toViz(e);
		// keep the sim barely warm so the repel hole follows, without thrashing
		sim.alphaTarget(0.03).restart();
	}
	function onLeave() {
		mouse = { x: null, y: null };
		sim.alphaTarget(0);
	}

	// Split a title into two lines, balancing character count across the break so
	// neither line is much longer than the other. One-word titles stay on one line.
	function splitTwo(title) {
		const words = title.split(' ');
		if (words.length === 1) return words;
		let best = 1;
		let bestDiff = Infinity;
		for (let i = 1; i < words.length; i++) {
			const diff = Math.abs(words.slice(0, i).join(' ').length - words.slice(i).join(' ').length);
			if (diff < bestDiff) {
				bestDiff = diff;
				best = i;
			}
		}
		return [words.slice(0, best).join(' '), words.slice(best).join(' ')];
	}
</script>

<div class="mb-4 flex items-center gap-3 text-sm">
	<label for="song-count" class="font-medium">Songs shown</label>
	<input
		id="song-count"
		type="range"
		min="10"
		max={data.length}
		bind:value={count}
		class="w-56 accent-primary"
	/>
	<span class="text-text/70 tabular-nums">{count} / {data.length}</span>
</div>

<svg
	bind:this={svgEl}
	viewBox="0 0 {W} {H}"
	class="block h-auto w-full touch-none"
	onpointermove={onMove}
	onpointerleave={onLeave}
	role="img"
	aria-label="A force-directed cloud of song discs, clustered by genre; the cursor repels nearby discs"
>
	{#each nodes as n (n.id)}
		<g transform={`translate(${n.x}, ${n.y})`}>
			<Disc r={n.r} song={n} />
			{#if n.r >= LABEL_R}
				{@const lines = splitTwo(n.title)}
				<text
					text-anchor="middle"
					dominant-baseline="middle"
					paint-order="stroke"
					stroke="#EFEEE5"
					stroke-width="3"
					stroke-linejoin="round"
					class="pointer-events-none fill-[#351D13] text-[15px] font-medium"
				>
					{#each lines as line, i}
						<tspan x="0" dy={i === 0 ? `${-(lines.length - 1) * 0.55}em` : '1.3em'}>{line}</tspan>
					{/each}
				</text>
			{/if}
		</g>
	{/each}
</svg>
