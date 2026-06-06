/**
 * remark plugin: GitHub-style callouts.
 *
 * Transforms blockquotes whose first line is a marker like `[!NOTE]` into
 * `<aside class="note note--note">…</aside>`, with a `<p class="note__title">`
 * label prepended. Styled entirely via CSS in LessonLayout.svelte.
 *
 *   > [!NOTE]
 *   > Body text.
 *
 * Supported types: note, tip, warning, important, caution.
 *
 * Note: markdown parses `[!NOTE]` as a *shortcut linkReference* (because of the
 * square brackets), so the marker arrives as a `linkReference` node rather than
 * plain text — we detect both forms.
 *
 * Dependency-free — uses a small local tree walk instead of unist-util-visit.
 */

const LABELS = {
	note: 'Note',
	tip: 'Tip',
	warning: 'Warning',
	important: 'Important',
	caution: 'Caution'
};

const TYPES = 'note|tip|warning|important|caution';
const REF_MARKER = new RegExp(`^!(${TYPES})$`, 'i');
const TEXT_MARKER = new RegExp(`^\\[!(${TYPES})\\]`, 'i');

function visit(node, type, fn) {
	if (!node || typeof node !== 'object') return;
	if (node.type === type) fn(node);
	if (Array.isArray(node.children)) {
		for (const child of node.children) visit(child, type, fn);
	}
}

// Returns the callout type ('note', 'tip', …) for the marker node, or null.
function calloutType(node) {
	if (node?.type === 'linkReference') {
		const match = (node.label ?? node.identifier ?? '').match(REF_MARKER);
		return match ? match[1].toLowerCase() : null;
	}
	if (node?.type === 'text') {
		const match = node.value.match(TEXT_MARKER);
		return match ? match[1].toLowerCase() : null;
	}
	return null;
}

export function remarkCallouts() {
	return (tree) => {
		visit(tree, 'blockquote', (node) => {
			const para = node.children?.[0];
			if (!para || para.type !== 'paragraph' || !para.children?.length) return;

			const marker = para.children[0];
			const type = calloutType(marker);
			if (!type) return;

			// Remove the marker, then drop the line break that followed it.
			if (marker.type === 'linkReference') {
				para.children.shift();
				const next = para.children[0];
				if (next?.type === 'text') {
					next.value = next.value.replace(/^\s*\n?/, '');
					if (next.value === '') para.children.shift();
				}
			} else {
				marker.value = marker.value.replace(/^\[![a-z]+\]\s*\n?/i, '');
				if (marker.value === '') para.children.shift();
			}
			if (para.children.length === 0) node.children.shift();

			// Render the blockquote as <aside class="note note--type">.
			node.data = node.data || {};
			node.data.hName = 'aside';
			node.data.hProperties = { className: ['note', `note--${type}`] };

			// Prepend the title label.
			node.children.unshift({
				type: 'paragraph',
				data: { hProperties: { className: ['note__title'] } },
				children: [{ type: 'text', value: LABELS[type] }]
			});
		});
	};
}
