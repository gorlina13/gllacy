'use strict';

(function () {
  var FOCUSABLE_ELEMENTS_SELECTOR = 'a[href], area[href], input:not([disabled]), select:not([disabled]), textarea:not([disabled]), button:not([disabled]), iframe, object, embed, [tabindex="0"], [contenteditable]';
  var feedbackLink = document.querySelector('.button--contacts');
  var feedbackModal = document.querySelector('.modal--feedback');
  var modals = document.querySelectorAll('.modal');
  modals = Array.prototype.slice.call(modals);
  var overlay = document.querySelector('.overlay');
  var isStorageSupport = true;
  var storage = '';

  function prepareModal(modal) {
    var focusableElements = modal.querySelectorAll(FOCUSABLE_ELEMENTS_SELECTOR);
    focusableElements = Array.prototype.slice.call(focusableElements);
    modal.firstTabStop = focusableElements[0];
    modal.lastTabStop = focusableElements[focusableElements.length - 1];
  }

  function showModal(evt, modal) {
    evt.preventDefault();
    var focusedElement = document.activeElement;
    modal.startPoint = focusedElement;
    if (overlay !== null) {
      overlay.classList.add('overlay--show');
    }
    modal.classList.add('modal--show');
  }

  function handleShownModals() {
    window.addEventListener('keydown', function (evt) {
      actIfModalIsShown(evt, onWindowKeydown);
    });

    if (overlay !== null) {
      overlay.addEventListener('click', function (evt) {
        actIfModalIsShown(evt, onOverlayClick)
      });
    }
  }

  function actIfModalIsShown(evt, action) {
    modals.forEach(function (item) {
      if (item.classList.contains('modal--show')) {
        action(evt, item);
      }
    });
  }

  function onWindowKeydown(evt, modal) {
    if (window.util.returnTab(evt)) {
      // If Shift + Tab
      if (evt.shiftKey) {
        if (document.activeElement === modal.firstTabStop) {
          evt.preventDefault();
          modal.lastTabStop.focus();
        }
      // if Tab
      } else {
        if (document.activeElement === modal.lastTabStop) {
          evt.preventDefault();
          modal.firstTabStop.focus();
        }
      }
    }

    if (window.util.returnEsc(evt)) {
      onDialogClose(evt, modal);
    }
  }

  function onOverlayClick(evt, modal) {
    hideModal(evt, modal);
    hideOverlay();
  }

  function hideModal(evt, modal) {
    evt.preventDefault();
    modal.classList.remove('modal--show');
    modal.classList.remove('modal--no-animation');
    modal.classList.remove('modal--error');
    modal.startPoint.focus();
  }

  function hideOverlay() {
    overlay.classList.remove('overlay--show');
  }

  function onDialogClose(evt, modal) {
    hideModal(evt, modal);
    if (overlay !== null) {
      hideOverlay();
    }
  }

  function handleModalClose(modal) {
    var close = modal.querySelector('.modal__close');
    close.addEventListener('click', function (evt) {
      onDialogClose(evt, modal);
    });
  }

  function handleFeedbackModal() {
    var feedbackForm = feedbackModal.querySelector('.feedback-form');
    var name = feedbackModal.querySelector('[name=name]');
    var email = feedbackModal.querySelector('[name=feedback-email]');

    function checkStorage() {
      try {
        storage = localStorage.getItem('name');
      } catch (err) {
        isStorageSupport = false;
      }
    }

    function onFeedbackDialogOpen(evt) {
      showModal(evt, feedbackModal);
      if (storage) {
        name.value = storage;
        email.focus();
      } else {
        name.focus();
      }
    }

    function onFeedbackFormSubmit(evt) {
      if ((!name.value) || (!email.value)) {
        evt.preventDefault();
        feedbackModal.classList.remove('modal--error');
        feedbackModal.classList.add('modal--no-animation');

        setTimeout(function () {
          feedbackModal.classList.add('modal--error');
        }, 0);

        if (name.value) {
          email.focus();
        } else {
          name.focus();
        }
      } else {
        if (isStorageSupport) {
          localStorage.setItem('name', name.value);
        }
      }
    }

    checkStorage();
    feedbackLink.addEventListener('click', function (evt) {
      onFeedbackDialogOpen(evt);
    });
    window.util.makeLinkListenToSpaceKeydown(feedbackLink, onFeedbackDialogOpen);
    feedbackForm.addEventListener('submit', function (evt) {
      onFeedbackFormSubmit(evt);
    });
  }

  if (modals.length > 0) {
    modals.forEach(function (item) {
      prepareModal(item);
      handleModalClose(item);
    });
    handleShownModals();
  }

  if ((feedbackLink !== null) && (feedbackModal !== null)) {
    handleFeedbackModal();
  }
})();
