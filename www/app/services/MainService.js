angular.module('MainService', [])
.factory('authInterceptor', function($rootScope, $q, $window) {
  return {
    request: function (req) {
      req.headers = req.headers || {};
      if ($window.sessionStorage.token) {
        // retrieve token from session storage if it exists; store in config object
        req.headers.token = $window.sessionStorage.token;
      }
      return req;
    },
    response: function (response) {
      if (response.status === 401) {
        // handle the case where the user is not authenticated
      }
      return response || $q.when(response);
    }
  };
})
.service('Auth', ['$http', function($http) {
  this.login = function(headerData) {
    console.log(headerData);
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
.service('Post', ['$http', function($http){
  this.get = function(){
    return $http.get('/users/posts');
  }
}]);
