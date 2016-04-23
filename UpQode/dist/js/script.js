jQuery(document).ready(function($) {

	// hamburger menu

	$('.header-menu__hamburger').on('click', function () {
		$(this).toggleClass('is-active');
		$('.header-menu__wrapper').toggleClass('header-menu__wrapper--active');
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
		// items:4
		nav			: true,
		navText		: ['<i class="icon-arrow-left">','<i class="icon-arrow-right">'],
	})


});