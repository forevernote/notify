angular.module('MainService', [])
  .factory('authInterceptor', function($rootScope, $q, $window) {
    return {
      request: function(req) {
        req.headers = req.headers || {};
        if ($window.sessionStorage.token) {
          // retrieve token from session storage if it exists; store in config object
          req.headers.token = $window.sessionStorage.token;
        }
        return req;
      },
      response: function(response) {
        if (response.status === 401) {
          // handle the case where the user is not authenticated
        }
        return response || $q.when(response);
      }
    };
  })
  .service('Auth', ['$http', function($http) {
    this.login = function(headerData) {
      return $http({
        methods: 'GET',
        url: '/auth/login',
        headers: {
          authorization: 'Basic ' + headerData
        }
      });
    };
    this.register = function(data) {
      return $http.post('/auth/register', data);
    };


  }])
  .service('Post', ['$http', function($http) {
    var baseUri = '/user';
    this.getPost = function() {
      var uri = baseUri + '/posts';
      return $http.get(uri);
    };
    this.createPost = function(newPost) {
      var uri = baseUri + '/new';
      return $http.post(uri, newPost);
    };
    this.updatePost = function(updatePost) {
      var uri = baseUri + '/post/' + updatePost._id;
      return $http.put(uri, updatePost);
    };
    this.deletePost = function(deletePost) {
      var uri = baseUri + '/post/' + deletePost._id;
      return $http.delete(uri);
    };
  }]);
