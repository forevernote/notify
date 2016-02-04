angular.module('MainController', [])

.controller('NavController', function($scope, $rootScope) {
  $scope.auth = {
    showAuthForm: false,
    toggleAuthForm: function() {
      console.log('CLicked');

      this.showAuthForm = !this.showAuthForm;
      console.log(this.showAuthForm);
    }
  };
})

.controller('HomeController', function($scope) {
  console.log('HomeController');
  // Handles showing and hiding auth form
})
  .controller('RegisterController', function($scope, Auth, $window, $location) {
    console.log('Register Controller');

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
    console.log('Login Controller');

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
  .controller('AccountController', function($scope, Post, $rootScope, Broadcast) {
    // List of all posts
    $scope.allPosts = [];
    // Empty object for updating post
    $scope.updatePost = {};
    //
    $scope.selectedItemId = null;

    // For selecting map/images/other
    $scope.include = {
      url: 'templates/map.html'
    };

    $scope.mediaInclude = {
      url: '',
      showMediaInclude: function(templateUrl) {
        this.url = templateUrl;
      }
    }

    // Show post when clicked in Preview
    $scope.showPost = function(id) {
      $scope.allPosts.forEach(function(currentPost, postIndex) {
        if (currentPost._id == id) {
          $scope.post = currentPost
        }
      })

      $scope.selectedItemId = id;

      Broadcast.emit('NEWEVENTLOADED', $scope.post);
    };

    // Listen for Map Click Event to Add to NEW POST
    $scope.$on('LocationAdded', function(event, latlng) {
      $scope.newPostControls.newPost.location.coords = latlng;
    });

    // Controls for creating a new post
    $scope.newPostControls = {
      interfaceIsOpen: false,
      newPost: {
        location: {}
      },
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

    $scope.deletePostControls = {
      delete: function() {
        Post.deletePost($scope.post).then(function(data) {
          console.log('Delete Successful');
          $scope.post = null;
          $rootScope.$broadcast('POSTUPDATED');
        }, function(err) {
          console.log('Failed to delete');
        })
      }
    };

    $scope.updatePostControls = {
      updateIsOpen: false,
      updateNewPost: {},
      togglePostInterface: function() {
        this.updateIsOpen = !this.updateIsOpen;
      },
      updateThePost: function() {
        Post.updatePost($scope.post).then((data) => {
          // Clear Form
          this.clearPost();
          // Broadcast POST UPDATED
          $rootScope.$broadcast('POSTUPDATED');
          this.togglePostInterface();
        }, function(err) {})
      },
      clearPost: function() {
        $scope.post = $scope.post;
      }
    }

    $scope.getAllPosts = function() {
      Post.getPost().then(function(res) {
        $scope.allPosts = res.data.posts;
        console.log('POSTS UPDATED');
      });
    }

    // Get all Posts when page first loads
    $scope.getAllPosts();

    $scope.$on('POSTUPDATED', function() {
      if ($scope.allPosts.length) {


      }
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