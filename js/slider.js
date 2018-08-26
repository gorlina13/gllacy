'use strict';

(function () {
  var body = document.querySelector('body');
  var sliders = document.querySelectorAll('.slider');
  var BACKGROUND_CLASS = 'body--background-';
  var PARENT_CLASS = 'slider__list--show-';

  function handleSlider(slider) {
    var controls = slider.querySelectorAll('.slider__control');
    controls = Array.prototype.slice.call(controls);
    var slides = slider.querySelectorAll('.slider__item');
    slides = Array.prototype.slice.call(slides);
    var buttonsWithin = slider.querySelectorAll('.button');

    function makeControlActive(currentControl) {
      controls.forEach(function (item) {
        item.classList.remove('slider__control--active');
      });

      currentControl.classList.add('slider__control--active');
    }

    function showSlide(currentControl) {
      slides.forEach(function (item) {
        var index = slides.indexOf(item) + 1;
        item.parentElement.classList.remove(PARENT_CLASS + index);
        body.classList.remove(BACKGROUND_CLASS + index);
      });

      var controlIndex = controls.indexOf(currentControl);
      var index = controlIndex + 1;
      if (slides[controlIndex] !== null) {
        slides[controlIndex].parentElement.classList.add(PARENT_CLASS + index);
      }
      body.classList.add(BACKGROUND_CLASS + index);
    }

    function setTabindex() {
      if (buttonsWithin.length > 0) {
        [].forEach.call(buttonsWithin, function (item) {
          item.setAttribute('tabindex', -1);
          var slideIndex = slides.indexOf(item.parentElement);
          var index = slideIndex + 1;
          if (item.parentElement.parentElement.classList.contains(PARENT_CLASS + index)) {
            item.removeAttribute('tabindex');
          }
        });
      }
    }

    function syncSliderElements(currentControl) {
      makeControlActive(currentControl);
      showSlide(currentControl);
      setTabindex();
    }

    function runSlider() {
      setTabindex();

      controls.forEach(function (item) {
        item.addEventListener('click', function (event) {
          event.preventDefault();
          syncSliderElements(item);
        });
      });
    }

    runSlider();
  }

  if (sliders.length > 0) {
    [].forEach.call(sliders, function (item) {
      handleSlider(item);
    });
  }
})();
