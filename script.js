(() => {
  const glow = document.querySelector(".cursor-glow");
  const revealGroups = [
    { selector: ".hero-copy, .hero-card", stagger: 120 },
    { selector: ".about-panel, .section-heading, .contact-panel", stagger: 90 },
    { selector: ".service-card, .workspace-card, .portfolio-card, .value-card", stagger: 80 },
    { selector: ".footer", stagger: 0 },
  ];

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

  const revealTargets = [];
  revealGroups.forEach(({ selector, stagger }) => {
    document.querySelectorAll(selector).forEach((element, index) => {
      element.classList.add("reveal");
      element.style.setProperty("--reveal-delay", `${index * stagger}ms`);
      revealTargets.push(element);
    });
  });

  if (!revealTargets.length) {
    return;
  }

  const revealNow = (element) => {
    element.classList.add("is-visible");
  };

  if (window.matchMedia("(prefers-reduced-motion: reduce)").matches || !("IntersectionObserver" in window)) {
    revealTargets.forEach(revealNow);
    return;
  }

  const observer = new IntersectionObserver(
    (entries, obs) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) {
          return;
        }

        revealNow(entry.target);
        obs.unobserve(entry.target);
      });
    },
    {
      root: null,
      threshold: 0.16,
      rootMargin: "0px 0px -8% 0px",
    }
  );

  revealTargets.forEach((element) => observer.observe(element));
})();
