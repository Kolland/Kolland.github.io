var portfolioItems = [
	{
		classification: 'Landing Page',
		techStack: 'HTML5, CSS3/Sass, js/jQuery, AJAX',
		method: 'Responsive Web, Mobile First, BEM',
		fullPic: 'urlaubsgluck-screens.jpg',
		tmbPic: 'urlaubsgluck-thumb.jpg',
		link: 'http://kolland.github.io/GoIT/js/exam/dist/index.html',
		techIcons: [
			'html5',
			'sass',
			'jquery',
			'responsive-design'
		]
	},
	{
		classification: 'Landing Page',
		techStack: 'HTML5, CSS3',
		method: 'Responsive Web',
		fullPic: 'pingbuller-screens.jpg',
		tmbPic: 'pingbuller-thumb.jpg',
		link: 'https://kolland.github.io/GoIT/markup/lesson7/index.html',
		techIcons: [
			'html5',
			'css3',
			'responsive-design'
		]
	},
	{
		classification: 'Landing Page',
		techStack: 'HTML5, CSS3/Saas, js/jQuery, SVG',
		method: 'Responsive Web, BEM',
		fullPic: 'build-full.jpg',
		tmbPic: 'build-thumb.jpg',
		link: 'http://kolland.github.io/GoIT/js/lesson_19-20/dest/index.html',
		techIcons: [
			'html5',
			'sass',
			'jquery'
		]
	},
	{
		classification: 'Landing Page',
		techStack: 'HTML5, CSS3/Bootstrap, js/jQuery, Google Maps API',
		method: 'Responsive Web, BEM',
		fullPic: 'sai-screens.jpg',
		tmbPic: 'sai-thumb.jpg',
		link: 'https://kolland.github.io/twla_test/dest/index.html',
		techIcons: [
			'html5',
			'bootstrap-4',
			'jquery',
			'responsive-design'
		]
	},
	{
		classification: 'Product Page Mobile Version',
		techStack: 'HTML5, CSS3',
		fullPic: 'agusha-full.jpg',
		tmbPic: 'agusha-thumb.jpg',
		link: 'http://agusha.com.ua/product/ua_detskiy-tvorog-kislomolochnyy-klassicheskiy-100-g',
		techIcons: [
			'html5',
			'css3',
			'responsive-design'
		]
	},
	{
		classification: 'Landing Page and gallery',
		techStack: 'HTML5, CSS3, js/jQuery, Google Maps API',
		method: 'Responsive Web, Mobile first, BEM',
		fullPic: 'flowers-screens.jpg',
		tmbPic: 'flowers-thumb.jpg',
		link: 'http://оптцветмаг.рф/',
		techIcons: [
			'html5',
			'css3',
			'jquery',
			'responsive-design',
		]
	},
	{
		classification: 'Location Manager',
		techStack: 'HTML5, CSS3, javaScript',
		method: 'Responsive Web',
		fullPic: 'river-full.jpg',
		tmbPic: 'river-thumb.jpg',
		link: 'http://kolland.github.io/RiverSoft/index.html',
		techIcons: [
			'html5',
			'css3',
			'logo-javascript',
			'responsive-design'
		]
	},
	{
		classification: 'Magazine Front Page',
		techStack: 'HTML5, Sass/Susy, js/jQuery',
		method: 'BEM',
		fullPic: 'litma-full.jpg',
		tmbPic: 'litma-thumb.jpg',
		link: 'http://kolland.github.io/Otakoyi/dist/index.html',
		techIcons: [
			'html5',
			'sass',
			'jquery',
		]
	},
	{
		classification: 'Trello Angular Clone',
		techStack: 'HTML5, CSS3/Foundation, AngularJS',
		method: 'Responsive Web',
		fullPic: 'trello-full.JPG',
		tmbPic: 'trello-thumb.jpg',
		link: 'https://kolland.github.io/Trello_angular/index.html',
		techIcons: [
			'html5',
			'angular-icon',
			'responsive-design'
		]
	},
	{
		classification: '',
		techStack: '',
		method: '',
		fullPic: 'yoursite-full.jpg',
		tmbPic: 'yoursite-thumb.jpg',
		link: '',
		techIcons: [
		]
	},
	{
		classification: '',
		techStack: '',
		method: '',
		fullPic: 'yoursite-full.jpg',
		tmbPic: 'yoursite-thumb.jpg',
		link: '',
		techIcons: [
		]
	},
	{
		classification: '',
		techStack: '',
		method: '',
		fullPic: 'yoursite-full.jpg',
		tmbPic: 'yoursite-thumb.jpg',
		link: '',
		techIcons: [
		]
	},
	{
		classification: '',
		techStack: '',
		method: '',
		fullPic: 'yoursite-full.jpg',
		tmbPic: 'yoursite-thumb.jpg',
		link: '',
		techIcons: [
		]
	},
	{
		classification: '',
		techStack: '',
		method: '',
		fullPic: 'yoursite-full.jpg',
		tmbPic: 'yoursite-thumb.jpg',
		link: '',
		techIcons: [
		]
	},
	{
		classification: '',
		techStack: '',
		method: '',
		fullPic: 'yoursite-full.jpg',
		tmbPic: 'yoursite-thumb.jpg',
		link: '',
		techIcons: [
		]
	},

];

jQuery(document).ready(function($) {

	//set portfolio grid
	setPotfolioGrid();

	// window.onload = function () {
	// 	setPotfolioGrid();
	// 	console.log('fjlsd');
	// };
	// window.onresize = function(event) {
	// 	setPotfolioGrid();
	// 	console.log('jksdhfk');
	// };

	function setPotfolioGrid() {
		var screenHeight = screen.height;
		var strokesAmount = getstrokesAmount();

		function getstrokesAmount() {
			if (Math.floor(screenHeight / 300) === 0) {
				return 1;
			} else {
				return Math.floor(screenHeight / 300);
			}
		}

		console.log(strokesAmount);

		function getDividedArr(arr, arrInc) {
			colArray = [];

			for (var i = 0; i < arr.length;) {
				strokesArray = [];

				for (var j = 0; j < arrInc; j++) {
					if (typeof arr[i] === 'undefined') {
						continue;
					} else {
						strokesArray.push(arr[i]);

						i++;
					}

				}

				colArray.push(strokesArray);
			}

			console.log(colArray);
			return colArray

		}

		portfolioItemsArr = getDividedArr(portfolioItems, strokesAmount);

		var list = tmpl($('#grid-template').html(), {data: portfolioItemsArr});
		$('.gallery__grid').html(list);
		
		
	}

	

	
});
