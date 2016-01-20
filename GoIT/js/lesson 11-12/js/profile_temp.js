$(function () {
	
	// template
	var html = $('#profile_tmpl').html();

	var userInfo = {
		name: 'Колос Андрій Михайлович',
		img: "img/IMG_4784.jpg",
		prof: 'Ведущий инженер КВП и А',
		reasons: [
			{reason:'Производство не в лучшем состоянии'},
			{reason:'Возможность удаленной работы'},
			{reason:'Гибкий график'},
		],
		phoneNumber: '+380991930665',
		vkProfile: 'http://vk.com/id3978487',
		feedback: 'Могу автоматизировать что-то)'
	};


	var content = tmpl(html, userInfo);

	$('body').append(content);
});