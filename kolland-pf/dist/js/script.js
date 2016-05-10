jQuery(document).ready(function($) {
	//viewport setting

	setViewport();

	window.onload = function () {
		setViewport();
	};
	window.onresize = function(event) {
		setViewport();
	};

	function setViewport(){
		var mvp;

	 	if(screen.width <= 500) {

	 		mvp = document.getElementById('myViewport');
	  		mvp.setAttribute('content', 'width=500, user-scalable=no');

	 	} else {

    		mvp = document.getElementById('myViewport');
    		mvp.setAttribute('content', 'width=device-width, user-scalable=no, initial-scale=1');
    
    	}
	}

	// hamburger menu

	$('.header-socials__hamburger').on('click', function () {
		$(this).toggleClass('is-active');
		$('.header-socials__wrapper').toggleClass('header-socials__wrapper--active');
	})

	// fancyBox

	$('.gallery__full').fancybox({
		padding		: 3,
		openEffect	: 'elastic',
		closeEffect	: 'elastic',

		helpers : {
			title : {
				type : 'inside'
			}
		}
	});

	// owl-carousel
	$('.owl-carousel').owlCarousel({
		autoWidth	: true,
		loop 		: true,
		// autoplay 	: true, 
		// stagePadding: 50,
		// mergeFit	: true,
		nav			: true,
		navText		: ['<svg><use xlink:href="#next"></svg>','<svg><use xlink:href="#back"></svg>'],
		responsive : {
		    // breakpoint from 0 up
		    // 0 : {
		    // 	autoWidth	: true,
		    //     items 		: 4,
		    // },
		    // // breakpoint from 480 up
		    // 480 : {
		    // 	autoWidth	: false,
		    //     items 		: 4,
		    // },
		    // // breakpoint from 768 up
		    // 768 : {
		    // 	autoWidth	: true,
		    //     items 		: 4,
		    // }
		}
	})

	

});