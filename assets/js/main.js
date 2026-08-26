(function () {
  "use strict";

  // Footer year
  var yearEl = document.getElementById("year");
  if (yearEl) yearEl.textContent = new Date().getFullYear();

  // Mobile nav toggle
  var navToggle = document.getElementById("navToggle");
  var header = document.querySelector(".site-header");
  if (navToggle && header) {
    navToggle.addEventListener("click", function () {
      var expanded = navToggle.getAttribute("aria-expanded") === "true";
      navToggle.setAttribute("aria-expanded", String(!expanded));
      header.classList.toggle("nav-open", !expanded);
    });

    header.querySelectorAll(".main-nav a").forEach(function (link) {
      link.addEventListener("click", function () {
        navToggle.setAttribute("aria-expanded", "false");
        header.classList.remove("nav-open");
      });
    });
  }

  // Scroll-reveal
  var revealEls = document.querySelectorAll(".reveal");
  if ("IntersectionObserver" in window && revealEls.length) {
    var observer = new IntersectionObserver(
      function (entries) {
        entries.forEach(function (entry) {
          if (entry.isIntersecting) {
            entry.target.classList.add("is-visible");
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.15, rootMargin: "0px 0px -40px 0px" }
    );
    revealEls.forEach(function (el) { observer.observe(el); });
  } else {
    revealEls.forEach(function (el) { el.classList.add("is-visible"); });
  }

  // Carousel
  var track = document.getElementById("carouselTrack");
  var prevBtn = document.getElementById("carouselPrev");
  var nextBtn = document.getElementById("carouselNext");
  var dotsWrap = document.getElementById("carouselDots");

  if (track && prevBtn && nextBtn && dotsWrap) {
    var cards = Array.prototype.slice.call(track.children);

    cards.forEach(function (card, i) {
      var dot = document.createElement("button");
      dot.setAttribute("aria-label", "Go to item " + (i + 1));
      dot.addEventListener("click", function () { scrollToCard(i); });
      dotsWrap.appendChild(dot);
    });
    var dots = Array.prototype.slice.call(dotsWrap.children);

    function cardStep() {
      var card = cards[0];
      var style = window.getComputedStyle(track);
      var gap = parseFloat(style.columnGap || style.gap || 24);
      return card.getBoundingClientRect().width + gap;
    }

    function scrollToCard(i) {
      track.scrollTo({ left: i * cardStep(), behavior: "smooth" });
    }

    function currentIndex() {
      return Math.round(track.scrollLeft / cardStep());
    }

    function updateUI() {
      var i = Math.max(0, Math.min(cards.length - 1, currentIndex()));
      dots.forEach(function (d, di) { d.classList.toggle("is-active", di === i); });
      prevBtn.disabled = track.scrollLeft <= 4;
      nextBtn.disabled = track.scrollLeft >= track.scrollWidth - track.clientWidth - 4;
    }

    prevBtn.addEventListener("click", function () { scrollToCard(Math.max(0, currentIndex() - 1)); });
    nextBtn.addEventListener("click", function () { scrollToCard(Math.min(cards.length - 1, currentIndex() + 1)); });

    track.addEventListener("keydown", function (e) {
      if (e.key === "ArrowRight") { scrollToCard(Math.min(cards.length - 1, currentIndex() + 1)); }
      if (e.key === "ArrowLeft") { scrollToCard(Math.max(0, currentIndex() - 1)); }
    });

    var scrollTimer;
    track.addEventListener("scroll", function () {
      clearTimeout(scrollTimer);
      scrollTimer = setTimeout(updateUI, 60);
    });

    window.addEventListener("resize", updateUI);
    updateUI();
  }
})();
