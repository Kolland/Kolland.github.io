'use strict'

$(document).ready(function() {
  // Tabs 
  $('.banner__box').hide();
  $('#tabs-1').fadeIn();
  $('.banner__tab').eq(0).addClass('banner__tab--active');

  $('.banner__tab').mouseenter(function() {

    var id = $(this).find('.banner__link').attr('href');

    if (!($(this).hasClass('banner__tab--active'))) {

      $('.banner__box').hide();
      $(id).show();

    };

    $('.banner__tab').removeClass('banner__tab--active');
    $(this).addClass('banner__tab--active');

  })

});