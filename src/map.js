const center = [44.70542607461317, 37.60327999999997];

function initMap() {
  try {
    const map = new ymaps.Map('map', {
      center,
      zoom: 15,
    });

    const placemark = new ymaps.Placemark(
      center,
      {},
      {
        iconLayout: 'default#image',
        iconImageHref: 'img/marker-map.svg',
        iconImageSize: [40, 40],
        iconImageOffset: [-20, -40],
      },
    );

    map.geoObjects.add(placemark);
  } catch (error) {
    console.error('Ошибка инициализации карты:', error);
  }
}

if (typeof ymaps !== 'undefined') {
  ymaps.ready(initMap);
}
