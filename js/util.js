'use strict';

(function () {
  var ESC_KEYCODE = 27;
  var TAB_KEYCODE = 9;
  var SPACE_KEYCODE = 32;

  window.util = {
    returnSpaceBar: function (evt) {
      var key = evt.key || evt.keyCode;
      return key === ' ' || key === 'Spacebar' || key === SPACE_KEYCODE;
    },
    returnTab: function (evt) {
      var key = evt.key || evt.keyCode;
      return key === 'Tab' || key === TAB_KEYCODE;
    },
    returnEsc: function (evt) {
      var key = evt.key || evt.keyCode;
      return key === 'Escape' || key === 'Esc' || key === ESC_KEYCODE;
    },
    makeLinkListenToSpaceKeydown: function (link, action) {
      if (link.tagName === 'A') {
        link.addEventListener('keydown', function (evt) {
          if (window.util.returnSpaceBar(evt)) {
            action(evt);
          }
        });
      }
    }
  };
})();
