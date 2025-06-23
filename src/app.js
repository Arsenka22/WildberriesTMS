import { initSlider } from "./modules/slider.js";
import { initSearch } from "./modules/search.js";
import { initCart } from "./modules/cart.js";
import { initProducts } from "./modules/products.js";
import { initModal } from "./modules/modal.js";
import { initTimer } from "./modules/timer.js";

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
