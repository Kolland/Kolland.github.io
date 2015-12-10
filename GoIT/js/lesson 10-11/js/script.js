// Возведение числа в степень
var num  = +prompt('Введите число:');
var deg  = +prompt('Введите показатель степени:');
var	result = 1;

function pow(a, b) {
	for (var i = 0; i < b; i++) {
		result = result * a;
	};
}

pow(num, deg)

console.log(result);

// Проверка пользователя
var namesArr = [];
var flag = false;

for (var i = 0; i < 5; i++) {
	namesArr.push(prompt('Заполните масив имен:'));
};

var j = 0;

for (var i = 0; i <= j; i++) {
	var userName = prompt('Введите свое имя:')
	if (userName === '') {
		j++
	}
};

for (var i = 0; i < namesArr.length; i++) {
	if (namesArr[i] === userName) {
		flag = true;
	};
};

if (flag) {
	alert( userName + ', вы успешно вошли!' )
} else{
	alert( 'ОШИБКА: Пользователя с таким именем не существует.' )
};

console.log(namesArr);
console.log(userName);