<script>
	import { data } from './data.js';
</script>

<table class="w-full border-collapse text-left text-[0.85rem]">
	<thead>
		<tr class="border-b border-text/25">
			<th class="py-1 pr-3 font-semibold">label</th>
			<th class="py-1 pr-3 font-semibold">x</th>
			<th class="py-1 font-semibold">y</th>
		</tr>
	</thead>
	<tbody>
		{#each data as d}
			<tr class="border-b border-text/10 last:border-0">
				<td class="py-1 pr-3">{d.label}</td>
				<td class="py-1 pr-3 tabular-nums">{d.x}</td>
				<td class="py-1 tabular-nums">{d.y}</td>
			</tr>
		{/each}
	</tbody>
</table>
