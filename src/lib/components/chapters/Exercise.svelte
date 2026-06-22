<script>
	// Frames a student's live exercise output inside a section's main track and
	// points them at the file to edit. `file` is the name under src/exercises/
	// (e.g. "1-first-scatter-plot.svelte"); `children` is the exercise output.
	// `bleed` lets a wide exercise (e.g. a big grid) spill past the article
	// column to fill the whole main panel on roomy screens.
	let { file, bleed = false, children } = $props();
</script>

<div class="my-6 rounded-lg border border-text/15 bg-palette-white" class:bleed>
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

<style>
	/* The article column is capped at 736px and centred in the main panel. To let
	   a wide exercise fill the panel edge-to-edge we size it to 100cqw - the main
	   column's own content width (it's a @container in the chapter layout). Using
	   cqw, not vw, keeps this scrollbar-safe and exact. When the column is narrower
	   than the article cap, 100cqw equals the article width, so this is a no-op. */
	.bleed {
		width: 100cqw;
		margin-inline: calc((100% - 100cqw) / 2);
	}
</style>
