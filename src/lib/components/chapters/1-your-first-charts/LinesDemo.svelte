<script>
	import { data } from './data.js';
</script>

<!-- Output-only end result: the scatter plot with a line joining each dot to
     the next. Lines are drawn first so the dots sit on top. -->
<svg
	class="chart h-auto w-full max-w-150"
	viewBox="0 0 500 350"
	role="img"
	aria-label="A line chart connecting one dot per data row"
>
	{#each data as d, i}
		{#if i > 0}
			<line
				x1={data[i - 1].x}
				y1={350 - data[i - 1].y}
				x2={d.x}
				y2={350 - d.y}
				stroke="tomato"
				stroke-width="2"
			/>
		{/if}
	{/each}
	{#each data as d}
		<circle cx={d.x} cy={350 - d.y} r="8" fill="steelblue" />
	{/each}
</svg>
