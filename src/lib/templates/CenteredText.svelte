<script>
	import Title from './common-components/Title.svelte';
	import Text from './common-components/Text.svelte';
	import BackgroundBlend from '$components/ArtUtils/BackgroundBlend.svelte';
	import Boil from '$components/ArtUtils/Boil.svelte';

	// h1/h2 and/or text (text may be a string or a list), in a card over a boiling blend.
	let { h1, h2, text } = $props();
</script>

<div class="slide relative flex flex-col items-center justify-center overflow-hidden">
	<!-- Boiling blended texture, full-bleed behind the card. <Boil> has its own
	     filter instance, so its params are set here per-usage. Oversized so the
	     warped edges fall outside the slide's overflow-hidden clip. -->
	<Boil class="absolute inset-[-6%]" displacement={70} baseFrequency={0.005} fps={2}>
		<BackgroundBlend
			colorA="var(--color-blend-yellow-a)"
			colorB="var(--color-blend-yellow-b)"
			height="100%"
			scale={100}
			fps={20}
		/>
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

<style>
	.slide {
		--text-align: left;
	}
</style>
