<!--
	Exercise 4: Your First Area Chart

	An area chart is one <path> shape. The `d` attribute is a list of drawing
	commands:
	  - M x y : move the pen to a start point (no line drawn)
	  - L x y : draw a straight line to a point
	  - Z     : close the shape back to where it started

	Finish the `d` below so the path passes through every dot, then drops to
	the base (y = 350) under the last and first dots and closes with Z.

	The pen starts at dot A and reaches dot B for you. Add the rest:
	  ... L 260 170 L 360 30 L 460 230   (through C, D, E)
	  L 460 350 L 50 350 Z               (down to the base, then close)

	Dot positions (cx, cy):
	  A (50, 280)   B (160, 50)   C (260, 170)   D (360, 30)   E (460, 230)
-->
<svg class="chart" width="500" height="350">
	<!-- the area: finish this single path's `d` -->
	<path
		d="M 50 280 L 160 50"
		fill="steelblue"
		fill-opacity="0.25"
		stroke="steelblue"
		stroke-width="2"
	/>

	<!-- the dots from your scatter plot -->
	<circle cx="50" cy="280" r="8" fill="steelblue" />
	<circle cx="160" cy="50" r="8" fill="steelblue" />
	<circle cx="260" cy="170" r="8" fill="steelblue" />
	<circle cx="360" cy="30" r="8" fill="steelblue" />
	<circle cx="460" cy="230" r="8" fill="steelblue" />
</svg>
