function GoogleCallback(jqueryObj, data) {

	$('<div>').appendTo('.container').addClass('search_results');

	if (data.results.length == 0) {

		$('<p>').appendTo('.search_results').addClass('no_results').html('Поиск не дал результатов');
	
	} else {

		for (var i = 0; i < data.results.length; i++) {

			$('<a>', {
			    'href': data.results[i].url,
			    'text': data.results[i].titleNoFormatting,
			    'appendTo': '.search_results',
			    'target': '_blanck'
			});

			$('<p>').appendTo('.search_results').addClass('result_url').html(data.results[i].url);
			$('<p>').appendTo('.search_results').addClass('result_content').html(data.results[i].content);

		};
	};
};


$(function () {

	$('.search_input').keyup(function(event){
	    if (event.keyCode == 13) {
	        googleIt();
	    }
	});

	$('.search_btn').on( "click", googleIt);

	function googleIt () {
			console.log ($(".search_input").is(":focus"));
			$('.search_results').remove();
			var inputVal = $('.search_input').val();

			$.ajax({
				url:
				'http://ajax.googleapis.com/ajax/services/search/web?v=1.0&key=ABQIAAAACKQaiZJrS0bhr9YARgDqUxQBCBLUIYB7IF2WaNrkYqF0tBovNBQFDtM_KNtb3xQxWff2mI5hipc3lg&rsz=large&q='+ inputVal + '&callback=GoogleCallback&context=?',
				dataType: 'jsonp'
			});
			
	};

	// OOP
	var human = {
	  name: 'Andriy',
	  age: 26,
	  gender: 'male',
	  weight:70,
	  growth:178
	};
	
	var worker = {
	  job: 'programmer',
	  salary: 400,
	  work: function () {
		// body...
	  	alert('Work')
	},
	  __proto__:human
	};

	var student = {
	  study: 'ifntung',
	  scholarship: 50,
	  watchSeries: function () {
		// body...
	  	alert('Смотреть сериалы')
	},
	  __proto__:human
	};

	console.log('worker', worker);
	console.log('student', student);

});