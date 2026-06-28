document.addEventListener('DOMContentLoaded', function () {
  document.querySelectorAll('.placement__card-more').forEach(function (btn) {
    btn.addEventListener('click', function (e) {
      e.preventDefault();
      const details = btn.parentElement.querySelector(
        '.placement__card-details'
      );
      if (details) {
        details.classList.toggle('active');
        btn.classList.toggle('active');
        btn.textContent = details.classList.contains('active')
          ? 'Скрыть ↑'
          : 'Подробнее ↓';
      }
    });
  });
});

// Модальное окно бронирования
document.addEventListener('DOMContentLoaded', function () {
  const modal = document.getElementById('bookingModal');
  const modalClose = document.getElementById('modalClose');
  const copyBtn = document.getElementById('copyNumber');
  const phoneNumber = '+79394624343';

  // Открытие модального окна при клике на кнопки "Забронировать"
  document.querySelectorAll('.btn-primary, .header__btn').forEach((btn) => {
    if (!btn.classList.contains('btn-pick')) {
      btn.addEventListener('click', function (e) {
        e.preventDefault();
        openModal();
      });
    }
  });

  // Закрытие модального окна
  modalClose.addEventListener('click', closeModal);
  modal.addEventListener('click', function (e) {
    if (e.target === modal) closeModal();
  });

  // Копирование номера телефона
  copyBtn.addEventListener('click', function () {
    navigator.clipboard
      .writeText(phoneNumber)
      .then(() => {
        const originalText = copyBtn.innerHTML;
        copyBtn.innerHTML = `
        <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
          <path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41z"/>
        </svg>
        Скопировано!
      `;
        copyBtn.style.background = '#78a55a';

        setTimeout(() => {
          copyBtn.innerHTML = originalText;
          copyBtn.style.background = '';
        }, 2000);
      })
      .catch(() => {
        alert('Не удалось скопировать номер');
      });
  });

  // Переключение вкладок
  document.querySelectorAll('.tab-btn').forEach((btn) => {
    btn.addEventListener('click', function () {
      // Убираем активный класс у всех вкладок
      document.querySelectorAll('.tab-btn').forEach((b) => {
        b.classList.remove('active');
        b.setAttribute('aria-selected', 'false');
      });

      // Скрываем весь контент
      document.querySelectorAll('.tab-content').forEach((content) => {
        content.classList.remove('active');
        content.setAttribute('hidden', 'true');
      });

      // Активируем текущую вкладку
      this.classList.add('active');
      this.setAttribute('aria-selected', 'true');

      const tabId = this.dataset.tab + 'Tab';
      const tabContent = document.getElementById(tabId);
      tabContent.classList.add('active');
      tabContent.removeAttribute('hidden');
    });
  });

  // Закрытие по ESC
  document.addEventListener('keydown', function (e) {
    if (e.key === 'Escape' && modal.classList.contains('active')) {
      closeModal();
    }
  });

  function openModal() {
    modal.classList.add('active');
    document.body.style.overflow = 'hidden';

    // Сбрасываем к первоначальной вкладке
    document.querySelectorAll('.tab-btn').forEach((btn, index) => {
      if (index === 0) {
        btn.classList.add('active');
        btn.setAttribute('aria-selected', 'true');
      } else {
        btn.classList.remove('active');
        btn.setAttribute('aria-selected', 'false');
      }
    });

    document.querySelectorAll('.tab-content').forEach((content, index) => {
      if (index === 0) {
        content.classList.add('active');
        content.removeAttribute('hidden');
      } else {
        content.classList.remove('active');
        content.setAttribute('hidden', 'true');
      }
    });
  }

  function closeModal() {
    modal.classList.remove('active');
    document.body.style.overflow = '';
  }
});
