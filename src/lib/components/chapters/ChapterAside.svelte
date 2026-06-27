<script>
	// Registers chapter-level sidebar content (shown throughout the chapter, e.g. the
	// data table) into the scrolly store. Renders nothing in the main column itself.
	import { onDestroy } from 'svelte';
	import { getScrolly } from './scrolly.svelte.js';

	let { children } = $props();

	const scrolly = getScrolly();

	// svelte-ignore state_referenced_locally
	scrolly.setPersistent(children);

	// The store lives in the layout and survives chapter-to-chapter navigation, so
	// clear our panel on the way out - otherwise it leaks into the next chapter.
	// Guarded so we only clear if we're still the current panel (a newer chapter
	// may have already replaced it during the navigation swap).
	onDestroy(() => {
		if (scrolly.persistent === children) scrolly.setPersistent(null);
	});
</script>
