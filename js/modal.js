'use strict';

(function () {
  var ESC_KEYCODE = 27;
  var TAB_KEYCODE = 9;
  var SPACE_KEYCODE = 32;
  var FOCUSABLE_ELEMENTS_SELECTOR = 'a[href], area[href], input:not([disabled]), select:not([disabled]), textarea:not([disabled]), button:not([disabled]), iframe, object, embed, [tabindex="0"], [contenteditable]';
  var feedbackLink = document.querySelector('.button--contacts');
  var feedbackModal = document.querySelector('.modal--feedback');
  var starters = [feedbackLink];
  var actions = [handleFeedbackModal];
  var modals = document.querySelectorAll('.modal');
  modals = Array.prototype.slice.call(modals);
  var overlay = document.querySelector('.overlay');
  var isStorageSupport = true;
  var storage = '';

  function returnTab(evt) {
    var key = evt.key || evt.keyCode;
    return key === 'Tab' || key === TAB_KEYCODE;
  }

  function returnEsc(evt) {
    var key = evt.key || evt.keyCode;
    return key === 'Escape' || key === 'Esc' || key === ESC_KEYCODE;
  }

  function returnSpaceBar(evt) {
    var key = evt.key || evt.keyCode;
    return key === ' ' || key === 'Spacebar' || key === SPACE_KEYCODE;
  }

  function addButtonRole(link) {
    link.setAttribute('role', 'button');
  }

  function setTabStops(modal) {
    var focusableElements = modal.querySelectorAll(FOCUSABLE_ELEMENTS_SELECTOR);
    focusableElements = Array.prototype.slice.call(focusableElements);
    modal.firstTabStop = focusableElements[0];
    modal.lastTabStop = focusableElements[focusableElements.length - 1];
  }

  function saveStartPoint(modal) {
    var lastFocusedElement = document.activeElement;
    modal.startPoint = lastFocusedElement;
  }

  function saveShownModal(modal) {
    modals.shownModal = modal;
  }

  function forgetShownModal() {
    modals.shownModal = '';
  }

  function showModal(evt, modal) {
    evt.preventDefault();
    saveStartPoint(modal);
    if (overlay !== null) {
      overlay.classList.add('overlay--show');
    }
    modal.classList.add('modal--show');
    modal.firstTabStop.focus();
    saveShownModal(modal);
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
    if (modals.shownModal) {
      action(evt, modals.shownModal);
    }
  }

  function onWindowKeydown(evt, modal) {
    if (returnTab(evt)) {
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

    if (returnEsc(evt)) {
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
    forgetShownModal();
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

    if (feedbackModal !== null) {
      var feedbackForm = feedbackModal.querySelector('.feedback-form');
      var name = feedbackModal.querySelector('[name=name]');
      var email = feedbackModal.querySelector('[name=feedback-email]');

      checkStorage();
      feedbackLink.addEventListener('click', function (evt) {
        onFeedbackDialogOpen(evt);
      });
      addButtonRole(feedbackLink);
      if (feedbackLink.tagName === 'A') {
        feedbackLink.addEventListener('keydown', function (evt) {
          if (returnSpaceBar(evt)) {
            onFeedbackDialogOpen(evt);
          }
        });
      }
      feedbackForm.addEventListener('submit', function (evt) {
        onFeedbackFormSubmit(evt);
      });
    }
  }

  if (modals.length > 0) {
    modals.forEach(function (item) {
      setTabStops(item);
      handleModalClose(item);
    });
    handleShownModals();
  }

  if (starters.length > 0) {
    starters.forEach(function (item, i) {
      if (item !== null) {
        actions[i]();
      }
    });
  }
})();
