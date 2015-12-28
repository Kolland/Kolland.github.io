var modalPlaces = document.querySelector('.modal_places');
//App for create elements
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
	}
}
//Add names of places in modal window
var elems = $(".place-text-title").clone(true);
//Create add and delete buttons
for (var i = 0; i < elems.length; i++) {

	modalPlaces.appendChild(elems[i]);

	app.createElement ({
		tagName: 'button',
		tagClass: 'add_btn',
		tagContent: 'Добавить',
		tagParrent: modalPlaces
	});

	app.createElement ({
		tagName: 'button',
		tagClass: 'del_btn',
		tagContent: 'Удалить',
		tagParrent: modalPlaces
	})
};

// Hide\Show places
var addPlace = document.querySelectorAll(".add_btn");
var delPlace = document.querySelectorAll(".del_btn");

$(document).ready(function(){
	$(".place").hide();
	$('.place-add_btn').click(function(){
		$('.modal_places_wrap').show();
	});

	$('.modal_places-exit_btn').click(function(){
		$('.modal_places_wrap').hide();
	});
	var addPlaceCounter = 0;

	// Add place button
	$( ".add_btn" ).click(function( event ) {
		var i = $(addPlace).index($(event.target));
		$($('.place').get(i)).show();
		amountAddPlaces();
	})
	
	// Del pkace button
	$( ".del_btn" ).click(function( event ) {
		var i = $(delPlace).index($(event.target));
		$($('.place').get(i)).hide();
		amountAddPlaces();
	})
	// Add all places
	$('.add_all').click(function(){
		$('.place').show();
		amountAddPlaces();
	})
	//Add amount of all places
	var amountPlaces = $(".place").length;
	$('<p>').appendTo('.modal_places').text('Количество локаций:' + amountPlaces);
	//Add amount of added places
	var amountText = $('<p>').appendTo('.modal_places')
	function amountAddPlaces() {
		amount = $(".place:visible").length;
		amountText.text('Количество добавленых локаций:' + amount);
	};
	
})


       
