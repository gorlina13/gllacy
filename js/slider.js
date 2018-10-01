'use strict';

(function () {
  var BODY_CLASS = 'body--background-';
  var SLIDER_LIST_CLASS = 'slider__list--show-';
  var body = document.querySelector('.body');
  var mainSlider = document.querySelector('#main-slider');
  var sliders = document.querySelectorAll('.slider');
  sliders = Array.prototype.slice.call(sliders);

  function handleSlider(slider) {
    var bodyBackgroundChanges = (slider === mainSlider) ? true : false;
    var controls = slider.querySelectorAll('.slider__control');
    var slides = slider.querySelectorAll('.slider__item');
    var buttonsWithin = slider.querySelectorAll('.button');
    controls = Array.prototype.slice.call(controls);
    slides = Array.prototype.slice.call(slides);
    buttonsWithin = Array.prototype.slice.call(buttonsWithin);

    function makeControlActive(control) {
      control.classList.add('slider__control--active');
    }

    function makeControlsInactive() {
      controls.forEach(function (item) {
        item.classList.remove('slider__control--active');
      });
    }

    function handleControls(currentControl) {
      makeControlsInactive();
      makeControlActive(currentControl);
    }

    function removeClassesBeforeShow() {
      slides.forEach(function (item, i) {
        var number = i + 1;
        item.parentElement.classList.remove(SLIDER_LIST_CLASS + number);
        if (bodyBackgroundChanges) {
          body.classList.remove(BODY_CLASS + number);
        }
      });
    }

    function setIndex(arr) {
      arr.forEach(function (item, i) {
        item.itemIndex = i;
      });
    }

    function showSlide(currentControl) {
      removeClassesBeforeShow();
      var index = currentControl.itemIndex;
      var number = index + 1;
      if (slides[index]) {
        slides[index].parentElement.classList.add(SLIDER_LIST_CLASS + number);
      }
      if (bodyBackgroundChanges) {
        body.classList.add(BODY_CLASS + number);
      }
    }

    function setTabindex() {
      if (buttonsWithin.length > 0) {
        buttonsWithin.forEach(function (item) {
          item.removeAttribute('tabindex');
          var element = item.parentElement;
          while (!(element.classList.contains('slider__list'))) {
            if (element.classList.contains('slider__item')) {
              var number = element.itemIndex + 1;
              if (!(element.parentElement.classList.contains(SLIDER_LIST_CLASS + number))) {
                item.setAttribute('tabindex', -1);
              }
              return;
            }
            element = element.parentElement;
          }
        });
      }
    }

    function syncSliderElements(currentControl) {
      handleControls(currentControl);
      showSlide(currentControl);
      setTabindex();
    }

    function onSliderClick(evt) {
      var target = evt.target;
      while (target !== evt.currentTarget) {
        if (target.classList.contains('slider__control')) {
          evt.preventDefault();
          syncSliderElements(target);
          return;
        }
        target = target.parentElement;
      }
    }

    function runSlider() {
      setIndex(controls);
      setIndex(slides);
      setTabindex();

      slider.addEventListener('click', function (evt) {
        onSliderClick(evt);
      });
    }

    runSlider();
  }

  if (sliders.length > 0) {
    sliders.forEach(function (item) {
      handleSlider(item);
    });
  }
})();
