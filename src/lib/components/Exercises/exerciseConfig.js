// Ordered index of exercises, used by the listing page (/exercises),
// plus a slug -> lesson registry used by the lesson layout
// (src/routes/exercises/+layout.svelte) to render the sidebar.
//
// Each lesson module is imported as a namespace object exposing `.default`
// (the compiled component) and `.metadata` (the frontmatter).
//
// To add a lesson: create src/lib/content/exercises/<slug>.md, import it
// below, and add an entry to both `exercises` and `lessons`.
import * as svgBasics from '$lib/content/exercises/svg-basics.md';
import * as svgCoordinates from '$lib/content/exercises/svg-coordinates.md';

export const exercises = [
	{ id: 1, slug: 'svg-basics', title: 'SVG Basics', path: '/exercises/svg-basics' },
	{ id: 2, slug: 'svg-coordinates', title: 'SVG Coordinates', path: '/exercises/svg-coordinates' }
];

export const lessons = {
	'svg-basics': svgBasics,
	'svg-coordinates': svgCoordinates
};
