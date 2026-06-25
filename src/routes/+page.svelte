<script>
	import TileGrid from '$components/TileGrid/TileGridOld.svelte';
	import TileGridNew from '$components/TileGrid/TileGrid.svelte';
	import { ArrowRight } from '@lucide/svelte';
</script>

<div class="px-10 pt-6">
	<a
		href="/getting-started"
		class="mx-auto flex max-w-250 items-center gap-3 rounded-lg border border-text/12 bg-primary/5 px-4 py-3 text-text no-underline transition-colors hover:border-primary hover:bg-primary/10"
	>
		<span class="text-[1.05rem] font-semibold">New here?</span>
		<span class="text-text/80">Set up your computer and run the project in a few minutes.</span>
		<ArrowRight class="ml-auto text-primary" size={20} strokeWidth={2} />
	</a>
</div>

<TileGridNew></TileGridNew>
