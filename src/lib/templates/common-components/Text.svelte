<script>
	import SvelteMarkdown from 'svelte-markdown';

	let { text } = $props();

	let paragraphs = $derived(
		(Array.isArray(text) ? text : text ? [text] : []).map((t) =>
			typeof t === 'string' ? { text: t } : t
		)
	);
</script>

<div>
	{#each paragraphs as { text, style = {} } (text)}
		{#if text === ''}
			<br />
		{/if}
		<p
			style={Object.entries(style)
				.map(([property, value]) => `${property}: ${value}`)
				.join('; ')}
		>
			<SvelteMarkdown source={text} isInline />
		</p>
	{/each}
</div>

<style>
	p {
		margin: 0;
		text-align: var(--text-align, start);
	}
</style>
