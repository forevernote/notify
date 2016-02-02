angular.module('MainController', [])

.controller('HomeController', function($scope) {
    console.log('home page');
  })
  .controller('RegisterController', function($scope, Auth, $window, $location) {

    $scope.register = {
      email: '',
      password: ''
    };

    $scope.registerUser = function() {
      Auth.register($scope.register).then(function(res) {
        if (res.data.token) {
          $window.sessionStorage.token = res.data.token;
          $location.url('/account');
        }
      }, function(err) {
        console.log('Error');
      });
    }

  })
  .controller('LoginController', function($scope, Auth, $window, $location) {

    $scope.loginUser = function() {

      $scope.authString = $scope.login.email + ':' + $scope.login.password;

      Auth.login(btoa($scope.authString)).then(function(res) {
        // if the token exists, store it in session storage and redirect to account page
        if (res.data.token) {
          $window.sessionStorage.token = res.data.token;
          $location.url('/account');
        }
      });
    }
  })
  .controller('AccountController', function($scope, Post) {

    $scope.allPosts = {};
    $scope.newPost = {};
    $scope.updatePost = {};


    $scope.interfaceIsOpen = false;

    $scope.newPostControls = {
      interfaceIsOpen: false,
      togglePostInterface: function() {
        this.interfaceIsOpen = !this.interfaceIsOpen;
      }
    };

    $scope.sendPost = function() {
      Post.createPost($scope.newPost).then(function(data) {
        console.log(data);
      });
    };

    $scope.editPost = function() {
      Post.updatePost($scope.updatePost).then(function(data) {
        console.log(data);
      });
    };
    Post.getPost().then(function(res) {
      $scope.allPosts = res.data.posts;
    });
  });
