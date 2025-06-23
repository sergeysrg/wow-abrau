let center = [44.70542607461317, 37.60327999999997];

function init() {
  let map = new ymaps.Map('map', {
    center: center,
    zoom: 15,
  });

  let placemark = new ymaps.Placemark(
    center,
    {},
    {
      iconLayout: 'default#image',
      iconImageHref: 'img/marker-map.svg',
      iconImageSize: [40, 40],
      iconImageOffset: [-20, -40],
    }
  );

  map.geoObjects.add(placemark);
}

ymaps.ready(init);
