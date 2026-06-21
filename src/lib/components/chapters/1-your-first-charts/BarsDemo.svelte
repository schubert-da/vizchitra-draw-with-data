<script>
	import { data } from './data.js';
</script>

<!-- Output-only end result: one vertical bar per row, evenly spaced across the
     canvas (x from the row's position, not its value). The height is the row's
     y value read straight from the data, grown up from the bottom. -->
<svg
	class="chart h-auto w-full max-w-150"
	viewBox="0 0 500 350"
	role="img"
	aria-label="A bar chart with one evenly spaced vertical bar per data row"
>
	{#each data as d, i}
		<rect x={i * 100 + 30} y={350 - d.y} width="40" height={d.y} fill="seagreen" />
	{/each}
</svg>
