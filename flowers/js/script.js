$(document).ready(function() {
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
   if(screen.width <= 859) {
    mvp = document.getElementById('myViewport');
    mvp.setAttribute('content', 'width=320, user-scalable=no');
   }else{
    if(screen.width <= 1024) {
     mvp = document.getElementById('myViewport');
     mvp.setAttribute('content', 'width=1024, user-scalable=no');
    }else{
     mvp = document.getElementById('myViewport');
     mvp.setAttribute('content', 'width=device-width, user-scalable=no, initial-scale=1');
    }
   }
  }
	var owl = $(".owl-carousel");
 
  owl.owlCarousel({

  	// Most important owl features
  	items : 3,
  	itemsCustom : false,
  	itemsDesktop : [1199,4],
  	itemsDesktopSmall : [1366,3],
  	itemsTablet: [1024,3],
  	itemsTabletSmall: false,
  	itemsMobile : [1023,1],
  	singleItem : false,
  	itemsScaleUp : false,
  	
  	//Basic Speeds
  	slideSpeed : 200,
  	paginationSpeed : 800,
  	rewindSpeed : 1000,
  	
  	//Autoplay
  	autoPlay : false,
  	stopOnHover : false,
  	
  	// Navigation
  	navigation : false,
  	navigationText : ["",""],
  	rewindNav : true,
  	scrollPerPage : false,
  	
  	//Pagination
  	pagination : false,
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

	$(".owl-carousel-nav.right").click(function(){
	  owl.trigger('owl.next');
	})
	$(".owl-carousel-nav.left").click(function(){
	  owl.trigger('owl.prev');
	})

 	// Google Map

 	function initMap(element, xAxis, yAxis) {
 	  var myLatLng = {lat: xAxis, lng: yAxis};

 	  var map = new google.maps.Map(document.getElementById(element), {
 	    zoom: 16,
 	    center: myLatLng,
 	    zoomControl: true,
      draggable: false,
      scrollwheel: false
 	  });

 	  var marker = new google.maps.Marker({
 	    position: myLatLng,
 	    map: map,
 	    title: 'Hello World!'
 	  });
 	}
 	initMap('map_horoshev', 55.775806, 37.546972);
 	initMap('map_mnevniki', 55.773408, 37.484982);
 	initMap('map_zukova', 55.779647, 37.449041);
});

$(window).load(function() { 
    $('.loader_inner').fadeOut(); 
    $('.loader').delay(400).fadeOut('slow'); 
});