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
			{#if Slide}
				<Slide {...currentSlide} />
			{:else}
				<p class="no-template">
					No template registered for this slide{currentSlide?.template
						? ` ("${currentSlide.template}")`
						: ''}.
				</p>
			{/if}
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

	.no-template {
		display: flex;
		align-items: center;
		justify-content: center;
		width: 100%;
		height: 100%;
		margin: 0;
		color: color-mix(in srgb, var(--color-text, #1a1a1a) 45%, transparent);
		font:
			italic 1rem/1.5 system-ui,
			sans-serif;
	}
</style>
