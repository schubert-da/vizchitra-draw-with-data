<script module>
	// Deterministic per-instance counter → unique, SSR-stable filter ids.
	let counter = 0;
	const nextId = () => (counter += 1);
</script>

<script>
	// Per-usage "hand-drawn boil": wraps content and boils it with its OWN filter
	// instance, so each usage is tuned independently (no shared #boil collisions).
	//
	//   <Boil class="absolute inset-[-6%]" displacement={2} fps={6}>
	//     <SomeBackground />
	//   </Boil>
	//
	// Apply it to a background layer (not your text) to keep content crisp.
	let {
		children,
		class: className = '',
		enabled = true,
		baseFrequency = 0.0012,
		numOctaves = 2,
		displacement = 1.5, // px the pixels are pushed — the "wobble strength" (feDisplacementMap scale)
		fps = 5
	} = $props();

	const id = `boil-${nextId()}`;

	/** @type {SVGFETurbulenceElement | undefined} */
	let turbulence = $state();

	// Step the seed ~fps times a second for the discrete, stepped wobble.
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
	<filter {id} x="-10%" y="-10%" width="120%" height="120%">
		<feTurbulence
			bind:this={turbulence}
			type="fractalNoise"
			{baseFrequency}
			{numOctaves}
			seed="1"
			result="noise"
		/>
		<feDisplacementMap
			in="SourceGraphic"
			in2="noise"
			scale={displacement}
			xChannelSelector="R"
			yChannelSelector="G"
		/>
	</filter>
</svg>

<div class={className} style:filter={enabled ? `url(#${id})` : null}>
	{@render children?.()}
</div>
