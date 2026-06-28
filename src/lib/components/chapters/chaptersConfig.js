// Ordered index of the article chapters, used by the /chapters listing page.
// To add one: create src/lib/content/chapters/<slug>.svx, its demo components under
// src/lib/components/chapters/<slug>/, a folder route, and an entry below.
// `sections` mirrors the <Section id title> blocks in each chapter's .svx files,
// in order; the listing page links to them via `${path}#${section.id}`.
export const chapters = [
	{
		id: 1,
		slug: '1-your-first-charts',
		title: 'Your First Shapes',
		path: '/chapters/1-your-first-charts',
		sections: [
			{ id: 'svg', title: 'The SVG canvas' },
			{ id: 'circles', title: 'Plotting Points with Circles' },
			{ id: 'rects', title: 'Bars and Rectangles' },
			{ id: 'paths', title: 'Area Charts' }
		]
	},
	{
		id: 2,
		slug: '2-drawing-with-data',
		title: 'Drawing with Data',
		path: '/chapters/2-drawing-with-data',
		sections: [
			{ id: 'first-shape', title: 'Draw a Shape with Data' },
			{ id: 'each', title: 'Drawing an Entire Dataset' },
			{ id: 'styling', title: 'Styling your Shapes' },
			{ id: 'interactivity', title: 'Adding Interactivity' }
		]
	},
	{
		id: 3,
		slug: '3-final-project',
		title: 'Music Chart',
		path: '/chapters/3-final-project',
		sections: [
			{ id: 'setup', title: 'Drawing the Music Chart' },
			{ id: 'ai-assisted', title: 'AI Assisted Custom Viz' }
		]
	},
	{
		id: 4,
		slug: 'more-examples',
		title: 'Some More Examples',
		path: '/chapters/more-examples',
		sections: [
			{ id: 'packing', title: 'Packed Circles' },
			{ id: 'force', title: 'A Force-Directed Cloud' }
		]
	}
];
