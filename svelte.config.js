import { mdsvex, escapeSvelte } from 'mdsvex';
import adapter from '@sveltejs/adapter-static';
import { createHighlighter } from 'shiki';
import { remarkCallouts } from './src/lib/content/remark-callouts.js';

// Single Shiki theme for token colors; swap freely. All surrounding chrome
// (container, filename bar, copy button) is styled with CSS in LessonLayout.svelte.
const THEME = 'github-dark';
const LANGS = ['svelte', 'js', 'ts', 'html', 'css', 'json', 'bash', 'text'];

// Lazily create the highlighter once and reuse it across every code block.
let hlPromise;
const getHighlighter = () => (hlPromise ??= createHighlighter({ themes: [THEME], langs: LANGS }));

/** @type {import('mdsvex').MdsvexOptions['highlight']} */
const highlight = {
	async highlighter(code, lang = 'text') {
		const hl = await getHighlighter();
		const safeLang = LANGS.includes(lang) ? lang : 'text';

		// Pull an optional `/// file: App.svelte` first line off for the filename label.
		let file = '';
		const match = code.match(/^\/\/\/\s*file:\s*(.+)\n/);
		if (match) {
			file = match[1].trim();
			code = code.slice(match[0].length);
		}

		// Shiki adds tabindex="0" to <pre>; drop it to avoid Svelte's a11y warning.
		const pre = hl
			.codeToHtml(code, { lang: safeLang, theme: THEME })
			.replace(/\s+tabindex="0"/, '');
		const label = file
			? `<span class="code-block__file">${file}</span>`
			: `<span class="code-block__lang">${safeLang}</span>`;
		const head =
			`<div class="code-block__head">${label}` +
			`<button class="code-block__copy" type="button" aria-label="Copy code">Copy</button></div>`;

		return escapeSvelte(`<div class="code-block">${head}${pre}</div>`);
	}
};

/** @type {import('@sveltejs/kit').Config} */
const config = {
	compilerOptions: {
		// Force runes mode for the project, except for libraries. Can be removed in svelte 6.
		runes: ({ filename }) => (filename.split(/[/\\]/).includes('node_modules') ? undefined : true)
	},
	kit: {
		adapter: adapter(),
		alias: {
			$assets: 'src/lib/assets',
			$utils: 'src/lib/utils',
			$components: 'src/lib/components',
			$slides: 'src/lib/slides.js',
			$templates: 'src/lib/templates'
		}
	},
	preprocess: [
		mdsvex({
			extensions: ['.svx', '.md'],
			highlight,
			remarkPlugins: [remarkCallouts]
		})
	],
	extensions: ['.svelte', '.svx', '.md']
};

export default config;
