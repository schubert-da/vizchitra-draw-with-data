<script>
	// Lets a wide showcase chart spill past the centred article column to fill the
	// whole main panel. `100cqw` is the main column's content width (it's a
	// @container in the chapter layout), so this is scrollbar-safe; on narrow
	// screens 100cqw equals the article width and this becomes a no-op.
	//
	// `max` (px) optionally caps how wide it bleeds; the chart then centres within
	// the panel instead of touching both edges.
	let { max = null, children } = $props();
</script>

<div class="bleed my-8" style={max ? `--bleed-max: ${max}px` : ''}>
	{@render children()}
</div>

<style>
	.bleed {
		/* Cap the bleed at `max` if given, else fill the panel. The same value
		   drives width and the centring margins so it stays aligned. */
		--bleed-w: min(100cqw, var(--bleed-max, 100cqw));
		width: var(--bleed-w);
		margin-inline: calc((100% - var(--bleed-w)) / 2);
	}
</style>
