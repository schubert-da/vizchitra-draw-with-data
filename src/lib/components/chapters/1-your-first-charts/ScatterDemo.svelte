<script>
	import { data } from './data.js';
</script>

<!-- Output-only end result: one circle per row, data scaled to pixels. -->
<svg
	class="chart h-auto w-full max-w-150"
	viewBox="0 0 600 400"
	role="img"
	aria-label="A scatter plot with one dot per data row"
>
	{#each data as d}
		<circle cx={d.x * 6} cy={400 - d.y * 4} r="8" fill="steelblue" />
	{/each}
</svg>
