'use strict';

(function () {
  var hasDropElements = document.querySelectorAll('.has-drop');
  var hasFocusElements = document.querySelectorAll('.submenu, .search, .user-list__form, .product');

  function prepareHasDrop() {
    if (hasDropElements.length > 0) {
      var elements = Array.prototype.slice.call(hasDropElements);
      elements.forEach(function (item) {
        item.classList.remove('has-drop--no-js');
      });
    }
  }

  function onElementFocus() {
    this.classList.add('has-focus');
  }

  function onElementBlur() {
    this.classList.remove('has-focus');
  }

  function handleDrops() {
    prepareHasDrop();
    var elements = Array.prototype.slice.call(hasFocusElements);
    elements.forEach(function (item) {
      item.addEventListener('focus', onElementFocus, true);
      item.addEventListener('blur', onElementBlur, true);
    });
  }

  if (hasFocusElements.length > 0) {
    handleDrops();
  }
})();
