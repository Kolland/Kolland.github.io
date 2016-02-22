'use strict'

$(document).ready(function() {

 
  $("#owl-example").owlCarousel({
    singleItem : true,
    autoPlay : true,
    navigation : false,
    pagination : true,
    paginationNumbers: true,
  });

  $('.slick-slider').slick({
    centerMode: true,
    dots: true,
    variableWidth: true,
    arrows: false
  });

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
    initMap('map', 51.5876148, 0.4913903);

});