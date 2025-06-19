document.addEventListener("DOMContentLoaded", function() {
  createCart();
  getCard();
});

const app = document.createElement("div");
app.classList.add("app", "flex", "flex-wrap", "justify-center", "gap-4", "p-4");

const objCards = [
  {
    id: 1,
    image: "image_1.jpg",
    name: "Сумка",
    newPrice: 100,
    oldPrice: 150,
    discount: 33,
  },
  {
    id: 2,
    image: "image_2.jpg",
    name: "Золотой браслет",
    newPrice: 200,
    oldPrice: 350,
    discount: 43,
  },
  {
    id: 3,
    image: "image_3.jpg",
    name: "Кожаный ремень",
    newPrice: 50,
    oldPrice: 100,
    discount: 50,
  },
  {
    id: 4,
    image: "image_4.jpg",
    name: "Кроссовки",
    newPrice: 100,
    oldPrice: 250,
    discount: 60,
  },
  {
    id: 5,
    image: "image_5.jpg",
    name: "Вязаная кофта",
    newPrice: 75,
    oldPrice: 95,
    discount: 21,
  },
];

// Хранилище для товаров в корзине
let cartItems = JSON.parse(localStorage.getItem('cartItems')) || [];

function setCard(obj) {
  localStorage.setItem("cards", JSON.stringify(obj));
}

function getCard() {
  const savedCards = JSON.parse(localStorage.getItem("cards"));
  if (savedCards && savedCards.length > 0) {
    savedCards.forEach((cardData) => {
      const card = createCard(cardData);
      app.appendChild(card);
    });
  } else {
    setCard(objCards);
    objCards.forEach((cardData) => {
      const card = createCard(cardData);
      app.appendChild(card);
    });
  }
}

// Создание корзины
function createCart() {
  const cart = document.createElement("div");
  cart.classList.add(
    "cart",
    "fixed",
    "top-0",
    "right-0",
    "w-full",
    "md:w-[400px]",
    "h-full",
    "bg-white",
    "shadow-lg",
    "z-50",
    "overflow-y-auto",
    "hidden"
  );
  
  // Заголовок корзины
  const cartHeader = document.createElement("div");
  cartHeader.classList.add("flex", "justify-between", "items-center", "p-4", "border-b");
  
  const cartTitle = document.createElement("h2");
  cartTitle.textContent = "Ваша корзина";
  cartTitle.classList.add("text-xl", "font-bold");
  
  const closeBtn = document.createElement("button");
  closeBtn.innerHTML = "&times;";
  closeBtn.classList.add(
    "text-2xl",
    "text-gray-500",
    "hover:text-gray-700",
    "cursor-pointer",
    "bg-transparent",
    "border-none"
  );
  closeBtn.addEventListener("click", () => {
    cart.classList.add("hidden");
  });
  
  cartHeader.append(cartTitle, closeBtn);
  cart.appendChild(cartHeader);
  
  // Тело корзины
  const cartBody = document.createElement("div");
  cartBody.id = "cart-content";
  cartBody.classList.add("p-4");
  
  // Итого
  const cartFooter = document.createElement("div");
  cartFooter.classList.add("p-4", "border-t");
  
  const totalElement = document.createElement("div");
  totalElement.classList.add("flex", "justify-between", "font-bold", "text-lg", "mb-4");
  totalElement.innerHTML = '<span>Итого:</span><span id="cart-total">0 р</span>';
  
  const checkoutBtn = document.createElement("button");
  checkoutBtn.textContent = "Оформить заказ";
  checkoutBtn.classList.add(
    "w-full",
    "py-3",
    "bg-indigo-600",
    "text-white",
    "font-bold",
    "rounded",
    "hover:bg-indigo-700",
    "transition"
  );
  
  cartFooter.append(totalElement, checkoutBtn);
  cart.append(cartBody, cartFooter);
  
  document.body.appendChild(cart);
  updateCartContent();
  return cart;
}

// Обновление содержимого корзины
function updateCartContent() {
  const cartContent = document.getElementById("cart-content");
  const cartTotal = document.getElementById("cart-total");
  
  if (!cartContent) return;
  
  cartContent.innerHTML = "";
  
  if (cartItems.length === 0) {
    cartContent.innerHTML = `
      <div class="text-center py-8">
        <p class="text-gray-500 mb-4">Ваша корзина пуста</p>
        <button class="px-4 py-2 bg-indigo-600 text-white rounded hover:bg-indigo-700 transition"
                onclick="document.querySelector('.cart').classList.add('hidden')">
          Продолжить покупки
        </button>
      </div>
    `;
    cartTotal.textContent = "0 р";
    return;
  }
  
  let total = 0;
  
  cartItems.forEach(item => {
    total += item.newPrice;
    
    const cartItem = document.createElement("div");
    cartItem.classList.add("flex", "gap-4", "mb-4", "pb-4", "border-b");
    
    // Изображение товара
    const itemImage = document.createElement("div");
    itemImage.classList.add("flex-shrink-0");
    const img = document.createElement("img");
    img.src = `/src/img/${item.image}`;
    img.alt = item.name;
    img.classList.add("w-20", "h-20", "object-cover", "rounded");
    itemImage.appendChild(img);
    
    // Информация о товаре
    const itemInfo = document.createElement("div");
    itemInfo.classList.add("flex-grow");
    
    const itemName = document.createElement("h3");
    itemName.textContent = item.name;
    itemName.classList.add("font-bold", "mb-1");
    
    const itemPrice = document.createElement("p");
    itemPrice.textContent = `${item.newPrice} р`;
    itemPrice.classList.add("text-gray-700", "mb-2");
    
    // Управление количеством
    const itemControls = document.createElement("div");
    itemControls.classList.add("flex", "items-center", "gap-2");
    
    const removeBtn = document.createElement("button");
    removeBtn.innerHTML = "&times;";
    removeBtn.classList.add(
      "text-red-500",
      "hover:text-red-700",
      "text-xl",
      "font-bold"
    );
    removeBtn.addEventListener("click", () => {
      removeFromCart(item.id);
    });
    
    itemInfo.append(itemName, itemPrice);
    itemControls.append(removeBtn);
    itemInfo.appendChild(itemControls);
    
    cartItem.append(itemImage, itemInfo);
    cartContent.appendChild(cartItem);
  });
  
  cartTotal.textContent = `${total} р`;
}

// Добавление товара в корзину
function addToCart(item) {
  // Проверяем, нет ли уже этого товара в корзине
  if (!cartItems.some(cartItem => cartItem.id === item.id)) {
    cartItems.push(item);
    localStorage.setItem('cartItems', JSON.stringify(cartItems));
    updateCartContent();
    
    // Показываем корзину при добавлении товара
    const cart = document.querySelector(".cart");
    if (cart) {
      cart.classList.remove("hidden");
    }
  }
}

// Удаление товара из корзины
function removeFromCart(itemId) {
  cartItems = cartItems.filter(item => item.id !== itemId);
  localStorage.setItem('cartItems', JSON.stringify(cartItems));
  updateCartContent();
}

function createCard({
  id,
  image,
  basket = true,
  newPrice,
  oldPrice,
  discount,
  name,
} = {}) {
  // Проверка на минимально необходимые данные
  if (!name && !image) {
    console.warn(
      "Карточка товара должна содержать хотя бы название или изображение"
    );
    return null;
  }

  // Создание карточки
  const card = document.createElement("div");
  card.classList.add(
    "card",
    "w-64",
    "bg-white",
    "rounded-lg",
    "overflow-hidden",
    "shadow-md",
    "hover:shadow-lg",
    "transition"
  );

  // Тело карточки
  const cardBody = document.createElement("div");
  cardBody.classList.add("relative");

  // Изображение товара
  if (image) {
    try {
      const img = document.createElement("img");
      img.src = `/src/img/${image}`;
      img.alt = name ? `Изображение ${name}` : "Изображение товара";
      img.classList.add("w-full", "h-64", "object-cover");
      cardBody.appendChild(img);
    } catch (e) {
      console.warn("Некорректный URL изображения:", image);
    }
  }

  // Скидка
  if (discount) {
    const discountEl = document.createElement("div");
    discountEl.classList.add(
      "absolute",
      "top-2",
      "left-2",
      "px-2",
      "py-1",
      "bg-red-500",
      "text-white",
      "text-sm",
      "font-bold",
      "rounded"
    );

    const discountValue =
      typeof discount === "number" ? discount : parseFloat(discount);
    if (!isNaN(discountValue)) {
      discountEl.textContent = `-${Math.round(discountValue)}%`;
      cardBody.appendChild(discountEl);
    }
  }

  // Кнопка корзины
  if (basket) {
    const basketBtn = document.createElement("button");
    basketBtn.classList.add(
      "absolute",
      "bottom-2",
      "right-2",
      "p-2",
      "bg-indigo-600",
      "rounded-full",
      "text-white",
      "hover:bg-indigo-700",
      "transition",
      "shadow-md"
    );
    basketBtn.innerHTML = `
      <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
      </svg>
    `;
    basketBtn.addEventListener("click", () => {
      addToCart({ id, image, name, newPrice });
    });
    cardBody.appendChild(basketBtn);
  }

  // Подвал карточки
  const cardFooter = document.createElement("div");
  cardFooter.classList.add("p-4");

  // Название товара
  if (name) {
    const nameEl = document.createElement("h3");
    nameEl.textContent = name;
    nameEl.classList.add("font-bold", "text-lg", "mb-2");
    cardFooter.appendChild(nameEl);
  }

  // Цены
  const priceContainer = document.createElement("div");
  priceContainer.classList.add("flex", "items-center", "gap-2");

  if (newPrice) {
    const priceEl = document.createElement("span");
    priceEl.textContent = `${newPrice} р`;
    priceEl.classList.add("font-bold", "text-indigo-600", "text-lg");
    priceContainer.appendChild(priceEl);
  }

  if (oldPrice) {
    const oldPriceEl = document.createElement("span");
    oldPriceEl.textContent = `${oldPrice} р`;
    oldPriceEl.classList.add("text-sm", "text-gray-500", "line-through");
    priceContainer.appendChild(oldPriceEl);
  }

  cardFooter.appendChild(priceContainer);
  card.append(cardBody, cardFooter);
  app.appendChild(card);

  return card;
}

// Добавление app в DOM
if (!document.body.contains(app)) {
  document.body.appendChild(app);
}