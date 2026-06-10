export default [
	// CenteredText — h1 + h2
	{
		h1: 'Centered template',
		h2: 'h1 + h2, centred on the slide'
	},

	// CenteredText — h1 + a list of text lines
	{
		h1: 'Centered with text',
		text: ['First line', 'second *line*', 'third line']
	},

	// Default — text on top, a row of images underneath
	{
		h1: 'Default template',
		text: 'Text on top, images in a row below.',
		images: [
			'https://picsum.photos/seed/a/600/400',
			'https://picsum.photos/seed/b/600/400',
			'https://picsum.photos/seed/c/600/400'
		]
	}
];
