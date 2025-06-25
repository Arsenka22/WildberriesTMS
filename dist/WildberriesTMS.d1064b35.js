const $b70dce20900dd41a$export$a3edf1a1e748aeb8 = [
    {
        id: 1,
        image: "image_1.jpg",
        name: "\u0421\u0443\u043C\u043A\u0430",
        newPrice: 100,
        oldPrice: 150,
        discount: 33
    },
    {
        id: 2,
        image: "image_2.jpg",
        name: "\u0417\u043E\u043B\u043E\u0442\u043E\u0439 \u0431\u0440\u0430\u0441\u043B\u0435\u0442",
        newPrice: 200,
        oldPrice: 350,
        discount: 43
    },
    {
        id: 3,
        image: "image_3.jpg",
        name: "\u041A\u043E\u0436\u0430\u043D\u044B\u0439 \u0440\u0435\u043C\u0435\u043D\u044C",
        newPrice: 50,
        oldPrice: 100,
        discount: 50
    },
    {
        id: 4,
        image: "image_4.jpg",
        name: "\u041A\u0440\u043E\u0441\u0441\u043E\u0432\u043A\u0438",
        newPrice: 100,
        oldPrice: 250,
        discount: 60
    },
    {
        id: 5,
        image: "image_5.jpg",
        name: "\u0412\u044F\u0437\u0430\u043D\u0430\u044F \u043A\u043E\u0444\u0442\u0430",
        newPrice: 75,
        oldPrice: 95,
        discount: 21
    }
];


const $bbcd4f5fb9b42841$export$ca000e230c0caa3e = {
    cartData: JSON.parse(localStorage.getItem("cartData")) || [],
    allProducts: (()=>{
        const saved = JSON.parse(localStorage.getItem("cards"));
        if (saved && saved.length) return saved;
        localStorage.setItem("cards", JSON.stringify((0, $b70dce20900dd41a$export$a3edf1a1e748aeb8)));
        return [
            ...(0, $b70dce20900dd41a$export$a3edf1a1e748aeb8)
        ];
    })(),
    isSaleActive: true,
    currentSlide: 0,
    slideInterval: null
};


function $69d5c1ebd9cd0ff1$export$25bca1bc22cc4f64() {
    const slider = document.getElementById("slider");
    const slides = document.querySelectorAll("#slider > div");
    const dots = document.querySelectorAll(".dot");
    const prevButton = document.getElementById("prev");
    const nextButton = document.getElementById("next");
    function updateDots() {
        dots.forEach((dot, i)=>{
            dot.classList.toggle("bg-yellow-400", i === (0, $bbcd4f5fb9b42841$export$ca000e230c0caa3e).currentSlide);
            dot.classList.toggle("bg-yellow-200", i !== (0, $bbcd4f5fb9b42841$export$ca000e230c0caa3e).currentSlide);
        });
    }
    function showSlide(index) {
        if (!slider || !slides.length) return;
        (0, $bbcd4f5fb9b42841$export$ca000e230c0caa3e).currentSlide = (index + slides.length) % slides.length;
        slider.style.transform = `translateX(-${(0, $bbcd4f5fb9b42841$export$ca000e230c0caa3e).currentSlide * 100}%)`;
        updateDots();
    }
    function startSlider() {
        clearInterval((0, $bbcd4f5fb9b42841$export$ca000e230c0caa3e).slideInterval);
        (0, $bbcd4f5fb9b42841$export$ca000e230c0caa3e).slideInterval = setInterval(()=>showSlide((0, $bbcd4f5fb9b42841$export$ca000e230c0caa3e).currentSlide + 1), 3000);
    }
    if (slider && slides.length) {
        showSlide(0);
        startSlider();
        nextButton?.addEventListener("click", ()=>{
            showSlide((0, $bbcd4f5fb9b42841$export$ca000e230c0caa3e).currentSlide + 1);
            startSlider();
        });
        prevButton?.addEventListener("click", ()=>{
            showSlide((0, $bbcd4f5fb9b42841$export$ca000e230c0caa3e).currentSlide - 1);
            startSlider();
        });
        dots.forEach((dot, i)=>dot.addEventListener("click", ()=>{
                showSlide(i);
                startSlider();
            }));
        slider.parentElement?.addEventListener("mouseenter", ()=>clearInterval((0, $bbcd4f5fb9b42841$export$ca000e230c0caa3e).slideInterval));
        slider.parentElement?.addEventListener("mouseleave", startSlider);
    }
}



function $c9177f8d39e6dfb6$export$942ff210707e0e16(productsModule) {
    const searchInput = document.getElementById("search");
    if (!searchInput) return;
    searchInput.addEventListener("input", (e)=>{
        const searchText = e.target.value.trim().toLowerCase();
        const filtered = searchText ? (0, $bbcd4f5fb9b42841$export$ca000e230c0caa3e).allProducts.filter((p)=>p.name.toLowerCase().includes(searchText)) : (0, $bbcd4f5fb9b42841$export$ca000e230c0caa3e).allProducts;
        productsModule.renderProducts(filtered);
    });
}



function $f385cadedf3cd4ee$export$e838c4b04241f74() {
    const busketButton = document.getElementById("busketButton");
    const cartElement = document.getElementById("cart");
    const saveCart = ()=>localStorage.setItem("cartData", JSON.stringify((0, $bbcd4f5fb9b42841$export$ca000e230c0caa3e).cartData));
    function renderCart() {
        if (!cartElement) return;
        cartElement.innerHTML = `
      <div class="flex justify-between items-center mb-4">
        <h2 class="text-2xl font-bold text-white">\u{41A}\u{43E}\u{440}\u{437}\u{438}\u{43D}\u{430}</h2>
        <button id="closeCart" class="text-white text-2xl cursor-pointer hover:text-gray-300">\u{2715}</button>
      </div>
      <div id="cart-items" class="flex-grow"></div>
      <div id="cart-total" class="text-white font-bold mt-4 pt-4 border-t border-gray-600 text-xl"></div>`;
        const cartItems = document.getElementById("cart-items");
        const cartTotal = document.getElementById("cart-total");
        document.getElementById("closeCart")?.addEventListener("click", ()=>cartElement.classList.add("hidden"));
        if (!(0, $bbcd4f5fb9b42841$export$ca000e230c0caa3e).cartData.length) {
            cartItems.innerHTML = '<p class="text-white text-center py-4">\u041A\u043E\u0440\u0437\u0438\u043D\u0430 \u043F\u0443\u0441\u0442\u0430</p>';
            cartTotal.textContent = "";
            return;
        }
        let total = 0;
        (0, $bbcd4f5fb9b42841$export$ca000e230c0caa3e).cartData.forEach((item)=>{
            const itemTotal = item.newPrice * item.quantity;
            total += itemTotal;
            cartItems.innerHTML += `
        <div class="cart-item mb-3 p-3 bg-gray-600 rounded-lg">
          <div class="flex justify-between items-start">
            <div class="flex-1">
              <h3 class="font-bold text-white">${item.name}</h3>
              <div class="flex justify-between mt-2">
                <div>
                  <span class="text-white">\u{426}\u{435}\u{43D}\u{430}: ${item.newPrice} \u{440}\u{443}\u{431}.</span>
                  <div class="flex items-center mt-1">
                    <button class="decrease-btn text-white bg-gray-500 rounded w-6 h-6 flex items-center justify-center" data-id="${item.id}">-</button>
                    <span class="text-white mx-2">${item.quantity}</span>
                    <button class="increase-btn text-white bg-gray-500 rounded w-6 h-6 flex items-center justify-center" data-id="${item.id}">+</button>
                  </div>
                </div>
                <span class="font-bold text-white">${itemTotal} \u{440}\u{443}\u{431}.</span>
              </div>
            </div>
            <button class="remove-item text-red-400 hover:text-red-300 ml-4" data-id="${item.id}">\u{2715}</button>
          </div>
        </div>`;
        });
        cartTotal.innerHTML = `
      <div class="flex justify-between"><span>\u{418}\u{442}\u{43E}\u{433}\u{43E}:</span><span>${total} \u{440}\u{443}\u{431}.</span></div>
      <button id="checkout-btn" class="w-full mt-4 bg-indigo-600 text-white py-2 rounded hover:bg-indigo-700">\u{41E}\u{444}\u{43E}\u{440}\u{43C}\u{438}\u{442}\u{44C} \u{437}\u{430}\u{43A}\u{430}\u{437}</button>`;
        cartItems.querySelectorAll(".remove-item").forEach((btn)=>btn.addEventListener("click", (e)=>{
                removeFromCart(+e.currentTarget.dataset.id);
            }));
        cartItems.querySelectorAll(".decrease-btn").forEach((btn)=>btn.addEventListener("click", (e)=>{
                updateQuantity(+e.currentTarget.dataset.id, "decrease");
            }));
        cartItems.querySelectorAll(".increase-btn").forEach((btn)=>btn.addEventListener("click", (e)=>{
                updateQuantity(+e.currentTarget.dataset.id, "increase");
            }));
        document.getElementById("checkout-btn")?.addEventListener("click", ()=>{
            alert("\u0417\u0430\u043A\u0430\u0437 \u043E\u0444\u043E\u0440\u043C\u043B\u0435\u043D! \u0421\u043F\u0430\u0441\u0438\u0431\u043E \u0437\u0430 \u043F\u043E\u043A\u0443\u043F\u043A\u0443!");
            (0, $bbcd4f5fb9b42841$export$ca000e230c0caa3e).cartData = [];
            saveCart();
            cartElement.classList.add("hidden");
        });
    }
    const showCart = ()=>{
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
        setTimeout(()=>{
            note.classList.replace("animate-fade-in", "animate-fade-out");
            setTimeout(()=>note.remove(), 300);
        }, 2000);
    }
    function addToCart(id) {
        const product = (0, $bbcd4f5fb9b42841$export$ca000e230c0caa3e).allProducts.find((p)=>p.id === id);
        if (!product) return;
        const existing = (0, $bbcd4f5fb9b42841$export$ca000e230c0caa3e).cartData.find((i)=>i.id === id);
        existing ? existing.quantity++ : (0, $bbcd4f5fb9b42841$export$ca000e230c0caa3e).cartData.push({
            ...product,
            quantity: 1
        });
        showNotification(`\u{414}\u{43E}\u{431}\u{430}\u{432}\u{43B}\u{435}\u{43D}\u{43E} \u{432} \u{43A}\u{43E}\u{440}\u{437}\u{438}\u{43D}\u{443}: ${product.name}`);
        renderCart();
        saveCart();
    }
    function removeFromCart(id) {
        (0, $bbcd4f5fb9b42841$export$ca000e230c0caa3e).cartData = (0, $bbcd4f5fb9b42841$export$ca000e230c0caa3e).cartData.filter((i)=>i.id !== id);
        renderCart();
        saveCart();
    }
    function updateQuantity(id, action) {
        const item = (0, $bbcd4f5fb9b42841$export$ca000e230c0caa3e).cartData.find((i)=>i.id === id);
        if (!item) return;
        action === "increase" ? item.quantity++ : item.quantity = Math.max(1, item.quantity - 1);
        renderCart();
        saveCart();
    }
    busketButton?.addEventListener("click", showCart);
    return {
        addToCart: addToCart,
        renderCart: renderCart,
        removeFromCart: removeFromCart,
        updateQuantity: updateQuantity
    };
}



function $28a0ed0d82381e21$export$b2ad6f2350d6d18c(cart) {
    const appContainer = document.getElementById("app");
    if (!appContainer) return {
        renderProducts: ()=>{}
    };
    appContainer.addEventListener("click", (e)=>{
        const btn = e.target.closest(".cart-btn");
        if (btn) cart.addToCart(+btn.dataset.id);
    });
    function createCard(product) {
        const { id: id, image: image, newPrice: newPrice, oldPrice: oldPrice, discount: discount, name: name } = product;
        const displayPrice = (0, $bbcd4f5fb9b42841$export$ca000e230c0caa3e).isSaleActive ? newPrice : oldPrice ?? newPrice;
        const displayOldPrice = (0, $bbcd4f5fb9b42841$export$ca000e230c0caa3e).isSaleActive && oldPrice ? oldPrice : null;
        const showDiscount = (0, $bbcd4f5fb9b42841$export$ca000e230c0caa3e).isSaleActive && discount;
        const card = document.createElement("div");
        card.className = "card w-full max-w-xs bg-white shadow-lg rounded-lg overflow-hidden";
        card.innerHTML = `
      <div class="relative h-48 bg-gray-200 flex items-center justify-center">
        ${image ? `<img src="img/${image}" alt="${name}" class="w-full h-full object-cover">` : '<span class="text-gray-500">\u0418\u0437\u043E\u0431\u0440\u0430\u0436\u0435\u043D\u0438\u0435 \u0442\u043E\u0432\u0430\u0440\u0430</span>'}
        ${showDiscount ? `<div class="absolute left-2 top-2 bg-red-500 text-white font-bold px-2 py-1 rounded">-${discount}%</div>` : ""}
        <button class="absolute right-2 bottom-2 p-2 bg-indigo-600 rounded-full text-white cursor-pointer hover:bg-indigo-700 cart-btn" data-id="${id}">
          <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" viewBox="0 0 20 20" fill="currentColor"><path d="M3 1a1 1 0 000 2h1.22l.305 1.222a.997.997 0 00.01.042l1.358 5.43-.893.892C3.74 11.846 4.632 14 6.414 14H15a1 1 0 000-2H6.414l1-1H14a1 1 0 00.894-.553l3-6A1 1 0 0017 3H6.28l-.31-1.243A1 1 0 005 1H3zM16 16.5a1.5 1.5 0 11-3 0 1.5 1.5 0 013 0zM6.5 18a1.5 1.5 0 100-3 1.5 1.5 0 000 3z"/></svg>
        </button>
      </div>
      <div class="p-4">
        <div class="flex justify-between items-center mb-2">
          <div class="text-lg font-bold">${displayPrice} \u{20BD}</div>
          ${displayOldPrice ? `<div class="text-gray-500 line-through text-sm">${displayOldPrice} \u{20BD}</div>` : ""}
        </div>
        <div class="name text-gray-800">${name}</div>
      </div>`;
        return card;
    }
    function renderProducts(list = (0, $bbcd4f5fb9b42841$export$ca000e230c0caa3e).allProducts) {
        if (!appContainer) return;
        appContainer.innerHTML = "";
        list.forEach((p)=>appContainer.appendChild(createCard(p)));
    }
    return {
        renderProducts: renderProducts
    };
}



function $357e21c33811b5a6$export$60523367a7e10402(productsModule) {
    const modal = document.getElementById("productModal");
    const overlay = document.getElementById("backgroundModal");
    const closeBtn = document.getElementById("closeProductModal");
    const form = document.getElementById("updateProductForm");
    const addBtn = document.getElementById("add-product-button");
    const open = ()=>{
        modal?.classList.remove("hidden");
        overlay?.classList.remove("hidden");
        document.body.classList.add("overflow-hidden");
    };
    const close = ()=>{
        modal?.classList.add("hidden");
        overlay?.classList.add("hidden");
        document.body.classList.remove("overflow-hidden");
    };
    closeBtn?.addEventListener("click", close);
    addBtn?.addEventListener("click", open);
    form?.addEventListener("submit", (e)=>{
        e.preventDefault();
        const name = document.getElementById("productName")?.value;
        const newPrice = parseFloat(document.getElementById("productNewPrice")?.value);
        const oldPrice = parseFloat(document.getElementById("productOldPrice")?.value);
        const discount = parseInt(document.getElementById("productDiscount")?.value);
        if (!name || Number.isNaN(newPrice) || Number.isNaN(discount)) {
            alert("\u041F\u043E\u0436\u0430\u043B\u0443\u0439\u0441\u0442\u0430, \u0437\u0430\u043F\u043E\u043B\u043D\u0438\u0442\u0435 \u043E\u0431\u044F\u0437\u0430\u0442\u0435\u043B\u044C\u043D\u044B\u0435 \u043F\u043E\u043B\u044F");
            return;
        }
        const newId = (0, $bbcd4f5fb9b42841$export$ca000e230c0caa3e).allProducts.length ? Math.max(...(0, $bbcd4f5fb9b42841$export$ca000e230c0caa3e).allProducts.map((p)=>p.id)) + 1 : 1;
        (0, $bbcd4f5fb9b42841$export$ca000e230c0caa3e).allProducts.push({
            id: newId,
            image: "image_6.jpg",
            name: name,
            newPrice: newPrice,
            oldPrice: Number.isNaN(oldPrice) ? null : oldPrice,
            discount: discount
        });
        localStorage.setItem("cards", JSON.stringify((0, $bbcd4f5fb9b42841$export$ca000e230c0caa3e).allProducts));
        productsModule.renderProducts();
        close();
        form.reset();
    });
}



function $ea7c8ec0f992e5eb$export$9144c27b0f721b64(productsModule, cartModule) {
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
    const secInterval = setInterval(()=>{
        if (s > 0) {
            s--;
            sSpan.textContent = s.toString().padStart(2, "0");
        } else {
            if (m === 0 && h === 0) {
                clearInterval(secInterval);
                timer.innerHTML = '<span class="text-2xl">\u0410\u043A\u0446\u0438\u044F \u0437\u0430\u0432\u0435\u0440\u0448\u0435\u043D\u0430!</span>';
                (0, $bbcd4f5fb9b42841$export$ca000e230c0caa3e).isSaleActive = false;
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


document.addEventListener("DOMContentLoaded", ()=>{
    (0, $69d5c1ebd9cd0ff1$export$25bca1bc22cc4f64)();
    const cartModule = (0, $f385cadedf3cd4ee$export$e838c4b04241f74)();
    const productsModule = (0, $28a0ed0d82381e21$export$b2ad6f2350d6d18c)(cartModule);
    (0, $357e21c33811b5a6$export$60523367a7e10402)(productsModule);
    (0, $ea7c8ec0f992e5eb$export$9144c27b0f721b64)(productsModule, cartModule);
    (0, $c9177f8d39e6dfb6$export$942ff210707e0e16)(productsModule);
    productsModule.renderProducts();
    window.shopApp = {
        cart: cartModule,
        products: productsModule
    };
});


//# sourceMappingURL=WildberriesTMS.d1064b35.js.map
