const search = document.getElementById('search');
let searchValue;

search.addEventListener('focus', () => {
  search.classList.remove('text-center');
});
search.addEventListener('blur', () => {
  search.classList.add('text-center');
});
search.addEventListener('input', () => {
  setTimeout(() => {
    searchValue = search.value;
    console.log('🚀 ~ setTimeout ~ searchValue:', searchValue);
  }, 500);
});
