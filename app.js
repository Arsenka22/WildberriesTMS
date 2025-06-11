const app = document.getElementById('app');



function createPopularCard({ id, image, basket, sale, newPrice, oldPrise, text }) {
  const card = document.createElement('div');
  card.className = 'card';

  const cardMain = document.createElement('div');
  cardMain.className = 'cardMain';
  card.appendChild(cardMain);

  const cardFooter = document.createElement('div');
  cardFooter.className = 'cardFooter';
  card.appendChild(cardFooter);

  if (id) {
    popularProductCard.id = id;
  }
  if (image) {
    const createImage = document.createElement("img");
    createImage.src = `../img/${img}`;
  }
  if (basket) {
    const creatButton = document.createElement('button');
    creatButton.textContent = '../img/icons/shopping-cart.svg';
  }
  if (sale) {
    const creatSale = document.createElement('span');
    creatSale.textContent = `-${sale}%`;
  }
  if (newPrice) {
    const creatNewPrice = document.createElement('span');
    creatNewPrice.textContent = `-${newPrice}%`;
  }
  if (oldPrise) {
    const creatOldPrise = document.createElement('span');
    creatOldPrise.textContent = `-${oldPrise}%`;
  }
  if (text) {
    const creatText = document.createElement('span');
    creatText.textContent = text;
  }
  return card
}
