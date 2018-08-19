'use strict';

function initMap() {
  var ZOOM = 16;
  var TITLE = 'Глейси';

  var LAT_LNG = {
    lat: 59.938549,
    lng: 30.322993
  };

  var MAP_CENTER = {
    lat: 59.939305,
    lng: 30.329156
  };

  var MAP_OPTIONS = {
    zoom: ZOOM,
    center: MAP_CENTER,
    scrollwheel: false
  };

  var PIN_OPTIONS = {
    url: 'img/pin-with-shadow.png',
    width: 218,
    height: 142,
    anchorX: 40,
    anchorY: 142
  }

  var mapCanvas = document.querySelector('.contacts__interactive-map');

  if (mapCanvas !== null) {
    var map = new google.maps.Map(mapCanvas, MAP_OPTIONS);

    var pin = {
      url: PIN_OPTIONS.url,
      size: new google.maps.Size(PIN_OPTIONS.width, PIN_OPTIONS.height),
      anchor: new google.maps.Point(PIN_OPTIONS.anchorX, PIN_OPTIONS.anchorY)
    };

    var marker = new google.maps.Marker({
      position: LAT_LNG,
      map: map,
      title: TITLE,
      icon: pin
    });
  }
}
