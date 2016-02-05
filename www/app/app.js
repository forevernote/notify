angular.module('notify', ['ngRoute', 'MainController', 'FeatureController',
		'MainService', 'leaflet-directive', 'ngAnimate'
	])
	.config(function($httpProvider) {
		$httpProvider.interceptors.push('authInterceptor');
	})
	.run(function($rootScope, $location, $window) {
		$rootScope.$on('$routeChangeStart', function(event, next) {
			// if user is not authenticated and trying to access secure page, redirect to homepage
			if (!$window.sessionStorage.token && next.isLogin) $location.url('/');
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
