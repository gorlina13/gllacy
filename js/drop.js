'use strict';

(function () {
  var hasDropElements = document.querySelectorAll('.has-drop');
  var submenuLinks = document.querySelectorAll('.submenu__link');
  var searchButtons = document.querySelectorAll('.search__submit');
  var dropDownForms = document.querySelectorAll('.user-list__form');
  var productButtons = document.querySelectorAll('.button--product');

  var TAG_NAMES = ['UL', 'FORM', 'FORM', 'ARTICLE'];

  function prepareHasDrop() {
    if (hasDropElements.length > 0) {
      [].forEach.call(hasDropElements, function (item) {
        item.classList.remove('has-drop--no-js');
      });
    }
  }

  function handleDrops() {
    var formElements;
    var focusableElements = [submenuLinks, searchButtons, formElements, productButtons];
    focusableElements.forEach(function (item) {
      var index = focusableElements.indexOf(item);
      var tag = TAG_NAMES[index];
      if (item === formElements) {
        if (dropDownForms.length > 0) {
          [].forEach.call(dropDownForms, function (item) {
            formElements = findFocusableElements(item);
            formElements.forEach(function (item) {
              respondToFocus(tag, item);
            });
          });
        }
      } else {
        if (item.length > 0) {
          item = makeArray(item);
          item.forEach(function (item) {
            respondToFocus(tag, item);
          });
        }
      }
    });
  }

  function makeArray(elements) {
    return Array.prototype.slice.call(elements);
  }

  function findFocusableElements(drop) {
    var inputs = drop.querySelectorAll('input');
    var links = drop.querySelectorAll('a');
    var buttons = drop.querySelectorAll('button');
    var elements = makeArray(inputs).concat(makeArray(links), makeArray(buttons));
    return elements;
  }

  function findDrop(element, tag, action) {
    while (!(element.classList.contains('has-drop'))) {
      if (element.tagName === tag) {
        action(element);
        return;
      }
      element = element.parentElement;
    }
    if (element.classList.contains('has-drop')) {
      action(element);
    }
  }

  function addFocus(element) {
    element.classList.add('has-focus');
  }

  function removeFocus(element) {
    element.classList.remove('has-focus');
  }

  function respondToFocus(tag, focusableElement) {
    focusableElement.addEventListener('focus', function () {
      var hasFocus = focusableElement;
      findDrop(hasFocus, tag, addFocus);
    });
    focusableElement.addEventListener('blur', function () {
      var hasBlur = focusableElement;
      findDrop(hasBlur, tag, removeFocus);
    });
  }

  prepareHasDrop();
  handleDrops();
})();
