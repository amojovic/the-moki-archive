/* =====================================================================
   THE MOKI ARCHIVE  —  DATA FILE
   ---------------------------------------------------------------------
   This is the only file you edit to add or change catalogue entries.
   Add new entries to the TOP of the list (newest first). The site also
   sorts by `date` so ordering is safe either way.

   ENTRY SCHEMA
   ------------
   {
     id:     "MOKI-0006",              // catalogue number (your choice)
     title:  "Name of the entry",
     date:   "2026-07-19",             // YYYY-MM-DD, drives newest-first sort
     tags:   ["software", "tool"],     // any strings; filters build from these
     images: ["assets/images/x.svg"],  // 0, 1, or many (carousel + click to zoom)
     text:   `<p>HTML is allowed here.</p>`,   // description; scrolls in its box
     textHeight: "tall",               // OPTIONAL: "tall" or "full" for big ones
     audio:  "assets/audio/x.wav",     // OPTIONAL: shows an audio player
     links:  [                         // OPTIONAL: buttons in the material column
       { label: "Repository", url: "https://github.com/amojovic/x" }
     ]
   }

   Handy inside `text`:  <p>..</p> paragraphs, <em>..</em>, <strong>..</strong>,
   <hr> divider, and <span class="redacted">████</span> for a redacted bar.
   ===================================================================== */

window.MOKI_ENTRIES = [

  {
    id: "MOKI-0005",
    title: "APERTURE DAEMON",
    date: "2026-07-15",
    tags: ["software", "tool", "python"],
    images: ["assets/images/placeholder-01.svg"],
    text: `
      <p>A small background process that watches a directory and quietly
      re-encodes anything dropped into it. Written in an afternoon, still
      running eight months later. Nobody remembers starting it.</p>
      <p>Configuration lives in a single file. The daemon logs in a dialect
      of English that drifts slightly more archaic with each release. This is
      <em>not</em> a documented feature.</p>
    `,
    audio: null,
    links: [
      { label: "Source repository", url: "https://github.com/amojovic" },
      { label: "Notes & changelog", url: "https://github.com/amojovic" }
    ]
  },

  {
    id: "MOKI-0004",
    title: "SIGNAL BLEED (LOOP 3)",
    date: "2026-07-11",
    tags: ["music", "audio", "experiment"],
    images: ["assets/images/placeholder-02.svg"],
    text: `
      <p>Two minutes of a tone that was supposed to be a placeholder. It was
      never replaced. Best played once, quietly, and then not thought about.</p>
    `,
    audio: "assets/audio/specimen-audio.wav",
    links: [
      { label: "Full set (external)", url: "https://github.com/amojovic" }
    ]
  },

  {
    id: "MOKI-0003",
    title: "STATIC GARDENS",
    date: "2026-07-06",
    tags: ["image", "art", "generative"],
    images: [
      "assets/images/placeholder-03.svg",
      "assets/images/placeholder-04.svg",
      "assets/images/placeholder-05.svg"
    ],
    text: `
      <p>Three frames from a longer sequence. Each was grown from the same seed
      and left to run until it stopped changing on its own.</p>
      <p>Use the arrows to page through the plates. Click any plate to enlarge.</p>
    `,
    audio: null,
    links: [
      { label: "High-resolution plates", url: "https://github.com/amojovic" }
    ]
  },

  {
    id: "MOKI-0002",
    title: "THE CARTOGRAPHER WHO RAN OUT OF EDGES",
    date: "2026-06-28",
    tags: ["story", "writing", "fiction"],
    images: [],
    text: `
      <p>They gave her the last unmapped province and a box of good pens. The
      province was small. The pens were many. She was told to take her time,
      and she took all of it.</p>
      <p>By spring she had drawn every river twice — once as it was, once as it
      wished to be. By summer she was mapping the spaces <em>between</em> the
      rivers, which no one had thought to name, and which turned out to be more
      numerous than the rivers themselves.</p>
      <p>The trouble began when she reached the border. A map, she had always
      believed, should end where the land ends. But the land did not end so
      much as <strong>forget to continue</strong>, and there is no cartographic
      convention for that. She drew the edge. Then she drew past it, lightly, to
      see what would happen.</p>
      <p>What happened was that the paper kept accepting ink.</p>
      <hr>
      <p>This entry is deliberately long so you can see how the description box
      scrolls on its own without pushing the rest of the record around. Some
      specimens will run longer than this; set <em>textHeight</em> to make a box
      taller when a piece deserves the room.</p>
    `,
    audio: null,
    links: [
      { label: "Read the full piece", url: "https://github.com/amojovic" }
    ]
  },

  {
    id: "MOKI-0001",
    title: "UNTITLED PREMISE 0001",
    date: "2026-06-20",
    tags: ["idea", "misc"],
    images: [],
    text: `
      <p>A sparse record, kept as-is. What if a place could only be photographed
      by someone who had never been told its name?</p>
      <p><span class="redacted">████████████████</span> — unresolved.</p>
    `,
    audio: null,
    links: []
  }

];
