<script>
	let _ = $props();
</script>

<div class="slide">
	<div class="wrapper">
		{#each { length: 3 } as _, i (i)}
			<div class="dot" style="animation-delay: {i * 0.1}s;"></div>
		{/each}
	</div>
</div>

<style>
	.slide {
		display: flex;
		flex-direction: column;
		align-items: center;
		background: var(--color-dark-bg);
	}

	.wrapper {
		display: flex;
		flex: 1;
		align-items: center;
		justify-content: center;
	}

	.dot {
		display: inline-block;
		width: 0.5rem;
		height: 0.5rem;
		margin: 0.1rem;
		border-radius: 100%;
		background-color: var(--color-primary);
		animation: sync 1s ease-in-out infinite alternate both running;
	}

	@keyframes sync {
		33% {
			transform: translateY(10px);
		}

		66% {
			transform: translateY(-10px);
		}

		100% {
			transform: translateY(0);
		}
	}
</style>
