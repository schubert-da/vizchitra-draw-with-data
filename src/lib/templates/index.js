import CenteredText from './CenteredText.svelte';
import Default from './Default.svelte';

const templates = {
	CenteredText,
	Default
};

export function resolveTemplate(slide) {
	// Explicit `template` wins if it names a registered template.
	if (slide?.template && templates[slide.template]) {
		return templates[slide.template];
	}

	// A slide with images → Default (text on top, images in a row below).
	if (slide?.images) {
		return templates.Default;
	}

	// Otherwise just h1/h2/text → centred.
	return templates.CenteredText;
}
