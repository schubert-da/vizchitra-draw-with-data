<script>
	import ChevronLeft from '@lucide/svelte/icons/chevron-left';
	import ChevronRight from '@lucide/svelte/icons/chevron-right';

	let { baseUrl, currentSlide, lastSlide } = $props();

	let previousSlide = $derived(currentSlide !== 0 ? currentSlide - 1 : undefined);
	let nextSlide = $derived(currentSlide !== lastSlide ? currentSlide + 1 : undefined);
</script>

<div class="controls">
	<a class="previous" aria-label="previous" href="{baseUrl}/{previousSlide ?? currentSlide}">
		<ChevronLeft size={48} />
	</a>
	<a class="next" aria-label="next" href="{baseUrl}/{nextSlide ?? currentSlide}">
		<ChevronRight size={48} />
	</a>
</div>

<style>
	a,
	a:visited {
		text-decoration: none;
		color: rgb(100 100 110);
	}

	.controls {
		position: fixed;
		right: 1.5rem;
		bottom: 1.5rem;
		z-index: 10;
		opacity: 0.7;

		display: flex;
		flex-direction: row;
	}
</style>
