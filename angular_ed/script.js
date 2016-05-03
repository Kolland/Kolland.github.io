var app = angular.module('app', ['ngMockE2E'])

// http without node 

app.run(function ($httpBackend) {
	var books = [
		{
			name: 'AngularJS'
		},
		{
			name: 'EmberJS'
		}
	];

	$httpBackend.whenGET('http://localhost:3001/books').respond(200, books);

	$httpBackend.whenPOST('http://localhost:3001/books').respond(function (method, url, data) {
		var result = JSON.parse(data);
		books.push(result);
		return [200, result];
	});

})

app.controller('myCtrl', function($scope, myFactory) {
	$scope.hello = 'hello world';
	$scope.fname = 'Kolos';
	$scope.lname = 'Andriy';

	$scope.myFactory = myFactory;

	$scope.getText = function () {
		return 'Some Text'
	};

	$scope.setHello = function (text) {
		$scope.hello = text;
		return $scope.hello;
	}
	
});

app.factory('myFactory', function () {
	return {
		hello: function () {
			return 'Hello World';
		}
	}
})


// filter
app.controller('filtCtrl', function($scope){
	$scope.money1 = '2.44$';
	$scope.money2 = '$2.67';
	$scope.money3 = '244';
	
})

app.filter('moneyFilter', function() {
	return function(str) {
		var lastChar = str.slice(-1);
		var firstChar = str.slice(0, 1);
		var slicedPart;

		if (lastChar === '$') {
			slicedPart = str.slice(0, str.length - 1);
			return '$' + slicedPart;
		} else if (firstChar === '$') {
			return str
		} else {
			return '$' + str;
		}
	}
})

// Transclude
app.directive('fooBar', function () {
	return {
		restrict: 'E',
		transclude: true,
		template: 'This is may super directive',
		link: function (scope, element, attrs, controller, transclude) {
			console.log('This is my super directive');
			transclude(scope, function (clone, scope) {
				element.append(clone);
			})
		},
	}
})
app.controller('transCtrl', function($scope){
	$scope.name = 'Bob';
})

// TemplateUrl

app.directive('fooTemp', function ($templateCache) {
	app.run(function($templateCache) {
		$templateCache.put('bookmarks.html', "<div ng-repeat='bookmark in bookmarks'>{{bookmark.name}}</div>")
	});
	var bookmarks = [
		{
			id:1,
			name: 'EmberJS'
		},
		{
			id:2, 
			name: 'AngularJS'
		},
		{
			id:3, 
			name: 'Spring'
		},
	]
	return {
		restrict: 'E',
		templateUrl: 'bookmarks.html',
		link: function (scope, element, attrs) {
			scope.bookmarks = bookmarks
			console.log('tempCache', $templateCache.info());
		}
	}
})

// Transclude element
app.directive('wrapIn', function ($templateCache) {
	return {
		transclude: 'element',
		link: function (scope, element, attrs, ctrl, transclude) {
			
			var template = $templateCache.get(attrs.wrapIn);
			var templateElement = angular.element(template)

			console.log('wrap in', templateElement);

			transclude(scope, function(clone) {
				element.after(templateElement.append(clone));
				console.log(clone);
			})
		}
	}
})

// http request 

app.controller('httpCtrl', function ($http, $scope) {
	$http.get('http://localhost:3001/books')
		.success(function(result){
			console.log('success', result);
			$scope.books = result;
		})
		.error(function(result){
			console.log('error');
		});

	$scope.addBook = function (book) {
		console.log('book', book);
		$http.post('http://localhost:3001/books', book)
			.success(function (result) {
				console.log('Book success saved to backend');
				$scope.books.push(book);
				$scope.book = null;
			})
			.error(function (result) {
				console.log('Error in book post');
			})
	}
})

