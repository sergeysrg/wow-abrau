// ======================================
// Пути к изображениям в формате WebP
// ======================================

const bgWebp = [
  'img/activities/routes.webp',
  'img/activities/winery.webp',
  'img/activities/walking.webp',
  'img/activities/sailing.webp',
];

// ======================================
// Запасные изображения JPG
// Используются если браузер
// не смог загрузить WebP
// ======================================

const bgJpg = [
  'img/activities/routes.jpg',
  'img/activities/winery.jpg',
  'img/activities/walking.jpg',
  'img/activities/sailing.jpg',
];

// ======================================
// Получаем все карточки слайдов
// ======================================

const slides = document.querySelectorAll('.slide');

// Получаем контейнер слайдера
const slider = document.querySelector('.activities__main');

// ======================================
// Переменные состояния
// ======================================

// Индекс текущего активного слайда
let currentSlide = 0;

// Координата X начала свайпа
let startX = 0;

// Флаг: пользователь сейчас свайпает
let isDragging = false;

// ======================================
// Проверяем существование элементов
// ======================================

if (slides.length && slider) {
  // ======================================
  // Предзагрузка изображений
  // ======================================

  slides.forEach((slide, idx) => {
    // Создаем временное изображение
    const img = new Image();

    // Пытаемся загрузить WebP
    img.src = bgWebp[idx];

    // Если загрузка успешна
    img.onload = () => {
      slide.style.backgroundImage = `url("${bgWebp[idx]}")`;
    };

    // Если произошла ошибка
    img.onerror = () => {
      slide.style.backgroundImage = `url("${bgJpg[idx]}")`;
    };
  });

  // ======================================
  // Активация слайда
  // ======================================

  function activateSlide(index) {
    // Убираем активный класс
    // у всех слайдов
    slides.forEach((slide) => {
      slide.classList.remove('slide-active');
    });

    // Добавляем активный класс
    // нужному слайду
    slides[index].classList.add('slide-active');

    // Сохраняем текущий индекс
    currentSlide = index;
  }

  // ======================================
  // Переход к следующему слайду
  // ======================================

  function nextSlide() {
    activateSlide((currentSlide + 1) % slides.length);
  }

  // ======================================
  // Переход к предыдущему слайду
  // ======================================

  function prevSlide() {
    activateSlide((currentSlide - 1 + slides.length) % slides.length);
  }

  // ======================================
  // Начало свайпа
  // ======================================

  function handleTouchStart(e) {
    // Запоминаем координату пальца
    startX = e.touches[0].clientX;

    // Включаем режим свайпа
    isDragging = true;

    // Убираем анимацию
    // чтобы элемент двигался сразу
    slider.style.transition = 'none';
  }

  // ======================================
  // Во время свайпа
  // ======================================

  function handleTouchMove(e) {
    // Если свайп не начат
    if (!isDragging) return;

    // Вычисляем смещение пальца
    const diff = e.touches[0].clientX - startX;

    // Реагируем только на заметное движение
    if (Math.abs(diff) > 50) {
      // Отключаем прокрутку страницы
      e.preventDefault();

      // Сдвигаем контейнер
      slider.style.transform = `translateX(${diff}px)`;
    }
  }

  // ======================================
  // Конец свайпа
  // ======================================

  function handleTouchEnd(e) {
    if (!isDragging) return;

    // Завершаем свайп
    isDragging = false;

    // Получаем координату конца свайпа
    const endX = e.changedTouches[0].clientX;

    // Разница между началом и концом
    const diff = endX - startX;

    // Возвращаем анимацию
    slider.style.transition = 'transform .3s ease';

    // Возвращаем контейнер на место
    slider.style.transform = 'translateX(0)';

    // Если свайп достаточно длинный
    if (Math.abs(diff) > 50) {
      // Свайп вправо
      if (diff > 0) {
        prevSlide();
      } else {
        // Свайп влево
        nextSlide();
      }
    }
  }

  // ======================================
  // Инициализация слайдера
  // ======================================

  function initSlider() {
    // Первый слайд делаем активным
    activateSlide(0);

    // ======================================
    // Мобильная версия
    // ======================================

    if (window.innerWidth <= 360) {
      // Начало касания
      slider.addEventListener('touchstart', handleTouchStart, {
        passive: true,
      });

      // Движение пальца
      slider.addEventListener('touchmove', handleTouchMove, { passive: false });

      // Конец касания
      slider.addEventListener('touchend', handleTouchEnd);
    }

    // ======================================
    // Десктопная версия
    // ======================================
    else {
      slides.forEach((slide, index) => {
        // При клике делаем
        // карточку активной
        slide.onclick = () => {
          activateSlide(index);
        };
      });
    }
  }

  // ======================================
  // Запускаем слайдер
  // ======================================

  initSlider();

  // ======================================
  // Debounce для resize
  // ======================================

  let resizeTimer;

  window.addEventListener('resize', () => {
    // Удаляем старый таймер
    clearTimeout(resizeTimer);

    // Создаем новый
    resizeTimer = setTimeout(() => {
      // После окончания resize
      // возвращаем первый слайд
      activateSlide(0);
    }, 150);
  });
}
