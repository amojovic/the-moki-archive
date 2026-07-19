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
    images: [],
    text: `
      <p>A browser puzzle game about <strong>deterministic finite automata</strong>.
      You are handed a description of a <em>language</em> — a set of strings, such as
      <code>"binary strings ending in 01"</code> or <code>"strings divisible by 3"</code> —
      and your job is to build a machine on the canvas that accepts <em>exactly</em>
      that language and nothing else.</p>

      <p>An automaton reads a string one symbol at a time, moving between states along
      labelled arrows. If it finishes in a <em>final</em> state, the string is accepted.
      Tasks are generated at random from a library of templates, so the well never
      quite runs dry.</p>

      <p><strong>How to play</strong></p>
      <ul>
        <li><strong>Right-click</strong> empty space to place a state (S0, S1, S2…).</li>
        <li><strong>Right-click a state</strong> to give it a role — start (green),
            final (blue double-ring), or a dead trap (red).</li>
        <li><strong>Left-click and drag</strong> to move states around; hold the
            <strong>middle mouse</strong> to pan, <strong>wheel</strong> to zoom.</li>
        <li>Pick a symbol in the sidebar, click the source state, then the target
            state, to draw a labelled transition. Self-loops are allowed.</li>
        <li>Every non-dead state needs an outgoing arrow for <em>every</em> symbol —
            that's the rule that makes it deterministic.</li>
      </ul>

      <p>The status indicator flips from a red <em>✗ not complete</em> to a green
      <em>✓ complete</em> the moment your automaton passes verification. Skip a task
      if it stumps you. Built as pure static files — no accounts, no loading screens,
      it just runs.</p>
    `,
    textHeight: "tall",
    audio: null,
    links: [
      { label: "Play in browser", url: "https://amojovic.github.io/dfa-builder/" },
      { label: "Source repository", url: "https://github.com/amojovic/dfa-builder" }
    ]
  }

];
