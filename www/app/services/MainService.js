angular.module('MainService', [])

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

}]);


// .service('Entry', ['$http', function($http){
//     this.get = function(){
//         return $http.get('/entry');
//     }
//     this.getUserEntries = function(userObj) {
//         return $http.post('/entry/user', userObj);
//     }
//     this.postEntry = function(entryData) {
//         return $http.post('/entry', entryData);
//     }
// }])
