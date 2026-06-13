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
import * as drawingShapes from '$lib/content/exercises/5-drawing-shapes.md';
import * as variablesAndLogic from '$lib/content/exercises/6-variables-and-logic.md';
import * as arraysAndScales from '$lib/content/exercises/7-arrays-and-scales.md';

export const exercises = [
	{
		id: 1,
		slug: '1-svg-basics-and-circles',
		title: 'SVG Basics and Circles',
		path: '/exercises/1-svg-basics-and-circles'
	},
	{ id: 2, slug: '2-rectangles', title: 'Rectangles', path: '/exercises/2-rectangles' },
	{ id: 3, slug: '3-lines', title: 'Lines', path: '/exercises/3-lines' },
	{ id: 4, slug: '4-paths', title: 'Draw anything with Paths', path: '/exercises/4-paths' },
	{ id: 5, slug: '5-drawing-shapes', title: 'Drawing Shapes', path: '/exercises/5-drawing-shapes' },
	{
		id: 6,
		slug: '6-variables-and-logic',
		title: 'Variables and Logic',
		path: '/exercises/6-variables-and-logic'
	},
	{
		id: 7,
		slug: '7-arrays-and-scales',
		title: 'Arrays and Scales',
		path: '/exercises/7-arrays-and-scales'
	}
];

export const lessons = {
	'1-svg-basics-and-circles': svgBasicsAndCircles,
	'2-rectangles': rectangles,
	'3-lines': lines,
	'4-paths': paths,
	'5-drawing-shapes': drawingShapes,
	'6-variables-and-logic': variablesAndLogic,
	'7-arrays-and-scales': arraysAndScales
};
