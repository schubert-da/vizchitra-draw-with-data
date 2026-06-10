<script>
	// Reusable "hand-drawn boil" SVG filter (à la Assemble With Care).
	// Renders a hidden <filter id="boil"> definition and animates its turbulence
	// `seed` in discrete steps for a subtle, stepped wobble. Apply it to any
	// element with CSS: `filter: url(#boil)`.
	let { enabled = true, baseFrequency = 0.0012, numOctaves = 2, scale = 1.5, fps = 5 } = $props();

	let turbulence = $state();

	// Step the seed ~fps times a second. Updating the attribute (not a CSS
	// transition) is what makes the motion jump in discrete frames, not flow.
	$effect(() => {
		if (!enabled || !turbulence) return;

		const node = turbulence;
		let frame = 1;

		const interval = setInterval(() => {
			frame += 1;
			node.setAttribute('seed', String(frame));
		}, 1000 / fps);

		return () => clearInterval(interval);
	});
</script>

<svg aria-hidden="true" style="position:absolute;width:0;height:0;overflow:hidden">
	<filter id="boil" x="-10%" y="-10%" width="120%" height="120%">
		<feTurbulence
			bind:this={turbulence}
			id="boil-noise"
			type="fractalNoise"
			{baseFrequency}
			{numOctaves}
			seed="1"
			result="noise"
		/>
		<feDisplacementMap
			in="SourceGraphic"
			in2="noise"
			{scale}
			xChannelSelector="R"
			yChannelSelector="G"
		/>
	</filter>
</svg>
