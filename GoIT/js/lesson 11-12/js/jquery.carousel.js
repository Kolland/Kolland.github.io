(function($) {

	$.fn.carousel = function(options) {
		//defaul plugin settings
		var defaults = {
			picsWidth: 100,
			picsAmount: 5,
			margin: 25,
			animationSpeed: 300
		};
		var settings = $.extend(defaults, options);

		//calculate carousel width
		var listWidth = settings.picsAmount * (settings.picsWidth + settings.margin) - settings.margin;

		//add settings to css
		$('.carousel-element img').css('maxWidth', settings.picsWidth);
		$('.carousel-element').css('marginRight', settings.margin);
		$('.list-wrapper').css('width', listWidth);
		var carouselHeight = parseInt( ($('.carousel-wrapper').css('height') ));
		var btnMargin = (carouselHeight - 10) / 2;
		$('.carousel-arrow-right, .carousel-arrow-left').css('marginTop', btnMargin);

		console.log($('.carousel-arrow-right .carousel-arrow-left'));
		
		//carousel logic
		var leftUIEl = $('.carousel-arrow-left');
		var rightUIEl = $('.carousel-arrow-right');
		var elementsList = $('.carousel-list');

		var pixelsOffset = settings.picsWidth + settings.margin;

		var currentLeftValue = 0;
		
		var elementsCount = elementsList.find('li').length;
		var minimumOffset = - ((elementsCount - settings.picsAmount) * pixelsOffset);
		var maximumOffset = 0;
		
		leftUIEl.click(function() {
		    if (currentLeftValue != maximumOffset) {
		        currentLeftValue += pixelsOffset;
		        elementsList.animate({ left : currentLeftValue + "px"}, settings.animationSpeed);
		    }        
		});
		
		rightUIEl.click(function() {        
		    if (currentLeftValue != minimumOffset) {
		        currentLeftValue -= pixelsOffset;
		        elementsList.animate({ left : currentLeftValue + "px"}, settings.animationSpeed);
		    }
		});

		return this;
	}

})(jQuery);