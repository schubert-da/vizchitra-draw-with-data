// Ordered index of exercises, used by the listing page (/exercises),
// plus an explicit slug -> lesson registry used by the lesson layout
// (src/routes/exercises/(lesson)/+layout.svelte) to render the sidebar.
//
// To add a lesson: create src/lib/content/exercises/<slug>.md, import it
// below, and add an entry to both `exercises` and `lessons`.
import SvgBasics, { metadata as svgBasicsMeta } from '$lib/content/exercises/svg-basics.md';
import SvgCoordinates, {
	metadata as svgCoordinatesMeta
} from '$lib/content/exercises/svg-coordinates.md';

export const exercises = [
	{ id: 1, slug: 'svg-basics', title: 'SVG Basics', path: '/exercises/svg-basics' },
	{ id: 2, slug: 'svg-coordinates', title: 'SVG Coordinates', path: '/exercises/svg-coordinates' }
];

export const lessons = {
	'svg-basics': { component: SvgBasics, metadata: svgBasicsMeta },
	'svg-coordinates': { component: SvgCoordinates, metadata: svgCoordinatesMeta }
};
