'use strict';

(function () {
  var ESC_KEYCODE = 27;
  var feedbackLink = document.querySelector('.button--contacts');
  var feedbackModal = document.querySelector('.modal--feedback');
  var modals = document.querySelectorAll('.modal');
  var overlay = document.querySelector('.overlay');
  var isStorageSupport = true;
  var storage = '';

  function showModal(event, modal) {
    event.preventDefault();
    if (overlay !== null) {
      overlay.classList.add('overlay--show');
    }
    modal.classList.add('modal--show');
  }

  function hideModal(event, modal) {
    event.preventDefault();
    modal.classList.remove('modal--show');
    modal.classList.remove('modal--no-animation');
    modal.classList.remove('modal--error');
  }

  function hideOverlay() {
    overlay.classList.remove('overlay--show');
  }

  function hideModalWithOverlay(event, modal) {
    hideModal(event, modal);
    if (overlay !== null) {
      hideOverlay();
    }
  }

  if ((feedbackLink !== null) && (feedbackModal !== null)) {
    var feedbackForm = feedbackModal.querySelector('.feedback-form');
    var name = feedbackModal.querySelector('[name=name]');
    var email = feedbackModal.querySelector('[name=feedback-email]');

    try {
      storage = localStorage.getItem('name');
    } catch (err) {
      isStorageSupport = false;
    }

    feedbackLink.addEventListener('click', function (event) {
      showModal(event, feedbackModal);
      if (storage) {
        name.value = storage;
        email.focus();
      } else {
        name.focus();
      }
    });

    feedbackForm.addEventListener('submit', function (event) {
      if ((!name.value) || (!email.value)) {
        event.preventDefault();
        feedbackModal.classList.remove('modal--error');
        feedbackModal.classList.add('modal--no-animation');
        feedbackModal.classList.remove('modal--show');

        setTimeout(function () {
          feedbackModal.classList.add('modal--error');
        }, 200);

        if ((name.value) && (!email.value)) {
          email.focus();
        } else {
          name.focus();
        }
      } else {
        if (isStorageSupport) {
          localStorage.setItem('name', name.value);
        }
      }
    });
  }

  if (modals.length > 0) {
    [].forEach.call(modals, function (item) {
      var close = item.querySelector('.modal__close');
      close.addEventListener('click', function (event) {
        hideModalWithOverlay(event, item);
      });
      window.addEventListener('keydown', function (event) {
        if (event.keyCode === ESC_KEYCODE) {
          if ((item.classList.contains('modal--show')) || (item.classList.contains('modal--no-animation'))) {
            hideModalWithOverlay(event, item);
          }
        }
      });
      if (overlay !== null) {
        overlay.addEventListener('click', function (event) {
          hideModal(event, item);
          hideOverlay();
        });
      }
    });
  }
})();
