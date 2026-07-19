/* =====================================================================
   THE MOKI ARCHIVE  —  DATA FILE
   ---------------------------------------------------------------------
   This is the only file you edit to add or change catalogue entries.
   Add new entries to the TOP of the list (newest first). The site also
   sorts by `date` so ordering is safe either way.

   ENTRY SCHEMA
   ------------
   {
     id:     "MOKI-0002",              // catalogue number (your choice)
     title:  "Name of the entry",
     date:   "2026-07-19",             // YYYY-MM-DD, drives newest-first sort
     tags:   ["game", "software"],     // any strings; filters build from these
     images: ["assets/images/x.png"],  // 0, 1, or many (carousel + click to zoom)
     text:   `<p>HTML is allowed here.</p>`,   // description; scrolls in its box
     textHeight: "tall",               // OPTIONAL: "tall" or "full" for big ones
     audio:  "assets/audio/x.wav",     // OPTIONAL: shows an audio player
     links:  [                         // OPTIONAL: buttons in the material column
       { label: "Play in browser", url: "https://amojovic.github.io/x/" }
     ]
   }

   Handy inside `text`:  <p>..</p>, <em>..</em>, <strong>..</strong>,
   <code>..</code>, <ul><li>..</li></ul>, <hr>, and
   <span class="redacted">████</span> for a redacted bar.
   ===================================================================== */

window.MOKI_ENTRIES = [

  {
    id: "MOKI-0001",
    title: "DFA BUILDER",
    date: "2026-07-19",
    tags: ["game", "software"],
    images: [
      "assets/images/dfa-builder-01.png",
      "assets/images/dfa-builder-02.png"
    ],
    text: `
      <p>A <strong>deterministic finite automaton</strong> (DFA) is one of the
      simplest kinds of computing machine. It has a handful of <em>states</em> and
      reads a string one symbol at a time, following a labelled arrow from state to
      state. Each state has exactly one arrow per possible symbol — that is the
      "deterministic" part; there is never a choice to make. When the string runs
      out, the machine <em>accepts</em> it if it ended in a state marked as final,
      and rejects it otherwise.</p>

      <p>That simple rule is enough to recognise whole families of strings —
      "everything ending in <code>01</code>", "everything with an even number of
      <code>1</code>s", and so on.</p>

      <p>So this is a game based on it: you are given a language to recognise, and
      you build the automaton that accepts exactly that language. The how-to-play
      lives inside the game itself.</p>
    `,
    audio: null,
    links: [
      { label: "Play in browser", url: "https://amojovic.github.io/dfa-builder/" },
      { label: "Source repository", url: "https://github.com/amojovic/dfa-builder" }
    ]
  }

];
