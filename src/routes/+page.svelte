<script>
	import { ArrowRight } from '@lucide/svelte';
	import { chapters } from '$components/chapters/chaptersConfig.js';
	import FinalProjectPeek from '$components/home/FinalProjectPeek.svelte';
	import BackgroundBlend from '$components/ArtUtils/BackgroundBlend.svelte';
	import Boil from '$components/ArtUtils/Boil.svelte';

	const finalProject = chapters.find((c) => c.slug === '3-final-project');

	// Boiling blend backdrop, matching the Getting Started page (its warm top colours).
	const blend = { displacement: 50, baseFrequency: 0.007, fps: 2, scale: 90, blur: 2 };
	const colorA = '#f5d784';
	const colorB = '#bf5e3bb3';
</script>

<svelte:head><title>Draw with Data</title></svelte:head>

<!-- Full-bleed boiling blend, fixed behind the card, matching Getting Started.
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

<main class="grid min-h-dvh place-items-center px-4 py-10 text-text sm:px-6 sm:py-16">
	<div
		class="border-shadow-left relative w-full max-w-225 border border-black bg-palette-white p-6 sm:p-10"
	>
		<!-- Title -->
		<header class="mb-8">
			<p class="mb-2 font-code text-sm tracking-wide text-primary uppercase">
				A VizChitra Workshop
			</p>
			<h1 class="mb-4 font-display text-[2.8rem] leading-[1.05] font-normal sm:text-[3.6rem]">
				Draw with Data
			</h1>
			<p class="max-w-xl text-[1.15rem] leading-relaxed text-text/80">
				Learn to turn raw data into visuals with code. We start with drawing basic shapes, then
				learn to shape and style them with data, and then combine everything you learned to build
				your own custom charts.
			</p>
		</header>

		<!-- Setup link -->
		<a
			href="/getting-started"
			class="mb-10 flex items-center gap-3 border border-text/12 bg-primary/5 px-4 py-3 no-underline transition-colors hover:border-primary hover:bg-primary/10"
		>
			<span class="text-[1.05rem] font-semibold">New here?</span>
			<span class="text-text/80">Set up your computer and run the project in ~15-20 minutes.</span>
			<ArrowRight class="ml-auto flex-none text-primary" size={20} strokeWidth={2} />
		</a>

		<!-- Chapters -->
		<section class="mb-10">
			<h2 class="mb-3 font-display text-2xl leading-tight font-normal">Chapters</h2>
			<ol class="m-0 grid list-none grid-cols-1 gap-3 p-0 sm:grid-cols-2">
				{#each chapters as chapter (chapter.id)}
					<li>
						<a
							href={chapter.path}
							class="flex h-full items-baseline gap-3 border border-text/12 px-[1.1rem] py-[0.9rem] no-underline transition-colors hover:border-primary hover:bg-primary/5"
						>
							<span class="font-code text-[0.9rem] text-primary">
								{String(chapter.id).padStart(2, '0')}
							</span>
							<span class="text-[1.05rem] font-semibold">{chapter.title}</span>
						</a>
					</li>
				{/each}
			</ol>
		</section>

		<!-- Sneak peek of the final project -->
		<section class="">
			<div class="mb-3 flex items-baseline justify-between gap-4">
				<h2 class="font-display text-2xl leading-tight font-normal">A peek at the final project</h2>
				<a
					href={finalProject.path}
					class="flex-none text-sm font-semibold text-primary no-underline hover:underline"
				>
					See how it's built →
				</a>
			</div>
			<a
				href={finalProject.path}
				class="group block overflow-hidden border border-text/15 no-underline transition-colors hover:border-primary"
				aria-label="Open the final project chapter"
			>
				<FinalProjectPeek />
			</a>
			<p class="mt-3 text-[0.95rem] leading-relaxed text-text/70">
				A grid of spotify's 2010s hits, each song drawn as its own little record with arcs and
				wedges encoding its popularity, tempo, energy and danceability.
			</p>
		</section>
	</div>
</main>
