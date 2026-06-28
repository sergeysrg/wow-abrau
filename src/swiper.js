document.querySelectorAll('.placement__card-gallery').forEach((gallery) => {
  const nextEl = gallery.querySelector('.swiper-button-next');

  const prevEl = gallery.querySelector('.swiper-button-prev');

  const paginationEl = gallery.querySelector('.swiper-pagination');

  if (!nextEl || !prevEl || !paginationEl) return;

  new Swiper(gallery, {
    loop: true,

    navigation: {
      nextEl,
      prevEl,
    },

    pagination: {
      el: paginationEl,
      clickable: true,
    },
  });
});
