$(document).ready(function () {
 	$('body').append('<div class="container">');
 	$('.container').append('<div class="list_wrapper">');
 	$('.list_wrapper').append('<ul class="clearfix">');

 	//create li>a elements
 	for (var i = 1; i < 4; i++) {
 		$('<li class="list">').appendTo('.list_wrapper ul')
 		.append($("<a>", {
      		"class": "list_link",
			href: "#tabs-" + i
		}));
	};

	// add text to links
	$($('.list_link').get(0)).text('Nunc tincidunt');
	$($('.list_link').get(1)).text('Proin dolor');
	$($('.list_link').get(2)).text('Aenean lacinia');

	//create tabs text
	for (var i = 1; i < 4; i++) {
 		$($('<div>', {
      		'class': 'tabs_text',
			'id': 'tabs-' + i
		}))
		.appendTo('.container')
		.append('<p>');
	};

	$('#tabs-1').text('Proin elit arcu, rutrum commodo, vehicula tempus, commodo a, risus. Curabitur nec arcu. Donec sollicitudin mi sit amet mauris. Nam elementum quam ullamcorper ante. Etiam aliquet massa et lorem. Mauris dapibus lacus auctor risus. Aenean tempor ullamcorper leo. Vivamus sed magna quis ligula eleifend adipiscing. Duis orci. Aliquam sodales tortor vitae ipsum. Aliquam nulla. Duis aliquam molestie erat. Ut et mauris vel pede varius sollicitudin. Sed ut dolor nec orci tincidunt interdum. Phasellus ipsum. Nunc tristique tempus lectus.');
	$('#tabs-2').text('Morbi tincidunt, dui sit amet facilisis feugiat, odio metus gravida ante, ut pharetra massa metus id nunc. Duis scelerisque molestie turpis. Sed fringilla, massa eget luctus malesuada, metus eros molestie lectus, ut tempus eros massa ut dolor. Aenean aliquet fringilla sem. Suspendisse sed ligula in ligula suscipit aliquam. Praesent in eros vestibulum mi adipiscing adipiscing. Morbi facilisis. Curabitur ornare consequat nunc. Aenean vel metus. Ut posuere viverra nulla. Aliquam erat volutpat. Pellentesque convallis. Maecenas feugiat, tellus pellentesque pretium posuere, felis lorem euismod felis, eu ornare leo nisi vel felis. Mauris consectetur tortor et purus.');
	$('#tabs-3').text('Mauris eleifend est et turpis. Duis id erat. Suspendisse potenti. Aliquam vulputate, pede vel vehicula accumsan, mi neque rutrum erat, eu congue orci lorem eget lorem. Vestibulum non ante. Class aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos himenaeos. Fusce sodales. Quisque eu urna vel enim commodo pellentesque. Praesent eu risus hendrerit ligula tempus pretium. Curabitur lorem enim, pretium nec, feugiat nec, luctus a, lacus.');
	$('<p>').appendTo('#tabs-3').text('Duis cursus. Maecenas ligula eros, blandit nec, pharetra at, semper at, magna. Nullam ac lacus. Nulla facilisi. Praesent viverra justo vitae neque. Praesent blandit adipiscing velit. Suspendisse potenti. Donec mattis, pede vel pharetra blandit, magna ligula faucibus eros, id euismod lacus dolor eget odio. Nam scelerisque. Donec non libero sed nulla mattis commodo. Ut sagittis. Donec nisi lectus, feugiat porttitor, tempor ac, tempor vitae, pede. Aenean vehicula velit eu tellus interdum rutrum. Maecenas commodo. Pellentesque nec elit. Fusce in lacus. Vivamus a libero vitae lectus hendrerit hendrerit.');

  	$('#tabs-1').show();
	$('#tabs-2').hide();
	$('#tabs-3').hide();

	$('[href = #tabs-1]').click(function() {
		$('#tabs-1').show();
		$('#tabs-2').hide();
		$('#tabs-3').hide();
	});
	$('[href = #tabs-2]').click(function() {
		$('#tabs-1').hide();
		$('#tabs-2').show();
		$('#tabs-3').hide();
	});
	$('[href = #tabs-3]').click(function() {
		$('#tabs-1').hide();
		$('#tabs-2').hide();
		$('#tabs-3').show();
	});


// FORM SCRIPT

// Creating element

	$('body').append('<form action="#">');
	$('form').append('<fieldset class="form_wrapper">');

	for (var i = 0; i < 3; i++) {
		$('<div>').appendTo('fieldset')
		.append('<label>')
		.append('<input type="text">')
		.append('<div class="tooltip">');
	};

	$('<button>').appendTo('body').append('<span>');
	$('span').text('Show help');

// Add attributes

	function addAttributes (element) {
		if (element.newId) {
			$(element.selector).get(element.number).setAttribute('id', element.newId);
		};
		if (element.attFor) {
			$(element.selector).get(element.number).setAttribute('for', element.attFor);
		};
		if (element.attName) {
			$(element.selector).get(element.number).setAttribute('name', element.attName);
		};
		if (element.attTitle) {
			$(element.selector).get(element.number).setAttribute('title', element.attTitle);
		};
		$($(element.selector).get(element.number)).text(element.content);
	};

	addAttributes({
		selector: 'label',
		number: 0,
		attFor: 'firstname',
		content: 'First Name'
	});

	addAttributes({
		selector: 'label',
		number: 1,
		attFor: 'secondname',
		content: 'Second Name'
	});

	addAttributes({
		selector: 'label',
		number: 2,
		attFor: 'adress',
		content: 'Adress'
	});

	addAttributes({
		selector: 'input',
		number: 0,
		attId: 'firstname',
		attName: 'firstname',
		attTitle: 'Please provide your firstname.'
	});

	addAttributes({
		selector: 'input',
		number: 1,
		attId: 'secondname',
		attName: 'secondname',
		attTitle: 'Please provide your lastname.'
	});

	addAttributes({
		selector: 'input',
		number: 2,
		attId: 'adress',
		attName: 'adress',
		attTitle: 'Your home or work address.'
	});

	addAttributes({
		selector: '.tooltip',
		number: 0,
		content: 'Please provide your firstname.'
	});

	addAttributes({
		selector: '.tooltip',
		number: 1,
		content: 'Please provide your lastname.'
	});

	addAttributes({
		selector: '.tooltip',
		number: 2,
		content: 'Your home or work address.'
	});

// Tooltip hover logic

	$( 'label, input' ).hover(
	  function() {
	    $(this).siblings('div').css( "display", "inline-block");
	  },
	  function() {
	    $(this).siblings('div').hide();
	  }
	);

// Show help button logic

	$( 'button' ).click(
		function () {
			$( '.tooltip' ).css( "display", "inline-block");
		}
	);
});