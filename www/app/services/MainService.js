angular.module('MainService', [])

.service('Auth', ['$http', function($http){
    this.login = function(data){
        return $http.post('/auth/login', data);
    }
    this.register = function(data){
    	return $http.post('/auth/register', data);
    }

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
