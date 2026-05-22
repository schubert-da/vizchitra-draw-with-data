import { quintOut } from 'svelte/easing';
import { fade, scale } from 'svelte/transition';

export const transition = () => ({
	in: scale,
	out: (node) => fade(node, { easing: quintOut })
});

export function random(min, max) {
	return min + Math.random() * (max - min);
}
