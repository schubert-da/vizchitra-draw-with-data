<script>
	import { onMount } from 'svelte';

	import Controls from '$components/Controls.svelte';
	import SlideView from '$components/SlideView.svelte';
	import Timer from '$components/Timer.svelte';
	import slides from '$slides';
	import { goto } from '$app/navigation';

	let { data } = $props();
	let currentIndex = $derived(data.slideIndex);

	let timerStartTime = $state();

	onMount(() => {
		const imageUrls = slides.reduce((urls, slide) => {
			const { image, images } = slide;
			if (image) {
				urls.push(image);
			}
			if (images) {
				urls.push(...(Array.isArray(images) ? images : [images]));
			}
			return urls;
		}, []);
		imageUrls.forEach((url) => fetch(url));
	});

	function goToSlide(index) {
		const nextSlide = Math.max(0, Math.min(slides.length - 1, index));
		goto(`/slides/${nextSlide}`);
	}

	function getNextSlide(e, currentSlide, numberOfSlides) {
		switch (e.key) {
			case 'ArrowRight':
				return currentSlide + 1;
			case 'ArrowLeft':
				return currentSlide - 1;
			case 'Home':
				return 0;
			case 'End':
				return numberOfSlides - 1;
			case 'PageUp':
				return currentSlide - 10;
			case 'PageDown':
				return currentSlide + 10;
		}
	}

	function onKeyPress(e) {
		const nextSlide = getNextSlide(e, currentIndex, slides.length);
		if (nextSlide != null) {
			goToSlide(nextSlide);
			return;
		}

		if (e.key === 't' && !timerStartTime) {
			timerStartTime = Date.now();
		}
	}
</script>

<svelte:window onkeydown={onKeyPress} />

<div class="timer">
	<Timer startTime={timerStartTime} />
</div>

<div class="controls">
	<Controls baseUrl="/slides" currentSlide={currentIndex} lastSlide={slides.length - 1} />
</div>

<div class="view">
	<SlideView slideIndex={currentIndex} />
</div>

<div class="iframe-preload">
	{#each slides as slide, i (i)}
		{#if slide.iframe}
			<iframe title="preload: {slide.iframe}" src={slide.iframe}></iframe>
		{/if}
	{/each}
</div>

<style>
	.view {
		width: 100vw;
		height: 100vh;
	}

	.timer {
		position: fixed;
		bottom: 1em;
		left: 1.5em;
		z-index: 10;
	}

	.controls {
		position: fixed;
		right: 2em;
		bottom: 2em;
		z-index: 10;
		opacity: 0.7;
	}

	.iframe-preload {
		display: none;
	}
</style>
