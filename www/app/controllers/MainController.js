angular.module('MainController', [])

.controller('NavController', function($scope, $rootScope, $window, $location) {
  $rootScope.auth = {
    showAuthForm: false,
    toggleAuthForm: function() {
      console.log('CLicked');

      this.showAuthForm = !this.showAuthForm;
      // console.log(this.showAuthForm);
    }
  };
  $rootScope.isUserLoggedIn = false;
  $rootScope.logout = function() {
    $window.sessionStorage.token = '';  // reset sessionStorage token
    $rootScope.isUserLoggedIn = false;
    console.log($rootScope.isUserLoggedIn);
    $location.url('/');          // redirect to homepage
  }
})

.controller('HomeController', function($scope) {
  console.log('HomeController');
  // Handles showing and hiding auth form
})
  .controller('RegisterController', function($scope, $rootScope, Auth, $window, $location) {
    console.log('Register Controller');

    $scope.register = {
      email: '',
      password: ''
    };

    $scope.registerUser = function() {
      Auth.register($scope.register).then(function(res) {
        if (res.data.token) {
          $window.sessionStorage.token = res.data.token;
          $rootScope.isUserLoggedIn = true;   // results in login btn hiding, logout btn showing
          $rootScope.auth.showAuthForm = false; // makes login form disappear
          $location.url('/account');
        }
      }, function(err) {
        console.log('Error');
      });
    }

  })
  .controller('LoginController', function($scope, $rootScope, Auth, $window, $location) {
    console.log('Login Controller');

    $scope.loginUser = function() {

      $scope.authString = $scope.login.email + ':' + $scope.login.password;

      Auth.login(btoa($scope.authString)).then(function(res) {
        // if the token exists, store it in session storage and redirect to account page
        if (res.data.token) {
          $window.sessionStorage.token = res.data.token;
          $rootScope.isUserLoggedIn = true;   // results in login btn hiding, logout btn showing
          $rootScope.auth.showAuthForm = false; // makes login form disappear
          $location.url('/account');
        }
      });
    }
  })
  .controller('AccountController', function($scope, Post, $rootScope, Broadcast, $timeout) {

    $scope.allPosts = [];     // List of all posts
    $scope.updatePost = {};   // Empty object for updating post
    $scope.selectedItemId = null;

    $scope.$on('NEWEVENTLOADED', function() {
      $scope.viewerInclude.url = '';
      $scope.viewerInclude.showInclude = false;
    });

    // For selecting map/images/other within post viewer
    $scope.viewerInclude = {
      url: '',
      changeIncludeUrl: function(templateUrl) {
        if ($scope.post.location) {
          if (templateUrl == this.url) {
            this.showInclude = false
            this.url = '';
          } else {
            this.url = templateUrl;
            this.showInclude = true;
            if (templateUrl == 'templates/map.html') {
              console.log('Clicked');
              $timeout(function(){
                Broadcast.emit('MAPBUTTONCLICKED', $scope.post);
              }, 50);
            }
          }
        }
      },
      showInclude: false
    };

    // For including Media with a post
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
        var currentDate = new Date();
        var options = {
          weekday: "long", year: "numeric", month: "short",
          day: "numeric", hour: "2-digit", minute: "2-digit"
        };
        this.newPost.createdOn = currentDate.toLocaleTimeString('en-us', options);
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

    // Delete Post Controls
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
        if ($scope.post) {
          this.updateIsOpen = !this.updateIsOpen;
        }
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
