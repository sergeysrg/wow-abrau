document.addEventListener('DOMContentLoaded', function () {
  const burger = document.getElementById('burger');
  const nav = document.getElementById('nav');

  // Проверяем, что элементы существуют
  if (!burger || !nav) {
    return;
  }

  const body = document.body;
  const html = document.documentElement;
  const fixedElements = document.querySelectorAll('.fixed-element');
  let scrollPosition = 0;

  // Функция для вычисления ширины скроллбара
  function getScrollbarWidth() {
    return window.innerWidth - html.clientWidth;
  }

  // Блокировка скролла с компенсацией
  function lockScroll() {
    scrollPosition = window.scrollY;
    const scrollbarWidth = getScrollbarWidth();

    // Устанавливаем CSS переменные
    html.style.setProperty('--scrollbar-width', `${scrollbarWidth}px`);
    html.style.setProperty('--scroll-top', `-${scrollPosition}px`);

    // Блокируем скролл
    body.style.overflow = 'hidden';
    body.style.position = 'fixed';
    body.style.top = `-${scrollPosition}px`;
    body.style.width = '100%';
    body.style.paddingRight = `${scrollbarWidth}px`;

    // Компенсация для фиксированных элементов
    fixedElements.forEach((el) => {
      el.style.paddingRight = `${scrollbarWidth}px`;
    });
  }

  // Разблокировка скролла
  function unlockScroll() {
    // Удаляем CSS переменные
    html.style.removeProperty('--scrollbar-width');
    html.style.removeProperty('--scroll-top');

    // Разблокируем скролл
    body.style.removeProperty('overflow');
    body.style.removeProperty('position');
    body.style.removeProperty('top');
    body.style.removeProperty('width');
    body.style.removeProperty('padding-right');

    // Восстанавливаем padding для фиксированных элементов
    fixedElements.forEach((el) => {
      el.style.removeProperty('padding-right');
    });

    // Возвращаем позицию скролла
    window.scrollTo(0, scrollPosition);
  }

  // Управление меню
  burger.addEventListener('click', function () {
    const isActive = this.classList.toggle('active');
    nav.classList.toggle('active');

    if (isActive) {
      lockScroll();
    } else {
      unlockScroll();
    }

    // Обновляем aria-атрибут для доступности
    this.setAttribute('aria-expanded', isActive);
  });

  // Закрытие меню при клике на ссылку
  document.querySelectorAll('.nav__list-item a').forEach((link) => {
    link.addEventListener('click', () => {
      if (window.innerWidth <= 768 && nav.classList.contains('active')) {
        burger.classList.remove('active');
        nav.classList.remove('active');
        unlockScroll();
        burger.setAttribute('aria-expanded', 'false');
      }
    });
  });

  // Закрытие меню при клике вне его области
  document.addEventListener('click', function (event) {
    if (
      !nav.contains(event.target) &&
      !burger.contains(event.target) &&
      nav.classList.contains('active')
    ) {
      burger.classList.remove('active');
      nav.classList.remove('active');
      unlockScroll();
      burger.setAttribute('aria-expanded', 'false');
    }
  });

  // Закрытие меню по клавише ESC
  document.addEventListener('keydown', function (event) {
    if (event.key === 'Escape' && nav.classList.contains('active')) {
      burger.classList.remove('active');
      nav.classList.remove('active');
      unlockScroll();
      burger.setAttribute('aria-expanded', 'false');
    }
  });

  // Закрытие меню при изменении размера окна
  window.addEventListener('resize', function () {
    if (window.innerWidth > 768 && nav.classList.contains('active')) {
      burger.classList.remove('active');
      nav.classList.remove('active');
      unlockScroll();
      burger.setAttribute('aria-expanded', 'false');
    }
  });
});
