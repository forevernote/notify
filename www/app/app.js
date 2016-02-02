angular.module('notify', ['ngRoute', 'MainController', 'MainService'])
.config(function($httpProvider) {
	$httpProvider.interceptors.push('authInterceptor');
})
.run (function($rootScope, $location, $window) {
	$rootScope.$on('$routeChangeStart', function (event, next) {
		var userAuthenticated = $window.sessionStorage.token; // Check if the user is logged in
		// check if user is authenticated and trying to access secure page
		if (userAuthenticated && next.isLogin) {
				/* You can save the user's location to take him back to the same page after he has logged-in */
				// $rootScope.savedLocation = $location.url();
			$location.url(next.originalPath);
		}
		// check if user is not authenticated and trying to access secure page
		else if (!userAuthenticated && next.isLogin) {
			$location.url('/register');
		}
		// user not authenticated and trying to access insecure page
		else {
			$location.url(next.originalPath);
		}
	});
})
.config(['$routeProvider', '$locationProvider', function($routeProvider,
	$locationProvider) {

	$routeProvider
		.when('/', {
			templateUrl: 'templates/home.html',
			controller: 'HomeController'
		})
		.when('/login', {
			templateUrl: 'templates/login.html',
			controller: 'LoginController'
		})
		.when('/register', {
			templateUrl: 'templates/register.html',
			controller: 'RegisterController'
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
