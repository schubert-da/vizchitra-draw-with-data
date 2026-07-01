<script>
	import Boil from '$components/ArtUtils/Boil.svelte';
	import BackgroundBlend from '$components/ArtUtils/BackgroundBlend.svelte';

	// A fullscreen "fullbleed + boil" pattern generator, built for screen-recording
	// clean animated backdrops. Tweak the look with the controls, hit H to hide the
	// panel (and the cursor) for a pristine capture, F for browser fullscreen.
	//
	// NOTE: layout here is deliberately scoped CSS rather than Tailwind utilities, so
	// the page renders correctly even before Tailwind picks up this new route folder.

	// Presets are complete looks (colours + boil motion). The first three mirror the
	// palettes used elsewhere on the site; the rest are extra options to play with.
	const presets = [
		{
			name: 'Warm',
			colorA: '#f5d784',
			colorB: '#bf5e3b',
			bOpacity: 0.7,
			scale: 90,
			blur: 2,
			displacement: 50,
			baseFrequency: 0.007,
			fps: 2
		},
		{
			name: 'Cool',
			colorA: '#42e0ce',
			colorB: '#2b415f',
			bOpacity: 1,
			scale: 90,
			blur: 2,
			displacement: 50,
			baseFrequency: 0.007,
			fps: 2
		},
		{
			name: 'Sand',
			colorA: '#f4e8d5',
			colorB: '#657143',
			bOpacity: 1,
			scale: 220,
			blur: 3,
			displacement: 1.5,
			baseFrequency: 0.0012,
			fps: 5
		},
		{
			name: 'Sunset',
			colorA: '#ffb56b',
			colorB: '#b23a6d',
			bOpacity: 0.85,
			scale: 140,
			blur: 3,
			displacement: 30,
			baseFrequency: 0.004,
			fps: 3
		},
		{
			name: 'Ocean',
			colorA: '#7ad7f0',
			colorB: '#24506e',
			bOpacity: 0.9,
			scale: 160,
			blur: 4,
			displacement: 24,
			baseFrequency: 0.003,
			fps: 4
		},
		{
			name: 'Forest',
			colorA: '#bfe07a',
			colorB: '#244d3a',
			bOpacity: 0.9,
			scale: 200,
			blur: 3,
			displacement: 18,
			baseFrequency: 0.0025,
			fps: 4
		},
		{
			name: 'Ink',
			colorA: '#e9e6df',
			colorB: '#1c1a17',
			bOpacity: 0.9,
			scale: 130,
			blur: 1,
			displacement: 22,
			baseFrequency: 0.0035,
			fps: 5
		},
		{
			name: 'Grape',
			colorA: '#d9a7e0',
			colorB: '#3d2352',
			bOpacity: 0.72,
			scale: 95,
			blur: 10,
			displacement: 27,
			baseFrequency: 0.0076,
			fps: 3
		},
		{
			name: 'AWC backpack',
			colorA: '#f3f1c9',
			colorB: '#8a5c93',
			bOpacity: 0.9,
			scale: 130,
			blur: 1,
			displacement: 22,
			baseFrequency: 0.0035,
			fps: 2
		}
	];

	// --- Live blend + boil state (starts on the Warm preset) ---
	let enabled = $state(true);
	let colorA = $state('#f5d784');
	let colorB = $state('#bf5e3b');
	let bOpacity = $state(0.7); // opacity of colour B (the colour that bleeds through)
	let scale = $state(90);
	let blur = $state(2);
	let displacement = $state(50);
	let baseFrequency = $state(0.007);
	let fps = $state(2);

	// --- UI state ---
	let showControls = $state(true);
	let isFullscreen = $state(false);
	let copied = $state(false);

	// BackgroundBlend takes a CSS colour string; append B's opacity as an 8-digit hex.
	const toHex2 = (n) =>
		Math.round(Math.min(1, Math.max(0, n)) * 255)
			.toString(16)
			.padStart(2, '0');
	let colorBWithAlpha = $derived(`${colorB}${toHex2(bOpacity)}`);

	function applyPreset(p) {
		({ colorA, colorB, bOpacity, scale, blur, displacement, baseFrequency, fps } = p);
	}

	function swapColours() {
		[colorA, colorB] = [colorB, colorA];
	}

	function randomHex() {
		return (
			'#' +
			Math.floor(Math.random() * 0xffffff)
				.toString(16)
				.padStart(6, '0')
		);
	}
	function randomize() {
		colorA = randomHex();
		colorB = randomHex();
	}

	async function toggleFullscreen() {
		if (typeof document === 'undefined') return;
		if (!document.fullscreenElement) await document.documentElement.requestFullscreen?.();
		else await document.exitFullscreen?.();
	}

	async function copyConfig() {
		const cfg = { colorA, colorB, bOpacity, scale, blur, displacement, baseFrequency, fps };
		await navigator.clipboard?.writeText(JSON.stringify(cfg, null, 2));
		copied = true;
		setTimeout(() => (copied = false), 1500);
	}

	function onKey(e) {
		// don't hijack typing inside inputs
		if (
			e.target instanceof HTMLElement &&
			['INPUT', 'SELECT', 'TEXTAREA'].includes(e.target.tagName)
		)
			return;
		const k = e.key.toLowerCase();
		if (k === 'h') showControls = !showControls;
		else if (k === 'f') toggleFullscreen();
		else if (k === 'r') randomize();
		else if (k === 's') swapColours();
		else if (k === 'b') enabled = !enabled;
	}
</script>

<svelte:head><title>Boil Studio · Experiments</title></svelte:head>

<svelte:window
	onkeydown={onKey}
	onfullscreenchange={() =>
		(isFullscreen = typeof document !== 'undefined' && !!document.fullscreenElement)}
/>

<!-- The pattern itself: a full-screen fixed fullbleed boil, like the landing page's
     backdrop but sized to the whole viewport. Cursor hides with the panel. -->
<div class="stage" class:stage--clean={!showControls} aria-hidden="true">
	<Boil class="stage__fill" {enabled} {displacement} {baseFrequency} {fps}>
		<BackgroundBlend {colorA} colorB={colorBWithAlpha} height="100%" {scale} {blur} />
	</Boil>
</div>

<!-- Faint hint shown when the panel is hidden; fades out so recordings stay clean. -->
{#if !showControls}
	{#key showControls}
		<p class="hint">press <kbd>H</kbd> for controls</p>
	{/key}
{/if}

{#if showControls}
	<aside class="panel">
		<!-- Header -->
		<header class="panel__header">
			<h1>Boil Studio</h1>
			<div class="panel__header-actions">
				<button type="button" onclick={toggleFullscreen} class="icon-btn" title="Fullscreen (F)">
					{isFullscreen ? '⤢' : '⛶'}
				</button>
				<button
					type="button"
					onclick={() => (showControls = false)}
					class="icon-btn"
					title="Hide (H)"
				>
					✕
				</button>
			</div>
		</header>

		<!-- Presets -->
		<section class="group">
			<p class="label">Presets</p>
			<div class="presets">
				{#each presets as p (p.name)}
					<button type="button" onclick={() => applyPreset(p)} class="preset">
						<span class="preset__swatch">
							<span style:background={p.colorA}></span>
							<span style:background={p.colorB}></span>
						</span>
						{p.name}
					</button>
				{/each}
			</div>
		</section>

		<!-- Colours -->
		<section class="group">
			<div class="row">
				<label class="color-field">
					<input type="color" bind:value={colorA} class="color-input" />
					Colour A
				</label>
				<label class="color-field">
					<input type="color" bind:value={colorB} class="color-input" />
					Colour B
				</label>
			</div>
			<label class="field">
				<span class="field-head">B opacity <output>{bOpacity.toFixed(2)}</output></span>
				<input type="range" min="0" max="1" step="0.01" bind:value={bOpacity} />
			</label>
		</section>

		<!-- Blend shape -->
		<section class="group">
			<label class="field">
				<span class="field-head">Blob scale <output>{scale}%</output></span>
				<input type="range" min="50" max="400" step="5" bind:value={scale} />
			</label>
			<label class="field">
				<span class="field-head">Edge blur <output>{blur}px</output></span>
				<input type="range" min="0" max="20" step="1" bind:value={blur} />
			</label>
		</section>

		<!-- Boil motion -->
		<section class="group group--sep">
			<label class="toggle">
				<input type="checkbox" bind:checked={enabled} />
				Boil {enabled ? 'on' : 'off'}
				<kbd class="toggle__key">B</kbd>
			</label>
			<label class="field">
				<span class="field-head">Displacement <output>{displacement}</output></span>
				<input
					type="range"
					min="0"
					max="100"
					step="0.5"
					bind:value={displacement}
					disabled={!enabled}
				/>
			</label>
			<label class="field">
				<span class="field-head">Base frequency <output>{baseFrequency}</output></span>
				<input
					type="range"
					min="0.0004"
					max="0.01"
					step="0.0002"
					bind:value={baseFrequency}
					disabled={!enabled}
				/>
			</label>
			<label class="field">
				<span class="field-head">Frame rate <output>{fps} fps</output></span>
				<input type="range" min="1" max="24" step="1" bind:value={fps} disabled={!enabled} />
			</label>
		</section>

		<!-- Actions -->
		<section class="actions">
			<button type="button" onclick={swapColours} class="btn">Swap (S)</button>
			<button type="button" onclick={randomize} class="btn">Randomize (R)</button>
			<button type="button" onclick={copyConfig} class="btn"
				>{copied ? 'Copied!' : 'Copy config'}</button
			>
		</section>

		<p class="keys">
			<kbd>H</kbd> hide · <kbd>F</kbd> fullscreen · <kbd>R</kbd> randomize · <kbd>S</kbd> swap ·
			<kbd>B</kbd> boil
		</p>
	</aside>
{/if}

<style>
	/* --- The fullscreen pattern layer --- */
	.stage {
		position: fixed;
		inset: 0;
		z-index: 0;
		overflow: hidden;
	}
	.stage--clean {
		cursor: none;
	}
	/* Boil applies this class to its own inner div (a child component), so it must be
	   global to take effect. Oversized so the warped edges fall outside the clip. */
	:global(.stage__fill) {
		position: absolute;
		inset: -8%;
	}

	/* --- Control panel --- */
	.panel {
		position: fixed;
		top: 1rem;
		left: 1rem;
		z-index: 10;
		display: flex;
		flex-direction: column;
		gap: 1.15rem;
		width: 21rem;
		max-height: calc(100dvh - 2rem);
		overflow-y: auto;
		padding: 1.35rem 1.4rem;
		color: var(--color-text);
		font-size: 0.875rem;
		background: color-mix(in srgb, white 87%, transparent);
		border: 1px solid color-mix(in srgb, var(--color-text) 12%, transparent);
		border-radius: 1.1rem;
		box-shadow: 0 12px 34px -12px rgba(0, 0, 0, 0.4);
		backdrop-filter: blur(12px);
		-webkit-backdrop-filter: blur(12px);
	}

	.panel__header {
		display: flex;
		align-items: center;
		justify-content: space-between;
	}
	.panel__header h1 {
		margin: 0;
		font-family: var(--font-display, inherit);
		font-size: 1.35rem;
		font-weight: 400;
		line-height: 1;
	}
	.panel__header-actions {
		display: flex;
		gap: 0.35rem;
	}

	.group {
		display: flex;
		flex-direction: column;
		gap: 0.7rem;
	}
	.group--sep {
		border-top: 1px solid color-mix(in srgb, var(--color-text) 10%, transparent);
		padding-top: 0.95rem;
	}

	.label {
		margin: 0;
		font-size: 0.7rem;
		font-weight: 700;
		text-transform: uppercase;
		letter-spacing: 0.06em;
		color: color-mix(in srgb, var(--color-text) 55%, transparent);
	}

	/* Presets */
	.presets {
		display: flex;
		flex-wrap: wrap;
		gap: 0.4rem;
	}
	.preset {
		display: inline-flex;
		align-items: center;
		gap: 0.4rem;
		padding: 0.25rem 0.6rem 0.25rem 0.3rem;
		border: 1px solid color-mix(in srgb, var(--color-text) 12%, transparent);
		border-radius: 999px;
		font-size: 0.75rem;
		font-weight: 600;
		cursor: pointer;
		transition:
			border-color 0.15s,
			background-color 0.15s;
	}
	.preset:hover {
		border-color: var(--color-primary);
		background: color-mix(in srgb, var(--color-primary) 7%, transparent);
	}
	.preset__swatch {
		display: inline-flex;
		overflow: hidden;
		border-radius: 999px;
		border: 1px solid color-mix(in srgb, var(--color-text) 12%, transparent);
	}
	.preset__swatch span {
		inline-size: 0.85rem;
		block-size: 0.85rem;
	}

	/* Colour pickers */
	.row {
		display: flex;
		gap: 0.85rem;
	}
	.color-field {
		display: flex;
		flex: 1;
		align-items: center;
		gap: 0.5rem;
		font-weight: 600;
	}
	.color-input {
		inline-size: 2.1rem;
		block-size: 1.7rem;
		padding: 0;
		border: 1px solid color-mix(in srgb, var(--color-text) 15%, transparent);
		border-radius: 0.4rem;
		background: none;
		cursor: pointer;
	}

	/* Sliders */
	.field {
		display: flex;
		flex-direction: column;
		gap: 0.3rem;
	}
	.field-head {
		display: flex;
		justify-content: space-between;
		font-weight: 600;
	}
	.field-head output {
		font-weight: 400;
		font-variant-numeric: tabular-nums;
		color: color-mix(in srgb, var(--color-text) 55%, transparent);
	}
	.field input[type='range'] {
		width: 100%;
		accent-color: var(--color-primary);
	}
	.field input[type='range']:disabled {
		opacity: 0.4;
	}

	.toggle {
		display: flex;
		align-items: center;
		gap: 0.5rem;
		font-weight: 600;
		cursor: pointer;
	}
	.toggle input[type='checkbox'] {
		inline-size: 1rem;
		block-size: 1rem;
		accent-color: var(--color-primary);
	}
	.toggle__key {
		margin-left: auto;
	}

	/* Actions */
	.actions {
		display: flex;
		flex-wrap: wrap;
		gap: 0.45rem;
	}
	.btn {
		padding: 0.4rem 0.75rem;
		border: 1px solid color-mix(in srgb, var(--color-text) 12%, transparent);
		border-radius: 0.55rem;
		font-size: 0.78rem;
		font-weight: 600;
		cursor: pointer;
		transition:
			border-color 0.15s,
			background-color 0.15s;
	}
	.btn:hover {
		border-color: var(--color-primary);
		background: color-mix(in srgb, var(--color-primary) 7%, transparent);
	}

	.icon-btn {
		display: grid;
		place-items: center;
		inline-size: 1.8rem;
		block-size: 1.8rem;
		border: none;
		border-radius: 0.5rem;
		background: none;
		font-size: 1rem;
		line-height: 1;
		cursor: pointer;
		transition: background-color 0.15s;
	}
	.icon-btn:hover {
		background: color-mix(in srgb, var(--color-text) 9%, transparent);
	}

	.keys {
		margin: 0;
		font-size: 0.7rem;
		line-height: 1.6;
		color: color-mix(in srgb, var(--color-text) 50%, transparent);
	}

	kbd {
		padding: 0.05rem 0.32rem;
		border: 1px solid color-mix(in srgb, var(--color-text) 22%, transparent);
		border-bottom-width: 2px;
		border-radius: 0.28rem;
		font-family: var(--font-code, monospace);
		font-size: 0.9em;
	}

	/* Hint fades out after a couple of seconds so a recording stays clean. */
	.hint {
		position: fixed;
		bottom: 1.25rem;
		left: 50%;
		transform: translateX(-50%);
		z-index: 10;
		margin: 0;
		padding: 0.4rem 1rem;
		border-radius: 999px;
		background: rgba(0, 0, 0, 0.42);
		color: rgba(255, 255, 255, 0.92);
		font-size: 0.72rem;
		font-weight: 500;
		letter-spacing: 0.02em;
		pointer-events: none;
		backdrop-filter: blur(4px);
		animation: hint-fade 3s ease forwards;
	}
	.hint kbd {
		border-color: rgba(255, 255, 255, 0.4);
		color: #fff;
	}
	@keyframes hint-fade {
		0%,
		40% {
			opacity: 1;
		}
		100% {
			opacity: 0;
		}
	}
</style>
