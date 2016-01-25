$(document).ready(function(){

	$('.callback_btn').on('click', function(){
		$(this).addClass('callback_btn-active');
		$('.callback_icon').addClass('callback_icon-rotate');
	})

	$(document).click(function(event) {
		if ($(event.target).closest('.callback_btn').length) return;
		$('.callback_btn').removeClass('callback_btn-active')
		event.stopPropagation();
		$('.callback_icon').removeClass('callback_icon-rotate');
	});

});