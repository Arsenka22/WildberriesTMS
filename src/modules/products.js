import { state } from "./state.js";

export function initProducts(cart) {
  const appContainer = document.getElementById("app");
  if (!appContainer) return { renderProducts: () => {} };

  appContainer.addEventListener("click", (e) => {
    const btn = e.target.closest(".cart-btn");
    if (btn) cart.addToCart(+btn.dataset.id);
  });

  function createCard(product) {
    const { id, image, newPrice, oldPrice, discount, name } = product;
    const displayPrice = state.isSaleActive ? newPrice : oldPrice ?? newPrice;
    const displayOldPrice = state.isSaleActive && oldPrice ? oldPrice : null;
    const showDiscount = state.isSaleActive && discount;

    const card = document.createElement("div");
    card.className = "card w-full max-w-xs bg-white shadow-lg rounded-lg overflow-hidden";
    card.innerHTML = `
      <div class="relative h-48 bg-gray-200 flex items-center justify-center">
        ${image ? `<img src="/img/${image}" alt="${name}" class="w-full h-full object-cover">` : '<span class="text-gray-500">Изображение товара</span>'}
        ${showDiscount ? `<div class="absolute left-2 top-2 bg-red-500 text-white font-bold px-2 py-1 rounded">-${discount}%</div>` : ""}
        <button class="absolute right-2 bottom-2 p-2 bg-indigo-600 rounded-full text-white cursor-pointer hover:bg-indigo-700 cart-btn" data-id="${id}">
          <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" viewBox="0 0 20 20" fill="currentColor"><path d="M3 1a1 1 0 000 2h1.22l.305 1.222a.997.997 0 00.01.042l1.358 5.43-.893.892C3.74 11.846 4.632 14 6.414 14H15a1 1 0 000-2H6.414l1-1H14a1 1 0 00.894-.553l3-6A1 1 0 0017 3H6.28l-.31-1.243A1 1 0 005 1H3zM16 16.5a1.5 1.5 0 11-3 0 1.5 1.5 0 013 0zM6.5 18a1.5 1.5 0 100-3 1.5 1.5 0 000 3z"/></svg>
        </button>
      </div>
      <div class="p-4">
        <div class="flex justify-between items-center mb-2">
          <div class="text-lg font-bold">${displayPrice} ₽</div>
          ${displayOldPrice ? `<div class="text-gray-500 line-through text-sm">${displayOldPrice} ₽</div>` : ""}
        </div>
        <div class="name text-gray-800">${name}</div>
      </div>`;
      
    return card;
  }

  function renderProducts(list = state.allProducts) {
    if (!appContainer) return;
    appContainer.innerHTML = "";
    list.forEach((p) => appContainer.appendChild(createCard(p)));
  }

  return { renderProducts };
}
