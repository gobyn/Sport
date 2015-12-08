angular.module('app').factory('sportIdentity', function($window){
    var currentUser;
    if(!!$window.bootstrappedUserObject){
        currentUser = $window.bootstrappedUserObject;
    }
    return{
        currentUser: currentUser,
        isAuthenticated: function(){
            return !!this.currentUser;
        }
    }
});