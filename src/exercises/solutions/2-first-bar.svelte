<!-- Solution — Exercise 2: one <rect> per row. x steps across by 100, the bar's
     height is the row's y, and y is 350 - height so every bar sits on the floor. -->
<svg class="chart" width="500" height="350">
	<rect x="30" y={350 - 70} width="40" height="70" fill="seagreen" />
	<rect x="130" y={350 - 300} width="40" height="300" fill="seagreen" />
	<rect x="230" y={350 - 180} width="40" height="180" fill="seagreen" />
	<rect x="330" y={350 - 320} width="40" height="320" fill="seagreen" />
	<rect x="430" y={350 - 120} width="40" height="120" fill="seagreen" />
</svg>
