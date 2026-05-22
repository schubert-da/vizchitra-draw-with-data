<script>
	import { transition } from '$utils/utils.js';
	import { resolveTemplate } from '$templates';
	import { beforeNavigate } from '$app/navigation';
	import slides from '$slides';

	let direction = $state(1);
	let { in: inTransition, out: outTransition } = $derived(transition(direction));

	// Determine the direction of navigation to apply the correct transition
	beforeNavigate(({ from, to }) => {
		const previousSlideIndex = Number.parseInt(from?.params?.index ?? '0');
		const nextSlideIndex = Number.parseInt(to?.params?.index ?? '0');

		direction = nextSlideIndex - previousSlideIndex > 0 ? 1 : -1;
	});

	let { slideIndex } = $props();
	let currentSlide = $derived(slides[slideIndex]);
	let Slide = $derived(resolveTemplate(currentSlide));
</script>

<div class="slide-view">
	{#key slideIndex}
		<div class="animation-wrapper" in:inTransition out:outTransition>
			<Slide {...currentSlide} />
		</div>
	{/key}
</div>

<style>
	.slide-view {
		position: relative;
		width: 100%;
		height: 100%;
	}

	.animation-wrapper {
		position: absolute;
		top: 0;
		left: 0;
		width: 100%;
		height: 100%;
	}
</style>
