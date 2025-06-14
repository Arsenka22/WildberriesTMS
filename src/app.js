const slider = document.getElementById('slider');
const prevBtn = document.getElementById('prev');
const nextBtn = document.getElementById('next');
const dots = document.querySelectorAll('.dot');

const totalSlides = slider.children.length;
let currentSlide = 0;

// Функция для обновления позиции слайдера
function updateSlider() {
    const offset = -currentSlide * 100;
    slider.style.transform = `translateX(${offset}%)`;

    // Обновление активного индикатора
    dots.forEach((dot, index) => {
        dot.classList.toggle('bg-yellow-400', index === currentSlide);
        dot.classList.toggle('bg-yellow-200', index !== currentSlide);
    });
}

// Обработчик кнопки "влево"
prevBtn.addEventListener('click', () => {
    currentSlide = (currentSlide - 1 + totalSlides) % totalSlides;
    updateSlider();
});

// Обработчик кнопки "вправо"
nextBtn.addEventListener('click', () => {
    currentSlide = (currentSlide + 1) % totalSlides;
    updateSlider();
});

// Обработчик кнопок-индикаторов
dots.forEach((dot, index) => {
    dot.addEventListener('click', () => {
        currentSlide = index;
        updateSlider();
    });
});

// Инициализация первого состояния
updateSlider();