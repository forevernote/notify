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
  .controller('AccountController', function($scope, Post, $rootScope) {

    $scope.allPosts = [];

    $scope.updatePost = {};


    $scope.showPost = function(index){
      $scope.post = $scope.allPosts[index];
      $scope.selectedIndex = index;
    };

    $scope.selectedIndex = null;


    $scope.newPostControls = {
      interfaceIsOpen: false,
      newPost: {},
      togglePostInterface: function() {
        this.interfaceIsOpen = !this.interfaceIsOpen;
      },
      sendPost: function() {
        Post.createPost(this.newPost).then((data) => {
            // Clear Form
            this.clearPost();
            // Broadcast POST UPDATED
            $rootScope.$broadcast('POSTUPDATED');
            this.togglePostInterface();
            console.log(data);
        }, function(err) {
          console.log('Error');
          console.log(err);
        })
      },
      clearPost: function() {
        this.newPost = {};
      }
    };

    $scope.updatePostControls = {
      updateIsOpen: false,
      updateNewPost: {},
      togglePostInterface: function() {
        this.updateIsOpen = !this.updateIsOpen;
      },
      getOnePost: function(index) {
        this.updateIsOpen = true;
        $scope.post = $scope.allPosts[index];
        updateNewPost = $scope.post;
        var title = $scope.post.title;
        var desc = $scope.post.content.text;
        $scope.updatePostControls.title = title;
        $scope.updatePostControls.content = desc;
        console.log(title + '  ' + desc);
      },
      updateThePost: function(){
        $scope.post.title = $scope.updatePostControls.title;
        $scope.post.content.text = $scope.updatePostControls.content;
        Post.updatePost($scope.post).then((data) => {
            // Clear Form
            this.clearPost();
            // Broadcast POST UPDATED
            $rootScope.$broadcast('POSTUPDATED');
            this.togglePostInterface();
            console.log(data);
        }, function(err) {
          console.log('Error');
          console.log(err);
        })
      },
      clearPost: function() {
        this.updateNewPost = {};
      }
    }

    $scope.editPost = function() {
      //console.log('clicked');

      Post.updatePost($scope.updatePost).then(function(data) {
        console.log(data);
      });

    };

    $scope.getAllPosts = function() {
      Post.getPost().then(function(res) {
        $scope.allPosts = res.data.posts;
        console.log('POSTS UPDATED');
      });
    }

    // Get all Posts when page first loads
    $scope.getAllPosts();

    $scope.$on('POSTUPDATED', function(){
      $scope.getAllPosts();
    })

  })


// DIRECTIVES
.directive("contenteditable", function() {
  return {
    restrict: "A",
    require: "ngModel",
    link: function(scope, element, attrs, ngModel) {

      function read() {
        ngModel.$setViewValue(element.html());
      }

      ngModel.$render = function() {
        element.html(ngModel.$viewValue || "");
      };

      element.bind("blur keyup change", function() {
        scope.$apply(read);
      });
    }
  };
})
