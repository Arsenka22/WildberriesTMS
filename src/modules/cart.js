import { state } from "./state.js";

export function initCart() {
  const busketButton = document.getElementById("busketButton");
  const cartElement = document.getElementById("cart");

  const saveCart = () => localStorage.setItem("cartData", JSON.stringify(state.cartData));

  function renderCart() {
    if (!cartElement) return;

    cartElement.innerHTML = `
      <div class="flex justify-between items-center mb-4">
        <h2 class="text-2xl font-bold text-white">Корзина</h2>
        <button id="closeCart" class="text-white text-2xl cursor-pointer hover:text-gray-300">✕</button>
      </div>
      <div id="cart-items" class="flex-grow"></div>
      <div id="cart-total" class="text-white font-bold mt-4 pt-4 border-t border-gray-600 text-xl"></div>`;

    const cartItems = document.getElementById("cart-items");
    const cartTotal = document.getElementById("cart-total");
    document.getElementById("closeCart")?.addEventListener("click", () => cartElement.classList.add("hidden"));

    if (!state.cartData.length) {
      cartItems.innerHTML = '<p class="text-white text-center py-4">Корзина пуста</p>';
      cartTotal.textContent = "";
      return;
    }

    let total = 0;
    state.cartData.forEach((item) => {
      const itemTotal = item.newPrice * item.quantity;
      total += itemTotal;
      cartItems.innerHTML += `
        <div class="cart-item mb-3 p-3 bg-gray-600 rounded-lg">
          <div class="flex justify-between items-start">
            <div class="flex-1">
              <h3 class="font-bold text-white">${item.name}</h3>
              <div class="flex justify-between mt-2">
                <div>
                  <span class="text-white">Цена: ${item.newPrice} руб.</span>
                  <div class="flex items-center mt-1">
                    <button class="decrease-btn text-white bg-gray-500 rounded w-6 h-6 flex items-center justify-center" data-id="${item.id}">-</button>
                    <span class="text-white mx-2">${item.quantity}</span>
                    <button class="increase-btn text-white bg-gray-500 rounded w-6 h-6 flex items-center justify-center" data-id="${item.id}">+</button>
                  </div>
                </div>
                <span class="font-bold text-white">${itemTotal} руб.</span>
              </div>
            </div>
            <button class="remove-item text-red-400 hover:text-red-300 ml-4" data-id="${item.id}">✕</button>
          </div>
        </div>`;
    });

    cartTotal.innerHTML = `
      <div class="flex justify-between"><span>Итого:</span><span>${total} руб.</span></div>
      <button id="checkout-btn" class="w-full mt-4 bg-indigo-600 text-white py-2 rounded hover:bg-indigo-700">Оформить заказ</button>`;

    cartItems.querySelectorAll(".remove-item").forEach((btn) => btn.addEventListener("click", (e) => {
      removeFromCart(+e.currentTarget.dataset.id);
    }));

    cartItems.querySelectorAll(".decrease-btn").forEach((btn) => btn.addEventListener("click", (e) => {
      updateQuantity(+e.currentTarget.dataset.id, "decrease");
    }));

    cartItems.querySelectorAll(".increase-btn").forEach((btn) => btn.addEventListener("click", (e) => {
      updateQuantity(+e.currentTarget.dataset.id, "increase");
    }));

    document.getElementById("checkout-btn")?.addEventListener("click", () => {
      alert("Заказ оформлен! Спасибо за покупку!");
      state.cartData = [];
      saveCart();
      cartElement.classList.add("hidden");
    });
  }

  const showCart = () => {
    renderCart();
    cartElement.classList.remove("hidden");
  };

  function showNotification(msg) {
    let note = document.getElementById("cart-notification");
    note?.remove();
    note = document.createElement("div");
    note.id = "cart-notification";
    note.textContent = msg;
    note.className = "fixed bottom-4 right-4 bg-green-500 text-white px-4 py-2 rounded shadow-lg z-50 animate-fade-in";
    document.body.appendChild(note);
    setTimeout(() => {
      note.classList.replace("animate-fade-in", "animate-fade-out");
      setTimeout(() => note.remove(), 300);
    }, 2000);
  }

  function addToCart(id) {
    const product = state.allProducts.find((p) => p.id === id);
    if (!product) return;
    const existing = state.cartData.find((i) => i.id === id);
    existing ? existing.quantity++ : state.cartData.push({ ...product, quantity: 1 });
    showNotification(`Добавлено в корзину: ${product.name}`);
    renderCart();
    saveCart();
  }

  function removeFromCart(id) {
    state.cartData = state.cartData.filter((i) => i.id !== id);
    renderCart();
    saveCart();
  }

  function updateQuantity(id, action) {
    const item = state.cartData.find((i) => i.id === id);
    if (!item) return;
    action === "increase" ? item.quantity++ : (item.quantity = Math.max(1, item.quantity - 1));
    renderCart();
    saveCart();
  }

  busketButton?.addEventListener("click", showCart);

  return { addToCart, renderCart, removeFromCart, updateQuantity };
}
