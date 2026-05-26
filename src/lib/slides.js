import Timer from '$components/Timer.svelte';

export default [
	// 1. Start — animated loading dots
	{ template: 'Start' },

	// 2. CentredTitle — only h1/h2/notes keys
	{
		h1: 'CentredTitle template',
		h2: 'h1 + h2, centred on the slide'
	},

	// 3. CentredTitle — h2 only
	{
		h2: 'CentredTitle with just an h2'
	},

	// 4. Default — h1 + h2 + text (multi-line)
	{
		h1: 'Default template',
		h2: 'with a subtitle',
		text: ['Top-aligned title', 'with text below', 'on *multiple* lines']
	},

	// 5. Default — h1 + image (image wins over text branch)
	{
		h1: 'Default template (with image)',
		image: 'https://picsum.photos/seed/default/1200/700'
	},

	// 6. CentredText — text only, centred (needs explicit template)
	{
		template: 'CentredText',
		text: 'A slide with **centred** text and _nothing_ else.'
	},

	// 7. FullscreenImage — image + fullscreen flag
	{
		image: 'https://picsum.photos/seed/fullscreen/1920/1080',
		fullscreen: true
	},

	// 8. ImageGrid — array of images
	{
		h1: 'ImageGrid template',
		h2: 'multiple images, bouncing in',
		images: [
			'https://picsum.photos/seed/grid1/600/400',
			'https://picsum.photos/seed/grid2/600/400',
			'https://picsum.photos/seed/grid3/600/400',
			'https://picsum.photos/seed/grid4/600/400'
		]
	},

	// 9. IFrame — embeds an external URL fullscreen
	{
		iframe: 'https://example.com'
	},

	// 10. Component — renders an arbitrary Svelte component
	{
		h1: 'Component template',
		h2: 'renders any Svelte component (Timer here)',
		component: Timer
	},

	// 11. End — closing slide
	{ template: 'End' }
];
