<!--
	Exercise 2: Your First Bars

	Draw a vertical bar for each row in the data table. We only show the
	row's `y` value: every bar is the SAME width and they are spaced
	EVENLY across the canvas — only the height changes.

	Every bar is a <rect> with four settings:
	  - x: distance from the left  (step 100 across for each new bar)
	  - y: 350 - the row's y  (the top edge of the bar)
	  - width: how wide the bar is (keep it the same for every bar)
	  - height: the row's y, straight from the table

	Bars grow up from the bottom. The SVG is 350 tall, so a bar of
	height 70 sitting on the floor starts at y={350 - 70}.

	The data (only each row's y value is used — it sets the bar's height):
	  label     y    
	  A        70    
	  B       300   
	  C       180   
	  D       320   
	  E       120   

	The first row (A: y = 70) is done for you. Add a <rect> for each remaining
	row: move x across by 100 and set the height from its y value. Save and
	watch this panel update.
-->
<svg class="chart" width="500" height="350">
	<rect x="30" y={350 - 70} width="40" height="70" fill="seagreen" />
</svg>
