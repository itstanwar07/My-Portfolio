var cursorMotionPreference = window.matchMedia("(prefers-reduced-motion: reduce)");
var finePointer = window.matchMedia("(pointer: fine)");

if (finePointer.matches && !cursorMotionPreference.matches) {
  var cursor = document.createElement("div");
  cursor.className = "custom-cursor";
  cursor.setAttribute("aria-hidden", "true");
  cursor.innerHTML = '<span class="custom-cursor__ring"></span><span class="custom-cursor__dot"></span>';
  document.body.appendChild(cursor);
  document.body.classList.add("has-custom-cursor");

  var cursorX = 0;
  var cursorY = 0;
  var targetX = 0;
  var targetY = 0;
  var cursorFrame = 0;
  var pointerStarted = false;

  function moveCursor() {
    cursorX += (targetX - cursorX) * 0.22;
    cursorY += (targetY - cursorY) * 0.22;
    cursor.style.transform = "translate3d(" + cursorX + "px, " + cursorY + "px, 0)";

    if (Math.abs(targetX - cursorX) > 0.1 || Math.abs(targetY - cursorY) > 0.1) {
      cursorFrame = window.requestAnimationFrame(moveCursor);
    } else {
      cursorX = targetX;
      cursorY = targetY;
      cursor.style.transform = "translate3d(" + cursorX + "px, " + cursorY + "px, 0)";
      cursorFrame = 0;
    }
  }

  document.addEventListener("pointermove", function (event) {
    targetX = event.clientX;
    targetY = event.clientY;

    if (!pointerStarted) {
      pointerStarted = true;
      cursorX = targetX;
      cursorY = targetY;
      cursor.classList.add("is-visible");
      cursor.style.transform = "translate3d(" + cursorX + "px, " + cursorY + "px, 0)";
    }

    if (!cursorFrame) cursorFrame = window.requestAnimationFrame(moveCursor);
  });

  document.addEventListener("pointerover", function (event) {
    if (event.target.closest("a, button, input, textarea, select, [role='button']")) {
      cursor.classList.add("is-hovering");
    }
  });

  document.addEventListener("pointerout", function (event) {
    if (event.target.closest("a, button, input, textarea, select, [role='button']")) {
      cursor.classList.remove("is-hovering");
    }
  });

  document.addEventListener("pointerdown", function () {
    cursor.classList.add("is-pressed");
  });

  document.addEventListener("pointerup", function () {
    cursor.classList.remove("is-pressed");
  });

  document.addEventListener("pointerleave", function () {
    cursor.classList.remove("is-visible");
  });

  document.addEventListener("pointerenter", function () {
    if (pointerStarted) cursor.classList.add("is-visible");
  });
}
