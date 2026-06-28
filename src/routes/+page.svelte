<script>
	import { ArrowRight, Globe, Instagram, Linkedin, ExternalLink, FileText } from '@lucide/svelte';
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
			<h1 class=" font-display text-[2.8rem] leading-[1.05] font-normal sm:text-[3.6rem]">
				Draw with Data
			</h1>
			<p class="mt-1 mb-4 text-[1.2rem] text-text/70">
				by <span class="font-semibold text-text">Schubert De Abreu</span>
			</p>
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

		<!-- Additional links -->
		<section class="mb-10">
			<h2 class="mb-3 font-display text-2xl leading-tight font-normal">Additional Links</h2>
			<ol class="m-0 grid list-none grid-cols-1 gap-3 p-0 sm:grid-cols-2">
				<li>
					<a
						href="https://draw-with-data.netlify.app/"
						target="_blank"
						rel="noopener"
						class="flex h-full items-baseline gap-3 border border-text/12 px-[1.1rem] py-[0.9rem] no-underline transition-colors hover:border-primary hover:bg-primary/5"
					>
						<ExternalLink
							class="flex-none translate-y-0.5 text-primary"
							size={18}
							strokeWidth={2}
						/>
						<span class="text-[1.05rem] font-semibold">Live project website</span>
					</a>
				</li>
				<li>
					<a
						href="https://docs.google.com/document/d/1asOmvfwpQ6yAdEvBqPmtSX5gXXIVxXusKeVpoVusxqY/edit?tab=t.apdssjea4rlh"
						target="_blank"
						rel="noopener"
						class="flex h-full items-baseline gap-3 border border-text/12 px-[1.1rem] py-[0.9rem] no-underline transition-colors hover:border-primary hover:bg-primary/5"
					>
						<FileText class="flex-none translate-y-0.5 text-primary" size={18} strokeWidth={2} />
						<span class="text-[1.05rem] font-semibold">Workshop notes (Google Doc)</span>
					</a>
				</li>
			</ol>
		</section>

		<!-- Sneak peek of the final project -->
		<section class="">
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

		<!-- Socials -->
		<footer class="mt-10 border-t border-text/12 pt-6">
			<p class="mb-3 font-code text-sm tracking-wide text-primary uppercase">Find me</p>
			<ul class="m-0 flex list-none flex-wrap items-center gap-2 p-0">
				<li>
					<a
						href="https://schubertcreates.xyz/"
						class="flex items-center gap-2 border border-text/12 px-3 py-2 text-sm font-semibold no-underline transition-colors hover:border-primary hover:bg-primary/5"
					>
						<Globe class="flex-none text-primary" size={18} strokeWidth={2} />
						Website
					</a>
				</li>
				<li>
					<a
						href="https://www.instagram.com/schu.draws.stuff"
						class="flex items-center gap-2 border border-text/12 px-3 py-2 text-sm font-semibold no-underline transition-colors hover:border-primary hover:bg-primary/5"
					>
						<Instagram class="flex-none text-primary" size={18} strokeWidth={2} />
						Instagram
					</a>
				</li>
				<li>
					<a
						href="https://www.linkedin.com/in/schubert-de-abreu-47a56037/"
						class="flex items-center gap-2 border border-text/12 px-3 py-2 text-sm font-semibold no-underline transition-colors hover:border-primary hover:bg-primary/5"
					>
						<Linkedin class="flex-none text-primary" size={18} strokeWidth={2} />
						LinkedIn
					</a>
				</li>
				<li>
					<a
						href="https://bsky.app/profile/schubert-da.bsky.social"
						class="flex items-center gap-2 border border-text/12 px-3 py-2 text-sm font-semibold no-underline transition-colors hover:border-primary hover:bg-primary/5"
					>
						<!-- Bluesky butterfly (no Lucide icon for it) -->
						<svg
							class="flex-none text-primary"
							width="18"
							height="18"
							viewBox="0 0 600 530"
							fill="currentColor"
							aria-hidden="true"
						>
							<path
								d="M135.7 44.0c70.0 52.6 145.4 159.2 173.0 216.4 27.6-57.2 102.9-163.8 173.0-216.4 50.6-37.9 132.6-67.3 132.6 26.3 0 18.7-10.7 157.2-17.0 179.7-21.9 78.2-101.6 98.1-172.5 86.1 123.9 21.1 155.4 91.0 87.3 160.9-129.3 132.8-185.8-33.3-200.3-75.9-2.7-7.8-3.9-11.5-3.9-8.3 0-3.2-1.3.5-3.9 8.3-14.5 42.6-71.0 208.7-200.3 75.9-68.1-69.9-36.6-139.8 87.3-160.9-70.9 12.0-150.6-7.9-172.5-86.1-6.3-22.5-17.0-161.0-17.0-179.7 0-93.6 82.0-64.2 132.6-26.3z"
							/>
						</svg>
						Bluesky
					</a>
				</li>
			</ul>
		</footer>
	</div>
</main>
