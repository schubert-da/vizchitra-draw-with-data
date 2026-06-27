<script>
	import { onDestroy } from 'svelte';
	import { getScrolly, observeActive } from './scrolly.svelte.js';

	// `children` is the main-track content; `sidebar` is an optional snippet of
	// rich sidebar content (copy-pasteable snippets, gotchas, end result). `note`
	// is a plain-markdown fallback for sections that only need a one-line tip.
	let { id, title, note = '', sidebar, children } = $props();

	const scrolly = getScrolly();
	let el = $state();

	// Register synchronously so the first section's sidebar is in the prerendered HTML.
	// svelte-ignore state_referenced_locally
	scrolly.register({ id, title, note, sidebar });
	onDestroy(() => scrolly.unregister(id));

	$effect(() => (el ? observeActive(el, scrolly, id) : undefined));
</script>

<section {id} bind:this={el} class="mx-auto max-w-200 scroll-mt-8 py-[clamp(3rem,9vh,6rem)]">
	<h2
		class="mb-5 text-[1.9rem] leading-tight font-bold underline decoration-primary decoration-[0.08rem] underline-offset-4"
	>
		{title}
	</h2>
	{@render children()}
</section>
