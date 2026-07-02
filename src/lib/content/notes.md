# Presenter notes

<!--
  HOW TO EDIT
  Each screen starts with a heading line. Pick one of three forms:
    "# slides  | 4–7 | Screen title"          an intro slide screen
    "# intro   | Header label | Screen title"  a non-slide intro screen
    "# chapter | <slug>/<section-id>"          a chapter section (title comes from chaptersConfig.js)

  Under a heading, each note is one line. The first character sets its type:
    -  note        plain talking point (default; any unmarked line is a note too)
    >  transition  the line that carries you into the next section
    ?  ask         reminder to ask the room
    !  pause       reminder to pause / let it land

  Order here = order in the viewer. Blank lines are ignored.
-->

# slides | 4–7 | Dataviz isn’t as hard as it looks

- Been doing this a few years now.
- Big lesson: custom dataviz is never as hard as it looks from the outside.
- At first I assumed complex tech — advanced algorithms, lots of math needed first.
- Learning D3, the surprise: most viz are just simple shapes — circles, rects, lines, text.
- Hard part isn’t drawing shapes — it’s where they go, how big, and how they map to the data.

# slides | 14–15 | What we’ll build, and how

- All of this is much easier than it sounds.
- Final project — the whole thing is maybe 25 lines of code, start to finish.
- But we’ll build up slowly to understand what those 25 lines do.
> Switch to the course chapters.
- Start with just drawing shapes on a canvas — basic charts.
- Manual at first — like a design tool such as Figma, positioning and nudging each shape individually.
- Next section: use data to control placement and styling of shapes.
- One line of code reused to represent an entire dataset — how we make custom dataviz.

# intro | Before Chapter 1 | How the exercises work

- On screen right now: a bit of HTML — technically a blank file.
- The text between the HTML comments is just helper text to follow along — not real code.
- Every exercise block like this: the solution is on the “Solution” tab.
- Your output = whatever the file named on the right currently produces.
- Editing: make a small change — e.g. add some placeholder text.
- Note the dot on the filename → unsaved, so no output yet.
- Hit Ctrl+S → changes show up live.

# chapter | 1-your-first-charts/svg

- SVG = the canvas / graph paper we draw all our shapes on.
- Create it (like any HTML element) with an opening + closing tag.
- Give it a width and a height.
- It’s taking up space now — but invisible, since the background is transparent by default.
- Add class="chart" to make it visible.
- How: elsewhere in the project a rule says “any element with class chart gets a white background”.

# chapter | 1-your-first-charts/circles

> Same file, keep going → build a basic scatter plot with circles.
- First learn to draw one circle, then use the data (side panel) to position them.
- Canvas is a graph: x runs 0→500, y runs 0→350.
- Quirk: y starts at the TOP, not bottom-left like you’d normally expect the origin.
- Tricky — so let’s plot a couple circles to get used to it.
- Circle = <circle> tag: cx and cy (center x/y), plus r (radius).
- Move one around to show the coordinate extents.
! Reflect: this is tedious — the point is just to get comfy with SVG’s coordinate system and the shapes we can use.
- We’ll learn to automate all this in later chapters.

# chapter | 1-your-first-charts/rects

> Now → a basic bar chart using rectangle elements.
- Start by drawing rectangles, then adjust position + height to match the data.
- Draw one: <rect> element — x and y set the top-left corner, then width and height.
- Map to data: place it at a specific x.
- Set the top edge (y) from the data — same as we did before.
- Then stretch the height down to the bottom — that’s just the height.
- Repeat a few more times → a bar chart.

# chapter | 1-your-first-charts/paths

> Last shape → area charts, built with <path>.
- What we’ll build: a line with the whole region under it filled.
- <path> = one `d` string of commands: M move, L line, Z close.
- Same coordinates as before — y from the top.
- Trace the data: M to the first point, then L along the rest → a line.
- Enclose it: drop down to the baseline, back to the start, Z → fill.
! Reflect: fiddly by hand, but the most powerful shape — almost anything is a path. We’ll automate soon.
