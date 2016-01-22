'use strict';

$(function () {
  
  // template
  var html = $('#test_tmpl').html();

  var test = {
    questions: [
      'Что никогда не меняется?',
      'Нельзя просто так взять и ...',
      'Что из этого НЕ является Веб-браузером'
    ],
    answers: [
      ['Геймплей Assassins Creed', 'Война...', 'Игроки Call of Duty'],
      ['Пройти в Мордор', 'Просто так взять', 'Можно'],
      ['Firefox', 'Chrome', 'Internet Explorer']
    ]
  }

  localStorage.setItem( 'test', JSON.stringify( test ) );
  var testJSON = JSON.parse( localStorage.getItem( 'test' ) );

  var ans = tmpl(html, {
    data:testJSON
  });

  $('body').append(ans);
});

// var app = {

//  createElement: function (tagParams) {
//    var element = document.createElement(tagParams.tag);
//    element.className = tagParams.tagClass;
//    element.innerHTML = tagParams.content;

//    if (tagParams.tag === 'input' || tagParams.tag === 'button') {
//      element.setAttribute('type', tagParams.inputType);
      
//      if (tagParams.inputType === 'submit' && tagParams.tag === 'input') {
//        element.setAttribute('value', tagParams.inputValue);
//      };
//    };

//    tagParams.parrent.appendChild(element);

//    return element;
//  },

//  generateQuestions: function(questionsAmount, answersAmount) {
//    for (var i = 0; i < questionsAmount; i++) {
//      this.createElement ({
//        tag: 'h3',
//        tagClass: 'text-center bg-primary',
//        content: 'Вопрос №' + (i +1),
//        parrent: centerDiv
//      });

//      var ul = this.createElement ({
//          tag: 'ul',
//          tagClass: 'center-block',
//          content: '',
//          parrent: centerDiv
//      })

//      for (var j = 0; j < answersAmount; j++) {
//        var li = this.createElement ({
//          tag: 'li',
//          tagClass: 'list-group-item',
//          content: '',
//          parrent: ul
//        })
//        var label = this.createElement ({
//          tag: 'label',
//          content: 'Вариант ответа №' + (j +1),
//          parrent: li
//        })
//        this.createElement ({
//          tag: 'input',
//          tagClass: 'pull-left',
//          inputType: 'checkbox',
//          content: '',
//          parrent: label
//        })
//      };
//    };
//  }
// };


// document.body.className = 'container';
// var body = document.body;

// //generate div bootsrap columns

// var centerDiv = app.createElement({
//  tag: 'div',
//  tagClass: 'col-md-12',
//  content: '',
//  parrent: body
//  });

// app.createElement({
//  tag: 'h2',
//  tagClass: 'text-center bg-danger',
//  content: 'Тест по программированию',
//  parrent: centerDiv
//  })

// app.generateQuestions(3, 3);

// app.createElement({
//  tag: 'input',
//  inputType: 'submit',
//  tagClass: 'btn btn-lg btn-success center-block',
//  inputValue: 'Проверить мои результаты',
//  parrent: centerDiv
//  })

