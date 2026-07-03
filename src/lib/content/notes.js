// Presenter notes — content lives in notes.md (nicer to edit); this file just
// parses it into the shapes the notes page consumes:
//   slideNotes    — ordered intro screens (slide ranges + non-slide intros)
//   notes         — chapter sections, keyed by `<slug>/<section-id>`
//   chapterIntros — a per-chapter opener screen, keyed by `<slug>`
// See notes.md for the editing format.
import raw from './notes.md?raw';

// First char of a note line → its type. Anything else defaults to a plain note.
const TYPE_BY_PREFIX = { '-': 'note', '>': 'transition', '?': 'ask', '!': 'pause' };

function parse(md) {
	const slideNotes = [];
	const notes = {};
	const chapterIntros = {};
	let cur = null;

	const flush = () => {
		if (!cur) return;
		if (cur.kind === 'chapter') {
			// A `<slug>/<section-id>` key is a section; a bare `<slug>` is the chapter opener.
			if (cur.key.includes('/')) notes[cur.key] = { items: cur.items };
			else chapterIntros[cur.key] = { title: cur.b, items: cur.items };
		} else if (cur.kind === 'slides')
			slideNotes.push({ slides: cur.a, title: cur.b, items: cur.items });
		else if (cur.kind === 'intro')
			slideNotes.push({ label: cur.a, tag: 'intro', title: cur.b, items: cur.items });
	};

	for (const rawLine of md.split('\n')) {
		const line = rawLine.trim();
		if (!line) continue;

		if (line.startsWith('#')) {
			flush();
			const [kind, a, b] = line
				.replace(/^#+\s*/, '')
				.split('|')
				.map((s) => s.trim());
			const k = kind.toLowerCase();
			if (k === 'chapter') cur = { kind: 'chapter', key: a, b, items: [] };
			else if (k === 'slides' || k === 'intro') cur = { kind: k, a, b, items: [] };
			else cur = null; // unrecognised heading (e.g. the file title) → skip its body
			continue;
		}

		if (!cur) continue;
		const type = TYPE_BY_PREFIX[line[0]];
		cur.items.push({ type: type ?? 'note', text: (type ? line.slice(1) : line).trim() });
	}
	flush();

	return { slideNotes, notes, chapterIntros };
}

export const { slideNotes, notes, chapterIntros } = parse(raw);
