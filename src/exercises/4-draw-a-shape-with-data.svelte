<script>
	// `import` loads the songs from the data file and names the whole list `data`.
	import data from '$assets/data/spotify-2010s.csv';

	// `console.log` prints a value to the browser console.
	// Open the console with F12 (then pick the "Console" tab).
	// This logs the whole list of songs:
	console.log(data);

	// A VARIABLE names a value so we can reuse it. The list starts counting at 0,
	// so `data[0]` is the first song. We name it `row`:
	let row = data[0];

	// TODO: log `row`, then a few of its fields. Delete the // to switch a line on.
	// console.log(row);
	// console.log(row.title);
	// try logging the artist name and popularity too.
</script>

<svg class="chart" width="300" height="300">
	<!-- TODO: replace the hard-coded radius 10 with the song's popularity: r={row.popularity}. 
	 Try using one of the other fields too 
	-->
	<circle cx="150" cy="150" r="10" fill="steelblue" />

	<!-- TODO: replace the hard-coded text with {row.title} and {row.artist} -->
	<text x="150" y="240" text-anchor="middle" font-size="18" font-weight="bold" fill="#222">
		TITLE
	</text>
	<text x="150" y="260" text-anchor="middle" font-size="13" fill="#666"> ARTIST </text>
</svg>
