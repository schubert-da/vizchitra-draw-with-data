<script>
	import Boil from '$components/ArtUtils/Boil.svelte';
	import BackgroundBlend from '$components/ArtUtils/BackgroundBlend.svelte';

	// Tuning knobs shared by both boil demos below.
	let enabled = $state(true);
	let displacement = $state(1.5);
	let baseFrequency = $state(0.0012);
	let fps = $state(5);

	// Separate toggle for boiling the organic-gradient section.
	let boilGradient = $state(false);

	// Boil params for the gradient demo (independent of the main demo's boil above).
	let gradDisplacement = $state(1.5);
	let gradBaseFrequency = $state(0.0012);
	let gradFps = $state(5);

	// BackgroundBlend params for the gradient demo.
	let blendColorA = $state('#f4e8d5');
	let blendColorB = $state('#657143');
	let blendScale = $state(220);
	let blendBlur = $state(3);
</script>

<svelte:head><title>Boil filter · Experiments</title></svelte:head>

<div class="min-h-dvh bg-palette-white px-[clamp(1.5rem,5vw,4rem)] py-10 pt-30 font-sans text-text">
	<!-- Controls sit OUTSIDE the boiled content so they stay steady and usable. -->
	<section
		class="fixed top-0 z-10 mb-10 flex flex-wrap items-center gap-x-8 gap-y-5 rounded-xl border border-text/15 bg-white px-5 py-4 text-sm"
	>
		<label class="flex cursor-pointer flex-row items-center gap-2 font-semibold">
			<input type="checkbox" bind:checked={enabled} class="size-[1.1rem] accent-primary" />
			<span>Boil {enabled ? 'on' : 'off'}</span>
		</label>

		<label class="flex flex-col gap-1.5 font-semibold">
			Displacement <output class="font-normal text-text/60 tabular-nums">{displacement}</output>
			<input
				type="range"
				min="0"
				max="100"
				step="0.1"
				bind:value={displacement}
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

	<!-- Everything inside this <Boil> gets the wobble. -->
	<Boil class="max-w-[60rem]" {enabled} {displacement} {baseFrequency} {fps}>
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
			<p class="mt-4">
				<a
					href="/experiments/boil-studio"
					class="inline-flex items-center gap-2 rounded-lg border border-text/15 px-4 py-2 text-sm font-semibold text-primary no-underline transition-colors hover:border-primary hover:bg-primary/5"
				>
					Open Boil Studio — fullscreen pattern generator →
				</a>
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
	</Boil>

	<!-- Organic gradient test — with its own independent boil toggle (own filter instance). -->
	<section class="mt-16 max-w-[60rem]">
		<div class="mb-4 flex flex-wrap items-center gap-x-6 gap-y-3">
			<h2 class="text-[clamp(1.5rem,4vw,2.25rem)] leading-tight font-extrabold">
				Organic gradient
			</h2>

			<label class="flex cursor-pointer flex-row items-center gap-2 text-sm font-semibold">
				<input type="checkbox" bind:checked={boilGradient} class="size-[1.1rem] accent-primary" />
				<span>Boil {boilGradient ? 'on' : 'off'}</span>
			</label>

			<label class="flex flex-col gap-1 text-sm font-semibold">
				Displacement <output class="font-normal text-text/60 tabular-nums"
					>{gradDisplacement}</output
				>
				<input
					type="range"
					min="0"
					max="100"
					step="0.1"
					bind:value={gradDisplacement}
					class="w-36 accent-primary"
				/>
			</label>

			<label class="flex flex-col gap-1 text-sm font-semibold">
				Base frequency <output class="font-normal text-text/60 tabular-nums"
					>{gradBaseFrequency}</output
				>
				<input
					type="range"
					min="0.0004"
					max="0.006"
					step="0.0002"
					bind:value={gradBaseFrequency}
					class="w-36 accent-primary"
				/>
			</label>

			<label class="flex flex-col gap-1 text-sm font-semibold">
				Frame rate <output class="font-normal text-text/60 tabular-nums">{gradFps} fps</output>
				<input
					type="range"
					min="1"
					max="24"
					step="1"
					bind:value={gradFps}
					class="w-36 accent-primary"
				/>
			</label>

			<label class="flex flex-row items-center gap-2 text-sm font-semibold">
				Colour A
				<input
					type="color"
					bind:value={blendColorA}
					class="h-7 w-9 cursor-pointer rounded border border-text/15"
				/>
			</label>

			<label class="flex flex-row items-center gap-2 text-sm font-semibold">
				Colour B
				<input
					type="color"
					bind:value={blendColorB}
					class="h-7 w-9 cursor-pointer rounded border border-text/15"
				/>
			</label>

			<label class="flex flex-col gap-1 text-sm font-semibold">
				Scale <output class="font-normal text-text/60 tabular-nums">{blendScale}%</output>
				<input
					type="range"
					min="50"
					max="400"
					step="10"
					bind:value={blendScale}
					class="w-36 accent-primary"
				/>
			</label>

			<label class="flex flex-col gap-1 text-sm font-semibold">
				Blur <output class="font-normal text-text/60 tabular-nums">{blendBlur}px</output>
				<input
					type="range"
					min="0"
					max="20"
					step="1"
					bind:value={blendBlur}
					class="w-36 accent-primary"
				/>
			</label>
		</div>

		<div class="relative h-[22rem] overflow-hidden rounded-xl">
			<!-- Boiling layer is oversized (-inset-6) so its warped edges fall OUTSIDE the clip;
			     the container's overflow-hidden trims them back to a straight rounded rectangle. -->
			<Boil
				class="absolute -inset-6"
				enabled={boilGradient}
				displacement={gradDisplacement}
				baseFrequency={gradBaseFrequency}
				fps={gradFps}
			>
				<BackgroundBlend
					colorA={blendColorA}
					colorB={blendColorB}
					height="100%"
					scale={blendScale}
					blur={blendBlur}
				></BackgroundBlend>
			</Boil>

			<!-- Text is a sibling on top (not inside the <Boil>), so it stays crisp. -->
			<div class="absolute inset-0 z-20 flex flex-col justify-center p-8 text-[#2c2417]">
				<h3 class="mb-2 text-3xl font-extrabold">A hand-mixed blend</h3>
				<p class="max-w-md text-lg leading-relaxed">
					Two colours meeting along a soft noise mask. Flip the boil toggle to make the blend edge
					shiver.
				</p>
			</div>
		</div>
	</section>
</div>
