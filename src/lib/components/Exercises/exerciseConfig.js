// Ordered index of exercises, used by the listing page (/exercises).
// Each lesson's content lives in src/lib/content/exercises/<slug>.md and is
// imported directly by its own route at src/routes/exercises/<slug>/+page.svelte.
export const exercises = [
	{ id: 1, slug: 'svg-basics', title: 'SVG Basics', path: '/exercises/svg-basics' },
	{ id: 2, slug: 'svg-coordinates', title: 'SVG Coordinates', path: '/exercises/svg-coordinates' }
];
