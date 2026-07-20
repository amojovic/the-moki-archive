/* =====================================================================
   THE MOKI ARCHIVE  —  application logic
   Renders entries, builds tag filters, drives the carousel and lightbox.
   Vanilla JS, no dependencies. Reads window.MOKI_ENTRIES from entries.js.
   ===================================================================== */
(function () {
  "use strict";

  var DATA = (window.MOKI_ENTRIES || []).slice();

  // Newest first: sort by date (YYYY-MM-DD) descending.
  DATA.sort(function (a, b) {
    return String(b.date || "").localeCompare(String(a.date || ""));
  });

  var activeTags = new Set();

  // --- helpers ---------------------------------------------------------
  function esc(s) {
    return String(s == null ? "" : s)
      .replace(/&/g, "&amp;")
      .replace(/</g, "&lt;")
      .replace(/>/g, "&gt;")
      .replace(/"/g, "&quot;");
  }

  function el(html) {
    var t = document.createElement("template");
    t.innerHTML = html.trim();
    return t.content.firstElementChild;
  }

  // --- rendering: one entry -------------------------------------------
  function tagsMarkup(tags) {
    if (!tags || !tags.length) {
      return '<span class="no-material">unclassified</span>';
    }
    return tags
      .map(function (t) {
        return '<button class="entry-tag" type="button" data-tag="' + esc(t) + '">' + esc(t) + "</button>";
      })
      .join("");
  }

  function imageMarkup(entry) {
    var images = entry.images || [];
    if (!images.length) {
      return '<div class="no-image">no visual on record</div>';
    }
    var slides = images
      .map(function (src, i) {
        return (
          '<div class="carousel-slide' + (i === 0 ? " active" : "") + '">' +
          '<img src="' + esc(src) + '" loading="lazy" decoding="async" alt="' + esc(entry.title) + " — plate " + (i + 1) +
          '" data-index="' + i + '"></div>'
        );
      })
      .join("");

    var controls =
      images.length > 1
        ? '<button class="carousel-btn prev" type="button" aria-label="Previous image">❮</button>' +
          '<button class="carousel-btn next" type="button" aria-label="Next image">❯</button>' +
          '<div class="carousel-counter">1 / ' + images.length + "</div>"
        : "";

    return (
      '<div class="carousel" data-index="0">' +
      '<div class="carousel-viewport"><div class="carousel-track">' +
      slides +
      "</div>" +
      controls +
      "</div></div>"
    );
  }

  function materialMarkup(entry) {
    var m = "";
    if (entry.audio) {
      m +=
        '<div class="material-audio"><div class="audio-caption">AUDIO FILE</div>' +
        '<audio controls preload="none" src="' + esc(entry.audio) + '"></audio></div>';
    }
    if (entry.links && entry.links.length) {
      m +=
        '<ul class="material-links">' +
        entry.links
          .map(function (l) {
            return (
              '<li><a href="' + esc(l.url) + '" target="_blank" rel="noopener noreferrer">' +
              esc(l.label) + "</a></li>"
            );
          })
          .join("") +
        "</ul>";
    }
    if (!m) {
      m = '<span class="no-material">no material on record</span>';
    }
    return m;
  }

  function renderEntry(entry) {
    var textClass = "entry-text" + (entry.textHeight ? " " + entry.textHeight : "");
    var node = el(
      '<article class="entry">' +
        '<div class="entry-header">' +
          '<h3 class="entry-title">' + esc(entry.title) + "</h3>" +
          '<div class="entry-meta"><span class="entry-id">' + esc(entry.id || "") + "</span>" +
          '<span class="entry-date">' + esc(entry.date || "") + "</span></div>" +
        "</div>" +
        '<div class="entry-body">' +
          '<div class="field field-tags"><p class="field-label">Tags</p>' +
            '<div class="entry-tags">' + tagsMarkup(entry.tags) + "</div></div>" +
          '<div class="field field-image"><p class="field-label">Visual</p>' +
            imageMarkup(entry) + "</div>" +
          '<div class="field field-text"><p class="field-label">Description</p>' +
            '<div class="' + textClass + '">' + (entry.text || "") + "</div></div>" +
          '<div class="field field-material"><p class="field-label">Material</p>' +
            materialMarkup(entry) + "</div>" +
        "</div>" +
      "</article>"
    );
    node.dataset.tags = (entry.tags || []).join("|");
    return node;
  }

  // --- rendering: sidebar tag filters ---------------------------------
  function renderFilters() {
    var counts = {};
    DATA.forEach(function (e) {
      (e.tags || []).forEach(function (t) {
        counts[t] = (counts[t] || 0) + 1;
      });
    });
    var tags = Object.keys(counts).sort();
    var container = document.getElementById("tag-filters");
    if (!tags.length) {
      container.innerHTML = '<span class="no-material">no tags yet</span>';
      return;
    }
    container.innerHTML = tags
      .map(function (t) {
        return (
          '<button class="tag-chip" type="button" data-tag="' + esc(t) + '">' +
          esc(t) + ' <span class="tag-count">' + counts[t] + "</span></button>"
        );
      })
      .join("");
  }

  // --- filtering -------------------------------------------------------
  function applyFilter() {
    var entryEls = document.querySelectorAll(".entry");
    var shown = 0;
    entryEls.forEach(function (node) {
      var tags = node.dataset.tags ? node.dataset.tags.split("|") : [];
      var show =
        activeTags.size === 0 ||
        tags.some(function (t) {
          return activeTags.has(t);
        });
      node.classList.toggle("hidden", !show);
      if (show) shown++;
    });

    // reflect active state on sidebar chips
    document.querySelectorAll(".tag-chip").forEach(function (chip) {
      chip.classList.toggle("active", activeTags.has(chip.dataset.tag));
    });

    document.getElementById("entry-count").textContent = shown + " / " + DATA.length;
  }

  function toggleTag(tag) {
    if (activeTags.has(tag)) activeTags.delete(tag);
    else activeTags.add(tag);
    applyFilter();
  }

  // --- carousel --------------------------------------------------------
  function carouselGo(carousel, dir) {
    var slides = carousel.querySelectorAll(".carousel-slide");
    if (slides.length < 2) return;
    var idx = parseInt(carousel.dataset.index || "0", 10);
    slides[idx].classList.remove("active");
    idx = (idx + dir + slides.length) % slides.length;
    slides[idx].classList.add("active");
    carousel.dataset.index = idx;
    var counter = carousel.querySelector(".carousel-counter");
    if (counter) counter.textContent = idx + 1 + " / " + slides.length;
  }

  // --- lightbox --------------------------------------------------------
  var lightbox = document.getElementById("lightbox");
  var lightboxImg = document.getElementById("lightbox-img");
  var lightboxCounter = document.getElementById("lightbox-counter");
  var lbImages = [];
  var lbIndex = 0;

  function renderLightbox() {
    lightboxImg.src = lbImages[lbIndex] || "";
    var multi = lbImages.length > 1;
    lightboxCounter.textContent = multi ? lbIndex + 1 + " / " + lbImages.length : "";
    lightbox.querySelector(".lightbox-prev").style.display = multi ? "" : "none";
    lightbox.querySelector(".lightbox-next").style.display = multi ? "" : "none";
  }

  function openLightbox(images, index) {
    lbImages = images;
    lbIndex = index;
    renderLightbox();
    lightbox.classList.remove("hidden");
    lightbox.setAttribute("aria-hidden", "false");
  }

  function closeLightbox() {
    lightbox.classList.add("hidden");
    lightbox.setAttribute("aria-hidden", "true");
    lightboxImg.src = "";
  }

  function lightboxGo(dir) {
    if (lbImages.length < 2) return;
    lbIndex = (lbIndex + dir + lbImages.length) % lbImages.length;
    renderLightbox();
  }

  // --- wiring ----------------------------------------------------------
  function init() {
    var entriesRoot = document.getElementById("entries");

    if (!DATA.length) {
      entriesRoot.innerHTML = '<div class="entries-empty">No entries catalogued yet.</div>';
    } else {
      DATA.forEach(function (entry) {
        entriesRoot.appendChild(renderEntry(entry));
      });
    }

    renderFilters();
    applyFilter();

    // sidebar filter clicks
    document.getElementById("tag-filters").addEventListener("click", function (ev) {
      var chip = ev.target.closest(".tag-chip");
      if (chip) toggleTag(chip.dataset.tag);
    });
    document.getElementById("clear-filters").addEventListener("click", function () {
      activeTags.clear();
      applyFilter();
    });

    // delegated clicks inside the catalogue
    entriesRoot.addEventListener("click", function (ev) {
      var tagBtn = ev.target.closest(".entry-tag");
      if (tagBtn) {
        toggleTag(tagBtn.dataset.tag);
        return;
      }
      var navBtn = ev.target.closest(".carousel-btn");
      if (navBtn) {
        var carousel = navBtn.closest(".carousel");
        carouselGo(carousel, navBtn.classList.contains("next") ? 1 : -1);
        return;
      }
      var img = ev.target.closest(".carousel-slide img");
      if (img) {
        var c = img.closest(".carousel");
        var imgs = Array.prototype.map.call(
          c.querySelectorAll(".carousel-slide img"),
          function (n) {
            return n.getAttribute("src");
          }
        );
        openLightbox(imgs, parseInt(img.dataset.index || "0", 10));
      }
    });

    // lightbox controls
    lightbox.querySelector(".lightbox-close").addEventListener("click", closeLightbox);
    lightbox.querySelector(".lightbox-prev").addEventListener("click", function () {
      lightboxGo(-1);
    });
    lightbox.querySelector(".lightbox-next").addEventListener("click", function () {
      lightboxGo(1);
    });
    lightbox.addEventListener("click", function (ev) {
      if (ev.target === lightbox) closeLightbox();
    });

    // keyboard: lightbox navigation
    document.addEventListener("keydown", function (ev) {
      if (lightbox.classList.contains("hidden")) return;
      if (ev.key === "Escape") closeLightbox();
      else if (ev.key === "ArrowLeft") lightboxGo(-1);
      else if (ev.key === "ArrowRight") lightboxGo(1);
    });
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", init);
  } else {
    init();
  }
})();
