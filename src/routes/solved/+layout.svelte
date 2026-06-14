<script>
	import { page } from '$app/state';
	import { lessons } from '$components/Exercises/exerciseConfig.js';

	let { children } = $props();

	// Resolve the current lesson from the route's last path segment.
	// On the index (/exercises) the slug is "exercises", which has no lesson.
	let slug = $derived(page.url.pathname.split('/').filter(Boolean).pop());
	let lesson = $derived(lessons[slug]);
	let lessonEl = $state();

	// Single delegated click handler for every code block's Copy button.
	$effect(() => {
		const el = lessonEl;
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

<svelte:head>
	{#if lesson}<title>{lesson.metadata?.title ?? 'Exercise'} • Exercises</title>{/if}
</svelte:head>

{#if lesson}
	{@const Lesson = lesson.default}
	<div class="exercise">
		<aside class="sidebar">
			<div class="lesson" bind:this={lessonEl}>
				<Lesson />
			</div>
		</aside>

		<main class="workspace">
			{@render children()}
		</main>
	</div>
{:else}
	<!-- Not a lesson (e.g. the /exercises index) — render the page as-is. -->
	{@render children()}
{/if}

<style>
	.exercise {
		display: flex;
		height: 100dvh;
		width: 100%;
	}

	.sidebar {
		flex: 0 0 auto;
		width: min(35%, 500px);
		max-width: 100%;
		overflow-y: auto;
		background: var(--color-palette-white);
		border-right: 1px solid color-mix(in srgb, var(--color-text) 12%, transparent);
	}

	.workspace {
		width: 100%;
		height: 100%;
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: center;
		background: var(--color-palette-white);
		color: color-mix(in srgb, var(--color-text) 55%, transparent);
	}

	@media (max-width: 800px) {
		.exercise {
			flex-direction: column;
			height: auto;
			min-height: 100dvh;
		}

		.sidebar {
			flex: none;
			border-right: none;
			border-bottom: 1px solid color-mix(in srgb, var(--color-text) 12%, transparent);
		}

		.workspace {
			min-height: 40dvh;
		}
	}

	/* ---- Lesson prose ------------------------------------------------------ */
	/* mdsvex output is injected as plain elements, so reach it with :global(). */

	.lesson {
		padding: 2.5rem var(--lesson-padding, 2rem);
		color: var(--color-text);
		font-size: 1rem;
		line-height: 1.65;
	}

	.lesson :global(h2) {
		margin: 0 0 1.25rem;
		font-size: 1.7rem;
		font-weight: 700;
		line-height: 1.2;
		text-decoration: underline;
		text-decoration-thickness: 0.08rem;
		text-decoration-color: var(--color-primary);
		text-underline-offset: 0.25rem;
	}

	.lesson :global(h3) {
		margin: 2rem 0 0.75rem;
		font-size: 1.2rem;
		font-weight: 700;
	}

	.lesson :global(p) {
		margin: 0 0 1rem;
	}

	.lesson :global(ul),
	.lesson :global(ol) {
		margin: 0 0 1rem;
		padding-left: 1.4rem;
	}

	/* Tailwind's preflight removes list markers — add them back. */
	.lesson :global(ul) {
		list-style: disc;
	}

	.lesson :global(ol) {
		list-style: decimal;
	}

	.lesson :global(li) {
		margin: 0.25rem 0;
	}

	/* Section separator (markdown `---`). */
	.lesson :global(hr) {
		margin: 2.5rem 0;
		border: none;
		border-top: 1px solid color-mix(in srgb, var(--color-text) 15%, transparent);
	}

	.lesson :global(a),
	.lesson :global(a:visited) {
		color: var(--color-primary);
		text-underline-offset: 0.15rem;
	}

	/* Inline code (not inside a highlighted block). */
	.lesson :global(:not(pre) > code) {
		padding: 0.1rem 0.35rem;
		border-radius: 0.3rem;
		font-family: ui-monospace, 'SF Mono', 'Cascadia Code', Menlo, Consolas, monospace;
		font-size: 0.875em;
		background: color-mix(in srgb, var(--color-text) 8%, transparent);
		color: var(--color-primary-400);
	}

	/* ---- Code blocks ------------------------------------------------------- */

	.lesson :global(.code-block) {
		margin: 1.5rem 0;
		border-radius: 0.5rem;
		overflow: hidden;
		border: 1px solid color-mix(in srgb, var(--color-text) 15%, transparent);
		font-size: 0.9rem;
	}

	.lesson :global(.code-block__head) {
		display: flex;
		align-items: center;
		justify-content: space-between;
		gap: 1rem;
		padding: 0.4rem 0.75rem;
		background: var(--color-dark-bg);
		border-bottom: 1px solid color-mix(in srgb, white 8%, transparent);
		font-family: ui-monospace, 'SF Mono', 'Cascadia Code', Menlo, Consolas, monospace;
		font-size: 0.78rem;
		color: var(--color-palette-white);
	}

	.lesson :global(.code-block__file) {
		font-weight: 600;
	}

	.lesson :global(.code-block__lang) {
		opacity: 0.6;
		text-transform: uppercase;
		letter-spacing: 0.06em;
	}

	.lesson :global(.code-block-copy) {
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

	.lesson :global(.code-block-copy:hover) {
		background: color-mix(in srgb, white 15%, transparent);
	}

	.lesson :global(.code-block-copy.is-copied) {
		color: var(--color-secondary);
	}

	/* Shiki's <pre>; override its inline background to our token, keep token colors. */
	.lesson :global(pre.shiki) {
		margin: 0;
		padding: 1rem;
		white-space: pre-wrap;
		overflow-wrap: anywhere;
		background-color: var(--color-dark-bg) !important;
	}

	/* ---- Note callouts ----------------------------------------------------- */

	.lesson :global(.note) {
		margin: 1.5rem 0;
		padding: 0.85rem 1.1rem;
		border-radius: 0.4rem;
		border-left: 4px solid var(--note-color, var(--color-palette-blue));
		background: color-mix(in srgb, var(--note-color, var(--color-palette-blue)) 12%, transparent);
	}

	.lesson :global(.note > *:last-child) {
		margin-bottom: 0;
	}

	.lesson :global(.note__title) {
		margin: 0 0 0.35rem;
		font-size: 0.72rem;
		font-weight: 700;
		text-transform: uppercase;
		letter-spacing: 0.06em;
		color: var(--note-color, var(--color-palette-blue));
	}

	.lesson :global(.note--note) {
		--note-color: var(--color-palette-blue-dark);
	}
	.lesson :global(.note--tip) {
		--note-color: var(--color-palette-purple-dark);
	}
	.lesson :global(.note--warning) {
		--note-color: var(--color-palette-orange-dark);
	}
	.lesson :global(.note--important) {
		--note-color: var(--color-primary);
	}
	.lesson :global(.note--caution) {
		--note-color: var(--color-primary);
	}
</style>
