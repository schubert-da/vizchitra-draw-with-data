---
title: Drawing Shapes
---

## Putting it all together

You've now met every basic SVG shape - `<rect>`, `<circle>`, `<line>` and `<path>`. That's a
surprisingly complete toolkit: combine them and you can draw almost any chart or pattern.

A quick reminder of each one's syntax:

```svelte
<rect x="20" y="20" width="160" height="80" fill="tomato" />
```

```svelte
<circle cx="100" cy="60" r="40" fill="steelblue" />
```

```svelte
<line x1="50" y1="50" x2="400" y2="300" stroke="black" stroke-width="2" />
```

```svelte
<path d="M 100 300 L 250 80 L 400 300 Z" fill="tomato" />
```

Take a look at the designs on the slides. Your task is to recreate one of them or, even
better, **sketch a design of your own** and build it out of shapes.

The workspace on the right is a **2 × 2 grid of 350 × 350 canvases** - fill up as few or as many as would like to create. I've started with one to get you started.

> [!TIP]
> Remember that shapes drawn later sit on top of earlier ones, so you can get
> creative by overlapping shapes!

There are no wrong answers here - the aim is just to get comfortable thinking in shapes and coordinates.
