<!--
	Exercise 1: Your First Scatter Plot.

	Every dot is a <circle> with three settings:
	  - cx: the row's x  (distance from the left)
	  - cy: the row's y  (distance from the top)
	  - r: radius

	The data (x and y are already pixel positions on the canvas):
	  label     x     y
	  A        50    70    <- done for you below
	  B       160   300
	  C       260   180
	  D       360   320
	  E       460   120

	1. Create an svg element with a width of 500 and a height of 350. 
	2. Create a <circle> for each row in the data, using the row's x and y for cx and cy, and a radius of your choice. Remember to set a fill color so you can see the circles!
-->

<svg width="500" height="350" class="chart">
	<circle cx="100" cy={350 - 70} r="10" fill="steelblue"></circle>
</svg>
