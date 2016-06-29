'use strict';

(function(){

  var postContainer = document.querySelector('.post');
  var temeSelect = document.querySelector('.js-change-teme');

  if (temeSelect) {
    temeSelect.addEventListener('change', function(evt) {
      evt.preventDefault();
      postContainer.classList.remove('wired', 'verge', 'techcrunch');
      postContainer.classList.add(temeSelect.value);
    });
  }

  var containerControl = document.querySelectorAll('.js-container');

  if (containerControl) {
    containerControl = Array.prototype.slice.call(containerControl, 0);
    var container = document.querySelector('.container');

    containerControl.forEach(function(item) {
      item.addEventListener('click', function(evt) {
        evt.preventDefault();
        container.classList = '';
        container.classList.add('container');
        container.classList.add('container--' + item.dataset.value);
      });
    });
  }

})();
