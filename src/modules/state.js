import { objCards } from "./data.js";

export const state = {
  cartData: JSON.parse(localStorage.getItem("cartData")) || [],
  allProducts: (() => {
    const saved = JSON.parse(localStorage.getItem("cards"));
    if (saved && saved.length) return saved;
    localStorage.setItem("cards", JSON.stringify(objCards));
    return [...objCards];
  })(),
  isSaleActive: true,
  currentSlide: 0,
  slideInterval: null,
};
