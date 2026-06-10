<script>
	import Title from './common-components/Title.svelte';
	import Text from './common-components/Text.svelte';

	// h1/h2 and/or text (text may be a string or a list), centred in the slide.
	let { h1, h2, text } = $props();
</script>

<div class="slide flex flex-col items-center justify-center bg-palette-yellow-dark">
	<div
		class="text-container border-shadow-left relative flex max-w-250 flex-col items-start justify-center border border-black bg-palette-white p-10"
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
