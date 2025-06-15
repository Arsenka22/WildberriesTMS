const app = document.createElement('div');
app.classList.add('app', 'flex', 'justify-between');

const objCards = [
  {
    id: 1,
    image: 'image_1.jpg',
    name: 'Сумка',
    newPrice: 100,
    oldPrice: 150,
    discount: 33
  },
  {
    id: 2,
    image: 'image_2.jpg',
    name: 'Золотой браслет',
    newPrice: 200,
    oldPrice: 350,
    discount: 43
  },
  {
    id: 3,
    image: 'image_3.jpg',
    name: 'Кожаный ремень',
    newPrice: 50,
    oldPrice: 100,
    discount: 50
  },
  {
    id: 4,
    image: 'image_4.jpg',
    name: 'Кроссовки',
    newPrice: 100,
    oldPrice: 250,
    discount: 60
  },
  {
    id: 5,
    image: 'image_5.jpg',
    name: 'Вязаная кофта',
    newPrice: 75,
    oldPrice: 95,
    discount: 21
  }
];

function setCard(obj) {
  localStorage.setItem('cards', JSON.stringify(obj));
}

function getCard() {
  const savedCards = JSON.parse(localStorage.getItem('cards'))
  if (savedCards && savedCards.length > 0) {
    savedCards.forEach(cards => {
      const card = createCard(cards);
      app.appendChild(card);
    })
  } else {
    setCard(objCards);
  };
}

function createCard({
  id,
  image,
  basket = true,
  newPrice,
  oldPrice,
  discount,
  name
} = {}) {
  // Проверка на минимально необходимые данные
  if (!name && !image) {
    console.warn('Карточка товара должна содержать хотя бы название или изображение');
    return null;
  }

  // Создание основных элементов
  const card = document.createElement('div');
  card.classList.add('card');

  const cardBody = document.createElement('div');
  cardBody.classList.add('card-body', 'relative');

  const cardFooter = document.createElement('div');
  cardFooter.classList.add('card-footer');

  // Добавление ID если указан
  if (id) {
    if (typeof id === 'string' || typeof id === 'number') {
      card.id = `card-${id}`;
    } else {
      console.warn('ID должен быть строкой или числом');
    }
  }

  // Добавление изображения с проверкой URL
  if (image) {
    try {
      // new URL(`./img/${image}`); // Проверка валидности URL
      const img = document.createElement('img');
      img.src = `/img/${image}`;
      img.alt = name ? `Изображение ${name}` : 'Изображение товара';
      img.classList.add('w-[250px]', 'h-[300px]', 'object-cover');
      cardBody.appendChild(img);
    } catch (e) {
      console.warn('Некорректный URL изображения:', image);
    }
  } console.log(`./img/${image}`)

  // Добавление скидки
  if (discount) {
    const discountEl = document.createElement('div');
    discountEl.classList.add('discount', 'absolute', 'left-[0.5rem]', 'bottom-[1rem]', 'font-bold', 'text-white');

    // Проверка что discount - число
    const discountValue = typeof discount === 'number' ? discount : parseFloat(discount);
    if (!isNaN(discountValue)) {
      discountEl.textContent = `-${Math.round(discountValue)}%`;
      cardBody.appendChild(discountEl);
    } else {
      console.warn('Некорректное значение скидки:', discount);
    }
  }

  // Добавление кнопки корзины
  if (basket) {
    const basketBtn = document.createElement('button');
    basketBtn.classList.add('absolute', 'right-[0.5rem]', 'bottom-[1rem]', 'p-2', 'bg-indigo-600', 'rounded-full', 'text-white', 'cursor-pointer');
    basketBtn.innerHTML = '';
    basketBtn.type = 'button';
    const basketIcon = document.createElement('img')
    basketIcon.src = `/img/icons/cart.svg`;
    basketIcon.classList.add('w-[20px]')
    basketBtn.appendChild(basketIcon)
    cardBody.appendChild(basketBtn);
  }

  // Добавление цен и скидки
  if (newPrice) {
    const cardFooterPart1 = document.createElement('div');
    cardFooterPart1.classList.add('flex', 'justify-between', 'w-full', 'mb-[20px]');
    const priceEl = document.createElement('div');
    priceEl.classList.add('new-price', 'font-bold');
    priceEl.textContent = typeof newPrice === 'number' ? `${newPrice} р` : newPrice;
    cardFooterPart1.appendChild(priceEl);

    if (oldPrice) {
      const oldPriceEl = document.createElement('div');
      oldPriceEl.classList.add('old-price', 'font-bold', 'text-right', 'line-through');
      oldPriceEl.textContent = typeof oldPrice === 'number' ? `${oldPrice} р` : oldPrice;
      cardFooterPart1.appendChild(oldPriceEl);
    }
    cardFooter.appendChild(cardFooterPart1);
  }

  // Добавление названия товара
  if (name) {
    const nameEl = document.createElement('div');
    nameEl.classList.add('name');
    nameEl.textContent = name;
    cardFooter.appendChild(nameEl);
  }

  // Сборка карточки
  card.append(cardBody, cardFooter);
  app.append(card);

  // Добавление app в DOM только если его там нет
  if (!document.body.contains(app)) {
    document.body.appendChild(app);
  }

  return card;
}

getCard();
