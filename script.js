(() => {
  const glow = document.querySelector(".cursor-glow");
  const hoverSections = document.querySelectorAll(".hero, .workspace, .portfolio");

  if (glow) {
    const moveGlow = (event) => {
      glow.style.setProperty("--x", `${event.clientX}px`);
      glow.style.setProperty("--y", `${event.clientY}px`);
      glow.style.opacity = "0.45";
    };

    const softenGlow = () => {
      glow.style.opacity = "0.2";
    };

    window.addEventListener("pointermove", moveGlow, { passive: true });
    window.addEventListener("pointerdown", moveGlow, { passive: true });
    window.addEventListener("pointerleave", softenGlow);
  }

  if (!hoverSections.length || !window.matchMedia("(hover: hover) and (pointer: fine)").matches) {
    return;
  }

  const clearHoverState = (section) => {
    section.classList.remove("is-image-hovering");
  };

  hoverSections.forEach((section) => {
    let resetTimer = null;

    section.addEventListener("pointerenter", () => {
      window.clearTimeout(resetTimer);
      section.classList.add("is-image-hovering");
    });

    section.addEventListener("pointerleave", () => {
      resetTimer = window.setTimeout(() => clearHoverState(section), 60);
    });
  });
})();
