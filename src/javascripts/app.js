jQuery(function ($) {
  'use strict';
  $('.modal-nav-open').click(function() {
    $('#myNav').height('100%');
  });

  $('.modal-nav-close').click(function() {
    $('#myNav').height('0%');
  });
});
