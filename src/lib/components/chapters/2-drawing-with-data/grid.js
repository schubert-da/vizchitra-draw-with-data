// Grid helpers for "Drawing an Entire Dataset". The index -> position maths is
// kept here so the lesson markup can just call cellPosition(i) and stay focused
// on the drawing.

export const CELL = 200; // width/height of one square cell, in pixels
export const COLUMNS = 5; // cells per row

// Where does cell `i` sit in the grid? Returns an SVG transform string.
export function cellPosition(i) {
	const x = (i % COLUMNS) * CELL;
	const y = Math.floor(i / COLUMNS) * CELL;
	return `translate(${x}, ${y})`;
}

// Size of the SVG needed to hold `count` cells.
export function gridSize(count) {
	const rows = Math.ceil(count / COLUMNS);
	return { width: COLUMNS * CELL, height: rows * CELL };
}
