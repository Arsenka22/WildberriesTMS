import { searchGoods } from './search.js';
//для примера
const items = [{ name: 'cofe' }, { name: 'switshots' }, { name: 'pants' }, { name: 'Watch' }, { name: 'screwDriver' }];

export const search = document.getElementById('search');
// let searchValue;

search.addEventListener('focus', () => {
  search.classList.remove('text-center');
});
search.addEventListener('blur', () => {
  search.classList.add('text-center');
  search.value = '';
});

search.addEventListener('input', () => {
  console.log('🚀 ~ search.addEventListener ~ searchGoods:', searchGoods(items));
});
