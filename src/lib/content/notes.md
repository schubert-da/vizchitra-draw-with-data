# Presenter notes

<!--
  HOW TO EDIT
  Each screen starts with a heading line. Pick one of three forms:
    "# slides  | 4–7 | Screen title"          an intro slide screen
    "# intro   | Header label | Screen title"  a non-slide intro screen
    "# chapter | <slug>/<section-id>"          a chapter section (title comes from chaptersConfig.js)
    "# chapter | <slug> | Screen title"        a chapter opener, shown before that chapter's sections

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

# chapter | 2-drawing-with-data | From manual to automatic

- Recap: last chapter we built charts from basic shapes — but all VERY manual.
- Change one data point → go back in, redo the math, add or remove shapes.
- This chapter: automate all that.
- Style and modify shapes so they react to the data.
- Then make things interactive.
- We’ll do this in JS — looks a bit different from what we’ve seen so far.
- Trust me: just enough JS to make some interesting dataviz.

# chapter | 2-drawing-with-data/first-shape

> Now → working with data for the first time.
- Goal: read the data, draw a circle sized by a column, plus a bit of text.
- New <script> element — that’s where our JS goes.
- Green text = comments again; JS uses // for comments.
- [Open the CSV in Excel — walk through what we’re looking at.]
- Really only 3 lines of code here.
- Line 1: read the CSV, name it “data” (name can be anything).
- Line 2: console.log(data) — prints whatever’s in the brackets. Open it with F12, or right-click → Inspect → Console.
- Shows an array = a list of rows; expand one → a single row, like earlier.
- Access a row with data[0] (index by number); then a value by column name.
- Line 3: a variable — a named, reusable bit of code (here data[0]). Log it, swap indexes to show.
- Use it: curly braces {} plug JS into the markup (like before). Swap in text, change the index.
- Change the value in Excel → it updates live.

# chapter | 2-drawing-with-data/each

> Now → repeat shapes for every row in the data.
- Goal: build the grid of shapes (show output).
- Before, 6 circles meant 6 <circle> elements — not doing that 100+ times.
- Instead: draw it once, repeat for each row.
- Over to the exercise — roughly what’s in our example file.
- Same as before: title + artist text (fill later), the circle (sized by columns).
- New: a smaller white circle on top → looks like a disc, plus a background rectangle.
- Grid setup: variables for tile width + number of columns.
- size comes from gridSize — a function: takes inputs, returns a value (not writing functions today).
- Repeat with an each block in Svelte (write the syntax) — runs the content once per row.
- Access each row’s values with “row”, like last time.
- Updates — but all stacked on top of each other → fix with the g element (moves each tile by its index).
- Heads up: our data’s all 0–100 — but a “streams” column in the millions couldn’t map straight to a radius.
- Reach for a D3 scale — here’s the interactive, here’s how to apply.

# chapter | 2-drawing-with-data/interactivity

> Now → make the chart interactive.
- Add state: sizeMetric + selectedGenre, and a basic reactive variable.
- Use both to vary the chart — show how each one changes the output.
- Update the loop variables to read them.
- Copy the block across and explain what it does.
- Jumpy → smooth it with CSS transitions on the <g> and <circle> elements.
- CSS can do more than that — paste an example to show.

# chapter | 3-final-project/setup

> Now → the final project: the music chart tile.
- Walk the shape we’re drawing — the only new piece is the arcs.
- Arc syntax: draw a basic one on screen as a demo (not data-driven yet).
! Remember: we’re drawing a single shape here, not the 100+ designs.
- Use a scale to draw the base circle.
- Start with popularity → draw a wedge bottom-right, explain its position, then translate it into place.
- Repeat the same for the other wedges.
- Time permitting → a more complex design.
