export function searchGoods(goods = []) {
  let search = document.getElementById('search');
  let timer;
  search.addEventListener('input', () => {
    clearTimeout(timer);

    timer = setTimeout(() => {
      let searchValue = search.value.trim().toLowerCase();
      console.log(goods);

      const result = goods.filter((item) => item.name.toLowerCase().includes(searchValue));
      console.log('🚀 ~ setTimeout ~ searchValue:', searchValue);
      console.log('🚀 ~ result ~ result:', result);
    }, 500);
  });
}
