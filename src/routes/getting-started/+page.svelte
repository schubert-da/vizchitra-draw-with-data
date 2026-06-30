<script>
	import { Apple, Monitor } from '@lucide/svelte';
	import { interpolateRgb } from 'd3';
	import BackgroundBlend from '$components/ArtUtils/BackgroundBlend.svelte';
	import Boil from '$components/ArtUtils/Boil.svelte';

	// Beginner setup guide. A single OS toggle keeps the platform-specific steps
	// from cluttering the page - readers only see instructions for their machine.
	let os = $state('mac');

	const repoZip =
		'https://github.com/schubert-da/vizchitra-draw-with-data/archive/refs/heads/main.zip';
	const repoUrl = 'https://github.com/schubert-da/vizchitra-draw-with-data';

	// Boiling blend backdrop (CenteredText settings). Colours warm at the top and
	// cool to blue (--color-blend-blue-a / -b) as you scroll to the bottom.
	const blend = { displacement: 50, baseFrequency: 0.007, fps: 1, scale: 90, blur: 2 };

	let scrollY = $state(0);
	let innerHeight = $state(0);
	let t = $derived(
		innerHeight ? Math.min(1, scrollY / (document.documentElement.scrollHeight - innerHeight)) : 0
	);
	let colorA = $derived(interpolateRgb('#f5d784', '#42e0ce')(t));
	let colorB = $derived(interpolateRgb('#bf5e3bb3', '#2b415f')(t));
</script>

<svelte:window bind:scrollY bind:innerHeight />

<svelte:head><title>Getting Started</title></svelte:head>

<!-- Full-bleed boiling blend, fixed behind the scrolling content. Oversized so the
     warped edges fall outside the viewport's clip. -->
<div class="pointer-events-none fixed inset-0 -z-10 overflow-hidden" aria-hidden="true">
	<Boil
		class="absolute inset-[-6%]"
		displacement={blend.displacement}
		baseFrequency={blend.baseFrequency}
		fps={blend.fps}
	>
		<BackgroundBlend {colorA} {colorB} height="100%" scale={blend.scale} blur={blend.blur} />
	</Boil>
</div>

<main class="w-full px-6 py-12 text-text sm:px-8 sm:py-8">
	<div
		class="content-track border-shadow-left relative z-10 mx-auto w-full max-w-225 border border-black bg-palette-white p-4 sm:p-10 sm:px-15"
	>
		<p class="mb-2 font-code text-sm tracking-wide text-primary uppercase">Setup</p>
		<h1 class="mb-4 font-display text-[2.6rem] leading-[1.1] font-normal sm:text-[3.2rem]">
			Getting Started
		</h1>

		<p class="mb-6 text-[1.15rem] leading-relaxed text-text/80">
			Helloo there! Glad you could make it. This page walks you through getting your computer ready,
			one small step at a time. You don't need any coding experience - just follow along, and if
			something looks unfamiliar, that's <em>totally normal</em>.
		</p>

		<div class="mb-10 rounded-lg border-l-4 border-palette-blue-dark bg-palette-blue/12 px-4 py-3">
			<p class=" text-[0.95rem] leading-relaxed">
				Set aside about <strong>15-20 minutes</strong>. You'll install two free programs and
				download the project. Take it slow - there's no rush, and you can't break anything.
			</p>
		</div>

		<p class="mb-5 block text-[0.95rem] leading-relaxed">
			<strong class="uppercase">Pro Tip</strong>: If you get stuck,
			<strong>ChatGPT is your friend</strong> - LLMs are surprisingly decent at explaining these kinds
			of things. Just copy the error message into ChatGPT and ask it to explain what it means and how
			to fix it.
		</p>

		<!-- OS toggle -->
		<div class="mb-10">
			<p class="mb-2 text-sm font-semibold text-text/70">First, which computer are you using?</p>
			<div class="inline-flex rounded-lg border border-text/15 p-1">
				<button
					type="button"
					onclick={() => (os = 'mac')}
					class="flex items-center gap-2 rounded-md px-4 py-2 text-sm font-semibold transition-colors {os ===
					'mac'
						? 'bg-primary text-palette-white'
						: 'text-text/70 hover:bg-primary/5'}"
				>
					<Apple size={18} strokeWidth={1.75} /> Mac
				</button>
				<button
					type="button"
					onclick={() => (os = 'windows')}
					class="flex items-center gap-2 rounded-md px-4 py-2 text-sm font-semibold transition-colors {os ===
					'windows'
						? 'bg-primary text-palette-white'
						: 'text-text/70 hover:bg-primary/5'}"
				>
					<Monitor size={18} strokeWidth={1.75} /> Windows
				</button>
			</div>
		</div>

		<!-- ============================ STEP 1 ============================ -->
		<section class="step">
			<h2 class="step-title"><span class="step-num">1</span>. Install Node.js</h2>
			<p class="step-lead">
				Node.js is the engine that runs the project behind the scenes. Installing it is just like
				installing any other program.
			</p>

			<ol class="guide-list">
				<li>
					Go to <a href="https://nodejs.org/en/download" target="_blank" rel="noopener"
						>nodejs.org/en/download</a
					>.
				</li>
				<li>
					Scroll down until you see the heading <strong>“Or get a prebuilt Node.js®”</strong>. This
					is the part you want - it has a couple of dropdowns and two green download buttons.
				</li>
				{#if os === 'mac'}
					<li>
						Make sure the first dropdown says <strong>macOS</strong>, then set the architecture
						dropdown to match your Mac (see the box below if you're not sure):
						<ul class="sub-list">
							<li><strong>arm64</strong>: for Apple Silicon Macs (M1, M2, M3, M4)</li>
							<li><strong>x64</strong>: for older Intel Macs</li>
						</ul>
					</li>
					<li>Click the green <strong>“macOS Installer (.pkg)”</strong> button to download.</li>
					<li>
						Open the downloaded <code>.pkg</code> file and click
						<em>Continue → Agree → Install</em>.
					</li>
				{:else}
					<li>
						Make sure the dropdowns say <strong>Windows</strong> and <strong>x64</strong> (the
						default on almost every PC), then click the green
						<strong>“Windows Installer (.msi)”</strong> button to download.
					</li>
					<li>
						Open the downloaded <code>.msi</code> file and keep clicking <em>Next</em>. The default
						options are exactly what you want - don't change anything.
					</li>
					<li>
						If a window pops up asking for permission to make changes, click <strong>Yes</strong>.
					</li>
				{/if}
				<li>When it says it's finished, you're done. 🎉</li>
			</ol>

			{#if os === 'mac'}
				<div class="callout callout--note">
					<p class="callout__title">Not sure which Mac you have?</p>
					<p>
						Click the <strong> menu</strong> (top-left of your screen) →
						<strong>About This Mac</strong>. Look at the <strong>Chip</strong> (or
						<strong>Processor</strong>) line:
					</p>
					<ul class="sub-list">
						<li>
							If it mentions <strong>Apple</strong> (e.g. “Apple M2”), choose
							<strong>arm64</strong>.
						</li>
						<li>If it mentions <strong>Intel</strong>, choose <strong>x64</strong>.</li>
					</ul>
					<p>Most Macs sold since late 2020 are Apple Silicon (arm64).</p>
				</div>
			{/if}

			<div class="callout callout--tip">
				<p class="callout__title">How to check it worked</p>
				<p>
					You don't have to, but if you're curious: open the
					{#if os === 'mac'}<strong>Terminal</strong> app (press <kbd>⌘</kbd> + <kbd>Space</kbd>,
						type “Terminal”, hit Enter){:else}<strong>Command Prompt</strong> (press the Windows key,
						type “cmd”, hit Enter){/if} and type:
				</p>
				<pre class="cmd">node -v</pre>
				<p>If you see a version number like <code>v22.11.0</code>, everything is working.</p>
			</div>

			<div class="callout callout--warning">
				<p class="callout__title">Common hiccup</p>
				<p>
					If <code>node -v</code> says <em>“command not found”</em> or <em>“not recognized”</em>,
					the most common fix is simply to <strong>close that window and open a new one</strong> (or restart
					your computer). New installs only show up in freshly-opened terminals.
				</p>
			</div>
		</section>

		<!-- ============================ STEP 2 ============================ -->
		<section class="step">
			<h2 class="step-title"><span class="step-num">2</span>. Install VS Code</h2>
			<p class="step-lead">
				VS Code (Visual Studio Code) is a free text editor made for writing code. It's where you'll
				open the project and make changes.
			</p>

			<ol class="guide-list">
				<li>
					Go to <a href="https://code.visualstudio.com/download" target="_blank" rel="noopener"
						>code.visualstudio.com/download</a
					>. You'll see download options grouped by platform.
				</li>
				{#if os === 'mac'}
					<li>
						Under <strong>macOS</strong>, click the <strong>“.dmg”</strong> download. If there are
						three choices, pick <strong>“Universal”</strong> - it works on every Mac.
					</li>
					<li>
						Once it finishes, double-click the <code>.dmg</code> in your <strong>Downloads</strong> folder.
					</li>
					<li>
						A window opens showing the <strong>Visual Studio Code</strong> icon next to an
						<strong>Applications</strong> folder. Drag the icon onto the Applications folder. (This step
						is easy to miss - if you skip it, the app lives in the wrong place.)
					</li>
					<li>
						Open <strong>Visual Studio Code</strong> from your Applications or Launchpad. The first
						time, macOS may warn that it was “downloaded from the internet” - click
						<strong>Open</strong> to confirm it's safe.
					</li>
				{:else}
					<li>
						Under <strong>Windows</strong>, click the <strong>“User Installer”</strong> download for
						<strong>x64</strong> (the right choice for almost every PC). You'll get a file ending in
						<code>.exe</code>.
					</li>
					<li>Open the downloaded <code>.exe</code> installer.</li>
					<li>
						Click through with <em>Next</em>. When you reach the checkboxes, leave the defaults
						checked - especially <strong>“Add to PATH”</strong> and
						<strong>“Open with Code”</strong>.
					</li>
					<li>Finish, and let it launch VS Code.</li>
				{/if}
			</ol>
		</section>

		<!-- ============================ STEP 3 ============================ -->
		<section class="step">
			<h2 class="step-title"><span class="step-num">3</span>. Download the project</h2>
			<p class="step-lead">This is the folder full of files you'll be working with.</p>

			<ol class="guide-list">
				<li>
					Click here to download it as a ZIP:
					<a href={repoZip} class="dl-link">Download the project (.zip)</a>
				</li>
				<li>
					<em
						>(That link comes from <a href={repoUrl} target="_blank" rel="noopener"
							>the project's GitHub page</a
						>
						- if you ever lose it, click the green <strong>“Code”</strong> button there and choose
						<strong>“Download ZIP”</strong>.)</em
					>
				</li>
				{#if os === 'mac'}
					<li>
						Find the downloaded ZIP in <strong>Downloads</strong> and double-click it. macOS unzips it
						into a folder automatically.
					</li>
				{:else}
					<li>
						Find the ZIP in <strong>Downloads</strong>, right-click it, and choose
						<strong>“Extract All…”</strong> → <strong>Extract</strong>. This is important - see the
						warning below.
					</li>
				{/if}
				<li>
					Move the unzipped folder somewhere easy to find, like your <strong>Desktop</strong> or
					<strong>Documents</strong>. Remember where you put it!
				</li>
			</ol>

			{#if os === 'windows'}
				<div class="callout callout--warning">
					<p class="callout__title">The #1 Windows pitfall: actually extract the ZIP</p>
					<p>
						When you double-click a ZIP, Windows shows you what's inside as if it were a normal
						folder - but it's still zipped. You <strong>must</strong> use
						<strong>“Extract All”</strong>
						first, otherwise the project won't run later. If your folder path still has the word
						<code>.zip</code> in it, you haven't extracted yet.
					</p>
				</div>
			{/if}

			<div class="callout callout--tip">
				<p class="callout__title">That's the install done!</p>
				<p>
					You now have everything on your computer! The next section gets the project up and running
					so you can see it in your browser.
				</p>
			</div>
		</section>

		<hr class="my-14 border-text/15" />

		<!-- ============================ NEXT: RUN IT ============================ -->
		<p class="mb-2 font-code text-sm tracking-wide text-primary uppercase">Next</p>
		<h2 class="mb-3 font-display text-[2rem] leading-tight font-normal">Run the project</h2>
		<p class="mb-8 text-[1.1rem] leading-relaxed text-text/80">
			Two short commands and the project will be live on your own machine. You'll type them into a
			<strong>terminal</strong> - a place to give your computer text instructions. The good news: VS Code
			has one built in.
		</p>

		<!-- ============================ STEP 4 ============================ -->
		<section class="step">
			<h2 class="step-title"><span class="step-num">4</span>. Open the project in VS Code</h2>
			<ol class="guide-list">
				<li>Open VS Code.</li>
				<li>
					Go to <strong>File → Open Folder…</strong> (and not "<em>Open File…</em>") and select the
					project folder you unzipped (the one that contains a file called
					<code>package.json</code>).
				</li>
				<li>
					If VS Code asks <em>“Do you trust the authors of the files in this folder?”</em>, click
					<strong>Yes, I trust the authors</strong>.
				</li>
				<li>
					Open the built-in terminal: <strong>Terminal → New Terminal</strong> from the top menu. A panel
					opens at the bottom - that's where you'll type the next two commands.
				</li>
			</ol>

			<div class="callout callout--warning">
				<p class="callout__title">Open the folder, not a single file</p>
				<p>
					Make sure you open the whole <strong>folder</strong> (the one with
					<code>package.json</code>
					in it), not just one file inside it. If you accidentally opened the folder that
					<em>contains</em> the project, open the project folder itself instead.
				</p>
			</div>
		</section>

		<!-- Optional Svelte extension note (sits between Step 4 and Step 5) -->
			<div class="callout callout--tip">
				<p class="callout__title">Optional, but helpful</p>
				<p>
					VS Code may pop up a little notification suggesting the
					<strong>Svelte for VS Code</strong> extension. If it does, go ahead and click
					<strong>Install</strong> - it adds colour highlighting and helpful hints for the project's
					<code>.svelte</code> files. It's completely optional, so if you don't see the prompt, don't
					worry - everything still works without it.
				</p>
			</div>

			<!-- ============================ STEP 5 ============================ -->
		<section class="step">
			<h2 class="step-title">
				<span class="step-num">5</span>. Install the project's dependencies
			</h2>
			<p class="step-lead">
				Projects rely on building blocks made by other people. This command downloads them all into
				the folder. You only need to do it once.
			</p>
			<p class="mb-2">In the terminal panel, type this and press <kbd>Enter</kbd>:</p>
			<pre class="cmd">npm install</pre>
			<p>
				You'll see lots of text scroll by, and it may take a minute or two. When it stops and you
				get a fresh line to type on, it's done.
			</p>

			<div class="callout callout--warning">
				<p class="callout__title">If you see “npm is not recognized / command not found”</p>
				<p>
					That means Node.js isn't available in this terminal yet. Close VS Code completely, reopen
					it, and try again. If it still happens, double-check <strong>Step 1</strong> finished successfully.
				</p>
			</div>
		</section>

		<!-- ============================ STEP 6 ============================ -->
		<section class="step">
			<h2 class="step-title"><span class="step-num">6</span>. Start it up</h2>
			<p class="mb-2">Now type this and press <kbd>Enter</kbd>:</p>
			<pre class="cmd">npm run dev</pre>
			<p class="mb-3">After a moment you'll see a message with a web address, something like:</p>
			<pre class="cmd cmd--muted">  ➜  Local:   http://localhost:5173/</pre>
			<p>
				Hold <kbd>{os === 'mac' ? '⌘' : 'Ctrl'}</kbd> and click that link (or copy it into your browser).
				The project should open. You're up and running! 🎉
			</p>

			<div class="callout callout--tip">
				<p class="callout__title">Keep it running</p>
				<p>
					Leave that terminal open while you work - it's what keeps the site live. As you edit files
					and save, the page updates on its own. When you're finished for the day, click in the
					terminal and press <kbd>{os === 'mac' ? '⌃' : 'Ctrl'}</kbd> + <kbd>C</kbd> to stop it, and
					run <code>npm run dev</code> again next time.
				</p>
			</div>
		</section>

		<div class="mt-14 rounded-xl border border-text/12 bg-primary/5 px-6 py-6 text-center">
			<p class="mb-1 font-display text-2xl">You're all set 🚀</p>
			<p class="text-text/80">
				Head over to the <a href="/chapters" class="font-semibold">chapters</a> and start drawing with
				data.
			</p>
		</div>
	</div>
</main>

<style>
	.step {
		margin: 2.5rem 0;
	}

	.step-title {
		display: flex;
		align-items: baseline;
		/* gap: 0.75rem; */
		margin: 0 0 0.5rem;
		font-size: 1.6rem;
		font-weight: 700;
		line-height: 1.2;
	}

	.step-num {
		display: grid;
		place-items: end;
		flex: none;
		/* padding: 0.6rem 0.9rem; */
		/* border-radius: 9999px; */
		/* background: var(--color-primary); */
		/* color: var(--color-palette-white); */
		font-family: var(--font-body);
		font-weight: 500;
		font-size: 3rem;
	}

	.step-lead {
		margin: 0 0 1rem;
		color: color-mix(in srgb, var(--color-text) 80%, transparent);
	}

	.guide-list {
		margin: 0 0 1.25rem;
		padding-left: 1.5rem;
		list-style: decimal;
		line-height: 1.7;
	}
	.guide-list li {
		margin: 0.45rem 0;
		padding-left: 0.25rem;
	}

	.sub-list {
		margin: 0.4rem 0 0.2rem;
		padding-left: 1.25rem;
		list-style: disc;
		line-height: 1.6;
	}
	.sub-list li {
		margin: 0.2rem 0;
	}

	a,
	a:visited {
		color: var(--color-primary);
		font-weight: 500;
		text-underline-offset: 0.15rem;
	}

	.dl-link {
		display: inline-block;
		margin-left: 0.25rem;
		padding: 0.35rem 0.8rem;
		border-radius: 0.4rem;
		background: var(--color-primary);
		color: var(--color-palette-white) !important;
		text-decoration: none;
		font-weight: 600;
		font-size: 0.95rem;
	}
	.dl-link:hover {
		background: var(--color-primary-400);
	}

	code {
		padding: 0.1rem 0.35rem;
		border-radius: 0.3rem;
		font-family: var(--font-code);
		font-size: 0.85em;
		background: color-mix(in srgb, var(--color-text) 8%, transparent);
		color: var(--color-primary-400);
	}

	kbd {
		display: inline-block;
		padding: 0.1rem 0.4rem;
		border: 1px solid color-mix(in srgb, var(--color-text) 25%, transparent);
		border-bottom-width: 2px;
		border-radius: 0.3rem;
		font-family: var(--font-code);
		font-size: 0.8em;
		background: color-mix(in srgb, var(--color-text) 4%, transparent);
	}

	.cmd {
		margin: 0.5rem 0 1rem;
		padding: 0.85rem 1rem;
		border-radius: 0.5rem;
		background: var(--color-dark-bg);
		color: var(--color-palette-white);
		font-family: var(--font-code);
		font-size: 0.9rem;
		white-space: pre-wrap;
		overflow-wrap: anywhere;
	}
	.cmd--muted {
		opacity: 0.85;
		font-size: 0.82rem;
	}

	.callout {
		margin: 1.25rem 0;
		padding: 0.85rem 1.1rem;
		border-radius: 0.4rem;
		border-left: 4px solid var(--note-color);
		background: color-mix(in srgb, var(--note-color) 12%, transparent);
		line-height: 1.55;
	}
	.callout > :first-child {
		margin-top: 0;
	}
	.callout > :last-child {
		margin-bottom: 0;
	}
	.callout p {
		margin: 0.4rem 0;
	}
	.callout__title {
		font-size: 0.72rem;
		font-weight: 700;
		text-transform: uppercase;
		letter-spacing: 0.06em;
		color: var(--note-color);
	}

	.callout--note {
		--note-color: var(--color-palette-blue-dark);
	}
	.callout--tip {
		--note-color: var(--color-palette-purple-dark);
	}
	.callout--warning {
		--note-color: var(--color-palette-orange-dark);
	}
</style>
