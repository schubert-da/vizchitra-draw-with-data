<script>
	import Title from './common-components/Title.svelte';
	import Text from './common-components/Text.svelte';
	import Image from './common-components/Image.svelte';

	// h1/h2 and/or text at the top, with a row of images underneath.
	let { h1, h2, text, images } = $props();

	let imageList = $derived(Array.isArray(images) ? images : images ? [images] : []);
</script>

<div class="slide">
	<div class="text-content">
		{#if h1 || h2}
			<Title {h1} {h2} />
		{/if}
		{#if text}
			<Text {text} />
		{/if}
	</div>

	{#if imageList.length}
		<div class="image-row">
			{#each imageList as image (image)}
				<Image {image} />
			{/each}
		</div>
	{/if}
</div>

<style>
	.slide {
		display: flex;
		flex-direction: column;
	}

	.text-content {
		flex: 0 0 auto;
	}

	.image-row {
		flex: 1 1 0;
		min-height: 0;

		display: flex;
		flex-direction: row;
		gap: 1rem;
		align-items: center;
		justify-content: center;
	}
</style>
