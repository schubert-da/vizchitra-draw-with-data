import CentredText from './CentredText.svelte';
import CentredTitle from './CentredTitle.svelte';
import Component from './Component.svelte';
import Default from './Default.svelte';
import End from './End.svelte';
import FullscreenImage from './FullscreenImage.svelte';
import IFrame from './IFrame.svelte';
import ImageGrid from './ImageGrid.svelte';
import Start from './Start.svelte';

const templates = {
	CentredText,
	CentredTitle,
	Component,
	Default,
	End,
	FullscreenImage,
	IFrame,
	ImageGrid,
	Start
};

export function resolveTemplate(slide) {
	if (slide.component) {
		return templates.Component;
	}

	if (slide.iframe) {
		return templates.IFrame;
	}

	if (Object.keys(slide).filter((key) => !['h1', 'h2', 'notes'].includes(key)).length === 0) {
		return templates.CentredTitle;
	}

	if (slide.images && Array.isArray(slide.images)) {
		return templates.ImageGrid;
	}

	if (slide.image && slide.fullscreen) {
		return templates.FullscreenImage;
	}

	return templates[slide.template ?? 'Default'] ?? templates.Default;
}
