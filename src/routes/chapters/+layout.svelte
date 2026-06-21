<script>
	import { page } from '$app/state';
	import { marked } from 'marked';
	import { fade } from 'svelte/transition';
	import { setScrolly } from '$components/chapters/scrolly.svelte.js';

	let { children } = $props();

	const scrolly = setScrolly();

	// True on a chapter page (/chapters/<slug>), false on the index (/chapters).
	let isChapter = $derived(page.url.pathname.split('/').filter(Boolean).length > 1);

	/** @type {HTMLElement} */
	let shellEl = $state();

	/** @type {HTMLElement} */
	let asideEl = $state();

	// When the active section changes, scroll the sidebar back to the top so the
	// new section's content starts from the beginning.
	$effect(() => {
		scrolly.activeId;
		asideEl?.scrollTo({ top: 0 });
	});

	// One delegated handler copies any code block's source, in the article or sidebar.
	$effect(() => {
		const el = shellEl;
		if (!el) return;

		/** @param {MouseEvent} e */
		function onClick(e) {
			const btn = /** @type {HTMLElement} */ (e.target).closest?.('.code-block-copy');
			if (!btn) return;

			const pre = btn.closest('.code-block')?.querySelector('pre');
			if (!pre) return;

			navigator.clipboard.writeText(pre.textContent ?? '').then(() => {
				const original = btn.textContent;
				btn.textContent = 'Copied';
				btn.classList.add('is-copied');
				setTimeout(() => {
					btn.textContent = original;
					btn.classList.remove('is-copied');
				}, 1500);
			});
		}

		el.addEventListener('click', onClick);
		return () => el.removeEventListener('click', onClick);
	});
</script>

{#if isChapter}
	<div class="flex w-full items-start text-text max-[800px]:flex-col" bind:this={shellEl}>
		<main
			class="prose order-2 min-w-0 flex-1 px-[clamp(1.5rem,4vw,3rem)] pt-[clamp(2rem,6vh,4rem)] pb-[30vh] text-[1.05rem] leading-[1.7]"
		>
			{@render children()}
		</main>

		<aside
			bind:this={asideEl}
			class="sticky top-0 order-1 flex h-dvh w-[min(38%,480px)] max-w-full flex-col overflow-y-auto border-r border-text/12 bg-palette-white px-8 py-10 max-[800px]:h-auto max-[800px]:w-full max-[800px]:border-r-0 max-[800px]:border-b max-[800px]:px-5 max-[800px]:py-4"
		>
			{#if scrolly.persistent}
				<div class="prose text-[0.95rem] leading-relaxed">
					{@render scrolly.persistent()}
				</div>
				<hr class="my-6 border-text/50" />
			{/if}

			{#if scrolly.active}
				<p class="mb-1.5 text-sm font-bold text-primary uppercase">
					{scrolly.active.title}
				</p>
				{#key scrolly.activeId}
					<div class="prose text-[0.95rem] leading-relaxed" in:fade={{ duration: 200 }}>
						{#if scrolly.active.sidebar}
							{@render scrolly.active.sidebar()}
						{:else if scrolly.active.note}
							<!-- author-authored markdown note; safe to inject -->
							{@html marked.parse(scrolly.active.note)}
						{/if}
					</div>
				{/key}
			{/if}
		</aside>
	</div>
{:else}
	{@render children()}
{/if}

<style>
	/* mdsvex injects the article + sidebar markdown as plain elements, so they can
	   only be reached with :global(). Both columns share the `prose` hook. */

	/* Chapter header (only in the main column). */
	.prose :global(h1) {
		margin: 0 0 1rem;
		font-size: 2.1rem;
		font-weight: 700;
		line-height: 1.15;
	}

	.prose :global(h3) {
		margin: 2rem 0 0.75rem;
		font-size: 1.2rem;
		font-weight: 700;
	}

	.prose :global(p) {
		margin: 0 0 0.25rem;
	}

	:global(aside p) {
		line-height: 1.35;
	}

	.prose :global(ul),
	.prose :global(ol) {
		margin: 0 0 1rem;
		padding-left: 1.4rem;
	}

	/* Tailwind's preflight removes list markers - add them back. */
	.prose :global(ul) {
		list-style: disc;
	}
	.prose :global(ol) {
		list-style: decimal;
	}
	.prose :global(li) {
		margin: 0.25rem 0;
	}

	.prose :global(hr) {
		margin: 2.5rem 0;
		border: none;
		border-top: 1px solid color-mix(in srgb, var(--color-text) 15%, transparent);
	}

	.prose :global(a),
	.prose :global(a:visited) {
		color: var(--color-primary);
		text-underline-offset: 0.15rem;
	}

	/* Inline code (not inside a highlighted block). */
	.prose :global(:not(pre) > code) {
		padding: 0.1rem 0.35rem;
		border-radius: 0.3rem;
		font-family: var(--font-code);
		font-size: 0.875em;
		background: color-mix(in srgb, var(--color-text) 8%, transparent);
		color: var(--color-primary-400);
	}

	/* Code blocks (shiki output from mdsvex). */
	.prose :global(.code-block) {
		margin: 1.5rem 0;
		border-radius: 0.5rem;
		overflow: hidden;
		border: 1px solid color-mix(in srgb, var(--color-text) 15%, transparent);
		font-size: 0.85rem;
	}

	.prose :global(.code-block__head) {
		display: flex;
		align-items: center;
		justify-content: space-between;
		gap: 1rem;
		padding: 0.4rem 0.75rem;
		background: var(--color-dark-bg);
		border-bottom: 1px solid color-mix(in srgb, white 8%, transparent);
		font-family: var(--font-code);
		font-size: 0.72rem;
		color: var(--color-palette-white);
	}

	.prose :global(.code-block__file) {
		font-weight: 600;
	}

	.prose :global(.code-block__lang) {
		opacity: 0.6;
		text-transform: uppercase;
		letter-spacing: 0.06em;
	}

	.prose :global(.code-block-copy) {
		flex: none;
		padding: 0.15rem 0.55rem;
		border: none;
		border-radius: 0.3rem;
		background: transparent;
		color: var(--color-palette-white);
		font: inherit;
		cursor: pointer;
		transition: background 0.15s;
	}

	.prose :global(.code-block-copy:hover) {
		background: color-mix(in srgb, white 15%, transparent);
	}

	.prose :global(.code-block-copy.is-copied) {
		color: var(--color-secondary);
	}

	.prose :global(pre.shiki) {
		margin: 0;
		padding: 1rem;
		white-space: pre-wrap;
		overflow-wrap: anywhere;
		background-color: var(--color-dark-bg) !important;
	}

	/* Note callouts (remark-callouts output). */
	.prose :global(.note) {
		margin: 1.5rem 0;
		padding: 0.85rem 1.1rem;
		border-radius: 0.4rem;
		border-left: 4px solid var(--note-color, var(--color-palette-blue));
		background: color-mix(in srgb, var(--note-color, var(--color-palette-blue)) 12%, transparent);
	}

	.prose :global(.note > *:last-child) {
		margin-bottom: 0;
	}

	.prose :global(.note__title) {
		margin: 0 0 0.35rem;
		font-size: 0.72rem;
		font-weight: 700;
		text-transform: uppercase;
		letter-spacing: 0.06em;
		color: var(--note-color, var(--color-palette-blue));
	}

	.prose :global(.note--note) {
		--note-color: var(--color-palette-blue-dark);
	}
	.prose :global(.note--tip) {
		--note-color: var(--color-palette-purple-dark);
	}
	.prose :global(.note--warning) {
		--note-color: var(--color-palette-orange-dark);
	}
	.prose :global(.note--important),
	.prose :global(.note--caution) {
		--note-color: var(--color-primary);
	}
</style>
