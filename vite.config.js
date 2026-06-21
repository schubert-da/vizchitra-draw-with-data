import tailwindcss from '@tailwindcss/vite';
import { sveltekit } from '@sveltejs/kit/vite';
import { defineConfig } from 'vite';
import dsv from '@rollup/plugin-dsv';
import { autoType } from 'd3';

// `autoType` coerces CSV cells to numbers/dates where it can, so an imported
// row gives `row.popularity === 83` (number), not "83". This keeps the number
// parsing out of the lesson/exercise files - they just read the fields.
export default defineConfig({
	plugins: [tailwindcss(), sveltekit(), dsv({ processRow: autoType })]
});
