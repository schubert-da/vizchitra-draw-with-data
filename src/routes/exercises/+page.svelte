<script>
	import { exercises } from '$components/Exercises/exerciseConfig.js';
</script>

<svelte:head><title>Exercises</title></svelte:head>

<main class="exercises-index">
	<h1>Exercises</h1>
	<ol>
		{#each exercises as exercise (exercise.id)}
			<li>
				<a href={exercise.path}>
					<span class="num">{String(exercise.id).padStart(2, '0')}</span>
					<span class="title">{exercise.title}</span>
				</a>
			</li>
		{/each}
	</ol>
</main>

<style>
	.exercises-index {
		max-width: 40rem;
		margin: 0 auto;
		padding: 3rem 2rem;
		color: var(--color-text);
	}

	h1 {
		margin: 0 0 2rem;
		font-size: 2.5rem;
		font-weight: 200;
		text-decoration: underline;
		text-decoration-thickness: 0.07rem;
		text-decoration-color: var(--color-primary);
		text-underline-offset: 0.2rem;
	}

	ol {
		list-style: none;
		margin: 0;
		padding: 0;
		display: flex;
		flex-direction: column;
		gap: 0.5rem;
	}

	a {
		display: flex;
		align-items: baseline;
		gap: 1rem;
		padding: 0.9rem 1.1rem;
		border: 1px solid color-mix(in srgb, var(--color-text) 12%, transparent);
		border-radius: 0.5rem;
		text-decoration: none;
		color: inherit;
		transition:
			border-color 0.15s,
			background 0.15s;
	}

	a:hover {
		border-color: var(--color-primary);
		background: color-mix(in srgb, var(--color-primary) 6%, transparent);
	}

	.num {
		font-family: ui-monospace, 'SF Mono', 'Cascadia Code', Menlo, Consolas, monospace;
		font-size: 0.9rem;
		color: var(--color-primary);
	}

	.title {
		font-size: 1.1rem;
		font-weight: 600;
	}
</style>
