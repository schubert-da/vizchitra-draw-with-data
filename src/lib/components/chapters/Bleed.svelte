<script>
	// Lets a wide showcase chart spill past the centred article column to fill the
	// whole main panel. `100cqw` is the main column's content width (it's a
	// @container in the chapter layout), so this is scrollbar-safe; on narrow
	// screens 100cqw equals the article width and this becomes a no-op.
	let { children } = $props();
</script>

<div class="bleed my-8">
	{@render children()}
</div>

<style>
	.bleed {
		width: 100cqw;
		margin-inline: calc((100% - 100cqw) / 2);
	}
</style>
