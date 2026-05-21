# Initial Setup

## SvelteKit Project Scaffolding

Project was created using `npx sv create` with the following options:

- **Template:** SvelteKit minimal
- **Language:** JavaScript
- **Svelte version:** Svelte 5 (runes mode enabled)
- **Adapter:** `@sveltejs/adapter-static` (static site generation)
- **Bundler:** Vite 7
- **Linting/Formatting:** ESLint + Prettier (with `prettier-plugin-svelte` and `prettier-plugin-tailwindcss`)
- **CSS:** Tailwind CSS v4 (via `@tailwindcss/vite` plugin)

## Path Aliases

Configured in `svelte.config.js` under `kit.alias`:

| Alias         | Path                 |
| ------------- | -------------------- |
| `$lib`        | `src/lib` (built-in) |
| `$assets`     | `src/lib/assets`     |
| `$utils`      | `src/lib/utils`      |
| `$components` | `src/lib/components` |

## Folder Structure

```
src/
├── lib/
│   ├── assets/
│   │   ├── fonts/
│   │   └── favicon.svg
│   ├── components/
│   ├── styles/
│   │   ├── app.css
│   │   └── variables.css
│   └── utils/
└── routes/
    ├── +layout.svelte
    └── +page.svelte
```

## Styles

### `src/lib/styles/app.css`

- Imports Tailwind CSS and `variables.css`
- CSS resets: `box-sizing: border-box`, zero margin/padding, font smoothing
- Media elements (`img`, `picture`, `video`, `svg`) set to `display: block` and `max-width: 100%`
- `.placeholder` utility class — creates a placeholder block element with a light grey background

### `src/lib/styles/variables.css`

- All fonts use `font-display: swap` for performance
- Color tokens registered via Tailwind v4 `@theme` directive (usable as both CSS variables and Tailwind utilities like `bg-primary`, `text-secondary`, etc.):

| Token                 | Value     | Tailwind class example |
| --------------------- | --------- | ---------------------- |
| `--color-primary`     | `#FC341E` | `bg-primary`           |
| `--color-primary-400` | `#FC5543` | `bg-primary-400`       |
| `--color-primary-300` | `#FC6B5B` | `bg-primary-300`       |
| `--color-primary-250` | `#FC7667` | `bg-primary-250`       |
| `--color-primary-200` | `#FC8073` | `bg-primary-200`       |
| `--color-primary-150` | `#FC968A` | `bg-primary-150`       |
| `--color-primary-100` | `#FDB7AF` | `bg-primary-100`       |
| `--color-secondary`   | `#FFBE00` | `bg-secondary`         |
| `--color-locked`      | `#141414` | `bg-locked`            |
| `--color-dark-bg`     | `#1E1E1E` | `bg-dark-bg`           |

- Gradients can be composed inline with Tailwind: `bg-linear-to-r from-primary to-primary-100`

### Layout

`+layout.svelte` imports `$lib/styles/app.css` globally and sets the favicon.

## Prettier Configuration

Update `tailwindStylesheet` in `.prettierrc` to point to your actual CSS entrypoint (e.g. `./src/lib/styles/app.css`) — an incorrect path silently breaks format-on-save.

In `.vscode/settings.json`, set the default formatter for Svelte files to `esbenp.prettier-vscode` (not `svelte.svelte-vscode`) — the Svelte extension uses its own bundled prettier which ignores project plugins:

```json
"[svelte]": {
  "editor.defaultFormatter": "esbenp.prettier-vscode"
}
```

## Key Packages

| Package                     | Version | Purpose                                                                  |
| --------------------------- | ------- | ------------------------------------------------------------------------ |
| `d3`                        | 7.9.0   | Data visualization and DOM manipulation                                  |
| `gsap`                      | 3.14.2  | Animation library for scroll-driven and timeline animations              |
| `@sveltejs/svelte-scroller` | 2.0.7   | Scroll-based storytelling component for SvelteKit                        |
| `@lucide/svelte`            | 0.544.0 | Icon library for Svelte (pinned — v0.577+ has SSR issues with SvelteKit) |
