var app = {
	createElement: function (tagParams) {
		var element = document.createElement(tagParams.tagName);
		element.className = tagParams.tagClass;
		element.innerHTML = tagParams.tagContent;
		if (tagParams.tagName === 'input') {
			element.setAttribute('type', tagParams.inputType);
		}
		if (tagParams.inputType === 'submit') {
			element.setAttribute('value', tagParams.inputValue);
		}
		tagParams.tagParrent.appendChild(element);
		return element;
	},
	generateQuestions: function(QuestionsAmount, AnswersAmount) {
		for (var i = 0; i < QuestionsAmount; i++) {
			this.createElement ({
				tagName: 'h3',
				tagClass: 'text-center bg-primary',
				tagContent: 'Вопрос №' + (i +1),
				tagParrent: centerDiv
			});
			var ul = this.createElement ({
					tagName: 'ul',
					tagClass: 'center-block',
					tagContent: '',
					tagParrent: centerDiv
			})
			for (var j = 0; j < AnswersAmount; j++) {
				var li = this.createElement ({
					tagName: 'li',
					tagClass: 'list-group-item',
					tagContent: '',
					tagParrent: ul
				})
				var label = this.createElement ({
					tagName: 'label',
					tagContent: 'Вариант ответа №' + (j +1),
					tagParrent: li
				})
				this.createElement ({
					tagName: 'input',
					tagClass: 'pull-left',
					inputType: 'checkbox',
					tagContent: '',
					tagParrent: label
				})
			};
		};
	}
}

var body = document.querySelector('body');
//generate div bootsrap columns
for (var i = 0; i < 3; i++) {
	app.createElement({
	tagName: 'div',
	tagClass: 'col-md-4',
	tagContent: '',
	tagParrent: body
	})
};

var centerDiv = document.getElementsByTagName('div')[1];

app.createElement({
	tagName: 'h2',
	tagClass: 'text-center bg-danger',
	tagContent: 'Тест по программированию',
	tagParrent: centerDiv
	})

app.generateQuestions(3, 3);

app.createElement({
	tagName: 'input',
	inputType: 'submit',
	tagClass: 'btn btn-lg btn-success center-block',
	inputValue: 'Проверить мои результаты',
	tagParrent: centerDiv
	})

