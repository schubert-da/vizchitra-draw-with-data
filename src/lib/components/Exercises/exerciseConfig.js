// Ordered index of exercises, used by the listing page (/exercises),
// plus a slug -> lesson registry used by the lesson layout
// (src/routes/exercises/+layout.svelte) to render the sidebar.
//
// Each lesson module is imported as a namespace object exposing `.default`
// (the compiled component) and `.metadata` (the frontmatter).
//
// To add a lesson: create src/lib/content/exercises/<slug>.md, import it
// below, and add an entry to both `exercises` and `lessons`.
import * as svgBasicsAndCircles from '$lib/content/exercises/1-svg-basics-and-circles.md';
import * as rectangles from '$lib/content/exercises/2-rectangles.md';
import * as lines from '$lib/content/exercises/3-lines.md';
import * as paths from '$lib/content/exercises/4-paths.md';

export const exercises = [
	{
		id: 1,
		slug: '1-svg-basics-and-circles',
		title: 'SVG Basics and Circles',
		path: '/exercises/1-svg-basics-and-circles'
	},
	{ id: 2, slug: '2-rectangles', title: 'Rectangles', path: '/exercises/2-rectangles' },
	{ id: 3, slug: '3-lines', title: 'Lines', path: '/exercises/3-lines' },
	{ id: 4, slug: '4-paths', title: 'Draw anything with Paths', path: '/exercises/4-paths' }
];

export const lessons = {
	'1-svg-basics-and-circles': svgBasicsAndCircles,
	'2-rectangles': rectangles,
	'3-lines': lines,
	'4-paths': paths
};
