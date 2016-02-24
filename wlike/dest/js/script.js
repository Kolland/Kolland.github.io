'use strict'

$(document).ready(function() {
 
  $("#owl-example").owlCarousel({
  	// Most important owl features
  	    singleItem : true,
  	    itemsScaleUp : false,
  	 
  	    //Basic Speeds
  	    slideSpeed : 200,
  	    paginationSpeed : 800,
  	    rewindSpeed : 1000,
  	 
  	    //Autoplay
  	    autoPlay : true,
  	    stopOnHover : false,
  	 
  	    // Navigation
  	    navigation : false,
  	    navigationText : ["prev","next"],
  	    rewindNav : true,
  	    scrollPerPage : false,
  	 
  	    //Pagination
  	    pagination : true,
  	    paginationNumbers: false,
  	 
  	    // Responsive 
  	    responsive: true,
  	    responsiveRefreshRate : 200,
  	    responsiveBaseWidth: window,
  	 
  	    // CSS Styles
  	    baseClass : "owl-carousel",
  	    theme : "owl-theme",
  	 
  	    //Lazy load
  	    lazyLoad : false,
  	    lazyFollow : true,
  	    lazyEffect : "fade",
  	 
  	    //Auto height
  	    autoHeight : false,
  	 
  	    //JSON 
  	    jsonPath : false, 
  	    jsonSuccess : false,
  	 
  	    //Mouse Events
  	    dragBeforeAnimFinish : true,
  	    mouseDrag : true,
  	    touchDrag : true,
  	 
  	    //Transitions
  	    transitionStyle : false,
  	 
  	    // Other
  	    addClassActive : false,
  	 
  	    //Callbacks
  	    beforeUpdate : false,
  	    afterUpdate : false,
  	    beforeInit: false, 
  	    afterInit: false, 
  	    beforeMove: false, 
  	    afterMove: false,
  	    afterAction: false,
  	    startDragging : false,
  	    afterLazyLoad : false
  });

	// Accordion

	// active first tab
	$('.accordion__tab').eq(0).siblings('.accordion_article').show();
	$('.accordion__tab').eq(0).addClass('accordion__tab--active');
	$('.accordion__tab').eq(0).children('.accordion__title').addClass('accordion__title--active');

	$('.accordion__tab').on('click', function () {
		//reset all tabs
		$('.accordion_article').hide();
		$('.accordion__tab').removeClass('accordion__tab--active');
		$('.accordion__title').removeClass('accordion__title--active');

		//active clicked tab
		$(this).siblings('.accordion_article').toggle();
		$(this).toggleClass('accordion__tab--active');
		$(this).children('.accordion__title').toggleClass('accordion__title--active');
	})
 
});

// data.json

