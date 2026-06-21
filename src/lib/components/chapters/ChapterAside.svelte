<script>
	// Registers chapter-level sidebar content (shown throughout the chapter, e.g. the
	// data table) into the scrolly store. Renders nothing in the main column itself.
	import { getScrolly } from './scrolly.svelte.js';

	let { children } = $props();

	// svelte-ignore state_referenced_locally
	getScrolly().setPersistent(children);
</script>
