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

    slides.forEach(function (slide, i) {
      var dot = document.createElement("button");
      dot.setAttribute("aria-label", "Go to photo " + (i + 1));
      dot.addEventListener("click", function () { scrollToSlide(i); });
      dotsWrap.appendChild(dot);
    });
    var dots = Array.prototype.slice.call(dotsWrap.children);

    function slideStep() {
      return slides[0].getBoundingClientRect().width;
    }

    function scrollToSlide(i) {
      track.scrollTo({ left: i * slideStep(), behavior: "smooth" });
    }

    function currentIndex() {
      return Math.round(track.scrollLeft / slideStep());
    }

    function updateUI() {
      var i = Math.max(0, Math.min(slides.length - 1, currentIndex()));
      dots.forEach(function (d, di) { d.classList.toggle("is-active", di === i); });
      prevBtn.disabled = track.scrollLeft <= 4;
      nextBtn.disabled = track.scrollLeft >= track.scrollWidth - track.clientWidth - 4;
    }

    prevBtn.addEventListener("click", function () { scrollToSlide(Math.max(0, currentIndex() - 1)); });
    nextBtn.addEventListener("click", function () { scrollToSlide(Math.min(slides.length - 1, currentIndex() + 1)); });

    track.addEventListener("keydown", function (e) {
      if (e.key === "ArrowRight") { scrollToSlide(Math.min(slides.length - 1, currentIndex() + 1)); }
      if (e.key === "ArrowLeft") { scrollToSlide(Math.max(0, currentIndex() - 1)); }
    });

    var scrollTimer;
    track.addEventListener("scroll", function () {
      clearTimeout(scrollTimer);
      scrollTimer = setTimeout(updateUI, 60);
    });

    window.addEventListener("resize", updateUI);
    updateUI();
  });
})();
