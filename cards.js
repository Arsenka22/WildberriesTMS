document.addEventListener('DOMContentLoaded', () => {
    const objCards = [
        { id: 1, image: "image_1.jpg", name: "Сумка", newPrice: 100, oldPrice: 150, discount: 33 },
        { id: 2, image: "image_2.jpg", name: "Золотой браслет", newPrice: 200, oldPrice: 350, discount: 43 },
        { id: 3, image: "image_3.jpg", name: "Кожаный ремень", newPrice: 50, oldPrice: 100, discount: 50 },
        { id: 4, image: "image_4.jpg", name: "Кроссовки", newPrice: 100, oldPrice: 250, discount: 60 },
        { id: 5, image: "image_5.jpg", name: "Вязаная кофта", newPrice: 75, oldPrice: 95, discount: 21 },
    ];

    let cartData = [];
    let allProducts = [];
    let currentSlide = 0;
    let slideInterval;
    let isSaleActive = true; 
    let productsModule = null; 
    let cartModule = null; 
    function initSlider() {
        const slider = document.getElementById('slider');
        const slides = document.querySelectorAll('#slider > div');
        const dots = document.querySelectorAll('.dot');
        const prevButton = document.getElementById('prev');
        const nextButton = document.getElementById('next');

        function showSlide(index) {
            if (!slider || slides.length === 0) return;
            
            if (index >= slides.length) currentSlide = 0;
            else if (index < 0) currentSlide = slides.length - 1;
            else currentSlide = index;

            slider.style.transform = `translateX(-${currentSlide * 100}%)`;
            updateDots();
        }

        function updateDots() {
            dots.forEach((dot, i) => {
                if (i === currentSlide) {
                    dot.classList.add('bg-yellow-400');
                    dot.classList.remove('bg-yellow-200');
                } else {
                    dot.classList.remove('bg-yellow-400');
                    dot.classList.add('bg-yellow-200');
                }
            });
        }

        function startSlider() {
            clearInterval(slideInterval);
            slideInterval = setInterval(() => {
                showSlide(currentSlide + 1);
            }, 3000);
        }

        // Инициализация слайдера
        if (slider && slides.length > 0) {
            showSlide(0);
            startSlider();

            // Обработчики событий
            nextButton.addEventListener('click', () => {
                showSlide(currentSlide + 1);
                startSlider();
            });

            prevButton.addEventListener('click', () => {
                showSlide(currentSlide - 1);
                startSlider();
            });

            dots.forEach((dot, i) => {
                dot.addEventListener('click', () => {
                    showSlide(i);
                    startSlider();
                });
            });

            // Пауза при наведении
            slider.parentElement.addEventListener('mouseenter', () => {
                clearInterval(slideInterval);
            });
            
            slider.parentElement.addEventListener('mouseleave', () => {
                startSlider();
            });
        }
    }

    function initSearch() {
        const searchInput = document.getElementById('search');
        if (!searchInput) return;

        searchInput.addEventListener('input', (e) => {
            const searchText = e.target.value.trim().toLowerCase();
            let filteredProducts = allProducts;

            if (searchText) {
                filteredProducts = allProducts.filter(product => 
                    product.name.toLowerCase().includes(searchText)
                );
            }

            productsModule.renderProducts(filteredProducts);
        });
    }

    function initCart() {
        const busketButton = document.getElementById('busketButton');
        const cartElement = document.getElementById('cart');
        function saveCartData() {
            localStorage.setItem('cartData', JSON.stringify(cartData));
        }

        function renderCart() {
            if (!cartElement) return;
            
            cartElement.innerHTML = `
                <div class="flex justify-between items-center mb-4">
                    <h2 class="text-2xl font-bold text-white">Корзина</h2>
                    <button id="closeCart" class="text-white text-2xl cursor-pointer hover:text-gray-300">✕</button>
                </div>
                <div id="cart-items" class="flex-grow"></div>
                <div id="cart-total" class="text-white font-bold mt-4 pt-4 border-t border-gray-600 text-xl"></div>
            `;

            const cartItems = document.getElementById('cart-items');
            const cartTotal = document.getElementById('cart-total');
            const closeCartBtn = document.getElementById('closeCart');

            if (closeCartBtn) {
                closeCartBtn.addEventListener('click', () => {
                    cartElement.classList.add('hidden');
                });
            }

            if (cartData.length === 0) {
                cartItems.innerHTML = '<p class="text-white text-center py-4">Корзина пуста</p>';
                cartTotal.textContent = '';
                return;
            }

            let total = 0;
            cartData.forEach(item => {
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
                    </div>
                `;
            });

            cartTotal.innerHTML = `
                <div class="flex justify-between">
                    <span>Итого:</span>
                    <span>${total} руб.</span>
                </div>
                <button id="checkout-btn" class="w-full mt-4 bg-indigo-600 text-white py-2 rounded hover:bg-indigo-700">
                    Оформить заказ
                </button>
            `;

            // Обработчики для кнопок в корзине
            document.querySelectorAll('.remove-item').forEach(btn => {
                btn.addEventListener('click', (e) => {
                    const productId = parseInt(e.target.closest('.remove-item').dataset.id);
                    removeFromCart(productId);
                });
            });

            document.querySelectorAll('.decrease-btn').forEach(btn => {
                btn.addEventListener('click', (e) => {
                    const productId = parseInt(e.target.closest('.decrease-btn').dataset.id);
                    updateQuantity(productId, 'decrease');
                });
            });

            document.querySelectorAll('.increase-btn').forEach(btn => {
                btn.addEventListener('click', (e) => {
                    const productId = parseInt(e.target.closest('.increase-btn').dataset.id);
                    updateQuantity(productId, 'increase');
                });
            });
            
            // Обработчик оформления заказа
            const checkoutBtn = document.getElementById('checkout-btn');
            if (checkoutBtn) {
                checkoutBtn.addEventListener('click', () => {
                    alert('Заказ оформлен! Спасибо за покупку!');
                    cartData = [];
                    saveCartData(); // Сохраняем пустую корзину
                    cartElement.classList.add('hidden');
                });
            }
        }

        function showCart() {
            renderCart();
            cartElement.classList.remove('hidden');
        }

        function addToCart(productId) {
            const product = allProducts.find(item => item.id === productId);
            if (!product) return;

            const existingItem = cartData.find(item => item.id === productId);
            
            if (existingItem) {
                existingItem.quantity++;
            } else {
                cartData.push({ ...product, quantity: 1 });
            }
            
            showNotification(`Добавлено в корзину: ${product.name}`);
            renderCart();
            saveCartData(); // Сохраняем корзину
        }

        function removeFromCart(productId) {
            cartData = cartData.filter(item => item.id !== productId);
            renderCart();
            saveCartData(); // Сохраняем корзину
        }

        function updateQuantity(productId, action) {
            const item = cartData.find(item => item.id === productId);
            if (!item) return;
            
            if (action === "increase") {
                item.quantity++;
            } else if (action === "decrease") {
                item.quantity = Math.max(1, item.quantity - 1);
            }
            
            renderCart();
            saveCartData(); // Сохраняем корзину
        }

        function showNotification(message) {
            let notification = document.getElementById("cart-notification");
            if (notification) notification.remove();
            
            notification = document.createElement("div");
            notification.id = "cart-notification";
            notification.textContent = message;
            notification.className = "fixed bottom-4 right-4 bg-green-500 text-white px-4 py-2 rounded shadow-lg z-50 animate-fade-in";
            
            document.body.appendChild(notification);
            
            setTimeout(() => {
                notification.classList.remove("animate-fade-in");
                notification.classList.add("animate-fade-out");
                setTimeout(() => notification.remove(), 300);
            }, 2000);
        }

        // Инициализация корзины
        if (busketButton) {
            busketButton.addEventListener('click', showCart);
        }
        
        return { 
            addToCart, 
            renderCart, 
            removeFromCart, 
            updateQuantity 
        };
    }

    // ==================== КАРТОЧКИ ТОВАРОВ ====================
    function initProducts(cart) {
        const appContainer = document.getElementById('app');
        if (!appContainer) return { renderProducts: () => {} };

        // Обработчик клика для кнопок корзины (добавлен один раз)
        appContainer.addEventListener('click', function(e) {
            const cartBtn = e.target.closest('.cart-btn');
            if (cartBtn) {
                const productId = parseInt(cartBtn.dataset.id);
                cart.addToCart(productId);
            }
        });

        function createCard(product) {
            const { id, image, newPrice, oldPrice, discount, name } = product;
            
            const card = document.createElement("div");
            card.className = "card w-full max-w-xs bg-white shadow-lg rounded-lg overflow-hidden";
            
            // Определяем цену для отображения
            const displayPrice = isSaleActive ? newPrice : (oldPrice || newPrice);
            const displayOldPrice = isSaleActive && oldPrice ? oldPrice : null;
            const showDiscount = isSaleActive && discount;
            
            card.innerHTML = `
                <div class="relative h-48 bg-gray-200 flex items-center justify-center">
                    ${image ? 
                        `<img src="/src/img/${image}" alt="${name}" class="w-full h-full object-cover">` : 
                        '<span class="text-gray-500">Изображение товара</span>'
                    }
                    ${showDiscount ? 
                        `<div class="absolute left-2 top-2 bg-red-500 text-white font-bold px-2 py-1 rounded">
                            -${discount}%
                        </div>` : ''
                    }
                    <button class="absolute right-2 bottom-2 p-2 bg-indigo-600 rounded-full text-white cursor-pointer hover:bg-indigo-700 cart-btn" data-id="${id}">
                        <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                            <path d="M3 1a1 1 0 000 2h1.22l.305 1.222a.997.997 0 00.01.042l1.358 5.43-.893.892C3.74 11.846 4.632 14 6.414 14H15a1 1 0 000-2H6.414l1-1H14a1 1 0 00.894-.553l3-6A1 1 0 0017 3H6.28l-.31-1.243A1 1 0 005 1H3zM16 16.5a1.5 1.5 0 11-3 0 1.5 1.5 0 013 0zM6.5 18a1.5 1.5 0 100-3 1.5 1.5 0 000 3z" />
                        </svg>
                    </button>
                </div>
                <div class="p-4">
                    <div class="flex justify-between items-center mb-2">
                        <div class="text-lg font-bold">${displayPrice} ₽</div>
                        ${displayOldPrice ? `<div class="text-gray-500 line-through text-sm">${displayOldPrice} ₽</div>` : ''}
                    </div>
                    <div class="name text-gray-800">${name}</div>
                </div>
            `;
            
            return card;
        }

        function renderProducts(productsToRender = allProducts) {
            if (!appContainer) return;
            
            appContainer.innerHTML = '';
            productsToRender.forEach(product => {
                const card = createCard(product);
                appContainer.appendChild(card);
            });
        }

        return { renderProducts };
    }

    // ==================== МОДАЛЬНОЕ ОКНО ====================
    function initModal() {
        const modal = document.getElementById('productModal');
        const backgroundModal = document.getElementById('backgroundModal');
        const closeProductModal = document.getElementById('closeProductModal');
        const productForm = document.getElementById('updateProductForm');
        const addProductButton = document.getElementById('add-product-button');

        function openModal() {
            if (!modal || !backgroundModal) return;
            modal.classList.remove('hidden');
            backgroundModal.classList.remove('hidden');
            document.body.classList.add('overflow-hidden');
        }

        function closeModal() {
            if (!modal || !backgroundModal) return;
            modal.classList.add('hidden');
            backgroundModal.classList.add('hidden');
            document.body.classList.remove('overflow-hidden');
        }

        // Инициализация модального окна
        if (closeProductModal) {
            closeProductModal.addEventListener('click', closeModal);
        }
        
        if (addProductButton) {
            addProductButton.addEventListener('click', openModal);
        }
        
        if (productForm) {
            productForm.addEventListener('submit', function(e) {
                e.preventDefault();
                
                const name = document.getElementById('productName')?.value;
                const newPrice = parseFloat(document.getElementById('productNewPrice')?.value);
                const oldPrice = parseFloat(document.getElementById('productOldPrice')?.value);
                const discount = parseInt(document.getElementById('productDiscount')?.value);
                
                if (!name || isNaN(newPrice) || isNaN(discount)) {
                    alert('Пожалуйста, заполните обязательные поля');
                    return;
                }
                
                const newId = allProducts.length > 0 
                    ? Math.max(...allProducts.map(p => p.id)) + 1 
                    : 1;
                
                const product = {
                    id: newId,
                    image: "image_6.jpg",
                    name: name,
                    newPrice: newPrice,
                    oldPrice: isNaN(oldPrice) ? null : oldPrice,
                    discount: discount,
                };
                
                allProducts.push(product);
                localStorage.setItem('cards', JSON.stringify(allProducts));
                
                productsModule.renderProducts();
                closeModal();
                productForm.reset();
            });
        }
    }

    // ==================== ТАЙМЕР ====================
    function initTimer() {
        const timer = document.createElement("div");
        timer.classList.add(
            "font-bold", "text-4xl", "text-red-500", "flex", 
            "justify-center", "my-6", "p-4", "bg-gray-100", "rounded"
        );
        
        const hoursSpan = document.createElement("span");
        const minutesSpan = document.createElement("span");
        minutesSpan.textContent = "00:";
        const secondsSpan = document.createElement("span");
        secondsSpan.textContent = "05";
        
        timer.appendChild(hoursSpan);
        timer.appendChild(minutesSpan);
        timer.appendChild(secondsSpan);
        
        // Добавляем таймер перед контейнером приложения
        const appContainer = document.getElementById('app');
        if (appContainer && appContainer.parentNode) {
            appContainer.parentNode.insertBefore(timer, appContainer);
        }
        
        let hours = 0;
        let minutes = 0;
        let seconds = 5;
        
        // Запуск таймера
        const secondsInterval = setInterval(() => {
            if (seconds > 0) {
                seconds--;
                secondsSpan.textContent = seconds.toString().padStart(2, '0');
            } else {
                if (minutes === 0 && hours === 0) {
                    clearInterval(secondsInterval);
                    timer.innerHTML = '<span class="text-2xl">Акция завершена!</span>';
                    
                    // Деактивируем акцию
                    isSaleActive = false;
                    
                    // Перерисовываем продукты и корзину
                    productsModule.renderProducts();
                    cartModule.renderCart();
                    
                    return;
                }
                
                seconds = 59;
                secondsSpan.textContent = seconds.toString().padStart(2, '0');
                
                if (minutes > 0) {
                    minutes--;
                    minutesSpan.textContent = minutes.toString().padStart(2, '0') + ':';
                } else {
                    minutes = 59;
                    minutesSpan.textContent = minutes.toString().padStart(2, '0') + ':';
                    
                    if (hours > 0) {
                        hours--;
                        hoursSpan.textContent = hours.toString().padStart(2, '0') + ':';
                    }
                }
            }
        }, 1000);
    }

    // ==================== ИНИЦИАЛИЗАЦИЯ ПРИЛОЖЕНИЯ ====================
    function initApp() {
        // Загрузка данных
        const savedCards = JSON.parse(localStorage.getItem('cards'));
        allProducts = savedCards && savedCards.length > 0 ? savedCards : [...objCards];
        if (!savedCards) {
            localStorage.setItem('cards', JSON.stringify(allProducts));
        }
        
        // Загрузка корзины из localStorage
        cartData = JSON.parse(localStorage.getItem('cartData')) || [];
        
        // Инициализация модулей
        initSlider();
        cartModule = initCart(); // Сохраняем модуль корзины
        productsModule = initProducts(cartModule); // Сохраняем модуль продуктов
        initModal();
        initTimer();
        initSearch(); // Инициализация поиска
        
        // Рендер продуктов
        productsModule.renderProducts();
        
        // Возвращаем публичные методы
        return { 
            cart: cartModule, 
            products: productsModule 
        };
    }

    // Запускаем приложение
    window.shopApp = initApp();
});