import { state } from "./state.js";

export function initSearch(productsModule) {
  const searchInput = document.getElementById("search");
  if (!searchInput) return;

  searchInput.addEventListener("input", (e) => {
    const searchText = e.target.value.trim().toLowerCase();
    const filtered = searchText
      ? state.allProducts.filter((p) => p.name.toLowerCase().includes(searchText))
      : state.allProducts;
    productsModule.renderProducts(filtered);
  });
}