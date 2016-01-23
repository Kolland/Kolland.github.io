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
  var resultsWindow = {
    
    show: function () {
      //modal window open animation
      $('.modal_wrap').fadeIn(200);

      $( '.modal_results' ).animate({
          top: 0,
        }, 100);

      // Right answers array
      var rightAnswers = [
        $( "label:contains('Война...') > input" ).prop("checked"),
        $( "label:contains('Пройти в Мордор') > input" ).prop("checked"),
        $( "label:contains('Internet Explorer') > input" ).prop("checked")
      ]
      
      //Right answers check
      for (var i = 0; i < test.questions.length; i++) {

        if ( rightAnswers[i] ) {

          $( '<h2>' + (i+1) + '. Правильно!</h2>')
            .appendTo('.modal_results')
            .addClass("correct_answer");

        } else {

          $( '<h2>' + (i+1) + '. Не правильно!</h2>')
            .appendTo('.modal_results')
            .addClass("incorrect_answer");

        }
      };
    },

    hide: function () {
      //modal window close animation
      $('.modal_wrap').fadeOut(500);

      $( '.modal_results' ).animate({
        top: -500,
      }, 100, function(){

        $('.modal_wrap h2').remove();

      });
      
      $('.modal_results').click(function( event ) {
        event.stopPropagation();
      })

      //Reset radio
      $('input:radio').removeAttr('checked');
    }
  };

  $('.btn').on('click', resultsWindow.show);
  $('.modal_wrap, .modal_exit_btn').on('click', resultsWindow.hide);
});

