(function () {
  "use strict";

  var STORAGE_KEY = "portfolio-lang";
  var DEFAULT_LANG = "en";

  function getLang() {
    try {
      var saved = localStorage.getItem(STORAGE_KEY);
      return saved === "id" || saved === "en" ? saved : DEFAULT_LANG;
    } catch (e) {
      return DEFAULT_LANG;
    }
  }

  function setLang(lang) {
    try {
      localStorage.setItem(STORAGE_KEY, lang);
    } catch (e) {}
  }

  function applyTranslations(lang) {
    var t = window.PORTFOLIO_I18N && window.PORTFOLIO_I18N[lang];
    if (!t) return;

    document.documentElement.lang = lang === "id" ? "id" : "en";

    document.querySelectorAll("[data-i18n]").forEach(function (el) {
      var key = el.getAttribute("data-i18n");
      if (t[key] !== undefined) el.textContent = t[key];
    });

    document.querySelectorAll("[data-i18n-list]").forEach(function (ul) {
      var key = ul.getAttribute("data-i18n-list");
      var list = t[key];
      if (!Array.isArray(list)) return;
      ul.innerHTML = "";
      list.forEach(function (text) {
        var li = document.createElement("li");
        li.textContent = text;
        ul.appendChild(li);
      });
    });

    document.querySelectorAll(".lang-btn").forEach(function (btn) {
      var isActive = btn.getAttribute("data-lang") === lang;
      btn.classList.toggle("active", isActive);
      btn.setAttribute("aria-pressed", isActive);
    });
  }

  function initLang() {
    var lang = getLang();
    applyTranslations(lang);
  }

  // Year in footer
  var yearEl = document.getElementById("year");
  if (yearEl) yearEl.textContent = new Date().getFullYear();

  // Language switcher
  document.querySelectorAll(".lang-btn").forEach(function (btn) {
    btn.addEventListener("click", function () {
      var lang = this.getAttribute("data-lang");
      setLang(lang);
      applyTranslations(lang);
    });
  });

  initLang();

  // Sidebar toggle (mobile)
  var menuToggle = document.querySelector(".menu-toggle");
  var sidebarLinks = document.querySelectorAll(".sidebar-link");

  if (menuToggle) {
    menuToggle.addEventListener("click", function () {
      document.body.classList.toggle("sidebar-open");
      menuToggle.setAttribute(
        "aria-expanded",
        document.body.classList.contains("sidebar-open"),
      );
    });
  }

  sidebarLinks.forEach(function (link) {
    link.addEventListener("click", function () {
      if (window.innerWidth <= 900)
        document.body.classList.remove("sidebar-open");
    });
  });

  var overlay = document.querySelector(".sidebar-overlay");
  if (overlay) {
    overlay.addEventListener("click", function () {
      document.body.classList.remove("sidebar-open");
    });
  }

  // Nav highlight on scroll
  var sections = document.querySelectorAll("section[id]");
  var navLinks = document.querySelectorAll(".sidebar-link");

  function highlightNav() {
    var scrollY = window.pageYOffset;
    sections.forEach(function (section) {
      var id = section.getAttribute("id");
      var top = section.offsetTop - 120;
      var height = section.offsetHeight;
      if (scrollY >= top && scrollY < top + height) {
        navLinks.forEach(function (a) {
          a.classList.remove("active");
          if (a.getAttribute("href") === "#" + id) a.classList.add("active");
        });
      }
    });
  }

  window.addEventListener("scroll", highlightNav);
  highlightNav();

  // ===== Gallery Slider =====
  function initGallerySliders() {
    const sliders = document.querySelectorAll(".gallery-multi");

    sliders.forEach((slider) => {
      const slides = slider.querySelectorAll(".gallery-slide");
      const dots = slider.querySelectorAll(".dot");
      let currentSlide = 0;
      let autoSlideInterval;

      function showSlide(n) {
        slides.forEach((s) => s.classList.remove("active"));
        dots.forEach((d) => d.classList.remove("active"));

        currentSlide = (n + slides.length) % slides.length;

        slides[currentSlide].classList.add("active");
        dots[currentSlide].classList.add("active");
      }

      function nextSlide() {
        showSlide(currentSlide + 1);
      }

      function startAutoSlide() {
        autoSlideInterval = setInterval(nextSlide, 3500);
      }

      function stopAutoSlide() {
        clearInterval(autoSlideInterval);
      }

      // Dot click handlers
      dots.forEach((dot, index) => {
        dot.addEventListener("click", (e) => {
          e.stopPropagation();
          showSlide(index);
          stopAutoSlide();
          startAutoSlide();
        });
      });

      // Auto-slide on hover
      slider.addEventListener("mouseenter", () => {
        stopAutoSlide();
      });

      slider.addEventListener("mouseleave", () => {
        startAutoSlide();
      });

      // Click to advance
      slider.addEventListener("click", (e) => {
        if (!e.target.closest(".dot")) {
          nextSlide();
          stopAutoSlide();
          startAutoSlide();
        }
      });

      // Start auto-slide
      startAutoSlide();
    });
  }

  // Initialize sliders when DOM is ready
  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", initGallerySliders);
  } else {
    initGallerySliders();
  }

  // ===== Services Slider =====
  function initServicesSlider() {
    const slider = document.querySelector(".services-slider");
    const track = document.querySelector(".services-track");
    const cards = document.querySelectorAll(".service-card");
    const dots = document.querySelectorAll(".slider-dot");
    const prevBtn = document.querySelector(".prev-btn");
    const nextBtn = document.querySelector(".next-btn");

    if (!slider || !track || cards.length === 0) {
      console.log("Services slider elements not found");
      return;
    }

    console.log("Services slider initialized with", cards.length, "cards");

    let currentIndex = 0;
    let autoPlayInterval;
    let isAutoPlaying = true;
    let isDragging = false;
    let startX = 0;
    let currentX = 0;

    function getCardsPerView() {
      return window.innerWidth >= 768 ? 2 : 1;
    }

    function getMaxIndex() {
      const cardsPerView = getCardsPerView();
      return Math.max(0, cards.length - cardsPerView);
    }

    function updateSlider(animated = true) {
      const cardsPerView = getCardsPerView();
      const maxIndex = getMaxIndex();

      // Ensure current index is within bounds
      if (currentIndex > maxIndex) {
        currentIndex = maxIndex;
      }
      if (currentIndex < 0) {
        currentIndex = 0;
      }

      const cardWidth = cards[0].offsetWidth;
      // Get actual gap from computed style
      const trackStyle = window.getComputedStyle(track);
      const gapValue = parseInt(trackStyle.gap) || 16;
      const offset = currentIndex * (cardWidth + gapValue);

      console.log("Updating slider:", {
        currentIndex,
        maxIndex,
        cardWidth,
        gap: gapValue,
        offset,
        cardsPerView,
        totalCards: cards.length,
      });

      // Apply transform
      if (animated) {
        track.style.transition = "transform 0.5s cubic-bezier(0.4, 0, 0.2, 1)";
      } else {
        track.style.transition = "none";
      }
      track.style.transform = `translateX(-${offset}px)`;

      // Update dots - only show relevant dots based on maxIndex + 1
      const totalSlides = maxIndex + 1;
      dots.forEach((dot, index) => {
        if (index < totalSlides) {
          dot.style.display = "block";
          dot.classList.toggle("active", index === currentIndex);
        } else {
          dot.style.display = "none";
        }
      });

      // Update buttons
      if (prevBtn) {
        prevBtn.disabled = currentIndex === 0;
        prevBtn.style.opacity = currentIndex === 0 ? "0.3" : "1";
      }
      if (nextBtn) {
        nextBtn.disabled = currentIndex >= maxIndex;
        nextBtn.style.opacity = currentIndex >= maxIndex ? "0.3" : "1";
      }
    }

    function nextSlide() {
      const maxIndex = getMaxIndex();
      if (currentIndex < maxIndex) {
        currentIndex++;
      } else {
        currentIndex = 0; // Loop to start
      }
      updateSlider();
      resetAutoPlay();
    }

    function prevSlide() {
      const maxIndex = getMaxIndex();
      if (currentIndex > 0) {
        currentIndex--;
      } else {
        currentIndex = maxIndex; // Loop to end
      }
      updateSlider();
      resetAutoPlay();
    }

    function goToSlide(index) {
      const maxIndex = getMaxIndex();
      if (index >= 0 && index <= maxIndex) {
        currentIndex = index;
        updateSlider();
        resetAutoPlay();
      }
    }

    // Auto-play
    function startAutoPlay() {
      if (!isAutoPlaying) return;
      stopAutoPlay();
      autoPlayInterval = setInterval(nextSlide, 5000);
    }

    function stopAutoPlay() {
      if (autoPlayInterval) {
        clearInterval(autoPlayInterval);
        autoPlayInterval = null;
      }
    }

    function resetAutoPlay() {
      if (isAutoPlaying) {
        stopAutoPlay();
        startAutoPlay();
      }
    }

    // Mouse/Touch drag
    function handleDragStart(e) {
      isDragging = true;
      startX = e.type.includes("mouse") ? e.pageX : e.touches[0].clientX;
      slider.style.cursor = "grabbing";
      stopAutoPlay();
      track.style.transition = "none";
    }

    function handleDragMove(e) {
      if (!isDragging) return;
      e.preventDefault();
      currentX = e.type.includes("mouse") ? e.pageX : e.touches[0].clientX;
      const diff = currentX - startX;

      // Show visual feedback while dragging
      const cardWidth = cards[0].offsetWidth;
      const gap = getCardsPerView() === 1 ? 0 : 24;
      const slideWidth = cardWidth + gap;
      const currentOffset = currentIndex * slideWidth;
      track.style.transform = `translateX(-${currentOffset - diff}px)`;
    }

    function handleDragEnd() {
      if (!isDragging) return;
      isDragging = false;
      slider.style.cursor = "grab";

      const diff = currentX - startX;
      const threshold = 50;

      if (diff < -threshold) {
        nextSlide();
      } else if (diff > threshold) {
        prevSlide();
      } else {
        updateSlider();
      }

      resetAutoPlay();
    }

    // Event listeners
    if (prevBtn) {
      prevBtn.addEventListener("click", (e) => {
        e.preventDefault();
        console.log("Prev button clicked");
        prevSlide();
      });
    }

    if (nextBtn) {
      nextBtn.addEventListener("click", (e) => {
        e.preventDefault();
        console.log("Next button clicked");
        nextSlide();
      });
    }

    dots.forEach((dot, index) => {
      dot.addEventListener("click", () => {
        console.log("Dot clicked:", index);
        goToSlide(index);
      });
    });

    // Mouse events
    slider.addEventListener("mousedown", handleDragStart);
    slider.addEventListener("mousemove", handleDragMove);
    slider.addEventListener("mouseup", handleDragEnd);
    slider.addEventListener("mouseleave", handleDragEnd);

    // Touch events
    slider.addEventListener("touchstart", handleDragStart, { passive: false });
    slider.addEventListener("touchmove", handleDragMove, { passive: false });
    slider.addEventListener("touchend", handleDragEnd);

    // Keyboard navigation
    document.addEventListener("keydown", (e) => {
      if (e.key === "ArrowLeft") prevSlide();
      if (e.key === "ArrowRight") nextSlide();
    });

    // Pause on hover
    slider.addEventListener("mouseenter", () => {
      isAutoPlaying = false;
      stopAutoPlay();
    });

    slider.addEventListener("mouseleave", () => {
      isAutoPlaying = true;
      startAutoPlay();
    });

    // Resize handler
    let resizeTimer;
    window.addEventListener("resize", () => {
      clearTimeout(resizeTimer);
      resizeTimer = setTimeout(() => {
        updateSlider(false);
      }, 250);
    });

    // Initialize
    updateSlider(false);
    startAutoPlay();

    console.log("Services slider setup complete");
  }

  // Initialize services slider
  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", initServicesSlider);
  } else {
    initServicesSlider();
  }

  // ===== Contact Form Handler =====
  const contactForm = document.getElementById("contactForm");
  if (contactForm) {
    contactForm.addEventListener("submit", function (e) {
      e.preventDefault();

      const name = document.getElementById("name").value;
      const email = document.getElementById("email").value;
      const subject = document.getElementById("subject").value;
      const message = document.getElementById("message").value;

      // You can integrate with your backend API here
      // For now, we'll create a mailto link as fallback
      const mailtoLink = `mailto:snugroho211@gmail.com?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(`Name: ${name}\nEmail: ${email}\n\nMessage:\n${message}`)}`;

      window.location.href = mailtoLink;

      // Reset form
      contactForm.reset();
    });
  }

  // ===== Back to Top Button =====
  const backToTop = document.querySelector(".back-to-top");
  if (backToTop) {
    function toggleBackToTop() {
      if (window.scrollY > 300) {
        backToTop.classList.add("show");
      } else {
        backToTop.classList.remove("show");
      }
    }

    window.addEventListener("scroll", toggleBackToTop);
    toggleBackToTop();

    backToTop.addEventListener("click", function () {
      window.scrollTo({
        top: 0,
        behavior: "smooth",
      });
    });
  }

  // ===== Scroll Reveal Animations =====
  const observerOptions = {
    threshold: 0.1,
    rootMargin: "0px 0px -50px 0px",
  };

  const observer = new IntersectionObserver(function (entries) {
    entries.forEach(function (entry) {
      if (entry.isIntersecting) {
        entry.target.style.opacity = "1";
        entry.target.style.transform = "translateY(0)";
        observer.unobserve(entry.target);
      }
    });
  }, observerOptions);

  // Observe sections for scroll animations
  document
    .querySelectorAll(".section, .project-card, .service-card")
    .forEach(function (el) {
      el.style.opacity = "0";
      el.style.transform = "translateY(20px)";
      el.style.transition = "opacity 0.6s ease, transform 0.6s ease";
      observer.observe(el);
    });
})();
