<!--
	Exercise 3: Your First Area Chart

	<path d="M 50 280 L 160 50 L 260 170 Z" fill="steelblue" />
	
	The `d` attribute is a list of drawing
	commands:
	  - M x y : move the pen to a start point (no line drawn)
	  - L x y : draw a straight line to a point
	  - Z     : close the shape back to where it started.

	The data (x and y are already pixel positions on the canvas):
	  label     x     y
	  A        50    70    <- done for you below
	  B       160   300
	  C       260   180
	  D       360   320
	  E       460   120
-->
<svg class="chart" width="500" height="350">
	<!-- the area: finish this single path's `d` -->
	<path d="M 50 280 L 160 50 Z" fill="teal" stroke="teal" stroke-width="2" />

	<!-- the dots from your scatter plot -->
	<circle cx="50" cy="280" r="8" fill="steelblue" />
	<circle cx="160" cy="50" r="8" fill="steelblue" />
	<circle cx="260" cy="170" r="8" fill="steelblue" />
	<circle cx="360" cy="30" r="8" fill="steelblue" />
	<circle cx="460" cy="230" r="8" fill="steelblue" />
</svg>
