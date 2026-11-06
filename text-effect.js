var textEffectMotionPreference = window.matchMedia("(prefers-reduced-motion: reduce)");

if (!textEffectMotionPreference.matches) {
  var textEffectHeadings = document.querySelectorAll("[data-text-effect]");

  if ("IntersectionObserver" in window) {
    var textEffectObserver = new IntersectionObserver(function (entries, observer) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          entry.target.classList.add("is-text-visible");
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.2 });
  }

  textEffectHeadings.forEach(function (heading) {
    var accessibleCopy = heading.cloneNode(true);
    accessibleCopy.querySelectorAll("br").forEach(function (lineBreak) {
      lineBreak.replaceWith(" ");
    });
    var accessibleText = accessibleCopy.textContent.replace(/\s+/g, " ").trim();
    var delay = Number(heading.dataset.textEffectDelay || 0);
    if (!Number.isFinite(delay) || delay < 0) delay = 0;
    var characterIndex = 0;
    var walker = document.createTreeWalker(heading, NodeFilter.SHOW_TEXT);
    var textNodes = [];

    while (walker.nextNode()) {
      textNodes.push(walker.currentNode);
    }

    textNodes.forEach(function (textNode) {
      var fragment = document.createDocumentFragment();

      Array.from(textNode.nodeValue).forEach(function (character) {
        var span = document.createElement("span");
        span.className = "text-effect-char";
        span.setAttribute("aria-hidden", "true");
        span.style.setProperty("--char-delay", (delay + characterIndex++ * 0.035) + "s");
        span.textContent = character;
        fragment.appendChild(span);
      });

      textNode.parentNode.replaceChild(fragment, textNode);
    });
    heading.setAttribute("aria-label", accessibleText);
    heading.classList.add("text-effect-ready");

    var bounds = heading.getBoundingClientRect();
    if (bounds.top < window.innerHeight && bounds.bottom > 0) {
      heading.classList.add("is-text-visible");
    } else if (textEffectObserver) {
      textEffectObserver.observe(heading);
    } else {
      heading.classList.add("is-text-visible");
    }
  });
}
