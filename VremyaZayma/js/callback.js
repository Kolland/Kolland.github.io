$(document).ready(function(){

	$('head').append('<link rel="stylesheet" href="css/callback_style.css">');

	setTimeout(function () {
		$('body').append('<div class="callback_btn">');
		$('.callback_btn').append('<div class="callback_close">')
						  .append('<img class="callback_icon"src="img/callback_phone.png" alt="callback_phone">')
						  .append('<form action="http://formspree.io/koland.my@gmail.com" method="POST"class="clearfix callback_form">');
		$('.callback_form').append('<span class="callback_text">Введите свой номер и мы перезвоним Вам!')
						   .append('<input type="text" name="phone" placeholder="Введите номер телефона" class="callback_phone_number">')
						   .append('<input type="submit" class="callback_submit" value="">')
						   .append('<input type="hidden" name="_next" value="//php.loc/thanks.html" />');

		$('body').append('<div class="lt-xbutton">');
		$('.lt-xbutton').append('<span class="lt-xbutton-flash lt-flash-left">')
						.append('<span class="lt-xbutton-flash lt-flash-right">')
						.append('<div class="lt-xbutton-dialler">');
		$('.lt-xbutton-dialler').append('<div class="lt-xbutton-dialler-half half-left">')
								.append('<div class="lt-xbutton-dialler-half half-right">');
		$('.half-left').append('<div class="lt-xbutton-dialler-pie pie-left">');
		$('.half-right').append('<div class="lt-xbutton-dialler-pie pie-right">');


		$('.callback_btn').on('click', function(){
			$('.callback_close').show(200);
			$('.callback_form').addClass('callback_form-active')
			$(this).addClass('callback_btn-active');
			$('.callback_icon').addClass('callback_icon-rotate');
			$('.lt-xbutton').hide()
		});

		function callbackClose () {
			$('.callback_close').hide(200);
			$('.callback_form').removeClass('callback_form-active')
			$('.callback_btn').removeClass('callback_btn-active')
			$('.callback_icon').removeClass('callback_icon-rotate');
			$('.lt-xbutton').show()
			
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
	}, 1000);
	

});