document.addEventListener('DOMContentLoaded', () => {
  const swiper = new Swiper('.placement__card-gallery', {
    loop: true, // Бесконечная прокрутка
    navigation: {
      nextEl: '.swiper-button-next',
      prevEl: '.swiper-button-prev',
    },
    pagination: {
      el: '.swiper-pagination',
      clickable: true,
    },
  });
});
