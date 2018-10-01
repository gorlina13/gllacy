'use strict';

(function () {
  var hasDropElements = document.querySelectorAll('.has-drop');
  var hasFocusElements = document.querySelectorAll('[data-focus]');

  function prepareHasDropElements() {
    if (hasDropElements.length > 0) {
      var elements = Array.prototype.slice.call(hasDropElements);
      elements.forEach(function (item) {
        item.classList.remove('has-drop--no-js');
      });
    }
  }

  function handleHasFocusElements() {
    var elements = Array.prototype.slice.call(hasFocusElements);
    elements.forEach(function (item) {
      if (item.classList.contains('submenu')) {
        markSubmenu(item);
      }
      item.addEventListener('focus', onElementFocus, true);
      item.addEventListener('blur', onElementBlur, true);
    });
  }

  function markSubmenu(submenu) {
    var firstDropLink = submenu.querySelector('.submenu__link');
    if (firstDropLink !== null)  {
      var insertion = ' <span class="visually-hidden">Вложенное меню, </span>';
      firstDropLink.insertAdjacentHTML('afterbegin', insertion);
    }
  }

  function onElementFocus() {
    this.classList.add('has-focus');
  }

  function onElementBlur() {
    this.classList.remove('has-focus');
  }

  function manageDrops() {
    if (hasFocusElements.length > 0) {
      prepareHasDropElements();
      handleHasFocusElements();
    }
  }
  manageDrops();
})();
