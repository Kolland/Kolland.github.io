'use strict';

$(function () {

  //Questions and answers
  var test = {
    questions: [
      '1.Что никогда не меняется?',
      '2.Нельзя просто так взять и ...',
      '3.Что из этого НЕ является Веб-браузером'
    ],
    answers: [
      ['Геймплей Assassins Creed', 'Война...', 'Игроки Call of Duty'],
      ['Пройти в Мордор', 'Просто так взять', 'Можно'],
      ['Firefox', 'Chrome', 'Internet Explorer', 'Opera']
    ]
  }

  // Set and get from localStorage  
  localStorage.setItem( 'test', JSON.stringify( test ) );
  var testJSON = JSON.parse( localStorage.getItem( 'test' ) );

  // Paste Q&A in template
  var html = $('#test_tmpl').html();

  var ans = tmpl(html, {
    data:testJSON
  });

  $('body').append(ans);

  // Results modal 

  var showResults = function () {

    $('.modal_wrap').show()
    // $('.modal_results').addClass('modal_results--active')

    // Right answers array
    var rightAnswers = [
      $( "label:contains('Война...') > input" ).prop("checked"),
      $( "label:contains('Пройти в Мордор') > input" ).prop("checked"),
      $( "label:contains('Internet Explorer') > input" ).prop("checked")
    ]
    
    //Right answers check
    for (var i = 0; i < test.questions.length; i++) {
      if ( rightAnswers[i] ) {
        $('.modal_results').append( '<h2 class="text-center">' + (i+1) + '. Правильно!</h2>');
      } else {
        $('.modal_results').append( '<h2 class="text-center">' + (i+1) + '. Не правильно!</h2>');
      }
    };
  }

  var hideResults = function () {
    $('.modal_wrap').hide();
    $('.modal_results').click(function( event ) {
      event.stopPropagation();
    });
    $('.modal_wrap h2').remove();
  }

  $('.btn').on('click', showResults);
  $('.modal_wrap, .modal_exit_btn').on('click', hideResults);
});

