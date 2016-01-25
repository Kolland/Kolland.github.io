$(document).ready(function(){

	$('.callback_btn').on('click', function(){
		$('.callback_close').show(200);
		$('.callback_submit').show(200);
		$(this).addClass('callback_btn-active');
		$('.callback_icon').addClass('callback_icon-rotate');
		$('.callback_text').delay(300).show();
	});

	function callbackClose () {
		$('.callback_close').hide(200);
		$('.callback_submit').hide(200);
		$('.callback_btn').removeClass('callback_btn-active')
		$('.callback_icon').removeClass('callback_icon-rotate');
		$('.callback_text').hide(200);
	};

	$(document).click(function(event) {
		if ($(event.target).closest('.callback_btn').length) return;
		event.stopPropagation();
		callbackClose ()
	});

	$('.callback_close').on('click', function(event){
		callbackClose ();
		event.stopPropagation();
	});

	$('.callback_phone_number').mask("+7 (999) 999-9999");

});