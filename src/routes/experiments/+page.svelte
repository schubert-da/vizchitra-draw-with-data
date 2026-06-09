<script>
	import BoilFilter from './BoilFilter.svelte';

	// Toggle + tuning knobs for the boil effect.
	let enabled = $state(true);
	let scale = $state(1.5);
	let baseFrequency = $state(0.0012);
	let fps = $state(5);
</script>

<svelte:head><title>Boil filter · Experiments</title></svelte:head>

<!-- The filter definition (hidden). Lives outside the boil-layer so it isn't affected by itself. -->
<BoilFilter {enabled} {scale} {baseFrequency} {fps} />

<div class="min-h-dvh bg-palette-white px-[clamp(1.5rem,5vw,4rem)] py-10 font-sans text-text">
	<!-- Controls sit OUTSIDE the boil-layer so they stay steady and usable. -->
	<section
		class="mb-10 flex flex-wrap items-center gap-x-8 gap-y-5 rounded-xl border border-text/15 bg-white px-5 py-4 text-sm"
	>
		<label class="flex cursor-pointer flex-row items-center gap-2 font-semibold">
			<input type="checkbox" bind:checked={enabled} class="size-[1.1rem] accent-primary" />
			<span>Boil {enabled ? 'on' : 'off'}</span>
		</label>

		<label class="flex flex-col gap-1.5 font-semibold">
			Displacement <output class="font-normal text-text/60 tabular-nums">{scale}</output>
			<input
				type="range"
				min="0"
				max="6"
				step="0.1"
				bind:value={scale}
				class="w-44 accent-primary"
			/>
		</label>

		<label class="flex flex-col gap-1.5 font-semibold">
			Base frequency <output class="font-normal text-text/60 tabular-nums">{baseFrequency}</output>
			<input
				type="range"
				min="0.0004"
				max="0.006"
				step="0.0002"
				bind:value={baseFrequency}
				class="w-44 accent-primary"
			/>
		</label>

		<label class="flex flex-col gap-1.5 font-semibold">
			Frame rate <output class="font-normal text-text/60 tabular-nums">{fps} fps</output>
			<input type="range" min="1" max="24" step="1" bind:value={fps} class="w-44 accent-primary" />
		</label>
	</section>

	<!-- Everything in here gets the boil. -->
	<main class="max-w-[60rem]" class:boiling={enabled}>
		<header class="max-w-[42rem]">
			<p class="mb-2 text-xs font-bold tracking-[0.18em] text-primary uppercase">Experiments</p>
			<h1 class="mb-4 text-[clamp(2rem,5vw,3.25rem)] leading-[1.05] font-extrabold">
				A subtle, hand-drawn boil
			</h1>
			<p class="text-[1.15rem] leading-relaxed text-text/80">
				This whole block sits behind an SVG displacement filter. The turbulence seed steps a few
				times a second, so the edges shiver as if the page were sketched by hand and re-drawn frame
				by frame.
			</p>
		</header>

		<div class="my-10 grid grid-cols-[repeat(auto-fit,minmax(15rem,1fr))] gap-6">
			<article class="rounded-lg border-2 border-text bg-white p-6">
				<h2 class="mb-2.5 text-xl">Still readable</h2>
				<p class="mb-4 leading-relaxed">
					The displacement is tiny, so text stays crisp and legible. Nudge the displacement slider
					up to see where "alive" tips over into "underwater".
				</p>
				<button
					type="button"
					class="cursor-pointer rounded-md border-0 bg-primary px-4 py-2.5 font-semibold text-white"
				>
					A wobbly button
				</button>
			</article>

			<article class="rounded-lg border-2 border-primary bg-primary/5 p-6">
				<h2 class="mb-2.5 text-xl">Discrete motion</h2>
				<p class="mb-4 leading-relaxed">
					Because we change the
					<code class="rounded bg-text/8 px-1 py-0.5 font-mono text-[0.9em]">seed</code> attribute (rather
					than animating with CSS), the wobble jumps in steps instead of gliding - the trick behind the
					boil look.
				</p>
				<ul class="pl-5 leading-[1.7]">
					<li>Rectangles get rounded, restless corners</li>
					<li>Straight rules turn into pencil strokes</li>
					<li>Circles breathe gently</li>
				</ul>
			</article>
		</div>

		<svg
			class="mt-4 text-primary"
			width="320"
			height="120"
			viewBox="0 0 320 120"
			aria-hidden="true"
		>
			<rect
				x="8"
				y="8"
				width="120"
				height="104"
				rx="6"
				fill="none"
				stroke="currentColor"
				stroke-width="2"
			/>
			<circle cx="200" cy="60" r="44" fill="none" stroke="currentColor" stroke-width="2" />
			<line x1="150" y1="60" x2="312" y2="60" stroke="currentColor" stroke-width="2" />
		</svg>
	</main>
</div>

<style>
	/* Dynamic SVG-filter reference — kept as CSS (Tailwind's class scanner is unreliable
	   for url(#…) arbitrary values). Toggled with the `boiling` class. */
	.boiling {
		filter: url(#boil);
	}
</style>
