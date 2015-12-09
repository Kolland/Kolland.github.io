var testTitle = document.createElement('h3');
testTitle.classList.add('testTitle');
testTitle.innerHTML = 'Тест по программированию';

var question1 = document.createElement('p');
question1.classList.add('question');
question1.innerHTML = '1.Вопрос №1';
var question2 = document.createElement('p');
question2.classList.add('question');
question2.innerHTML = '1.Вопрос №1';
var question3 = document.createElement('p');
question3.classList.add('question');
question3.innerHTML = '1.Вопрос №1';

var form1 = document.createElement('form1');
form1.setAttribute("method", "post");
var ul1 = document.createElement('ul1');
form1.appendChild(ul1);
var li = document.createElement('li');
ul1.appendChild(li);
var lable = document.createElement('lable');
li.appendChild(lable);
var checkbox = document.createElement('input');
checkbox.setAttribute("type", "checkbox");
lable.appendChild(checkbox);
lable.innerHTML += 'Вариант ответа №1';
var li = document.createElement('li');
ul1.appendChild(li);
var lable = document.createElement('lable');
li.appendChild(lable);
var checkbox = document.createElement('input');
checkbox.setAttribute("type", "checkbox");
lable.appendChild(checkbox);
lable.innerHTML += 'Вариант ответа №2';
var li = document.createElement('li');
ul1.appendChild(li);
var lable = document.createElement('lable');
li.appendChild(lable);
var checkbox = document.createElement('input');
checkbox.setAttribute("type", "checkbox");
lable.appendChild(checkbox);
lable.innerHTML += 'Вариант ответа №3';


var bodyVar = document.getElementsByTagName ('body');
console.log(bodyVar);
bodyVar[0].appendChild(testTitle);
bodyVar[0].appendChild(question1);
bodyVar[0].appendChild(form1);
bodyVar[0].appendChild(question2);
bodyVar[0].appendChild(question3);

// console.log (dynamicHTML.body);