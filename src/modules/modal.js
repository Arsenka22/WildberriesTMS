import { state } from "./state.js";

export function initModal(productsModule) {
  const modal = document.getElementById("productModal");
  const overlay = document.getElementById("backgroundModal");
  const closeBtn = document.getElementById("closeProductModal");
  const form = document.getElementById("updateProductForm");
  const addBtn = document.getElementById("add-product-button");

  const open = () => {
    modal?.classList.remove("hidden");
    overlay?.classList.remove("hidden");
    document.body.classList.add("overflow-hidden");
  };
  const close = () => {
    modal?.classList.add("hidden");
    overlay?.classList.add("hidden");
    document.body.classList.remove("overflow-hidden");
  };

  closeBtn?.addEventListener("click", close);
  addBtn?.addEventListener("click", open);

  form?.addEventListener("submit", (e) => {
    e.preventDefault();
    const name = document.getElementById("productName")?.value;
    const newPrice = parseFloat(document.getElementById("productNewPrice")?.value);
    const oldPrice = parseFloat(document.getElementById("productOldPrice")?.value);
    const discount = parseInt(document.getElementById("productDiscount")?.value);
    if (!name || Number.isNaN(newPrice) || Number.isNaN(discount)) {
      alert("Пожалуйста, заполните обязательные поля");
      return;
    }
    const newId = state.allProducts.length ? Math.max(...state.allProducts.map((p) => p.id)) + 1 : 1;
    state.allProducts.push({ id: newId, image: "image_6.jpg", name, newPrice, oldPrice: Number.isNaN(oldPrice) ? null : oldPrice, discount });
    localStorage.setItem("cards", JSON.stringify(state.allProducts));
    productsModule.renderProducts();
    close();
    form.reset();
  });
}
