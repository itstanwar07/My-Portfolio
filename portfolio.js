document.querySelectorAll(".nav-link").forEach(function (link) {
  if (link.pathname === window.location.pathname) {
    link.setAttribute("aria-current", "page");
  }
});

document.querySelectorAll(".skill-item").forEach(function (item) {
  item.setAttribute("data-reveal", "");
});
var staggerItems = document.querySelectorAll("[data-reveal]");
staggerItems.forEach(function (item, index) {
  item.style.setProperty("--reveal-delay", Math.min(index % 5, 4) * 65 + "ms");
});

var prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
if (prefersReducedMotion) {
  staggerItems.forEach(function (item) { item.classList.add("is-visible"); });
} else if ("IntersectionObserver" in window) {
  var revealObserver = new IntersectionObserver(function (entries, observer) {
    entries.forEach(function (entry) {
      if (entry.isIntersecting) {
        entry.target.classList.add("is-visible");
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.12 });
  staggerItems.forEach(function (item) { revealObserver.observe(item); });
} else {
  staggerItems.forEach(function (item) { item.classList.add("is-visible"); });
}

document.querySelectorAll("[data-rotate-text]").forEach(function (item) {
  var phrases = item.dataset.phrases.split("|").map(function (phrase) { return phrase.trim(); });
  var currentIndex = Math.max(0, phrases.indexOf(item.textContent.trim()));

  if (prefersReducedMotion || phrases.length < 2) return;
  item.style.minWidth = Math.max.apply(null, phrases.map(function (phrase) { return phrase.length; })) + "ch";

  window.setInterval(function () {
    var nextIndex = currentIndex;
    while (nextIndex === currentIndex) {
      nextIndex = Math.floor(Math.random() * phrases.length);
    }
    currentIndex = nextIndex;
    item.classList.add("is-changing");
    window.setTimeout(function () {
      item.textContent = phrases[currentIndex];
      item.classList.remove("is-changing");
    }, 190);
  }, 3600);
});

if (!prefersReducedMotion && window.matchMedia("(pointer: fine)").matches) {
  document.querySelectorAll(".project-card, .stack-panel, .contact-form").forEach(function (surface) {
    surface.addEventListener("pointermove", function (event) {
      var bounds = surface.getBoundingClientRect();
      surface.style.setProperty("--pointer-x", event.clientX - bounds.left + "px");
      surface.style.setProperty("--pointer-y", event.clientY - bounds.top + "px");
    });
    surface.addEventListener("pointerleave", function () {
      surface.style.removeProperty("--pointer-x");
      surface.style.removeProperty("--pointer-y");
    });
  });
}

var projectFilters = document.querySelectorAll("[data-filter]");
var projectCards = document.querySelectorAll("[data-category]");
projectFilters.forEach(function (filter) {
  filter.addEventListener("click", function () {
    var category = filter.dataset.filter;
    projectFilters.forEach(function (button) {
      button.setAttribute("aria-pressed", String(button === filter));
    });
    projectCards.forEach(function (card) {
      card.hidden = category !== "all" && card.dataset.category !== category;
    });
  });
});

document.querySelectorAll(".skill-toggle").forEach(function (toggle) {
  toggle.addEventListener("click", function () {
    var expanded = toggle.getAttribute("aria-expanded") === "true";
    toggle.setAttribute("aria-expanded", String(!expanded));
    document.getElementById(toggle.getAttribute("aria-controls")).hidden = expanded;
    toggle.closest(".skill-item").classList.toggle("is-open", !expanded);
  });
});

var contactForm = document.querySelector(".contact-form");
if (contactForm) {
  contactForm.addEventListener("submit", function (event) {
    event.preventDefault();
    var formData = new FormData(contactForm);
    var subject = encodeURIComponent("Portfolio enquiry from " + formData.get("name"));
    var body = encodeURIComponent(
      "Name: " + formData.get("name") +
      "\nEmail: " + formData.get("email") +
      "\n\n" + formData.get("message")
    );
    document.querySelector(".form-status").textContent = "Opening your email app to send this message.";
    window.location.href = "mailto:tanwarmayur2004@gmail.com?subject=" + subject + "&body=" + body;
  });
}
