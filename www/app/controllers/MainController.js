angular.module('MainController', [])

.controller('HomeController', function($scope) {
    console.log('home page');
  })
  .controller('RegisterController', function($scope, Auth) {

    $scope.register = {
      email: '',
      password: ''
    };

    $scope.registerUser = function() {
      Auth.register($scope.register).then(function(user) {
        console.log(user);
      }, function(err) {
        console.log('Error');
        console.log(err);
      })
    }

  })
  .controller('LoginController', function($scope, Auth) {

    $scope.loginUser = function() {


      $scope.authString = $scope.login.email + ':' + $scope.login
        .password;


      Auth.login(btoa($scope.authString)).then(function(data) {
        console.log(data);
      })
    }

  })
  .controller('AccountController', function($scope) {
    console.log('account page');
  })
