<script>
	// `import` loads the songs from the data file and names the whole list `data`.
	import data from '$assets/data/spotify-2010s.csv';

	console.log(data);

	let row = data[0];

	// Delete the // to switch a line on.
	// console.log(row);
	// try logging the artist name and popularity too.
</script>

<!-- replace the values here too -->
<svg class="chart" width="300" height="300">
	<circle cx="150" cy="150" r="10" fill="steelblue" />

	<text x="150" y="240" text-anchor="middle" font-size="18" font-weight="bold" fill="#222">
		TITLE
	</text>
	<text x="150" y="260" text-anchor="middle" font-size="13" fill="#666"> ARTIST </text>
</svg>
