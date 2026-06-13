<script>
	import { dev } from '$app/environment';
	import Title from './common-components/Title.svelte';
	import Text from './common-components/Text.svelte';
	import BackgroundBlend from '$components/ArtUtils/BackgroundBlend.svelte';
	import Boil from '$components/ArtUtils/Boil.svelte';

	// h1/h2 and/or text (text may be a string or a list), in a card over a boiling blend.
	let { h1, h2, text } = $props();

	// Live tuning knobs (panel only shows in dev). Defaults = current look.
	let displacement = $state(70);
	let baseFrequency = $state(0.007);
	let fps = $state(2);

	let colorA = $state('#f5d784');
	let colorBHex = $state('#bf5e3b');
	let colorBAlpha = $state(0.7);
	let colorB = $derived(
		colorBHex +
			Math.round(colorBAlpha * 255)
				.toString(16)
				.padStart(2, '0')
	);

	let scale = $state(90);
	let blur = $state(2);
</script>

<div class="slide relative flex flex-col items-center justify-center overflow-hidden">
	<!-- Boiling blended texture, full-bleed behind the card. Oversized so the warped
	     edges fall outside the slide's overflow-hidden clip. -->
	<Boil class="absolute inset-[-6%]" {displacement} {baseFrequency} {fps}>
		<BackgroundBlend {colorA} {colorB} height="100%" {scale} {blur} />
	</Boil>

	<!-- The card sits on top and stays crisp (it's outside the <Boil> wrapper). -->
	<div
		class="text-container border-shadow-left relative z-10 flex max-w-250 flex-col items-start justify-center border border-black bg-palette-white p-10"
	>
		{#if h1 || h2}
			<Title {h1} {h2} />
		{/if}
		{#if text}
			<Text {text} />
		{/if}
	</div>
</div>

{#if dev}
	<section
		class="fixed top-2 left-2 z-50 flex max-w-[calc(100%-1rem)] flex-wrap items-center gap-x-5 gap-y-3 rounded-xl border border-text/15 bg-white px-4 py-3 text-xs text-text shadow-lg"
	>
		<label class="flex flex-col gap-1 font-semibold">
			Displacement <output class="font-normal text-text/60 tabular-nums">{displacement}</output>
			<input
				type="range"
				min="0"
				max="100"
				step="0.1"
				bind:value={displacement}
				class="w-32 accent-primary"
			/>
		</label>

		<label class="flex flex-col gap-1 font-semibold">
			Base frequency <output class="font-normal text-text/60 tabular-nums">{baseFrequency}</output>
			<input
				type="range"
				min="0.0004"
				max="0.01"
				step="0.0002"
				bind:value={baseFrequency}
				class="w-32 accent-primary"
			/>
		</label>

		<label class="flex flex-col gap-1 font-semibold">
			Frame rate <output class="font-normal text-text/60 tabular-nums">{fps} fps</output>
			<input type="range" min="1" max="24" step="1" bind:value={fps} class="w-32 accent-primary" />
		</label>

		<label class="flex flex-row items-center gap-2 font-semibold">
			Colour A
			<input
				type="color"
				bind:value={colorA}
				class="h-7 w-9 cursor-pointer rounded border border-text/15"
			/>
		</label>

		<label class="flex flex-row items-center gap-2 font-semibold">
			Colour B
			<input
				type="color"
				bind:value={colorBHex}
				class="h-7 w-9 cursor-pointer rounded border border-text/15"
			/>
		</label>

		<label class="flex flex-col gap-1 font-semibold">
			B opacity <output class="font-normal text-text/60 tabular-nums">{colorBAlpha}</output>
			<input
				type="range"
				min="0"
				max="1"
				step="0.01"
				bind:value={colorBAlpha}
				class="w-32 accent-primary"
			/>
		</label>

		<label class="flex flex-col gap-1 font-semibold">
			Scale <output class="font-normal text-text/60 tabular-nums">{scale}%</output>
			<input
				type="range"
				min="50"
				max="400"
				step="10"
				bind:value={scale}
				class="w-32 accent-primary"
			/>
		</label>

		<label class="flex flex-col gap-1 font-semibold">
			Blur <output class="font-normal text-text/60 tabular-nums">{blur}px</output>
			<input type="range" min="0" max="20" step="1" bind:value={blur} class="w-32 accent-primary" />
		</label>
	</section>
{/if}

<style>
	.slide {
		--text-align: left;
	}
</style>
