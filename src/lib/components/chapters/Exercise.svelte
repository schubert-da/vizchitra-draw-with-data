<script>
	// Frames a student's live exercise output inside a section's main track and
	// points them at the file to edit. `file` is the name under src/exercises/
	// (e.g. "1-first-scatter-plot.svelte"); `children` is the exercise output.
	// `result` is an optional snippet holding the section's finished demo - when
	// passed, the frame shows tabs to flip between the student's work and it.
	// `bleed` lets a wide exercise (e.g. a big grid) spill past the article
	// column to fill the whole main panel on roomy screens. `solution` names a
	// specific file under src/exercises/solutions/ to copy - defaults to `file`,
	// but a section reusing one starter can point at its own solved variant.
	let { file, bleed = false, solution, children, result } = $props();

	let active = $state('work'); // 'work' | 'solution'
	let copied = $state(false);

	// Raw source of every drop-in solved exercise, loaded once at build time and
	// keyed by basename so an <Exercise> can look its solution up by name.
	const solutionModules = import.meta.glob('../../../exercises/solutions/*.svelte', {
		query: '?raw',
		import: 'default',
		eager: true
	});
	const solutionSources = Object.fromEntries(
		Object.entries(solutionModules).map(([path, src]) => [path.split('/').pop(), src])
	);
	const solutionSource = $derived(solutionSources[solution ?? file]);

	async function copySolution() {
		try {
			await navigator.clipboard.writeText(solutionSource);
			copied = true;
			setTimeout(() => (copied = false), 1800);
		} catch {
			// Clipboard unavailable (insecure context or permission denied) - no-op.
		}
	}
</script>

<div class="my-6" class:bleed>
	{#if solutionSource}
		<div class="mb-1.5 flex justify-end">
			<button type="button" class="copy-solution" class:copied onclick={copySolution}>
				{copied ? 'Copied!' : 'Copy solution'}
			</button>
		</div>
	{/if}

	<div class="rounded-lg border border-text/15 bg-palette-white">
		<div
			class="flex items-center gap-2 border-b border-text/10 px-3 py-1.5 text-xs font-[var(--font-code)] text-text/60"
		>
			{#if result}
				<div class="seg" role="tablist" aria-label="Exercise view">
					<span class="seg-thumb" class:right={active === 'solution'} aria-hidden="true"></span>
					<button
						type="button"
						role="tab"
						aria-selected={active === 'work'}
						class="seg-btn"
						class:on={active === 'work'}
						onclick={() => (active = 'work')}>Your work</button
					>
					<button
						type="button"
						role="tab"
						aria-selected={active === 'solution'}
						class="seg-btn"
						class:on={active === 'solution'}
						onclick={() => (active = 'solution')}>Solution</button
					>
				</div>
			{:else}
				<span class="font-bold tracking-[0.06em] text-primary uppercase">Your work</span>
			{/if}

			{#if active === 'work'}
				<span class="ml-auto">edit <code class="text-primary-400">src/exercises/{file}</code></span>
			{/if}
		</div>

		<div class="px-4" role="tabpanel">
			{#if active === 'solution' && result}
				{@render result()}
			{:else}
				{@render children()}
			{/if}
		</div>
	</div>
</div>

<style>
	/* A small outlined button above the frame; copies the solved file's source.
	   currentColor-based so it reads cleanly on either theme, filling with the
	   accent colour for a moment after a successful copy. */
	.copy-solution {
		display: inline-flex;
		align-items: center;
		padding: 0.28rem 0.7rem;
		border: 1px solid color-mix(in srgb, currentColor 22%, transparent);
		border-radius: 0.4rem;
		background: transparent;
		font-family: var(--font-code);
		font-size: 0.72rem;
		font-weight: 700;
		letter-spacing: 0.04em;
		text-transform: uppercase;
		color: color-mix(in srgb, currentColor 65%, transparent);
		cursor: pointer;
		transition:
			color 0.18s ease,
			border-color 0.18s ease,
			background 0.18s ease;
	}
	.copy-solution:hover {
		color: var(--color-primary, #da7b4f);
		border-color: color-mix(in srgb, var(--color-primary, #da7b4f) 45%, transparent);
	}
	.copy-solution.copied {
		color: #fff;
		background: var(--color-primary, #da7b4f);
		border-color: var(--color-primary, #da7b4f);
	}

	/* A segmented slider: a pill track with a highlight that slides between the
	   two options, so it reads clearly as a toggle. */
	.seg {
		position: relative;
		display: inline-flex;
		padding: 3px;
		border-radius: 9999px;
		background: color-mix(in srgb, currentColor 12%, transparent);
	}
	.seg-thumb {
		position: absolute;
		top: 3px;
		bottom: 3px;
		left: 3px;
		width: calc(50% - 3px);
		border-radius: 9999px;
		background: var(--color-primary, #da7b4f);
		transition: transform 0.22s cubic-bezier(0.22, 1, 0.36, 1);
	}
	.seg-thumb.right {
		transform: translateX(100%);
	}
	.seg-btn {
		position: relative;
		z-index: 1;
		flex: 1 1 0;
		padding: 0.15rem 1.3rem;
		font-weight: 700;
		letter-spacing: 0.06em;
		text-transform: uppercase;
		white-space: nowrap;
		color: color-mix(in srgb, currentColor 60%, transparent);
		cursor: pointer;
		transition: color 0.22s ease;
	}
	.seg-btn.on {
		color: #fff;
	}

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
