// Presenter notes.
//
// Two groups, shown in this order in the viewer:
//   1. slideNotes — notes for the intro slide deck, before the interactive part.
//   2. notes      — one entry per chapter section (from chaptersConfig.js).
//
// Item types (the `type` controls the icon + colour):
//   { type: 'note',       text: '...' }   plain talking point (default bullet)
//   { type: 'transition', text: '...' }   the line that carries you into the next section
//   { type: 'ask',        text: '...' }   reminder to ask the room a question
//   { type: 'pause',      text: '...' }   reminder to pause / let it land

// ── Intro slides ──────────────────────────────────────────────────────────
// One entry per slide (or slide range). `slides` is a label shown in the
// header, e.g. '4–7'. For a non-slide intro screen, set `label` (header text)
// and `tag` (short tag in the jump list) instead. Order here = order in viewer.
export const slideNotes = [
	{
		slides: '4–7',
		title: 'Dataviz isn’t as hard as it looks',
		items: [
			{ type: 'note', text: 'Been doing this a few years now.' },
			{ type: 'note', text: 'Big lesson: custom dataviz is never as hard as it looks from the outside.' },
			{ type: 'note', text: 'At first I assumed complex tech — advanced algorithms, lots of math needed first.' },
			{
				type: 'note',
				text: 'Learning D3, the surprise: most viz are just simple shapes — circles, rects, lines, text.'
			},
			{
				type: 'note',
				text: 'Hard part isn’t drawing shapes — it’s where they go, how big, and how they map to the data.'
			}
		]
	},
	{
		slides: '14–15',
		title: 'What we’ll build, and how',
		items: [
			{ type: 'note', text: 'All of this is much easier than it sounds.' },
			{ type: 'note', text: 'Final project — the whole thing is maybe 25 lines of code, start to finish.' },
			{ type: 'note', text: 'But we’ll build up slowly to understand what those 25 lines do.' },
			{ type: 'transition', text: 'Switch to the course chapters.' },
			{ type: 'note', text: 'Start with just drawing shapes on a canvas — basic charts.' },
			{
				type: 'note',
				text: 'Manual at first — like a design tool such as Figma, positioning and nudging each shape individually.'
			},
			{ type: 'note', text: 'Next section: use data to control placement and styling of shapes.' },
			{
				type: 'note',
				text: 'One line of code reused to represent an entire dataset — how we make custom dataviz.'
			}
		]
	},
	{
		label: 'Before Chapter 1',
		tag: 'intro',
		title: 'How the exercises work',
		items: [
			{ type: 'note', text: 'On screen right now: a bit of HTML — technically a blank file.' },
			{ type: 'note', text: 'The text between the HTML comments is just helper text to follow along — not real code.' },
			{ type: 'note', text: 'Every exercise block like this: the solution is on the “Solution” tab.' },
			{ type: 'note', text: 'Your output = whatever the file named on the right currently produces.' },
			{ type: 'note', text: 'Editing: make a small change — e.g. add some placeholder text.' },
			{ type: 'note', text: 'Note the dot on the filename → unsaved, so no output yet.' },
			{ type: 'note', text: 'Hit Ctrl+S → changes show up live.' }
		]
	}
];

// ── Chapter sections ──────────────────────────────────────────────────────
// Keyed by `<chapter-slug>/<section-id>` (same ids as chaptersConfig.js).
// Sections without an entry show as "No notes yet" in the viewer.
export const notes = {
	'1-your-first-charts/svg': {
		items: [
			{ type: 'note', text: 'SVG = the canvas / graph paper we draw all our shapes on.' },
			{ type: 'note', text: 'Create it (like any HTML element) with an opening + closing tag.' },
			{ type: 'note', text: 'Give it a width and a height.' },
			{ type: 'note', text: 'It’s taking up space now — but invisible, since the background is transparent by default.' },
			{ type: 'note', text: 'Add class="chart" to make it visible.' },
			{ type: 'note', text: 'How: elsewhere in the project a rule says “any element with class chart gets a white background”.' }
		]
	},
	'1-your-first-charts/circles': {
		items: [
			{ type: 'transition', text: 'Same file, keep going → build a basic scatter plot with circles.' },
			{ type: 'note', text: 'First learn to draw one circle, then use the data (side panel) to position them.' },
			{ type: 'note', text: 'Canvas is a graph: x runs 0→500, y runs 0→350.' },
			{ type: 'note', text: 'Quirk: y starts at the TOP, not bottom-left like you’d normally expect the origin.' },
			{ type: 'note', text: 'Tricky — so let’s plot a couple circles to get used to it.' },
			{ type: 'note', text: 'Circle = <circle> tag: cx and cy (center x/y), plus r (radius).' },
			{ type: 'note', text: 'Move one around to show the coordinate extents.' },
			{ type: 'pause', text: 'Reflect: this is tedious — the point is just to get comfy with SVG’s coordinate system and the shapes we can use.' },
			{ type: 'note', text: 'We’ll learn to automate all this in later chapters.' }
		]
	},
	'1-your-first-charts/rects': {
		items: [
			{ type: 'transition', text: 'Now → a basic bar chart using rectangle elements.' },
			{ type: 'note', text: 'Start by drawing rectangles, then adjust position + height to match the data.' },
			{ type: 'note', text: 'Draw one: <rect> element — x and y set the top-left corner, then width and height.' },
			{ type: 'note', text: 'Map to data: place it at a specific x.' },
			{ type: 'note', text: 'Set the top edge (y) from the data — same as we did before.' },
			{ type: 'note', text: 'Then stretch the height down to the bottom — that’s just the height.' },
			{ type: 'note', text: 'Repeat a few more times → a bar chart.' }
		]
	}
};
