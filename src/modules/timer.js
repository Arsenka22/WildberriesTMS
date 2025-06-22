import { state } from "./state.js";

export function initTimer(productsModule, cartModule) {
  const timer = document.createElement("div");
  timer.classList.add("font-bold", "text-4xl", "text-red-500", "flex", "justify-center", "my-6", "p-4", "bg-gray-100", "rounded");
  const hSpan = document.createElement("span");
  const mSpan = document.createElement("span");
  const sSpan = document.createElement("span");
  mSpan.textContent = "00:";
  sSpan.textContent = "05";
  timer.append(hSpan, mSpan, sSpan);
  const appContainer = document.getElementById("app");
  appContainer?.parentNode?.insertBefore(timer, appContainer);

  let h = 0, m = 0, s = 5;
  const secInterval = setInterval(() => {
    if (s > 0) {
      s--;
      sSpan.textContent = s.toString().padStart(2, "0");
    } else {
      if (m === 0 && h === 0) {
        clearInterval(secInterval);
        timer.innerHTML = '<span class="text-2xl">Акция завершена!</span>';
        state.isSaleActive = false;
        productsModule.renderProducts();
        cartModule.renderCart();
        return;
      }
      s = 59;
      sSpan.textContent = s.toString().padStart(2, "0");
      if (m > 0) {
        m--;
        mSpan.textContent = m.toString().padStart(2, "0") + ':';
      } else {
        m = 59;
        mSpan.textContent = m.toString().padStart(2, "0") + ':';
        if (h > 0) {
          h--;
          hSpan.textContent = h.toString().padStart(2, "0") + ':';
        }
      }
    }
  }, 1000);
}