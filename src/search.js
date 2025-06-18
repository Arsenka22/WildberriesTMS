let timer;

export function searchGoods(goods = []) {
  clearTimeout(timer);
  timer = setTimeout(() => {
    let searchValue = search.value.trim().toLowerCase();
    console.log(goods);
    const result = goods.filter((item) => item.name.toLowerCase().includes(searchValue));
    console.log('🚀 ~ timer=setTimeout ~ result:', result);
    return result;
  }, 500);
}
