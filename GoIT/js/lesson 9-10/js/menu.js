// dropdown menu
$(function () {
	var $links = $('.menu li');

	$links.hover(
		function(){
			var $submenu = $(this).children('.submenu_down');
			$($submenu).show().animate({
    			height: '200px'
  				}, 300 );

			var $submenu = $(this).children('.submenu_right');
			$($submenu).show().animate({
    			width: '200px'
  				}, 300 );
		},
		function(){
			var $submenu = $(this).children('.submenu_down');
			$($submenu).animate({
    			height: '0px'
  				}, 300, function () {
  					$(this).hide()
  				} );

			var $submenu = $(this).children('.submenu_right');
			$($submenu).hide();
		}) 
})