<script>
	let { image } = $props();
</script>

<div class="slide">
	{#if image}
		<div class="img-wrapper">
			<!-- svelte-ignore a11y_missing_attribute -->
			<img src={image} />
		</div>
	{/if}
</div>

<style>
	.img-wrapper {
		width: 100%;
		height: 100%;
	}

	img {
		width: 100%;
		height: 100%;
		object-fit: cover;
	}
</style>
