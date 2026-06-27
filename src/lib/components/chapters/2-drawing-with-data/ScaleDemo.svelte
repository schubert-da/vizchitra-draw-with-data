<script>
	import { scaleLinear } from 'd3';

	// The four numbers that DEFINE the scale - editable below.
	let domainMin = $state(0);
	let domainMax = $state(100);
	let rangeMin = $state(0);
	let rangeMax = $state(500);

	// `domainValue` is the single source of truth: the input we're feeding the
	// scale. The output is always derived from it, so the two stay in sync no
	// matter which handle you drag.
	let domainValue = $state(40);

	const scale = $derived(scaleLinear().domain([domainMin, domainMax]).range([rangeMin, rangeMax]));
	const rangeValue = $derived(scale(domainValue));

	// Keep the picked value inside the domain when the bounds are edited.
	$effect(() => {
		const lo = Math.min(domainMin, domainMax);
		const hi = Math.max(domainMin, domainMax);
		if (domainValue < lo) domainValue = lo;
		if (domainValue > hi) domainValue = hi;
	});

	// --- Geometry of the diagram (in viewBox units) ---
	const VIEW_W = 560;
	const VIEW_H = 200;
	const padX = 50;
	const trackW = VIEW_W - padX * 2;
	const domainY = 60;
	const rangeY = 150;

	// Fraction (0-1) of the value along its own min..max, guarding a zero span.
	function fraction(value, min, max) {
		if (max === min) return 0;
		return (value - min) / (max - min);
	}

	const domainX = $derived(padX + fraction(domainValue, domainMin, domainMax) * trackW);
	const rangeX = $derived(padX + fraction(rangeValue, rangeMin, rangeMax) * trackW);

	// --- Dragging ---
	let svgEl;
	let dragging = $state(null); // 'domain' | 'range' | null

	// Turn a pointer's screen x into a value on the given track.
	function valueFromPointer(clientX, min, max) {
		const rect = svgEl.getBoundingClientRect();
		const x = ((clientX - rect.left) / rect.width) * VIEW_W;
		let frac = (x - padX) / trackW;
		frac = Math.max(0, Math.min(1, frac));
		return min + frac * (max - min);
	}

	function onPointerMove(event) {
		if (!dragging) return;
		if (dragging === 'domain') {
			domainValue = valueFromPointer(event.clientX, domainMin, domainMax);
		} else {
			// Drag the OUTPUT handle - invert through the scale to find the input.
			const rv = valueFromPointer(event.clientX, rangeMin, rangeMax);
			domainValue = scale.invert(rv);
		}
	}

	function fmt(n) {
		if (!Number.isFinite(n)) return '–';
		return Number.isInteger(n) ? String(n) : n.toFixed(1);
	}

	// Arrow keys nudge a focused handle, so the demo works without a pointer too.
	function nudge(event, which) {
		const dir =
			event.key === 'ArrowLeft' || event.key === 'ArrowDown'
				? -1
				: event.key === 'ArrowRight' || event.key === 'ArrowUp'
					? 1
					: 0;
		if (dir === 0) return;
		event.preventDefault();
		if (which === 'domain') {
			const step = (domainMax - domainMin) / 100;
			domainValue += dir * step;
		} else {
			const step = (rangeMax - rangeMin) / 100;
			domainValue = scale.invert(rangeValue + dir * step);
		}
	}
</script>

<svelte:window
	onpointermove={onPointerMove}
	onpointerup={() => (dragging = null)}
	onpointercancel={() => (dragging = null)}
/>

<figure class="my-6 rounded-lg border border-text/15 bg-text/2 p-4">
	<figcaption class="mb-3 text-sm font-medium">
		A linear scale maps an input (<span class="text-[#1f7a8c]">domain</span>) onto an output (<span
			class="text-[#c1440e]">range</span
		>). Drag either handle.
	</figcaption>

	<!-- The four numbers that define the scale -->
	<div class="mb-2 flex flex-wrap items-center gap-x-4 gap-y-2 text-sm">
		<span class="font-mono">scaleLinear()</span>
		<label class="flex items-center gap-1.5 text-[#1f7a8c]">
			<span class="font-mono">.domain([</span>
			<input type="number" bind:value={domainMin} class="num" />
			<span class="font-mono">,</span>
			<input type="number" bind:value={domainMax} class="num" />
			<span class="font-mono">])</span>
		</label>
		<label class="flex items-center gap-1.5 text-[#c1440e]">
			<span class="font-mono">.range([</span>
			<input type="number" bind:value={rangeMin} class="num" />
			<span class="font-mono">,</span>
			<input type="number" bind:value={rangeMax} class="num" />
			<span class="font-mono">])</span>
		</label>
	</div>

	<!-- The two number lines + the connector between the handles -->
	<svg
		bind:this={svgEl}
		viewBox="0 0 {VIEW_W} {VIEW_H}"
		class="w-full touch-none select-none"
		role="img"
		aria-label="A scale mapping a domain value to a range value"
	>
		<!-- connector: input position projects down to the output position -->
		<line x1={domainX} y1={domainY} x2={rangeX} y2={rangeY} stroke="#999" stroke-dasharray="4 4" />

		<!-- DOMAIN track -->
		<line
			x1={padX}
			y1={domainY}
			x2={VIEW_W - padX}
			y2={domainY}
			stroke="#1f7a8c"
			stroke-width="2"
		/>
		<text x={padX} y={domainY - 14} font-size="12" fill="#1f7a8c" text-anchor="start"
			>{fmt(domainMin)}</text
		>
		<text x={VIEW_W - padX} y={domainY - 14} font-size="12" fill="#1f7a8c" text-anchor="end"
			>{fmt(domainMax)}</text
		>
		<text
			x={padX}
			y={domainY - 30}
			font-size="11"
			fill="#1f7a8c"
			text-anchor="start"
			font-weight="600">DOMAIN (input)</text
		>

		<!-- RANGE track -->
		<line x1={padX} y1={rangeY} x2={VIEW_W - padX} y2={rangeY} stroke="#c1440e" stroke-width="2" />
		<text x={padX} y={rangeY + 26} font-size="12" fill="#c1440e" text-anchor="start"
			>{fmt(rangeMin)}</text
		>
		<text x={VIEW_W - padX} y={rangeY + 26} font-size="12" fill="#c1440e" text-anchor="end"
			>{fmt(rangeMax)}</text
		>
		<text
			x={padX}
			y={rangeY + 40}
			font-size="11"
			fill="#c1440e"
			text-anchor="start"
			font-weight="600">RANGE (output)</text
		>

		<!-- DOMAIN handle -->
		<g
			class="handle"
			role="slider"
			tabindex="0"
			aria-label="Domain (input) value"
			aria-valuemin={domainMin}
			aria-valuemax={domainMax}
			aria-valuenow={domainValue}
			onpointerdown={() => (dragging = 'domain')}
			onkeydown={(e) => nudge(e, 'domain')}
		>
			<circle cx={domainX} cy={domainY} r="16" fill="#1f7a8c" />
			<text
				x={domainX}
				y={domainY + 4}
				font-size="11"
				fill="#fff"
				text-anchor="middle"
				font-weight="600">{fmt(domainValue)}</text
			>
		</g>

		<!-- RANGE handle -->
		<g
			class="handle"
			role="slider"
			tabindex="0"
			aria-label="Range (output) value"
			aria-valuemin={rangeMin}
			aria-valuemax={rangeMax}
			aria-valuenow={rangeValue}
			onpointerdown={() => (dragging = 'range')}
			onkeydown={(e) => nudge(e, 'range')}
		>
			<circle cx={rangeX} cy={rangeY} r="16" fill="#c1440e" />
			<text
				x={rangeX}
				y={rangeY + 4}
				font-size="11"
				fill="#fff"
				text-anchor="middle"
				font-weight="600">{fmt(rangeValue)}</text
			>
		</g>
	</svg>

	<!-- The mapping spelled out -->
	<p class="mt-2 text-center font-mono text-sm">
		scale(<span class="text-[#1f7a8c]">{fmt(domainValue)}</span>) =
		<span class="text-[#c1440e]">{fmt(rangeValue)}</span>
	</p>
</figure>

<style>
	.num {
		width: 3.5rem;
		border: 1px solid color-mix(in srgb, currentColor 35%, transparent);
		border-radius: 0.25rem;
		padding: 0.1rem 0.35rem;
		font-family: ui-monospace, monospace;
		font-size: 0.8rem;
		text-align: center;
		background: transparent;
		color: inherit;
	}
	.handle {
		cursor: ew-resize;
	}
	.handle circle {
		transition: r 0.1s ease;
	}
	.handle:hover circle {
		r: 13;
	}
</style>
