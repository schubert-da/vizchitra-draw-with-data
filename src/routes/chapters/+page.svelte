<script>
	import { chapters } from '$components/chapters/chaptersConfig.js';
</script>

<svelte:head><title>Chapters</title></svelte:head>

<main class="mx-auto max-w-160 px-8 py-12 text-text">
	<h1
		class="mb-8 text-[2.5rem] font-extralight underline decoration-primary decoration-[0.07rem] underline-offset-[0.2rem]"
	>
		Chapters
	</h1>
	<ol class="m-0 flex list-none flex-col gap-2 p-0">
		{#each chapters as chapter (chapter.id)}
			<li>
				<a
					href={chapter.path}
					class="flex items-baseline gap-4 rounded-lg border border-text/12 px-[1.1rem] py-[0.9rem] no-underline transition-colors hover:border-primary hover:bg-primary/5"
				>
					<span class="font-code text-[0.9rem] text-primary">
						{String(chapter.id).padStart(2, '0')}
					</span>
					<span class="text-[1.1rem] font-semibold">{chapter.title}</span>
				</a>
			</li>
		{/each}
	</ol>
</main>
