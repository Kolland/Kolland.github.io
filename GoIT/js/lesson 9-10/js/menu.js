// dropdown menu
$(function () {
	var $links = $('.menu li');
	var $cellWidth = $links.css( "width" );
	$('.submenu_right').css( 'left', $cellWidth )


	$links.hover(
		function(){
			var $submenu = $(this).children('.submenu_down');

			$($submenu).animate({
    			height: 'toggle',
    			backgroundColor: 'rgb(104, 65, 25)'
  				}, 300 );

			var $submenu = $(this).children('.submenu_right');
			$($submenu).animate({
    			width: 'toggle',
    			backgroundColor: 'rgb(56, 93, 23)'
  				}, 300 );
		},

		function(){
			var $submenu = $(this).children('.submenu_down');

			$($submenu).animate({
    			height: 'toggle',
    			backgroundColor: 'rgb(85, 0, 0)'
  				}, 300);

			var $submenu = $(this).children('.submenu_right');
			$($submenu).animate({
    			width: 'toggle',
    			backgroundColor: 'rgb(104, 65, 25)'
  				}, 300 );
		})

})