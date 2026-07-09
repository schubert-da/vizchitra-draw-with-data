<script>
	import { interpolateRgb } from 'd3';
	import TileGrid from '$components/TileGrid/TileGrid.svelte';
	import TileLegend from '$components/TileGrid/TileLegend.svelte';
	import BackgroundBlend from '$components/ArtUtils/BackgroundBlend.svelte';
	import Boil from '$components/ArtUtils/Boil.svelte';

	// Boiling blend backdrop, matching the landing page (its warm top colours).
	// Colours warm at the top and cool to blue as you scroll to the bottom.
	const blend = { displacement: 50, baseFrequency: 0.007, fps: 2, scale: 90, blur: 2 };

	let scrollY = $state(0);
	let innerHeight = $state(0);
	let t = $derived(
		innerHeight ? Math.min(1, scrollY / (document.documentElement.scrollHeight - innerHeight)) : 0
	);
	let colorA = $derived(interpolateRgb('#f5d784', '#42e0ce')(t));
	let colorB = $derived(interpolateRgb('#bf5e3bb3', '#2b415f')(t));
</script>

<svelte:window bind:scrollY bind:innerHeight />

<svelte:head><title>Preview • Draw with Data</title></svelte:head>

<!-- Full-bleed boiling blend, fixed behind the card, matching the landing page.
     Oversized so the warped edges fall outside the viewport's clip. -->
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

<main class="w-full px-4 py-10 text-text sm:px-6 sm:py-16">
	<div
		class="border-shadow-left relative mx-auto w-full max-w-[1500px] border border-black bg-palette-white p-6 sm:p-10"
	>
		<header class="mx-auto mb-5 max-w-200">
			<a
				href="/"
				class="mb-4 inline-flex items-center text-sm font-semibold text-primary no-underline hover:underline"
			>
				← Back to home
			</a>
			<p class="mb-2 font-code text-sm tracking-wide text-primary uppercase">A sneak peek</p>
			<h1 class="mb-4 font-display text-[2.6rem] leading-[1.1] font-normal sm:text-[3.2rem]">
				What we'll build
			</h1>
			<p class="max-w-2xl text-[1.15rem] leading-relaxed text-text/80">
				Over the course of the workshop we build this chart together: a grid of Spotify's 2010s
				hits, each song drawn as its own little record with arcs and wedges encoding its popularity,
				tempo, energy and danceability.
			</p>
		</header>

		<!-- How to read a tile -->
		<section class="mx-auto mb-10 max-w-200">
			<TileLegend />
		</section>

		<!-- The full chart -->
		<section class="mx-auto" style="width: min(1400px, 100%)">
			<TileGrid />
		</section>
	</div>
</main>
