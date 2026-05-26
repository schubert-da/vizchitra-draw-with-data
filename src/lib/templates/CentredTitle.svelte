<script>
	import Title from './common-components/Title.svelte';

	let { h1, h2 } = $props();
</script>

<div class="slide">
	<Title {h1} {h2} />
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
