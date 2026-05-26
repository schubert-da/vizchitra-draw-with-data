<script>
	import Image from './common-components/Image.svelte';
	import Text from './common-components/Text.svelte';
	import Title from './common-components/Title.svelte';

	let { h1, h2, text, image } = $props();
</script>

<div class="slide">
	<Title {h1} {h2} />

	{#if image}
		<Image {image} />
	{:else if text}
		<Text {text} />
	{/if}
</div>

<style>
	.slide {
		display: flex;
		flex-direction: column;
		align-items: self-start;
	}
</style>
