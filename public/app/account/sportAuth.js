angular.module('app').factory('sportAuth', function($http, sportIdentity, $q, sportUser){
    return{
        authenticateUser: function(username, password){
            var dfd = $q.defer();
            $http.post('/login', {username:username, password:password}).then(function(response){
                if(response.data.success){
                    var user = new sportUser();
                    angular.extend(user, response.data.user);
                    sportIdentity.currentUser = user;
                    dfd.resolve(true);
                }else{
                    dfd.resolve(false);
                }
            });
            return dfd.promise;
        },
        logoutUser: function(){
            var dfd = $q.defer();
            $http.post('/logout', {logout:true}).then(function(){
                sportIdentity.currentUser = undefined;
                dfd.resolve();
            });
            return dfd.promise;
        },
        authorizeCurrentUserForRoute: function(role){
            if(sportIdentity.isAuthorized(role)){
				return true;
			}else{
				return $q.reject('not authorized');
			}
        }
    }
});