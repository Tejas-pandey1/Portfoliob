// Mobile menu
const burger = document.querySelector(".burger");
const nav = document.querySelector(".nav");

if (burger && nav) {
  burger.addEventListener("click", () => {
    const open = nav.classList.toggle("open");
    burger.setAttribute("aria-expanded", String(open));
    burger.setAttribute("aria-label", open ? "Close menu" : "Open menu");
  });

  nav.querySelectorAll("a").forEach((link) =>
    link.addEventListener("click", () => {
      nav.classList.remove("open");
      burger.setAttribute("aria-expanded", "false");
    })
  );
}

// Carousel
const carousel = document.querySelector(".carousel");

if (carousel) {
  const slides = carousel.querySelectorAll(".slide");
  const dots = carousel.querySelectorAll(".dot");
  const prev = carousel.querySelector(".previous");
  const next = carousel.querySelector(".next");
  const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  let current = 0;
  let timer;

  const show = (index) => {
    current = (index + slides.length) % slides.length;
    slides.forEach((s, i) => s.classList.toggle("active", i === current));
    dots.forEach((d, i) => {
      d.classList.toggle("active", i === current);
      d.setAttribute("aria-current", i === current ? "true" : "false");
    });
  };

  const start = () => {
    if (reduceMotion) return;
    stop();
    timer = setInterval(() => show(current + 1), 5000);
  };
  const stop = () => clearInterval(timer);

  prev?.addEventListener("click", () => { show(current - 1); start(); });
  next?.addEventListener("click", () => { show(current + 1); start(); });
  dots.forEach((dot, i) => dot.addEventListener("click", () => { show(i); start(); }));

  carousel.addEventListener("mouseenter", stop);
  carousel.addEventListener("mouseleave", start);
  carousel.addEventListener("focusin", stop);
  carousel.addEventListener("focusout", start);

  show(0);
  start();
}
