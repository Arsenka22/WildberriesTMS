import { state } from "./state.js";

export function initSlider() {
  const slider = document.getElementById("slider");
  const slides = document.querySelectorAll("#slider > div");
  const dots = document.querySelectorAll(".dot");
  const prevButton = document.getElementById("prev");
  const nextButton = document.getElementById("next");

  function updateDots() {
    dots.forEach((dot, i) => {
      dot.classList.toggle("bg-yellow-400", i === state.currentSlide);
      dot.classList.toggle("bg-yellow-200", i !== state.currentSlide);
    });
  }

  function showSlide(index) {
    if (!slider || !slides.length) return;
    state.currentSlide = (index + slides.length) % slides.length;
    slider.style.transform = `translateX(-${state.currentSlide * 100}%)`;
    updateDots();
  }

  function startSlider() {
    clearInterval(state.slideInterval);
    state.slideInterval = setInterval(() => showSlide(state.currentSlide + 1), 3000);
  }

  if (slider && slides.length) {
    showSlide(0);
    startSlider();

    nextButton?.addEventListener("click", () => {
      showSlide(state.currentSlide + 1);
      startSlider();
    });

    prevButton?.addEventListener("click", () => {
      showSlide(state.currentSlide - 1);
      startSlider();
    });

    dots.forEach((dot, i) => dot.addEventListener("click", () => {
      showSlide(i);
      startSlider();
    }));

    slider.parentElement?.addEventListener("mouseenter", () => clearInterval(state.slideInterval));
    slider.parentElement?.addEventListener("mouseleave", startSlider);
  }
}
