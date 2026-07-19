# The Moki Archive

An ever-expanding collection of digital specimens, experimental creations, and
cognitive artifacts recovered from the mind of Moki. A plain, dependency-free
static site — dark, old-internet / dossier aesthetic.

**Live site:** `https://amojovic.github.io/the-moki-archive/` *(active once the
repository is made public)*

## How it works

No build step, no frameworks. Just open `index.html` in a browser to preview
locally, or push and let GitHub Pages serve it.

```
index.html            page shell (header, sidebar, catalogue, lightbox)
css/style.css         all styling / theme
js/entries.js         >>> THE ONLY FILE YOU EDIT TO ADD CONTENT <<<
js/app.js             rendering, tag filtering, carousel, lightbox
assets/images/        image plates (SVG/PNG/JPG all fine)
assets/audio/         audio files
.nojekyll             tells GitHub Pages to serve the files as-is
```

## Adding an entry

Open `js/entries.js` and add a new object to the **top** of the list. Newest
entries appear highest on the page (the site also sorts by `date`).

```js
{
  id:     "MOKI-0006",                 // catalogue number, your choice
  title:  "Name of the entry",
  date:   "2026-07-19",                // YYYY-MM-DD
  tags:   ["software", "tool"],        // any strings; filters build from these
  images: ["assets/images/thing.svg"], // 0, 1, or many (carousel + click-to-zoom)
  text:   `<p>HTML allowed here.</p>`, // description; scrolls within its box
  textHeight: "tall",                  // OPTIONAL: "tall" or "full" for long ones
  audio:  "assets/audio/thing.wav",    // OPTIONAL: adds an audio player
  links:  [                            // OPTIONAL: buttons in the material column
    { label: "Repository", url: "https://github.com/amojovic/thing" }
  ]
}
```

### The four fields of an entry

1. **Tags** — classification chips (also clickable to filter).
2. **Visual** — one image, or several with carousel arrows; click any to enlarge.
3. **Description** — free text (HTML allowed), scrolls inside its own box.
4. **Material** — an audio player and/or link buttons.

### Notes

- **Long text:** the description box scrolls on its own by default. For a piece
  that deserves more room, set `textHeight: "tall"` (or `"full"` for no cap).
- **Text formatting:** inside `text` you can use `<p>`, `<em>`, `<strong>`,
  `<hr>`, and `<span class="redacted">████</span>` for a redacted bar.
- **Tags are freeform:** there is no fixed list yet. The left-hand filter panel
  is generated automatically from whatever tags exist across all entries.

## Local preview

Double-click `index.html`, or from this folder run any static server, e.g.:

```
python -m http.server 8080
```

then visit `http://localhost:8080`.
