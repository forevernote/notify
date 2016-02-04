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
  .controller('AccountController', function($scope, Post, $rootScope, Broadcast) {
    // List of all posts
    $scope.allPosts = [];
    // Empty object for updating post
    $scope.updatePost = {};
    //
    $scope.selectedIndex = null;

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
    $scope.showPost = function(index) {
      $scope.post = $scope.allPosts[index];
      $scope.selectedIndex = index;

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
      delete: function(index) {
        Post.deletePost($scope.allPosts[index]).then(function(data) {
          console.log('Delete Successful');
          $rootScope.$broadcast('POSTUPDATED', index);
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
      updateThePost: function() {
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

    $scope.getAllPosts = function() {
      Post.getPost().then(function(res) {
        $scope.allPosts = res.data.posts;
        console.log('POSTS UPDATED');
      });
    }

    // Get all Posts when page first loads
    $scope.getAllPosts();

    $scope.$on('POSTUPDATED', function(index) {
      $scope.showPost(index + 1);
      $scope.getAllPosts();

    })


/********************************** FOR UPDATING USER INFO*********************/

    $scope.update = {
      name: {
        first: '',
        last: ''
      },
      birthday: '',
      gender: '',
      geoTag: '',
      social:'',
      hint: '',
      authentication: {
        email: '',
        password: ''
      }
    };

    $scope.updateUser = function() {
      Auth.update($scope.update).then(function(res) {
        console.log(update);
        }, function (err) {
          console.log('Error');
      });
    };
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

