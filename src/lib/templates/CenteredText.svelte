<script>
	import Title from './common-components/Title.svelte';
	import Text from './common-components/Text.svelte';

	// h1/h2 and/or text (text may be a string or a list), centred in the slide.
	let { h1, h2, text } = $props();
</script>

<div class="slide">
	{#if h1 || h2}
		<Title {h1} {h2} />
	{/if}
	{#if text}
		<Text {text} />
	{/if}
</div>

<style>
	.slide {
		--text-align: center;

		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: center;
	}
</style>
