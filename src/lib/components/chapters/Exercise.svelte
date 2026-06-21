<script>
	// Frames a student's live exercise output inside a section's main track and
	// points them at the file to edit. `file` is the name under src/exercises/
	// (e.g. "1-first-scatter-plot.svelte"); `children` is the exercise output.
	let { file, children } = $props();
</script>

<div class="my-6 rounded-lg border border-text/15 bg-palette-white">
	<div
		class="flex items-center gap-2 border-b border-text/10 px-3 py-1.5 text-xs font-[var(--font-code)] text-text/60"
	>
		<span class="font-bold tracking-[0.06em] text-primary uppercase">Your work</span>
		<span>edit <code class="text-primary-400">src/exercises/{file}</code></span>
	</div>

	<div class="px-4">
		{@render children()}
	</div>
</div>
