<script>
	// Solution — Exercise 4: pull one song from the data and let its fields drive
	// the drawing — the circle's size is the song's popularity, the labels its text.
	import data from '$assets/data/spotify-2010s.csv';

	let row = data[0];
</script>

<svg class="chart" width="300" height="300">
	<circle cx="150" cy="150" r={row.popularity} fill="steelblue" />

	<text x="150" y="240" text-anchor="middle" font-size="18" font-weight="bold" fill="#222">
		{row.title}
	</text>
	<text x="150" y="260" text-anchor="middle" font-size="13" fill="#666">
		{row.artist}
	</text>
</svg>
