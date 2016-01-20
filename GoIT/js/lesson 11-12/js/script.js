$(function () {
	
	//carousel options
	$('.carousel-wrapper').carousel({
		picsWidth: 300,		// set pictures width
		picsAmount: 3,		// set amount of visible pictures
		margin:45,			// set margins beetwen pictures
		animationSpeed:300	// set carousel animation speed

	});


	// template
	var template = $('#test').html();
	$('body').append(template);
});