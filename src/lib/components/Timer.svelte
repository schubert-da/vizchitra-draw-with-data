<script>
	let { startTime } = $props();
	let currentTime = $state(0);

	const format = Intl.DateTimeFormat(undefined, { timeStyle: 'medium', timeZone: 'utc' }).format;
	let time = $derived(startTime ? format(new Date(currentTime - startTime)) : '');

	$effect(() => {
		if (!startTime) {
			return;
		}

		currentTime = Date.now();
		const interval = setInterval(() => {
			currentTime = Date.now();
		}, 1000);

		return () => clearInterval(interval);
	});
</script>

<span>{time}</span>

<style>
	span {
		font-family: monospace;
		font-size: 0.8rem;
		font-weight: 100;
		color: rgb(100 100 110);
	}
</style>
