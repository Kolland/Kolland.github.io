// AJAX img request

var $imgSearchBtn = $('.holidays__search-btn');

function imgAjax() {

	var $imgSearchVal = $('.holidays__search').val();

	if (!$imgSearchVal) {
		$imgSearchVal = 'goit';
	};
	
	$.ajax({
		type 		: 	'GET',
		dataType	: 	'json',
		cache 		: 	false, 
		url 		: 	'http://api.pixplorer.co.uk/image?word=' + $imgSearchVal + '&amount=7&size=tmb',
	})
	.success(function(data) {

		var list = tmpl($('#list-template').html(), {data: data});


		$('.grid').remove();
		$('.grid-wrapper').html(list);

		$('.grid').masonry({
		  itemSelector: '.grid-item',
		  gutter: 20
		});

	})
	.fail(function() {
	})
	.always(function() {
	});
}

imgAjax();


// perform img request on "Enter"
$imgSearchBtn.on('click', imgAjax);

$(document).keypress(function(e) {
    if((e.which == 13) & ($('.holidays__search').is(":focus"))) {
        imgAjax();
    }
});
	
// owl.carousel calling
$(document).ready(function(){
  $('.owl-carousel').owlCarousel({
      loop:true,
      nav:true,
      items: 1,
      navText:[ , ],
      responsive:{
          0:{
          	nav:false,
            items:1
          },
          768:{
              nav:true
          }
      }
  })
});


