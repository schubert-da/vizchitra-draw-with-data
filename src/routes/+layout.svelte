<script>
	import '$lib/styles/app.css';
	import favicon from '$assets/favicon.svg';

	let { children } = $props();

	// Shared across the social-share meta tags below.
	const description =
		'A beginner friendly workshop to draw custom data visualisations on the web with Svelte and D3. Created by Schubert de Abreu - VizChitra 2026';
</script>

<svelte:head>
	<link rel="icon" href={favicon} />

	<!-- Social share preview (Open Graph + Twitter). Absolute URLs so crawlers resolve them. -->
	<meta name="description" content={description} />
	<meta property="og:type" content="website" />
	<meta property="og:url" content="https://draw-with-data.netlify.app/" />
	<meta property="og:title" content="Draw with Data" />
	<meta property="og:description" content={description} />
	<meta property="og:image" content="https://draw-with-data.netlify.app/share-image.jpg" />
	<meta name="twitter:card" content="summary_large_image" />
	<meta name="twitter:title" content="Draw with Data" />
	<meta name="twitter:description" content={description} />
	<meta name="twitter:image" content="https://draw-with-data.netlify.app/share-image.jpg" />
</svelte:head>
{@render children()}
