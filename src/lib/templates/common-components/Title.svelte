<script>
	import { marked } from 'marked';

	let { h1, h2 } = $props();
</script>

{#if h1}
	<h1>{@html marked.parseInline(h1)}</h1>
{/if}
{#if h2}
	<h2 class:h2-only={!h1}>{@html marked.parseInline(h2)}</h2>
{/if}

<style>
	.h2-only {
		margin-block-start: 0;
	}
</style>
