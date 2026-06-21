<script>
	import { data } from './data.js';
</script>

<!-- Output-only end result: one circle per row, x/y read straight from the data
     (no scaling); y is flipped so larger values sit higher up the canvas. -->
<svg
	class="chart h-auto w-full max-w-150"
	viewBox="0 0 500 350"
	role="img"
	aria-label="A scatter plot with one dot per data row"
>
	{#each data as d}
		<circle cx={d.x} cy={350 - d.y} r="8" fill="steelblue" />
	{/each}
</svg>
