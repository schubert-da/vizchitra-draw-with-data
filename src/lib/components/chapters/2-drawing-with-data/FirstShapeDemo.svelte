<script>
	import data from '$assets/data/spotify-2010s.csv';

	// `row` names the first song so we can reuse it below.
	let row = data[0];
</script>

<!-- Output-only end result: a circle sized by the song's popularity, labelled
     with its title and artist near the bottom of the canvas. -->
<svg class="chart" width="300" height="300">
	<circle cx="150" cy="150" r={row.popularity} fill="steelblue" />

	<text x="150" y="240" text-anchor="middle" font-size="18" font-weight="bold" fill="#222">
		{row.title}
	</text>
	<text x="150" y="260" text-anchor="middle" font-size="13" fill="#666">
		{row.artist}
	</text>
</svg>
