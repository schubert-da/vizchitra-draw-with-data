<script>
	import { onDestroy } from 'svelte';
	import { getScrolly, observeActive } from './scrolly.svelte.js';

	let { id, title, note = '', children } = $props();

	const scrolly = getScrolly();
	let el = $state();

	// Register synchronously so the first note is in the prerendered HTML.
	// svelte-ignore state_referenced_locally
	scrolly.register({ id, title, note });
	onDestroy(() => scrolly.unregister(id));

	$effect(() => (el ? observeActive(el, scrolly, id) : undefined));
</script>

<section {id} bind:this={el} class="mx-auto max-w-184 scroll-mt-8 py-[clamp(3rem,9vh,6rem)]">
	<h2
		class="mb-5 text-[1.9rem] leading-tight font-bold underline decoration-primary decoration-[0.08rem] underline-offset-[0.25rem]"
	>
		{title}
	</h2>
	{@render children()}
</section>
