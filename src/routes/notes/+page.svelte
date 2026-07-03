<script>
	import { chapters } from '$components/chapters/chaptersConfig.js';
	import { notes, slideNotes, chapterIntros } from '$lib/content/notes.js';
	import ChevronLeft from '@lucide/svelte/icons/chevron-left';
	import ChevronRight from '@lucide/svelte/icons/chevron-right';
	import ArrowRight from '@lucide/svelte/icons/arrow-right';
	import HelpCircle from '@lucide/svelte/icons/help-circle';
	import Pause from '@lucide/svelte/icons/pause';
	import Dot from '@lucide/svelte/icons/dot';
	import List from '@lucide/svelte/icons/list';

	// Look up table: icon + label + accent colour per item type.
	const kinds = {
		note: { icon: Dot, label: 'Note', accent: 'var(--color-text)' },
		transition: { icon: ArrowRight, label: 'Transition', accent: 'var(--color-primary)' },
		ask: { icon: HelpCircle, label: 'Ask', accent: 'var(--color-palette-blue-dark)' },
		pause: { icon: Pause, label: 'Pause', accent: 'var(--color-palette-purple-dark)' }
	};

	// Intro slides first, then chapter sections. Chapter/section titles and
	// ordering come from chaptersConfig; note content is merged in by key.
	const slideScreens = slideNotes.map((s) => ({
		group: 'slides',
		chapterId: null,
		tag: s.tag ?? s.slides,
		label: s.label ?? `Slides ${s.slides}`,
		title: s.title,
		items: s.items ?? []
	}));

	const chapterScreens = chapters.flatMap((ch) => {
		const base = { group: 'chapter', chapterId: ch.id, chapterTitle: ch.title };
		const out = [];

		// Optional chapter opener, shown before the chapter's sections.
		const intro = chapterIntros[ch.slug];
		if (intro) {
			out.push({
				...base,
				tag: `${ch.id}`,
				label: `${ch.id} · ${ch.title}`,
				title: intro.title || ch.title,
				items: intro.items ?? []
			});
		}

		(ch.sections ?? []).forEach((sec, i) => {
			const tag = `${ch.id}.${i + 1}`;
			out.push({
				...base,
				tag,
				label: `${tag} · ${ch.title}`,
				title: sec.title,
				items: notes[`${ch.slug}/${sec.id}`]?.items ?? []
			});
		});

		return out;
	});

	const screens = [...slideScreens, ...chapterScreens];

	let i = $state(0);
	let showIndex = $state(false);

	// Restore last-viewed screen on load, remember it as you move.
	$effect(() => {
		const saved = Number(localStorage.getItem('notes-index'));
		if (!Number.isNaN(saved) && saved >= 0 && saved < screens.length) i = saved;
	});
	$effect(() => {
		localStorage.setItem('notes-index', String(i));
	});

	const current = $derived(screens[i]);
	const atStart = $derived(i === 0);
	const atEnd = $derived(i === screens.length - 1);
	// Banner text when a new group/chapter begins (null = no banner).
	const banner = $derived.by(() => {
		const prev = screens[i - 1];
		if (current?.group === 'slides') {
			return prev?.group === 'slides' ? null : 'Intro slides';
		}
		if (prev?.group === 'chapter' && prev.chapterId === current?.chapterId) return null;
		return `Chapter ${current?.chapterId} — ${current?.chapterTitle}`;
	});

	function next() {
		if (!atEnd) i += 1;
	}
	function prev() {
		if (!atStart) i -= 1;
	}
	function go(n) {
		i = n;
		showIndex = false;
	}

	function onkey(e) {
		if (showIndex) return;
		if (e.key === 'ArrowRight') next();
		if (e.key === 'ArrowLeft') prev();
	}
</script>

<svelte:head><title>Notes • Draw with Data</title></svelte:head>
<svelte:window onkeydown={onkey} />

<div class="flex h-dvh flex-col bg-palette-white text-text select-none">
	{#if screens.length === 0}
		<div class="flex flex-1 items-center justify-center p-8 text-center text-text/60">
			No sections found.
		</div>
	{:else}
		<!-- Header: chapter context, section title, timing checkpoint, progress -->
		<header class="shrink-0 border-b border-black/10 px-5 pt-4 pb-4">
			<div class="mb-1.5 flex items-center justify-between gap-3">
				<span class="min-w-0 truncate font-code text-xs tracking-wide text-primary uppercase">
					{current.label}
				</span>
				<button
					onclick={() => (showIndex = true)}
					class="shrink-0 text-text/60 hover:text-primary"
					aria-label="Section index"
				>
					<List size={20} />
				</button>
			</div>
			<h1 class="truncate font-display text-3xl leading-tight font-normal">{current.title}</h1>
			<div class="mt-3 h-1 w-full overflow-hidden rounded-full bg-black/10">
				<div
					class="h-full rounded-full bg-primary transition-[width] duration-200"
					style="width: {((i + 1) / screens.length) * 100}%"
				></div>
			</div>
		</header>

		<!-- Items -->
		<main class="flex-1 overflow-y-auto px-4 py-4">
			<div class="mx-auto max-w-xl">
				{#if banner}
					<p class="mb-3 font-code text-[0.7rem] tracking-wider text-text/40 uppercase">
						{banner}
					</p>
				{/if}
				{#if current.items.length === 0}
					<p class="mt-10 text-center text-text/40">No notes yet for this section.</p>
				{:else}
					<ul class="flex flex-col gap-2">
						{#each current.items as item (item)}
							{@const kind = kinds[item.type] ?? kinds.note}
							{@const Icon = kind.icon}
							<li class="flex gap-2">
								<span class="mt-1 shrink-0" style="color: {kind.accent}">
									<Icon size={item.type === 'note' ? 18 : 16} />
								</span>
								<p
									class="text-[1.05rem] leading-snug"
									class:font-medium={item.type === 'transition'}
								>
									{#if item.type !== 'note'}<span
											class="font-code text-[0.68rem] tracking-wider uppercase"
											style="color: {kind.accent}"
											>{kind.label} ·
										</span>{/if}{item.text}
								</p>
							</li>
						{/each}
					</ul>
				{/if}
			</div>
		</main>

		<!-- Thumb-reachable nav -->
		<footer class="shrink-0 border-t border-black/10 p-3">
			<div class="mx-auto flex max-w-xl gap-3">
				<button
					onclick={prev}
					disabled={atStart}
					class="flex h-14 flex-1 items-center justify-center gap-1 rounded-xl border border-black bg-palette-white font-semibold disabled:opacity-30"
				>
					<ChevronLeft size={22} /> Back
				</button>
				<button
					onclick={next}
					disabled={atEnd}
					class="flex h-14 flex-2 items-center justify-center gap-1 rounded-xl bg-primary font-semibold text-palette-white disabled:opacity-30"
				>
					Next <ChevronRight size={22} />
				</button>
			</div>
		</footer>

		<!-- Jump-to index overlay -->
		{#if showIndex}
			<button
				class="absolute inset-0 z-10 cursor-default bg-black/40"
				onclick={() => (showIndex = false)}
				aria-label="Close index"
			></button>
			<nav
				class="absolute inset-x-0 bottom-0 z-20 max-h-[75dvh] overflow-y-auto rounded-t-2xl bg-palette-white p-4 shadow-[0_-8px_30px_rgba(0,0,0,0.25)]"
			>
				<p class="mb-3 font-code text-xs tracking-wide text-primary uppercase">Jump to section</p>
				<ol class="flex list-none flex-col gap-0.5 p-0">
					{#each screens as s, n (n)}
						<li>
							<button
								onclick={() => go(n)}
								class="flex w-full items-baseline gap-3 rounded-lg px-3 py-2.5 text-left"
								class:bg-primary={n === i}
								class:text-palette-white={n === i}
							>
								<span
									class="w-9 shrink-0 font-code text-xs"
									class:text-palette-white={n === i}
									class:text-primary={n !== i}>{s.tag}</span
								>
								<span class="min-w-0 flex-1 truncate">{s.title}</span>
								{#if s.items.length === 0}
									<span class="shrink-0 text-xs opacity-50">empty</span>
								{/if}
							</button>
						</li>
					{/each}
				</ol>
			</nav>
		{/if}
	{/if}
</div>
