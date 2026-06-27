<!--
	Exercise 1: Your First Scatter Plot

	Draw a dot for each row in the data table. The x and y in the table are
	already pixel positions on this 500 x 350 canvas, so you don't need to
	do any scaling.

	Every dot is a <circle> with three settings:
	  - cx: the row's x  (distance from the left)
	  - cy: 350 - the row's y  (we flip it so larger y sits higher up)
	  - r: radius

	The data (x and y are already pixel positions on the canvas):
	  label   x     y
	  A        50    70    <- done for you below
	  B       160   300
	  C       260   180
	  D       360   320
	  E       460   120

	The first row (A: x = 50, y = 70) is done for you. Add a <circle> for each
	remaining row. Save the file and watch this panel update.
-->
<svg class="chart" width="500" height="350">
	<circle cx="50" cy={350 - 70} r="8" fill="steelblue" />
</svg>
