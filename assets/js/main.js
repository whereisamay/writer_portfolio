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

  // Back to top
  var backToTop = document.getElementById("backToTop");
  if (backToTop) {
    backToTop.addEventListener("click", function (e) {
      e.preventDefault();
      window.scrollTo({ top: 0, behavior: "smooth" });
    });
  }

  // FAQ accordion (exclusive - opening one closes the rest)
  var faqButtons = document.querySelectorAll(".faq-question");
  faqButtons.forEach(function (btn) {
    btn.addEventListener("click", function () {
      var item = btn.closest(".faq-item");
      var open = btn.getAttribute("aria-expanded") === "true";

      faqButtons.forEach(function (otherBtn) {
        otherBtn.setAttribute("aria-expanded", "false");
        otherBtn.closest(".faq-item").classList.remove("is-open");
      });

      if (!open) {
        btn.setAttribute("aria-expanded", "true");
        item.classList.add("is-open");
      }
    });
  });

  // Photo carousels (swipeable, scroll-snap based)
  document.querySelectorAll(".photo-carousel").forEach(function (root) {
    var track = root.querySelector(".photo-carousel-track");
    var prevBtn = root.querySelector(".photo-carousel-prev");
    var nextBtn = root.querySelector(".photo-carousel-next");
    var dotsWrap = root.querySelector(".photo-carousel-dots");
    if (!track || !prevBtn || !nextBtn || !dotsWrap) return;

    var slides = Array.prototype.slice.call(track.children);
    var current = 0;

    slides.forEach(function (slide, i) {
      var dot = document.createElement("button");
      dot.setAttribute("aria-label", "Go to photo " + (i + 1));
      dot.addEventListener("click", function () { goTo(i); });
      dotsWrap.appendChild(dot);
    });
    var dots = Array.prototype.slice.call(dotsWrap.children);

    // The real distance between slides, not just one slide's own width -
    // .photo-carousel-slide is a <figure>, which browsers give a default
    // horizontal margin, so the gap between slide starts is wider than the
    // slide itself unless measured this way.
    function slideStep() {
      if (slides.length < 2) return slides[0].getBoundingClientRect().width;
      return slides[1].getBoundingClientRect().left - slides[0].getBoundingClientRect().left;
    }

    // Update the active dot / disabled state right away, driven by the
    // clicked-toward index rather than waiting on the scroll animation to
    // settle - keeps rapid clicks feeling immediate instead of laggy.
    function updateUI() {
      dots.forEach(function (d, di) { d.classList.toggle("is-active", di === current); });
      prevBtn.disabled = current <= 0;
      nextBtn.disabled = current >= slides.length - 1;
    }

    function goTo(i) {
      current = Math.max(0, Math.min(slides.length - 1, i));
      track.scrollTo({ left: current * slideStep(), behavior: "smooth" });
      updateUI();
    }

    prevBtn.addEventListener("click", function () { goTo(current - 1); });
    nextBtn.addEventListener("click", function () { goTo(current + 1); });

    track.addEventListener("keydown", function (e) {
      if (e.key === "ArrowRight") { goTo(current + 1); }
      if (e.key === "ArrowLeft") { goTo(current - 1); }
    });

    // Keep state in sync with manual swipe/touch drags, once scrolling settles.
    var scrollTimer;
    track.addEventListener("scroll", function () {
      clearTimeout(scrollTimer);
      scrollTimer = setTimeout(function () {
        current = Math.max(0, Math.min(slides.length - 1, Math.round(track.scrollLeft / slideStep())));
        updateUI();
      }, 80);
    });

    window.addEventListener("resize", function () {
      track.scrollTo({ left: current * slideStep(), behavior: "auto" });
    });

    updateUI();
  });
})();
