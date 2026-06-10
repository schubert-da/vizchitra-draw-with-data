<script>
	// Textured organic blend between two colours, using a grayscale noise
	// By default it fills the container it sits in (width/height = 100%);
	// pass `width` / `height` props to fix a size. All styling is prop-driven.
	let {
		colorA = '#F4E8D5', // base colour (fills the box)
		colorB = '#5F6A3D', // colour that bleeds through the mask
		texture = '/images/noise.png', // grayscale mask texture (masked by luminance)
		width = '100%', // fills container unless set
		height = '100%', // fills container unless set
		scale = 180, // mask-size as a % — bigger = larger painterly shapes
		blur = 0, // px blur on the blend edge — bigger = softer
		children
	} = $props();
</script>

<div
	class="organic-gradient"
	style:--color-a={colorA}
	style:--color-b={colorB}
	style:--texture="url({texture})"
	style:--width={width}
	style:--height={height}
	style:--scale="{scale}%"
	style:--blur="{blur}px"
>
	{@render children?.()}
</div>

<style>
	.organic-gradient {
		position: relative;
		width: var(--width);
		height: var(--height);
		background: var(--color-a);
		overflow: hidden;
		isolation: isolate;
	}

	.organic-gradient::after {
		content: '';
		position: absolute;
		inset: 0;
		z-index: -1;

		background: var(--color-b);

		/* The texture is an opaque grayscale image (noise in luminance, not alpha),
		   so we mask by LUMINANCE. WebKit props first (older Safari/iOS), standard
		   second so it wins where supported. */
		-webkit-mask-image: var(--texture);
		-webkit-mask-size: var(--scale);
		-webkit-mask-position: center;
		-webkit-mask-repeat: no-repeat;
		-webkit-mask-source-type: luminance;

		mask-image: var(--texture);
		mask-size: var(--scale);
		mask-position: center;
		mask-repeat: no-repeat;
		mask-mode: luminance;

		filter: blur(var(--blur));
	}
</style>
