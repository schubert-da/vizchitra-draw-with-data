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

		// Pull an optional `/// file: App.svelte` directive off for the filename label.
		// It can sit on any line (e.g. below a leading <script> block), not just the first.
		let file = '';
		const match = code.match(/^[ \t]*\/\/\/[ \t]*file:[ \t]*(.+)\r?\n/m);
		if (match) {
			file = match[1].trim();
			code = code.replace(match[0], '');
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
			`<button class="code-block-copy" type="button" aria-label="Copy code">Copy</button></div>`;

		return escapeSvelte(`<div class="code-block">${head}${pre}</div>`);
	}
};

/** @type {import('@sveltejs/kit').Config} */
const config = {
	compilerOptions: {
		// Force runes mode project-wide, except under /chapters, which is left to
		// auto-detect. Rune-free chapter files (demos, .svx) then compile in legacy
		// mode so authors/learners write plain `let x = 0` and `$:` without `$state`;
		// files that do use a rune still compile as runes under auto-detect.
		runes: ({ filename }) => {
			const parts = filename.split(/[/\\]/);
			if (parts.includes('node_modules')) return undefined;
			if (parts.includes('chapters')) return undefined;
			return true;
		}
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
