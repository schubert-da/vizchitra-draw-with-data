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

	// 7. Component — renders an arbitrary Svelte component
	{
		h1: 'Component template',
		h2: 'renders any Svelte component (Timer here)',
		component: Timer
	},

	// 8. End — closing slide
	{ template: 'End' }
];
