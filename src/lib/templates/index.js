import CentredText from './CentredText.svelte';
import CentredTitle from './CentredTitle.svelte';
import Component from './Component.svelte';
import Default from './Default.svelte';
import End from './End.svelte';
import Start from './Start.svelte';

const templates = {
	CentredText,
	CentredTitle,
	Component,
	Default,
	End,
	Start
};

export function resolveTemplate(slide) {
	if (slide.component) {
		return templates.Component;
	}

	if (Object.keys(slide).filter((key) => !['h1', 'h2', 'notes'].includes(key)).length === 0) {
		return templates.CentredTitle;
	}

	return templates[slide.template ?? 'Default'] ?? templates.Default;
}
