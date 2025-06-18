let timer;

export function searchGoods(goods = []) {
  if (Array.isArray(goods)) {
    clearTimeout(timer);
    timer = setTimeout(() => {
      let searchValue = search.value.trim().toLowerCase();
      console.log(goods); // проверить что пришло
      // ищу совпадение с началом строки
      const result = goods.filter((item) => item.name.toLowerCase().startsWith(searchValue));
      console.log('🚀 ~ timer=setTimeout ~ result:', result); // проверить что ушло
      return result;
    }, 500);
  } else {
    return []; // что бы не поломать рендер
  }
}
