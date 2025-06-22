import { initSlider } from "./slider.js";
import { initSearch } from "./search.js";
import { initCart } from "./cart.js";
import { initProducts } from "./products.js";
import { initModal } from "./modal.js";
import { initTimer } from "./timer.js";

document.addEventListener("DOMContentLoaded", () => {
  initSlider();
  const cartModule = initCart();
  const productsModule = initProducts(cartModule);
  initModal(productsModule);
  initTimer(productsModule, cartModule);
  initSearch(productsModule);
  productsModule.renderProducts();
  window.shopApp = { cart: cartModule, products: productsModule };
});
