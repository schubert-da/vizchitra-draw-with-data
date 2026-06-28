<script>
	import { data } from './data.js';

	// Build the `d` string: trace through every point, drop to the base
	// (y = 350) under the last and first points, then close into a shape.
	const firstX = data[0].x;
	const lastX = data[data.length - 1].x;
	const top = data.map((p) => `${p.x} ${350 - p.y}`).join(' L ');
	const pathD = `M ${top} L ${lastX} 350 L ${firstX} 350 Z`;
</script>

<!-- Output-only end result: a filled <path> area under the points. -->
<svg
	class="chart h-auto w-full max-w-150"
	viewBox="0 0 500 350"
	role="img"
	aria-label="An area chart filling the space under one point per data row"
>
	<path d={pathD} fill="teal" stroke="teal" stroke-width="2" />
	{#each data as p}
		<circle cx={p.x} cy={350 - p.y} r="8" fill="steelblue" />
	{/each}
</svg>
