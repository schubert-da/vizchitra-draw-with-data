<!--
	Exercise 3: Connect the Dots

	Here are the five dots from your scatter plot. Join them with lines to
	turn it into a line chart.

	Every line is a <line> with four positions plus a stroke:
	  - x1, y1: where the line starts  (one dot)
	  - x2, y2: where the line ends    (the next dot)
	  - stroke: the line's colour      (stroke-width sets its thickness)

	A line has no fill — without a stroke it is invisible.

	The first line (dot A to dot B) is done for you. Add a <line> for each
	remaining pair: B→C, C→D, D→E, reusing the dot positions below.
-->
<svg class="chart" width="500" height="350">
	<!-- the connecting lines (drawn first, so the dots sit on top) -->
	<line x1="50" y1="280" x2="160" y2="50" stroke="tomato" stroke-width="2" />

	<!-- the dots from your scatter plot -->
	<circle cx="50" cy="280" r="8" fill="steelblue" />
	<circle cx="160" cy="50" r="8" fill="steelblue" />
	<circle cx="260" cy="170" r="8" fill="steelblue" />
	<circle cx="360" cy="30" r="8" fill="steelblue" />
	<circle cx="460" cy="230" r="8" fill="steelblue" />
</svg>
