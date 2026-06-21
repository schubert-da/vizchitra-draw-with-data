// Shared scroll store for a chapter: created once in the layout via setScrolly()
// and read by each <Section> and the sidebar through context.
import { getContext, setContext } from 'svelte';

const KEY = Symbol('scrolly');

class ScrollyStore {
	activeId = $state(null);
	sections = $state([]);
	// Chapter-level sidebar content (e.g. the data table) shown across all sections.
	persistent = $state(null);

	setPersistent(snippet) {
		this.persistent = snippet;
	}

	register(section) {
		if (!this.sections.some((s) => s.id === section.id)) {
			this.sections = [...this.sections, section];
		}
		if (this.activeId === null) this.activeId = section.id;
	}

	unregister(id) {
		this.sections = this.sections.filter((s) => s.id !== id);
		if (this.activeId === id) this.activeId = this.sections[0]?.id ?? null;
	}

	setActive(id) {
		this.activeId = id;
	}

	get active() {
		return this.sections.find((s) => s.id === this.activeId) ?? null;
	}
}

export const setScrolly = () => setContext(KEY, new ScrollyStore());
export const getScrolly = () => getContext(KEY);

// Thin activation band ~40% down the viewport, so one section is "current" at a time.
const OPTIONS = { rootMargin: '-40% 0px -55% 0px', threshold: 0 };

export function observeActive(node, scrolly, id) {
	const io = new IntersectionObserver((entries) => {
		for (const entry of entries) if (entry.isIntersecting) scrolly.setActive(id);
	}, OPTIONS);
	io.observe(node);
	return () => io.disconnect();
}
