import { searchGoods } from './search.js';

//для проверки загружаю в память
const items = [
  { id: '1', image: 'scr', oldPrice: '123', name: 'cofe' },
  { id: '1', image: 'scr', oldPrice: '123', name: 'smth' },
  { id: '1', image: 'scr', oldPrice: '123', name: 'кофта' },
  { id: '1', image: 'scr', oldPrice: '123', name: 'штаны' },
  { id: '1', image: 'scr', oldPrice: '123', name: 'screwDriver' },
];
localStorage.setItem('cards', JSON.stringify(items));
//

export const search = document.getElementById('search');

// переводит курсор влево, при фокусе
search.addEventListener('focus', () => {
  search.classList.remove('text-center');
});

// сбрасываем поле поиска в исходное состояние при потере фокуса
search.addEventListener('blur', () => {
  search.classList.add('text-center');
  search.value = '';
});

search.addEventListener('input', () => {
  const cards = JSON.parse(localStorage.getItem('cards'));
  console.log('🚀 ~ search.addEventListener ~ searchGoods:', searchGoods(cards));
  // в моем понимании результат должен уйти на отрисовку
});
