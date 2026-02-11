document.addEventListener("DOMContentLoaded", function () {
  const navbar = document.querySelector(".navbar");
  const backToTop = document.getElementById("backToTop");
  const yearSpan = document.getElementById("currentYear");

  /* Navbar shadow on scroll */
  window.addEventListener("scroll", () => {
    if (window.scrollY > 60) {
      navbar.classList.add("navbar-scrolled");
    } else {
      navbar.classList.remove("navbar-scrolled");
    }

    if (backToTop) {
      if (window.scrollY > 350) {
        backToTop.classList.add("show");
      } else {
        backToTop.classList.remove("show");
      }
    }
  });

  /* Smooth scrolling */
  const scrollLinks = document.querySelectorAll(
    'a.nav-link[href^="#"], .scroll-link[href^="#"]'
  );
  const navHeight = navbar ? navbar.offsetHeight : 0;

  scrollLinks.forEach((link) => {
    link.addEventListener("click", function (e) {
      const targetId = this.getAttribute("href");
      if (targetId && targetId.startsWith("#") && targetId.length > 1) {
        const targetEl = document.querySelector(targetId);
        if (targetEl) {
          e.preventDefault();
          const rect = targetEl.getBoundingClientRect();
          const offsetTop = rect.top + window.pageYOffset - (navHeight + 10);
          window.scrollTo({
            top: offsetTop,
            behavior: "smooth",
          });
        }
      }
    });
  });

  /* Back to top click */
  if (backToTop) {
    backToTop.addEventListener("click", function (e) {
      e.preventDefault();
      window.scrollTo({
        top: 0,
        behavior: "smooth",
      });
    });
  }

  /* Intersection Observer for reveal animations */
  const revealElements = document.querySelectorAll(".reveal");
  if ("IntersectionObserver" in window && revealElements.length) {
    const revealObserver = new IntersectionObserver(
      (entries, observer) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("reveal-visible");
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.2 }
    );

    revealElements.forEach((el) => revealObserver.observe(el));
  } else {
    // Fallback: show all
    revealElements.forEach((el) => el.classList.add("reveal-visible"));
  }

  /* Gallery modal */
  const galleryModal = document.getElementById("galleryModal");
  if (galleryModal) {
    const modalImg = galleryModal.querySelector("img");
    const modalCaption = galleryModal.querySelector(".modal-caption");

    document.querySelectorAll(".gallery-item").forEach((imgEl) => {
      imgEl.addEventListener("click", function () {
        const src = this.getAttribute("src");
        const alt = this.getAttribute("alt") || "Gallery Image";
        if (src && modalImg) {
          modalImg.setAttribute("src", src);
          modalImg.setAttribute("alt", alt);
        }
        if (modalCaption) {
          modalCaption.textContent = alt;
        }
        const modal = new bootstrap.Modal(galleryModal);
        modal.show();
      });
    });
  }

  /* Simple counter animation (optional, light) */
  const counters = document.querySelectorAll(".counter-value");
  if ("IntersectionObserver" in window && counters.length) {
    const counterObserver = new IntersectionObserver(
      (entries, observer) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const el = entry.target;
            const target = parseInt(el.getAttribute("data-count") || "0", 10);
            animateCounter(el, target);
            observer.unobserve(el);
          }
        });
      },
      { threshold: 0.5 }
    );

    counters.forEach((c) => counterObserver.observe(c));
  }

  function animateCounter(el, target) {
    const duration = 1200;
    const start = 0;
    const startTime = performance.now();

    function update(now) {
      const progress = Math.min((now - startTime) / duration, 1);
      const value = Math.floor(start + (target - start) * progress);

      if (target >= 1000) {
        // Simple formatting like 10,000
        el.textContent = value.toLocaleString("en-IN");
      } else {
        el.textContent = value;
      }

      if (progress < 1) {
        requestAnimationFrame(update);
      }
    }

    requestAnimationFrame(update);
  }

  /* Current year in footer */
  if (yearSpan) {
    yearSpan.textContent = new Date().getFullYear();
  }
});
