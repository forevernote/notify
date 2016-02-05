angular.module('notify', ['ngRoute', 'MainController', 'FeatureController',
		'MainService', 'leaflet-directive', 'ngAnimate'
	])
	.config(function($httpProvider) {
		$httpProvider.interceptors.push('authInterceptor');
	})
	.run(function($rootScope, $location, $window) {
		$rootScope.$on('$routeChangeStart', function(event, next) {

			if (!$window.sessionStorage.token && next.isLogin) $location.url('/register');
			else $location.url(next.originalPath);

		});
	})
	.config(['$routeProvider', '$locationProvider', function($routeProvider,
		$locationProvider) {

		$routeProvider
			.when('/', {
				templateUrl: 'templates/home.html',
				controller: 'HomeController'
			})
			.when('/account', {
				templateUrl: 'templates/account.html',
				controller: 'AccountController',
				isLogin: true
			})
			.otherwise({
				redirectTo: '/'
			});
	}])
