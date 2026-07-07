<script>
	import { interpolateRgb } from 'd3';
	import BackgroundBlend from '$components/ArtUtils/BackgroundBlend.svelte';
	import Boil from '$components/ArtUtils/Boil.svelte';
	// The page body is authored as Markdown/Svelte in an .svx file; this route just
	// provides the same boiling-blend backdrop and card shell as Getting Started.
	import Article from '$lib/content/resources-and-thanks.svx';

	// Boiling blend backdrop (matches the Getting Started page). Colours warm at the
	// top and cool to blue as you scroll to the bottom.
	const blend = { displacement: 50, baseFrequency: 0.007, fps: 1, scale: 90, blur: 2 };

	let scrollY = $state(0);
	let innerHeight = $state(0);
	let t = $derived(
		innerHeight ? Math.min(1, scrollY / (document.documentElement.scrollHeight - innerHeight)) : 0
	);
	let colorA = $derived(interpolateRgb('#f5d784', '#42e0ce')(t));
	let colorB = $derived(interpolateRgb('#bf5e3bb3', '#2b415f')(t));
</script>

<svelte:window bind:scrollY bind:innerHeight />

<svelte:head><title>Resources & Thanks</title></svelte:head>

<!-- Full-bleed boiling blend, fixed behind the scrolling content. Oversized so the
     warped edges fall outside the viewport's clip. -->
<div class="pointer-events-none fixed inset-0 -z-10 overflow-hidden" aria-hidden="true">
	<Boil
		class="absolute inset-[-6%]"
		displacement={blend.displacement}
		baseFrequency={blend.baseFrequency}
		fps={blend.fps}
	>
		<BackgroundBlend {colorA} {colorB} height="100%" scale={blend.scale} blur={blend.blur} />
	</Boil>
</div>

<main class="w-full px-6 py-12 text-text sm:px-8 sm:py-8">
	<div
		class="content-track border-shadow-left relative z-10 mx-auto w-full max-w-225 border border-black bg-palette-white p-4 sm:p-10 sm:px-15"
	>
		<Article />
	</div>
</main>

<style>
	/* The article is injected as a child component, so its markdown-rendered
	   elements can only be reached with :global(), scoped under .content-track. */

	.content-track :global(.eyebrow) {
		margin: 0 0 0.5rem;
		font-family: var(--font-code);
		font-size: 0.875rem;
		letter-spacing: 0.05em;
		text-transform: uppercase;
		color: var(--color-primary);
	}

	.content-track :global(h1) {
		margin: 0 0 1rem;
		font-family: var(--font-display);
		font-weight: 400;
		font-size: 2.6rem;
		line-height: 1.1;
	}
	@media (min-width: 640px) {
		.content-track :global(h1) {
			font-size: 3.2rem;
		}
	}

	.content-track :global(h2) {
		margin: 3rem 0 1rem;
		font-family: var(--font-display);
		font-weight: 400;
		font-size: 2rem;
		line-height: 1.2;
	}

	.content-track :global(h3) {
		margin: 1.75rem 0 0.6rem;
		font-size: 1.15rem;
		font-weight: 700;
		line-height: 1.3;
	}

	.content-track :global(p) {
		margin: 0 0 1rem;
		line-height: 1.7;
		color: color-mix(in srgb, var(--color-text) 85%, transparent);
	}

	.content-track :global(ul p) {
		margin: 0 0 0.5rem;
	}

	.content-track :global(ul) {
		margin: 0 0 1.25rem;
		padding-left: 1.4rem;
		list-style: disc;
		line-height: 1.5;
	}
	.content-track :global(li) {
		margin: 1rem 0;
		padding-left: 0.25rem;
	}

	.content-track :global(a),
	.content-track :global(a:visited) {
		color: var(--color-primary);
		font-weight: 500;
		text-underline-offset: 0.15rem;
	}

	/* Inline code inside the reading list (e.g. `{#each}`). */
	.content-track :global(:not(pre) > code) {
		padding: 0.1rem 0.35rem;
		border-radius: 0.3rem;
		font-family: var(--font-code);
		font-size: 0.85em;
		background: color-mix(in srgb, var(--color-text) 8%, transparent);
		color: var(--color-primary-400);
	}

	.content-track :global(a) {
		font-weight: 700;
		text-decoration: underline;
	}
</style>
